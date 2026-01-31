from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.db.engine import engine
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.conversation_service import ConversationService
from app.services.agent_service import AgentService

router = APIRouter()


def get_db():
    with Session(engine) as session:
        yield session


@router.post("/api/{user_id}/chat", response_model=ChatResponse)
def chat(user_id: str, payload: ChatRequest, db: Session = Depends(get_db)):
    convo = ConversationService.get_or_create_conversation(db, user_id, payload.conversation_id)

    # store user message
    ConversationService.add_message(db, user_id, convo.id, "user", payload.message)

    # run agent
    result = AgentService.run_agent(db, user_id, convo.id, payload.message)

    # store assistant response
    ConversationService.add_message(db, user_id, convo.id, "assistant", result["assistant_text"])

    return ChatResponse(
        conversation_id=convo.id,
        response=result["assistant_text"],
        tool_calls=result.get("tool_calls", []),
    )
