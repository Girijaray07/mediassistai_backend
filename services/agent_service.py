from typing import AsyncGenerator
from core.agents.gemini import GeminiAgent
from core.agents.openrouter import OpenRouterAgent
from services.medical_service import medical_service
from core.config import settings
import asyncio

class AgentService:
    def __init__(self):
        self.primary_agent = GeminiAgent()
        self.fallback_agent = OpenRouterAgent()

    async def chat_stream(self, prompt: str) -> AsyncGenerator[str, None]:
        # 1. Retrieval Layer: Check for medical conditions in the database
        try:
            match = medical_service.get_supplements_from_query(prompt)
            print(match)
            if match:
                condition = match["condition"]
                supplements = match["supplements"]

                # Convert supplement list into readable text
                supplements_text = "\n".join(
                    [f"- {supplement}" for supplement in supplements]
                )

                ai_prompt = f"""
                    {settings.DATABASE_PROMPT}

                    USER QUERY:
                    {prompt}

                    MATCHED CONDITION:
                    {condition}

                    DATABASE SUPPLEMENTS:
                    {supplements_text}
                """

                try:
                    async for chunk in self.primary_agent.generate_response(ai_prompt):
                        yield chunk
                    return

                except Exception as e1:
                    print(f"{self.primary_agent.get_name()} failed: {e1}")

                    async for chunk in self.fallback_agent.generate_response(ai_prompt):
                        yield chunk
                    return # Skip AI model call
        except Exception as e:
            print(f"Retrivial Failed: {e}")

        # 2. Normal AI Pipeline
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
