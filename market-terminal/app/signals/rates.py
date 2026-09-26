import os
from decimal import Decimal
from pathlib import Path

import numpy as np
import pandas as pd
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import Json, execute_values

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

MISMATCH_THRESHOLD = Decimal("0.02")

JOINED_2S10S_SQL = """
    SELECT a.date, a.value AS dgs10, b.value AS dgs2
    FROM raw_fred_series a
    JOIN raw_fred_series b ON a.date = b.date
    WHERE a.series_id = 'DGS10' AND b.series_id = 'DGS2'
    ORDER BY a.date;
"""

T10Y2Y_SQL = """
    SELECT date, value
    FROM raw_fred_series
    WHERE series_id = 'T10Y2Y';
"""

DGS10_SQL = """
    SELECT date, value
    FROM raw_fred_series
    WHERE series_id = 'DGS10'
    ORDER BY date ASC;
"""

DFII10_SQL = """
    SELECT date, value
    FROM raw_fred_series
    WHERE series_id = 'DFII10'
    ORDER BY date ASC;
"""

JOINED_DGS10_DFII10_SQL = """
    SELECT a.date, a.value AS dgs10, b.value AS dfii10
    FROM raw_fred_series a
    JOIN raw_fred_series b ON a.date = b.date
    WHERE a.series_id = 'DGS10' AND b.series_id = 'DFII10'
    ORDER BY a.date;
"""

T10YIE_SQL = """
    SELECT date, value
    FROM raw_fred_series
    WHERE series_id = 'T10YIE';
"""

# Not enough history for delta_20d before this many trading days into the series.
VELOCITY_WARMUP_DAYS = 20

# Below this, DGS10's delta_10d is too close to zero for a real/breakeven split to be meaningful.
CONTRIBUTION_ZERO_THRESHOLD = 0.02

UPSERT_SQL = """
    INSERT INTO signals (signal_name, date, value, metadata)
    VALUES %s
    ON CONFLICT (signal_name, date)
    DO UPDATE SET
        value = EXCLUDED.value,
        metadata = EXCLUDED.metadata,
        calculated_at = NOW();
"""


def calculate_2s10s(conn):
    with conn.cursor() as cur:
        cur.execute(JOINED_2S10S_SQL)
        joined_rows = cur.fetchall()

        cur.execute(T10Y2Y_SQL)
        t10y2y_by_date = {date: value for date, value in cur.fetchall()}

    rows = []
    mismatches = []

    for date, dgs10, dgs2 in joined_rows:
        calculated = dgs10 - dgs2

        fred_value = t10y2y_by_date.get(date)
        if fred_value is not None:
            diff = abs(calculated - fred_value)
            if diff > MISMATCH_THRESHOLD:
                mismatches.append((date, calculated, fred_value, diff))

        metadata = {
            "dgs10": float(dgs10),
            "dgs2": float(dgs2),
            "source": "calculated",
        }
        rows.append(("yield_curve_2s10s", date, calculated, Json(metadata)))

    return rows, mismatches


def _expanding_percentile(window: np.ndarray) -> float:
    current = window[-1]
    if np.isnan(current):
        return np.nan
    valid = window[~np.isnan(window)]
    return 100 * np.sum(valid <= current) / len(valid)


def calculate_dgs10_velocity(conn):
    with conn.cursor() as cur:
        cur.execute(DGS10_SQL)
        data = cur.fetchall()

    df = pd.DataFrame(data, columns=["date", "value"])
    df["value"] = df["value"].astype(float)

    df["delta_5d"] = df["value"].diff(5)
    df["delta_10d"] = df["value"].diff(10)
    df["delta_20d"] = df["value"].diff(20)

    expanding_mean = df["delta_10d"].expanding().mean()
    expanding_std = df["delta_10d"].expanding().std()
    df["z_score"] = (df["delta_10d"] - expanding_mean) / expanding_std
    df["percentile"] = df["delta_10d"].expanding().apply(_expanding_percentile, raw=True)

    # Skip the first N trading days of the series — not enough history for delta_20d yet.
    df = df.iloc[VELOCITY_WARMUP_DAYS:].reset_index(drop=True)

    rows = []
    for _, row in df.iterrows():
        metadata = {
            "delta_5d": None if pd.isna(row["delta_5d"]) else float(row["delta_5d"]),
            "delta_10d": None if pd.isna(row["delta_10d"]) else float(row["delta_10d"]),
            "delta_20d": None if pd.isna(row["delta_20d"]) else float(row["delta_20d"]),
            "percentile": None if pd.isna(row["percentile"]) else float(row["percentile"]),
            "z_score": None if pd.isna(row["z_score"]) else float(row["z_score"]),
        }
        rows.append(("dgs10_velocity", row["date"], float(row["delta_10d"]), Json(metadata)))

    return rows


