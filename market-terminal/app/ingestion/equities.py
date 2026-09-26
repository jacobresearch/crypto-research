import os
import time
from pathlib import Path
from typing import Optional

import psycopg2
import requests
from dotenv import load_dotenv
from psycopg2.extras import execute_values

TICKERS = [
    "SPY",
    "TLT",
    "HYG",
    "VIXY",
    "UUP",
]

ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query"
RATE_LIMIT_PAUSE_SECONDS = 15

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

UPSERT_SQL = """
    INSERT INTO raw_market_data (ticker, date, open, high, low, close, volume)
    VALUES %s
    ON CONFLICT (ticker, date)
    DO UPDATE SET
        open = EXCLUDED.open,
        high = EXCLUDED.high,
        low = EXCLUDED.low,
        close = EXCLUDED.close,
        volume = EXCLUDED.volume,
        ingested_at = NOW();
"""


def fetch_daily_time_series(ticker: str, api_key: str) -> Optional[dict]:
    params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": ticker,
        "apikey": api_key,
        "outputsize": "compact",
    }
    response = requests.get(ALPHA_VANTAGE_URL, params=params, timeout=30)
    response.raise_for_status()
    data = response.json()

    if "Error Message" in data:
        print(f"  WARNING [{ticker}]: Alpha Vantage error: {data['Error Message']}")
        return None
    if "Note" in data:
        print(f"  WARNING [{ticker}]: Alpha Vantage rate-limit note: {data['Note']}")
        return None
    if "Time Series (Daily)" not in data:
        print(f"  WARNING [{ticker}]: unexpected response, no 'Time Series (Daily)' key: {data}")
        return None

    return data["Time Series (Daily)"]


def ingest_ticker(conn, ticker: str, api_key: str) -> tuple[int, Optional[str]]:
    time_series = fetch_daily_time_series(ticker, api_key)
    if time_series is None:
        return 0, None

    rows = [
        (
            ticker,
            date,
            float(values["1. open"]),
            float(values["2. high"]),
            float(values["3. low"]),
            float(values["4. close"]),
            int(values["5. volume"]),
        )
        for date, values in time_series.items()
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
    alpha_vantage_api_key = os.environ["ALPHA_VANTAGE_API_KEY"]

    conn = psycopg2.connect(database_url)
    summary = []
    try:
        for i, ticker in enumerate(TICKERS):
            if i > 0:
                time.sleep(RATE_LIMIT_PAUSE_SECONDS)
            row_count, most_recent_date = ingest_ticker(conn, ticker, alpha_vantage_api_key)
            summary.append((ticker, row_count, most_recent_date))
    finally:
        conn.close()

    print("\nEquities ingestion summary:")
    for ticker, row_count, most_recent_date in summary:
        print(f"  {ticker}: {row_count} rows upserted, most recent date: {most_recent_date}")


if __name__ == "__main__":
    main()
