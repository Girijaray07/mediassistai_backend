from google import genai
from core.agents.base import BaseAgent
from core.config import settings
from typing import AsyncGenerator
import asyncio

class GeminiAgent(BaseAgent):
    def __init__(self):
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model_id = "gemini-2.5-flash" # or gemini-flash-latest

    def get_name(self) -> str:
        return "Gemini"

    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        stream = self.client.models.generate_content_stream(
            model=self.model_id,
            contents=prompt,
            config={
                "system_instruction": settings.SYSTEM_PROMPT,
                "temperature": 0.1
            }
        )
        
        for chunk in stream:
            print(chunk.text)
            if chunk.text:
                yield chunk.text
            await asyncio.sleep(0)