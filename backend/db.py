import os
from typing import Generator
from dotenv import load_dotenv
from sqlmodel import create_engine, Session

load_dotenv()

database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise RuntimeError("DATABASE_URL not set in .env")

engine = create_engine(database_url, echo=True, connect_args={"check_same_thread": False})  # SQLite threading

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
