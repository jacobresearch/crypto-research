import os
from datetime import datetime, timezone
from pathlib import Path

import psycopg2
from dotenv import load_dotenv
from huggingface_hub import HfApi
from psycopg2.extras import execute_values

TOP_N_MODELS = 100

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

UPSERT_SQL = """
    INSERT INTO hf_model_snapshot (
        snapshot_date, model_id, author, pipeline_tag, library_name,
        downloads_30d, likes, last_modified, created_at, private, gated
    )
    VALUES %s
    ON CONFLICT (model_id, snapshot_date)
    DO UPDATE SET
        author = EXCLUDED.author,
        pipeline_tag = EXCLUDED.pipeline_tag,
        library_name = EXCLUDED.library_name,
        downloads_30d = EXCLUDED.downloads_30d,
        likes = EXCLUDED.likes,
        last_modified = EXCLUDED.last_modified,
        created_at = EXCLUDED.created_at,
        private = EXCLUDED.private,
        gated = EXCLUDED.gated,
        ingested_at = NOW();
"""


def _naive_utc(dt):
    if dt is None:
        return None
    if dt.tzinfo is not None:
        dt = dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


def fetch_top_models(n: int):
    api = HfApi()
    return list(api.list_models(sort="downloads", limit=n, full=True))


def build_rows(models, snapshot_date):
    rows = []
    for m in models:
        gated = m.gated
        gated_text = None if gated is None else str(gated).lower() if isinstance(gated, bool) else gated

        rows.append(
            (
                snapshot_date,
                m.id,
                m.author,
                m.pipeline_tag,
                m.library_name,
                m.downloads,
                m.likes,
                _naive_utc(m.last_modified),
                _naive_utc(m.created_at),
                m.private,
                gated_text,
            )
        )
    return rows


def upsert_rows(conn, rows):
    if not rows:
        return 0
    with conn.cursor() as cur:
        execute_values(cur, UPSERT_SQL, rows)
    conn.commit()
    return len(rows)


def main():
    load_dotenv(ENV_PATH)
    database_url = os.environ["DATABASE_URL"]

    # UTC, not local system time — this must line up with the DB server's
    # CURRENT_DATE and with the UTC-scheduled daily GitHub Actions cron.
    snapshot_date = datetime.now(timezone.utc).date()
    models = fetch_top_models(TOP_N_MODELS)
    rows = build_rows(models, snapshot_date)

    conn = psycopg2.connect(database_url)
    try:
        row_count = upsert_rows(conn, rows)
    finally:
        conn.close()

    top_5 = sorted(models, key=lambda m: m.downloads or 0, reverse=True)[:5]

    print(f"Fetched {len(models)} models from Hugging Face Hub.")
    print(f"Snapshot date: {snapshot_date}")
    print(f"Rows upserted: {row_count}")
    print("\nTop 5 models by downloads:")
    for m in top_5:
        print(f"  {m.id}: {m.downloads:,} downloads")


if __name__ == "__main__":
    main()
