import os
import sys
from collections import defaultdict
from datetime import date
from decimal import Decimal
from pathlib import Path

import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import Json, execute_values

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

COMPANIES = ["MSFT", "AMZN", "GOOGL", "META", "ORCL"]
AGG_COMPANIES = ["MSFT", "AMZN", "GOOGL", "META"]  # 4-hyperscaler grouping, excludes ORCL

# SEC's tag for revenue has changed over time and varies by company (see
# app/ingestion/sec_financials.py) — both aliases must be resolved together.
REVENUE_CONCEPTS = [
    "Revenues",
    "RevenueFromContractWithCustomerExcludingAssessedTax",
]
CAPEX_CONCEPTS = [
    "PaymentsToAcquirePropertyPlantAndEquipment",
    # Amazon uses this tag instead, and stopped using the one above around 2017.
    "PaymentsToAcquireProductiveAssets",
]

# A row is treated as a genuinely discrete (single) quarter if its span
# falls in this range; longer spans (~180/270/365 days) are cumulative
# year-to-date figures that need to be diffed down to a discrete quarter.
DIRECT_SPAN_MIN_DAYS = 80
DIRECT_SPAN_MAX_DAYS = 100

# A prior-year comparison quarter must fall in this window (~4 fiscal
# quarters back) to be considered valid.
YOY_MIN_DAYS = 350
YOY_MAX_DAYS = 380

VALIDATION_CASES = [
    ("MSFT", date(2026, 3, 31), Decimal("30876000000")),
    ("ORCL", date(2026, 8, 31), Decimal("28499000000")),
]

UPSERT_SQL = """
    INSERT INTO signals (signal_name, date, value, metadata)
    VALUES %s
    ON CONFLICT (signal_name, date)
    DO UPDATE SET
        value = EXCLUDED.value,
        metadata = EXCLUDED.metadata,
        calculated_at = NOW();
"""


