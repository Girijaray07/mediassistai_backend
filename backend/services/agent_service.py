from typing import AsyncGenerator
from core.agents.gemini import GeminiAgent
from core.agents.ollama import OllamaAgent

class AgentService:
    def __init__(self):
        self.primary_agent = GeminiAgent()
        self.fallback_agent = OllamaAgent()

    async def chat_stream(self, prompt: str) -> AsyncGenerator[str, None]:
        try:
            print(f"Attempting response with {self.primary_agent.get_name()}")
            async for chunk in self.primary_agent.generate_response(prompt):
                yield chunk
        except Exception as e1:
            print(f"{self.primary_agent.get_name()} failed: {str(e1)}")
            try:
                print(f"Attempting fallback with {self.fallback_agent.get_name()}")
                async for chunk in self.fallback_agent.generate_response(prompt):
                    yield chunk
            except Exception as e2:
                print(f"{self.fallback_agent.get_name()} failed: {str(e2)}")
                yield "Error: Both primary and fallback agents failed to respond."

agent_service = AgentService()
