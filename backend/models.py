from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime
from pydantic import BaseModel, Field as PydanticField

# SQLModel for database
class User(SQLModel, table=True):
    id: Optional[str] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    name: Optional[str] = Field(default=None)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    due_date: Optional[datetime] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Pydantic models for API
class TaskCreate(BaseModel):
    title: str = PydanticField(..., min_length=1, max_length=200)
    description: Optional[str] = PydanticField(None, max_length=1000)
    due_date: Optional[datetime] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = PydanticField(None, min_length=1, max_length=200)
    description: Optional[str] = PydanticField(None, max_length=1000)
    due_date: Optional[datetime] = None
    completed: Optional[bool] = None

class TaskRead(SQLModel, table=False):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    due_date: Optional[datetime]
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