def fetch_concept_rows(conn, ticker: str, concept: str):
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT start_date, end_date, form, filed_date, value
            FROM raw_sec_financials
            WHERE ticker = %s AND concept = %s
            ORDER BY start_date, end_date;
            """,
            (ticker, concept),
        )
        return cur.fetchall()


def reconstruct_discrete_series(rows) -> dict:
    """rows: iterable of (start_date, end_date, form, filed_date, value).

    Collapses same-period duplicates (kept most-recently-filed), diffs
    cumulative sequences sharing a start_date into discrete quarters, then
    prefers any directly-reported ~90-day figure over a derived one for
    the same end_date.
    """
    # Collapse duplicate (start_date, end_date) rows to the most-recently filed.
    collapsed = {}
    for start, end, form, filed, value in rows:
        key = (start, end)
        existing = collapsed.get(key)
        if existing is None or (filed or date.min) >= (existing[0] or date.min):
            collapsed[key] = (filed, value, start, end)

    clean_rows = [(start, end, value) for filed, value, start, end in collapsed.values()]

    groups = defaultdict(list)
    for start, end, value in clean_rows:
        groups[start].append((end, value))

    derived = {}
    for start, entries in groups.items():
        entries.sort(key=lambda e: e[0])
        prev_value = None
        for end, value in entries:
            derived[end] = value if prev_value is None else value - prev_value
            prev_value = value

    direct = {}
    for start, end, value in clean_rows:
        span_days = (end - start).days
        if DIRECT_SPAN_MIN_DAYS <= span_days <= DIRECT_SPAN_MAX_DAYS:
            direct[end] = value

    return {**derived, **direct}


def resolve_multi_alias_series(conn, ticker: str, concepts: list) -> dict:
    """Combines multiple concept aliases for the same metric, resolved by
    which alias is currently active (max end_date overall) rather than a
    fixed preference order — the "current" alias wins on any overlap."""
    per_concept = {}
    max_end_by_concept = {}

    for concept in concepts:
        rows = fetch_concept_rows(conn, ticker, concept)
        if not rows:
            continue
        per_concept[concept] = reconstruct_discrete_series(rows)
        max_end_by_concept[concept] = max(r[1] for r in rows)

    if not per_concept:
        return {}

    current_concept = max(max_end_by_concept, key=lambda c: max_end_by_concept[c])

    merged = {}
    # Fill from oldest/dormant aliases first, then let the current alias win any overlap.
    for concept in concepts:
        if concept == current_concept or concept not in per_concept:
            continue
        merged.update(per_concept[concept])
    merged.update(per_concept[current_concept])

    return merged


def nearest_calendar_quarter_end(d: date) -> date:
    candidates = [
        date(d.year - 1, 12, 31),
        date(d.year, 3, 31),
        date(d.year, 6, 30),
        date(d.year, 9, 30),
        date(d.year, 12, 31),
        date(d.year + 1, 3, 31),
    ]
    return min(candidates, key=lambda c: abs((d - c).days))


def build_aggregate_series(series_by_ticker: dict, tickers: list) -> dict:
    bucketed = defaultdict(Decimal)
    for ticker in tickers:
        for end_date, value in series_by_ticker.get(ticker, {}).items():
            bucket = nearest_calendar_quarter_end(end_date)
            bucketed[bucket] += Decimal(value)
    return dict(bucketed)


def compute_yoy(series: dict) -> list:
    """Returns [(end_date, growth_pct, current_value, prior_value, prior_end_date), ...]."""
    dates_sorted = sorted(series.keys())
    results = []
    for d in dates_sorted:
        candidates = [
            d2 for d2 in dates_sorted if YOY_MIN_DAYS <= (d - d2).days <= YOY_MAX_DAYS
        ]
        if not candidates:
            continue
        prior_d = min(candidates, key=lambda d2: abs((d - d2).days - 365))
        prior_value = series[prior_d]
        if prior_value == 0:
            continue
        current_value = series[d]
        growth_pct = float((current_value - prior_value) / prior_value * 100)
        results.append((d, growth_pct, current_value, prior_value, prior_d))
    return results


def make_signal_rows(signal_name: str, yoy_results: list) -> list:
    rows = []
    for end_date, growth_pct, current_value, prior_value, prior_end_date in yoy_results:
        metadata = {
            "current_value": float(current_value),
            "prior_year_value": float(prior_value),
            "current_end_date": str(end_date),
            "prior_end_date": str(prior_end_date),
        }
        rows.append((signal_name, end_date, growth_pct, Json(metadata)))
    return rows


def upsert_signal_rows(conn, rows) -> int:
    if not rows:
        return 0
    with conn.cursor() as cur:
        execute_values(cur, UPSERT_SQL, rows)
    conn.commit()
    return len(rows)


def run_validation(revenue_series: dict, capex_series: dict) -> bool:
    print("Validation: reconstructed discrete capex vs. already-verified direct figures")
    all_ok = True
    for ticker, end_date, expected in VALIDATION_CASES:
        actual = capex_series.get(ticker, {}).get(end_date)
        ok = actual == expected
        all_ok = all_ok and ok
        status = "OK" if ok else "MISMATCH"
        print(
            f"  [{status}] {ticker} capex @ {end_date}: "
            f"reconstructed={actual}, expected={expected}"
        )
    return all_ok


def main():
    load_dotenv(ENV_PATH)
    database_url = os.environ["DATABASE_URL"]

    conn = psycopg2.connect(database_url)
    try:
        revenue_series = {t: resolve_multi_alias_series(conn, t, REVENUE_CONCEPTS) for t in COMPANIES}
        capex_series = {t: resolve_multi_alias_series(conn, t, CAPEX_CONCEPTS) for t in COMPANIES}

        if not run_validation(revenue_series, capex_series):
            print("\nValidation failed — stopping before computing any growth signals.")
            sys.exit(1)

        all_rows = []
        per_company_summary = {}

        for ticker in COMPANIES:
            revenue_yoy = compute_yoy(revenue_series[ticker])
            capex_yoy = compute_yoy(capex_series[ticker])

            revenue_signal = f"revenue_growth_yoy_{ticker.lower()}"
            capex_signal = f"capex_growth_yoy_{ticker.lower()}"

            all_rows += make_signal_rows(revenue_signal, revenue_yoy)
            all_rows += make_signal_rows(capex_signal, capex_yoy)

            per_company_summary[ticker] = {
                "revenue": revenue_yoy[-1] if revenue_yoy else None,
                "capex": capex_yoy[-1] if capex_yoy else None,
            }

        agg_capex_series = build_aggregate_series(capex_series, AGG_COMPANIES)
        agg_revenue_series = build_aggregate_series(revenue_series, AGG_COMPANIES)

        agg_capex_yoy = compute_yoy(agg_capex_series)
        agg_revenue_yoy = compute_yoy(agg_revenue_series)

        all_rows += make_signal_rows("hyperscaler_capex_growth_yoy_agg", agg_capex_yoy)
        all_rows += make_signal_rows("hyperscaler_revenue_growth_yoy_agg", agg_revenue_yoy)

        row_count = upsert_signal_rows(conn, all_rows)
    finally:
        conn.close()

    print(f"\nTotal signal rows upserted: {row_count}")

    print("\nMost recent per-company YoY growth:")
    for ticker in COMPANIES:
        rev = per_company_summary[ticker]["revenue"]
        cap = per_company_summary[ticker]["capex"]
        rev_str = f"{rev[1]:+.1f}% @ {rev[0]}" if rev else "n/a"
        cap_str = f"{cap[1]:+.1f}% @ {cap[0]}" if cap else "n/a"
        print(f"  {ticker}: revenue_growth_yoy={rev_str}, capex_growth_yoy={cap_str}")

    print("\nAggregate signals (MSFT+AMZN+GOOGL+META):")
    if agg_revenue_yoy:
        d, growth, cur, prior, prior_d = agg_revenue_yoy[-1]
        print(f"  hyperscaler_revenue_growth_yoy_agg: {growth:+.1f}% @ {d} (vs {prior_d})")
    else:
        print("  hyperscaler_revenue_growth_yoy_agg: n/a")

    if agg_capex_yoy:
        d, growth, cur, prior, prior_d = agg_capex_yoy[-1]
        print(f"  hyperscaler_capex_growth_yoy_agg: {growth:+.1f}% @ {d} (vs {prior_d})")
    else:
        print("  hyperscaler_capex_growth_yoy_agg: n/a")


if __name__ == "__main__":
    main()
