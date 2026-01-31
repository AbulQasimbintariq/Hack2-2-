from typing import Any
from sqlmodel import Session

from app.services.conversation_service import ConversationService
from app.mcp.tools import MCPTools


class AgentService:
    """
    Phase III stub:
    - Builds message history
    - Calls AI agent runner
    - Uses MCP tools to perform actions
    """

    @staticmethod
    def run_agent(
        db: Session,
        user_id: str,
        conversation_id: int,
        user_message: str,
    ) -> dict[str, Any]:
        history = ConversationService.get_history(db, user_id, conversation_id)

        # Build agent messages
        messages = [{"role": m.role, "content": m.content} for m in history]
        messages.append({"role": "user", "content": user_message})

        # TODO: Replace with OpenAI Agents SDK runner
        # For now: simple fallback response
        # This placeholder demonstrates tool usage.
        tools = MCPTools(db=db)

        tool_calls = []
        assistant_text = "I received your message. (Agents SDK integration pending)"

        return {
            "assistant_text": assistant_text,
            "tool_calls": tool_calls,
        }
