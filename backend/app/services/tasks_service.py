from datetime import datetime, timezone
from sqlmodel import Session, select

from app.models.task import Task


class TasksService:
    @staticmethod
    def add_task(db: Session, user_id: str, title: str, description: str | None = None) -> Task:
        task = Task(user_id=user_id, title=title, description=description)
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def list_tasks(db: Session, user_id: str, status: str = "all") -> list[Task]:
        stmt = select(Task).where(Task.user_id == user_id)

        if status == "pending":
            stmt = stmt.where(Task.completed == False)  # noqa: E712
        elif status == "completed":
            stmt = stmt.where(Task.completed == True)  # noqa: E712

        stmt = stmt.order_by(Task.created_at.desc())
        return list(db.exec(stmt).all())

    @staticmethod
    def complete_task(db: Session, user_id: str, task_id: int) -> Task | None:
        task = db.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None
        task.completed = True
        task.updated_at = datetime.now(timezone.utc)
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete_task(db: Session, user_id: str, task_id: int) -> Task | None:
        task = db.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None
        db.delete(task)
        db.commit()
        return task

    @staticmethod
    def update_task(
        db: Session,
        user_id: str,
        task_id: int,
        title: str | None = None,
        description: str | None = None,
    ) -> Task | None:
        task = db.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None

        if title is not None:
            task.title = title
        if description is not None:
            task.description = description

        task.updated_at = datetime.now(timezone.utc)
        db.add(task)
        db.commit()
        db.refresh(task)
        return task
