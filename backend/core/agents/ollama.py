import httpx
import json
from core.agents.base import BaseAgent
from core.config import settings
from typing import AsyncGenerator

class OllamaAgent(BaseAgent):
    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_MODEL

    def get_name(self) -> str:
        return "Ollama"

    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        url = f"{self.base_url}/api/generate"
        payload = {
            "model": self.model,
            "prompt": prompt,
            # "system": settings.SYSTEM_PROMPT,
            "stream": True
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream("POST", url, json=payload) as response:
                if response.status_code != 200:
                    yield f"Error: Ollama returned status {response.status_code}"
                    return

                async for line in response.aiter_lines():
                    if line:
                        print(line)
                        try:
                            data = json.loads(line)
                            if "response" in data:
                                yield data["response"]
                        except json.JSONDecodeError:
                            continue
