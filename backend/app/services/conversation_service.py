from datetime import datetime, timezone
from sqlmodel import Session, select

from app.models.conversation import Conversation
from app.models.message import Message


class ConversationService:
    @staticmethod
    def get_or_create_conversation(db: Session, user_id: str, conversation_id: int | None) -> Conversation:
        if conversation_id:
            convo = db.get(Conversation, conversation_id)
            if convo and convo.user_id == user_id:
                return convo

        convo = Conversation(user_id=user_id)
        db.add(convo)
        db.commit()
        db.refresh(convo)
        return convo

    @staticmethod
    def add_message(db: Session, user_id: str, conversation_id: int, role: str, content: str) -> Message:
        msg = Message(
            user_id=user_id,
            conversation_id=conversation_id,
            role=role,
            content=content,
        )
        db.add(msg)
        db.commit()
        db.refresh(msg)

        convo = db.get(Conversation, conversation_id)
        if convo:
            convo.updated_at = datetime.now(timezone.utc)
            db.add(convo)
            db.commit()

        return msg

    @staticmethod
    def get_history(db: Session, user_id: str, conversation_id: int) -> list[Message]:
        stmt = (
            select(Message)
            .where(Message.user_id == user_id)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
        )
        return list(db.exec(stmt).all())
