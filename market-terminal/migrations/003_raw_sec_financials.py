import os

import psycopg2
from dotenv import load_dotenv

SCHEMA_STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS raw_sec_financials (
        id SERIAL PRIMARY KEY,
        ticker TEXT NOT NULL,
        cik TEXT NOT NULL,
        concept TEXT NOT NULL,
        fiscal_year INTEGER,
        fiscal_period TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        filed_date DATE,
        form TEXT,
        value NUMERIC,
        unit TEXT,
        ingested_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (ticker, concept, start_date, end_date, form)
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
        print("Migration 003_raw_sec_financials applied successfully.")
    finally:
        conn.close()


if __name__ == "__main__":
    run_migration()
