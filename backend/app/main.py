from fastapi import FastAPI
from app.db.init_db import init_db
from app.api.routes_chat import router as chat_router
from app.api.routes_health import router as health_router

app = FastAPI(title="Todo AI Chat Backend", version="0.1.0")


@app.on_event("startup")
def on_startup():
    init_db()


app.include_router(health_router)
app.include_router(chat_router)
