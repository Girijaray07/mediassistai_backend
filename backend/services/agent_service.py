from typing import AsyncGenerator
from core.agents.gemini import GeminiAgent
from core.agents.ollama import OllamaAgent
from core.agents.hermes3 import Hermes3Agent
from services.medical_service import medical_service
import asyncio

class AgentService:
    def __init__(self):
        self.primary_agent = GeminiAgent()
        self.fallback_agent = Hermes3Agent()

    async def chat_stream(self, prompt: str) -> AsyncGenerator[str, None]:
        # 1. Retrieval Layer: Check for medical conditions in the database
        try:
            match = medical_service.get_supplements_from_query(prompt)
            print(match)
            if match:
                condition = match["condition"]
                supplements = match["supplements"]
                
                response_prefix = f"Based on your query, I found information regarding **{condition}**. For this condition, the following Ayurvedic supplements are often recommended:\n\n"
                
                # Stream the response prefix
                for char in response_prefix:
                    yield char
                    await asyncio.sleep(0.01) # Small delay
                
                # Formating supplements as a list
                supplements_text = "\n".join([f"**{i+1}.** {s}\n" for i, s in enumerate(supplements)])
                print(supplements_text)
                for char in supplements_text:
                    yield char
                    await asyncio.sleep(0.05)

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
