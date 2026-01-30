from fastapi import APIRouter, Depends, HTTPException, Query
from datetime import datetime
from ..auth import get_current_user
from sqlmodel import Session, select
from typing import Optional
from datetime import datetime
from db import get_session
from models import Task, TaskCreate, TaskUpdate, TaskRead, User

router = APIRouter()

MOCK_USER_ID = "demo-user"

@router.get("/tasks", response_model=list[TaskRead])
def get_tasks(
    status: Optional[str] = Query("all", pattern="^(all|pending|completed)$"),
    sort: Optional[str] = Query(None, pattern="^(created|title|due_date)$"),
    current_user = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    statement = select(Task).where(Task.user_id == MOCK_USER_ID)
    if status == "pending":
        statement = statement.where(Task.completed == False)
    elif status == "completed":
        statement = statement.where(Task.completed == True)

    if sort == "created":
        statement = statement.order_by(Task.created_at.desc())
    elif sort == "title":
        statement = statement.order_by(Task.title.asc())
    elif sort == "due_date":
        # due_date not implemented yet
        statement = statement.order_by(Task.created_at.desc())
    else:
        # default sort
        statement = statement.order_by(Task.created_at.desc())

    tasks = session.exec(statement).all()
    return tasks

@router.post("/tasks", response_model=TaskRead)
def create_task(
    task_in: TaskCreate,
    current_user = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = Task(**task_in.dict(), user_id=current_user.id)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.put("/tasks/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task_in: TaskUpdate,
    current_user = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    if db_task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    update_data = task_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    db_task.updated_at = datetime.utcnow()
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    current_user = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    if db_task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    session.delete(db_task)
    session.commit()
    return {"message": "Task deleted"}
