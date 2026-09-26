import os

import psycopg2
from dotenv import load_dotenv

SCHEMA_STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS raw_fred_series (
        id SERIAL PRIMARY KEY,
        series_id TEXT NOT NULL,
        date DATE NOT NULL,
        value NUMERIC,
        ingested_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (series_id, date)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS raw_market_data (
        id SERIAL PRIMARY KEY,
        ticker TEXT NOT NULL,
        date DATE NOT NULL,
        open NUMERIC,
        high NUMERIC,
        low NUMERIC,
        close NUMERIC,
        volume BIGINT,
        ingested_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (ticker, date)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS signals (
        id SERIAL PRIMARY KEY,
        signal_name TEXT NOT NULL,
        date DATE NOT NULL,
        value NUMERIC,
        metadata JSONB,
        calculated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (signal_name, date)
    );
    """,
]


def run_migration():
    load_dotenv()
    database_url = os.environ["DATABASE_URL"]

    conn = psycopg2.connect(database_url)
    try:
        with conn:
            with conn.cursor() as cur:
                for statement in SCHEMA_STATEMENTS:
                    cur.execute(statement)
        print("Migration 001_initial_schema applied successfully.")
    finally:
        conn.close()


if __name__ == "__main__":
    run_migration()
