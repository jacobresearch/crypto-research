import os
from pathlib import Path

import psycopg2
import requests
from dotenv import load_dotenv
from psycopg2.extras import execute_values

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

# SEC EDGAR requires a descriptive User-Agent with a real contact email on
# every request, or it blocks the request. See:
# https://www.sec.gov/os/webmaster-faq#developers
SEC_USER_AGENT = "MarketTerminal researchingchacko@gmail.com"

COMPANYFACTS_URL = "https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json"

# CIKs looked up once via https://www.sec.gov/files/company_tickers.json —
# these are static identifiers, no need to re-resolve them on every run.
COMPANIES = [
    {"ticker": "MSFT", "cik": "0000789019"},
    {"ticker": "AMZN", "cik": "0001018724"},
    {"ticker": "GOOGL", "cik": "0001652044"},
    {"ticker": "META", "cik": "0001326801"},
    {"ticker": "ORCL", "cik": "0001341439"},
]

# The us-gaap tag used for a given metric has changed over the years (e.g.
# ASC 606 adoption moved revenue off "Revenues" onto the newer tag around
# 2018). Try each alias per metric and ingest whichever concepts actually
# exist for a given company — nothing is renamed, the real SEC tag name is
# stored in the `concept` column as-is.
REVENUE_CONCEPTS = [
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "Revenues",
]
CAPEX_CONCEPTS = [
    "PaymentsToAcquirePropertyPlantAndEquipment",
    # Amazon uses this tag instead, and stopped using the one above around 2017.
    "PaymentsToAcquireProductiveAssets",
]
CONCEPTS_OF_INTEREST = REVENUE_CONCEPTS + CAPEX_CONCEPTS

VALID_FORMS = {"10-Q", "10-K"}

UPSERT_SQL = """
    INSERT INTO raw_sec_financials (
        ticker, cik, concept, fiscal_year, fiscal_period,
        start_date, end_date, filed_date, form, value, unit
    )
    VALUES %s
    ON CONFLICT (ticker, concept, start_date, end_date, form)
    DO UPDATE SET
        fiscal_year = EXCLUDED.fiscal_year,
        fiscal_period = EXCLUDED.fiscal_period,
        filed_date = EXCLUDED.filed_date,
        value = EXCLUDED.value,
        unit = EXCLUDED.unit,
        ingested_at = NOW();
"""


def fetch_company_facts(cik: str) -> dict:
    url = COMPANYFACTS_URL.format(cik=cik)
    response = requests.get(url, headers={"User-Agent": SEC_USER_AGENT}, timeout=30)
    response.raise_for_status()
    return response.json()


def build_rows(ticker: str, cik: str, facts: dict) -> list:
    usgaap = facts.get("facts", {}).get("us-gaap", {})
    rows = []

    for concept_name in CONCEPTS_OF_INTEREST:
        concept = usgaap.get(concept_name)
        if not concept:
            continue

        for unit_name, entries in concept.get("units", {}).items():
            for e in entries:
                if e.get("form") not in VALID_FORMS:
                    continue
                if e.get("start") is None or e.get("end") is None:
                    continue

                rows.append(
                    (
                        ticker,
                        cik,
                        concept_name,
                        e.get("fy"),
                        e.get("fp"),
                        e["start"],
                        e["end"],
                        e.get("filed"),
                        e.get("form"),
                        e.get("val"),
                        unit_name,
                    )
                )

    return rows


def dedupe_rows(rows: list) -> list:
    # SEC filings re-disclose prior periods as comparatives (e.g. a quarter's
    # figures reappear in the next filing's prior-year-comparative column),
    # so the same (concept, start, end, form) natural key can appear more
    # than once per company. Keep whichever was filed most recently.
    best = {}
    for row in rows:
        _, _, concept, _, _, start, end, filed, form, _, _ = row
        key = (concept, start, end, form)
        existing = best.get(key)
        if existing is None or (filed or "") >= (existing[7] or ""):
            best[key] = row
    return list(best.values())


def upsert_rows(conn, rows) -> int:
    if not rows:
        return 0
    with conn.cursor() as cur:
        execute_values(cur, UPSERT_SQL, rows)
    conn.commit()
    return len(rows)


def main():
    load_dotenv(ENV_PATH)
    database_url = os.environ["DATABASE_URL"]

    conn = psycopg2.connect(database_url)
    summary = []
    try:
        for company in COMPANIES:
            facts = fetch_company_facts(company["cik"])
            rows = dedupe_rows(build_rows(company["ticker"], company["cik"], facts))
            row_count = upsert_rows(conn, rows)
            concepts_found = sorted({r[2] for r in rows})
            summary.append((company["ticker"], row_count, concepts_found))
    finally:
        conn.close()

    print("SEC financials ingestion summary:")
    for ticker, row_count, concepts_found in summary:
        print(f"  {ticker}: {row_count} rows upserted — concepts: {', '.join(concepts_found)}")


if __name__ == "__main__":
    main()
