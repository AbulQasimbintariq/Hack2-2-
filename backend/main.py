from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from db import engine
from routes import tasks, auth

app = FastAPI(title="Task API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api")
app.include_router(auth.router, prefix="/api")

@app.on_event("startup")
def create_tables():
    SQLModel.metadata.create_all(engine)
