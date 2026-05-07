from abc import ABC, abstractmethod
from typing import AsyncGenerator

class BaseAgent(ABC):
    @abstractmethod
    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        pass

    @abstractmethod
    def get_name(self) -> str:
        pass
