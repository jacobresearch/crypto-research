import os

import psycopg2
from dotenv import load_dotenv

SCHEMA_STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS hf_model_snapshot (
        id SERIAL PRIMARY KEY,
        snapshot_date DATE NOT NULL,
        model_id TEXT NOT NULL,
        author TEXT,
        pipeline_tag TEXT,
        library_name TEXT,
        downloads_30d BIGINT,
        likes BIGINT,
        last_modified TIMESTAMP,
        created_at TIMESTAMP,
        private BOOLEAN,
        gated TEXT,
        ingested_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (model_id, snapshot_date)
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
        print("Migration 002_hf_model_snapshot applied successfully.")
    finally:
        conn.close()


if __name__ == "__main__":
    run_migration()
