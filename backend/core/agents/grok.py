from app.core.agents.base import BaseAgent
from typing import AsyncGenerator

class GrokAgent(BaseAgent):
    def __init__(self):
        # TODO: Implement Grok API client
        pass

    def get_name(self) -> str:
        return "Grok"

    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        yield "Grok agent is not yet implemented."
