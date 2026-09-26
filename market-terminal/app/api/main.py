import os
from contextlib import contextmanager
from datetime import date
from pathlib import Path
from typing import List, Optional

import psycopg2
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(ENV_PATH)

DATABASE_URL = os.environ["DATABASE_URL"]

app = FastAPI(title="Market Terminal API")

# TODO: restrict allow_origins to the website's actual domain once verified end to end.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@contextmanager
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()


class SignalPoint(BaseModel):
    signal_name: str
    date: date
    value: Optional[float] = None
    metadata: dict = Field(default_factory=dict)


def signal_exists(conn, signal_name: str) -> bool:
    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM signals WHERE signal_name = %s LIMIT 1;", (signal_name,))
        return cur.fetchone() is not None


@app.get("/health")
def health():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1;")
                cur.fetchone()
    except psycopg2.OperationalError as exc:
        raise HTTPException(status_code=503, detail=f"database unavailable: {exc}")
    return {"status": "ok"}


@app.get("/signals/latest", response_model=List[SignalPoint])
def latest_signals():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT DISTINCT ON (signal_name) signal_name, date, value, metadata
                FROM signals
                ORDER BY signal_name, date DESC;
            """)
            rows = cur.fetchall()

    return [
        SignalPoint(signal_name=signal_name, date=date_, value=value, metadata=metadata or {})
        for signal_name, date_, value, metadata in rows
    ]


@app.get("/signals/{signal_name}", response_model=List[SignalPoint])
def signal_series(
    signal_name: str,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
):
    with get_db_connection() as conn:
        if not signal_exists(conn, signal_name):
            raise HTTPException(status_code=404, detail=f"signal_name '{signal_name}' not found")

        query = "SELECT date, value, metadata FROM signals WHERE signal_name = %s"
        params = [signal_name]

        if start_date is not None:
            query += " AND date >= %s"
            params.append(start_date)
        if end_date is not None:
            query += " AND date <= %s"
            params.append(end_date)

        query += " ORDER BY date ASC;"

        with conn.cursor() as cur:
            cur.execute(query, params)
            rows = cur.fetchall()

    return [
        SignalPoint(signal_name=signal_name, date=date_, value=value, metadata=metadata or {})
        for date_, value, metadata in rows
    ]


@app.get("/signals/{signal_name}/latest", response_model=SignalPoint)
def signal_latest(signal_name: str):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT date, value, metadata
                FROM signals
                WHERE signal_name = %s
                ORDER BY date DESC
                LIMIT 1;
                """,
                (signal_name,),
            )
            row = cur.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail=f"signal_name '{signal_name}' not found")

    date_, value, metadata = row
    return SignalPoint(signal_name=signal_name, date=date_, value=value, metadata=metadata or {})
