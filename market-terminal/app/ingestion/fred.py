import os
from pathlib import Path
from typing import Optional

import psycopg2
import requests
from dotenv import load_dotenv
from psycopg2.extras import execute_values

FRED_SERIES = [
    "DGS2",  # 2-Year Treasury yield
    "DGS10",  # 10-Year Treasury yield
    "T10Y2Y",  # 10Y-2Y spread
    "DFF",  # Effective Fed Funds Rate
    "T10YIE",  # 10-Year breakeven inflation rate
    "BAMLH0A0HYM2",  # High-yield credit spread
    "DFII10",  # 10-Year TIPS Yield / real yield
    "DGS30",  # 30-Year Treasury yield
]

FRED_OBSERVATIONS_URL = "https://api.stlouisfed.org/fred/series/observations"
OBSERVATION_START = "2020-01-01"

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

UPSERT_SQL = """
    INSERT INTO raw_fred_series (series_id, date, value)
    VALUES %s
    ON CONFLICT (series_id, date)
    DO UPDATE SET value = EXCLUDED.value, ingested_at = NOW();
"""


def fetch_series_observations(series_id: str, api_key: str) -> list[dict]:
    params = {
        "series_id": series_id,
        "api_key": api_key,
        "file_type": "json",
        "observation_start": OBSERVATION_START,
    }
    response = requests.get(FRED_OBSERVATIONS_URL, params=params, timeout=30)
    response.raise_for_status()
    return response.json()["observations"]


def ingest_series(conn, series_id: str, api_key: str) -> tuple[int, Optional[str]]:
    observations = fetch_series_observations(series_id, api_key)

    rows = [
        (series_id, obs["date"], obs["value"])
        for obs in observations
        if obs["value"] != "."
    ]

    if not rows:
        return 0, None

    with conn.cursor() as cur:
        execute_values(cur, UPSERT_SQL, rows)
    conn.commit()

    most_recent_date = max(row[1] for row in rows)
    return len(rows), most_recent_date


def main():
    load_dotenv(ENV_PATH)
    database_url = os.environ["DATABASE_URL"]
    fred_api_key = os.environ["FRED_API_KEY"]

    conn = psycopg2.connect(database_url)
    summary = []
    try:
        for series_id in FRED_SERIES:
            row_count, most_recent_date = ingest_series(conn, series_id, fred_api_key)
            summary.append((series_id, row_count, most_recent_date))
    finally:
        conn.close()

    print("FRED ingestion summary:")
    for series_id, row_count, most_recent_date in summary:
        print(f"  {series_id}: {row_count} rows upserted, most recent date: {most_recent_date}")


if __name__ == "__main__":
    main()
