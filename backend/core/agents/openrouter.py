from openai import OpenAI
from core.agents.base import BaseAgent
from core.config import settings
from typing import AsyncGenerator
import asyncio

class OpenRouterAgent(BaseAgent):
    def __init__(self):
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.OPENROUTER_API_KEY,
        )
        self.model_id = "inclusionai/ring-2.6-1t:free"

    def get_name(self) -> str:
        return "Hermes3"

    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        stream = self.client.chat.completions.create(
            model=self.model_id,
            messages=[
                {
                    "role": "system",
                    "content": settings.SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            stream=True,
            extra_body={"reasoning": {"enabled": True}}
        )

        print(stream)
        
        for chunk in stream:
            print(chunk)
            if chunk.choices[0].delta.content:
              yield chunk.choices[0].delta.content
            await asyncio.sleep(0)