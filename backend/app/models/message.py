from datetime import datetime, timezone
from typing import Optional

from sqlmodel import SQLModel, Field


class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    conversation_id: int = Field(index=True)

    role: str = Field(index=True)  # "user" | "assistant"
    content: str

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
