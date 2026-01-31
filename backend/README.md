# Backend (FastAPI + SQLModel + Neon)

## Setup

1) Create venv
python -m venv .venv
source .venv/bin/activate  # linux/mac
.venv\Scripts\activate     # windows

2) Install deps
pip install -r requirements.txt

3) Configure env
cp .env.example .env
# update DATABASE_URL

4) Run
uvicorn app.main:app --reload

## Endpoints
- GET /health
- POST /api/{user_id}/chat
