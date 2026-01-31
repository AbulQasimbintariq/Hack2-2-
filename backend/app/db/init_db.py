from sqlmodel import SQLModel
from app.db.engine import engine

# Import models so SQLModel registers tables
from app.models.task import Task  # noqa
from app.models.conversation import Conversation  # noqa
from app.models.message import Message  # noqa


def init_db() -> None:
    SQLModel.metadata.create_all(engine)