def calculate_dfii10_velocity(conn):
    with conn.cursor() as cur:
        cur.execute(DFII10_SQL)
        data = cur.fetchall()

    df = pd.DataFrame(data, columns=["date", "value"])
    df["value"] = df["value"].astype(float)

    df["delta_5d"] = df["value"].diff(5)
    df["delta_10d"] = df["value"].diff(10)
    df["delta_20d"] = df["value"].diff(20)

    expanding_mean = df["delta_10d"].expanding().mean()
    expanding_std = df["delta_10d"].expanding().std()
    df["z_score"] = (df["delta_10d"] - expanding_mean) / expanding_std
    df["percentile"] = df["delta_10d"].expanding().apply(_expanding_percentile, raw=True)

    # Skip the first N trading days of the series — not enough history for delta_20d yet.
    df = df.iloc[VELOCITY_WARMUP_DAYS:].reset_index(drop=True)

    rows = []
    for _, row in df.iterrows():
        metadata = {
            "delta_5d": None if pd.isna(row["delta_5d"]) else float(row["delta_5d"]),
            "delta_10d": None if pd.isna(row["delta_10d"]) else float(row["delta_10d"]),
            "delta_20d": None if pd.isna(row["delta_20d"]) else float(row["delta_20d"]),
            "percentile": None if pd.isna(row["percentile"]) else float(row["percentile"]),
            "z_score": None if pd.isna(row["z_score"]) else float(row["z_score"]),
        }
        rows.append(("dfii10_velocity", row["date"], float(row["delta_10d"]), Json(metadata)))

    return rows


def calculate_rate_move_decomposition(conn, dgs10_delta_10d_by_date, dfii10_delta_10d_by_date):
    with conn.cursor() as cur:
        cur.execute(JOINED_DGS10_DFII10_SQL)
        joined_rows = cur.fetchall()

        cur.execute(T10YIE_SQL)
        t10yie_by_date = {date: value for date, value in cur.fetchall()}

    rows = []
    mismatches = []

    for date, dgs10, dfii10 in joined_rows:
        implied_breakeven = dgs10 - dfii10

        fred_value = t10yie_by_date.get(date)
        if fred_value is not None:
            diff = abs(implied_breakeven - fred_value)
            if diff > MISMATCH_THRESHOLD:
                mismatches.append((date, implied_breakeven, fred_value, diff))

        dgs10_delta_10d = dgs10_delta_10d_by_date.get(date)
        dfii10_delta_10d = dfii10_delta_10d_by_date.get(date)

        breakeven_delta_10d = None
        real_contribution_pct = None
        breakeven_contribution_pct = None

        if dgs10_delta_10d is not None and dfii10_delta_10d is not None:
            breakeven_delta_10d = dgs10_delta_10d - dfii10_delta_10d
            if abs(dgs10_delta_10d) >= CONTRIBUTION_ZERO_THRESHOLD:
                real_contribution_pct = (dfii10_delta_10d / dgs10_delta_10d) * 100
                breakeven_contribution_pct = 100 - real_contribution_pct

        metadata = {
            "dgs10_delta_10d": dgs10_delta_10d,
            "dfii10_delta_10d": dfii10_delta_10d,
            "breakeven_delta_10d": breakeven_delta_10d,
            "real_contribution_pct": real_contribution_pct,
            "breakeven_contribution_pct": breakeven_contribution_pct,
            "implied_breakeven": float(implied_breakeven),
        }
        rows.append(("rate_move_decomposition", date, real_contribution_pct, Json(metadata)))

    return rows, mismatches


