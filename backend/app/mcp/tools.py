from sqlmodel import Session
from app.services.tasks_service import TasksService


class MCPTools:
    def __init__(self, db: Session):
        self.db = db

    def add_task(self, user_id: str, title: str, description: str | None = None):
        task = TasksService.add_task(self.db, user_id, title, description)
        return {"task_id": task.id, "status": "created", "title": task.title}

    def list_tasks(self, user_id: str, status: str = "all"):
        tasks = TasksService.list_tasks(self.db, user_id, status=status)
        return [
            {"id": t.id, "title": t.title, "description": t.description, "completed": t.completed}
            for t in tasks
        ]

    def complete_task(self, user_id: str, task_id: int):
        task = TasksService.complete_task(self.db, user_id, task_id)
        if not task:
            return {"error": "task_not_found"}
        return {"task_id": task.id, "status": "completed", "title": task.title}

    def delete_task(self, user_id: str, task_id: int):
        task = TasksService.delete_task(self.db, user_id, task_id)
        if not task:
            return {"error": "task_not_found"}
        return {"task_id": task.id, "status": "deleted", "title": task.title}

    def update_task(self, user_id: str, task_id: int, title: str | None = None, description: str | None = None):
        task = TasksService.update_task(self.db, user_id, task_id, title=title, description=description)
        if not task:
            return {"error": "task_not_found"}
        return {"task_id": task.id, "status": "updated", "title": task.title}