def upsert_signal_rows(conn, rows):
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
    try:
        rows, mismatches = calculate_2s10s(conn)
        row_count = upsert_signal_rows(conn, rows)

        velocity_rows = calculate_dgs10_velocity(conn)
        velocity_row_count = upsert_signal_rows(conn, velocity_rows)

        dfii10_velocity_rows = calculate_dfii10_velocity(conn)
        dfii10_velocity_row_count = upsert_signal_rows(conn, dfii10_velocity_rows)

        dgs10_delta_10d_by_date = {row[1]: row[2] for row in velocity_rows}
        dfii10_delta_10d_by_date = {row[1]: row[2] for row in dfii10_velocity_rows}

        decomposition_rows, breakeven_mismatches = calculate_rate_move_decomposition(
            conn, dgs10_delta_10d_by_date, dfii10_delta_10d_by_date
        )
        decomposition_row_count = upsert_signal_rows(conn, decomposition_rows)
    finally:
        conn.close()

    print(f"Found {len(mismatches)} date(s) where our calculation differs from FRED's T10Y2Y by more than {MISMATCH_THRESHOLD}:")
    for date, calculated, fred_value, diff in mismatches:
        print(f"  {date}: calculated={calculated}, FRED T10Y2Y={fred_value}, diff={diff}")

    print("\nyield_curve_2s10s signal summary:")
    print(f"  dates processed: {len(rows)}")
    print(f"  rows inserted/updated: {row_count}")

    if rows:
        dates = [row[1] for row in rows]
        print(f"  date range: {min(dates)} to {max(dates)}")
        most_recent = max(rows, key=lambda row: row[1])
        print(f"  most recent value ({most_recent[1]}): {most_recent[2]}")

    print("\ndgs10_velocity signal summary:")
    print(f"  dates processed: {len(velocity_rows)}")
    print(f"  rows inserted/updated: {velocity_row_count}")

    if velocity_rows:
        most_recent = max(velocity_rows, key=lambda row: row[1])
        _, most_recent_date, most_recent_value, most_recent_metadata = most_recent
        metadata = most_recent_metadata.adapted
        print(f"  most recent date: {most_recent_date}")
        print(f"    delta_5d:   {metadata['delta_5d']}")
        print(f"    delta_10d:  {metadata['delta_10d']}")
        print(f"    delta_20d:  {metadata['delta_20d']}")
        print(f"    percentile: {metadata['percentile']}")
        print(f"    z_score:    {metadata['z_score']}")

    print("\ndfii10_velocity signal summary:")
    print(f"  dates processed: {len(dfii10_velocity_rows)}")
    print(f"  rows inserted/updated: {dfii10_velocity_row_count}")

    if dfii10_velocity_rows:
        most_recent = max(dfii10_velocity_rows, key=lambda row: row[1])
        _, most_recent_date, _, most_recent_metadata = most_recent
        metadata = most_recent_metadata.adapted
        print(f"  most recent date: {most_recent_date}")
        print(f"    delta_5d:   {metadata['delta_5d']}")
        print(f"    delta_10d:  {metadata['delta_10d']}")
        print(f"    delta_20d:  {metadata['delta_20d']}")
        print(f"    percentile: {metadata['percentile']}")
        print(f"    z_score:    {metadata['z_score']}")

    print(f"\nFound {len(breakeven_mismatches)} date(s) where implied breakeven (DGS10-DFII10) differs from FRED's T10YIE by more than {MISMATCH_THRESHOLD}:")
    for date, implied, fred_value, diff in breakeven_mismatches:
        print(f"  {date}: implied={implied}, FRED T10YIE={fred_value}, diff={diff}")

    print("\nrate_move_decomposition signal summary:")
    print(f"  dates processed: {len(decomposition_rows)}")
    print(f"  rows inserted/updated: {decomposition_row_count}")

    if decomposition_rows:
        most_recent = max(decomposition_rows, key=lambda row: row[1])
        _, most_recent_date, _, most_recent_metadata = most_recent
        metadata = most_recent_metadata.adapted
        print(f"  most recent date: {most_recent_date}")
        print(f"    real_contribution_pct:      {metadata['real_contribution_pct']}")
        print(f"    breakeven_contribution_pct: {metadata['breakeven_contribution_pct']}")
        print(f"    implied_breakeven:          {metadata['implied_breakeven']}")


if __name__ == "__main__":
    main()
