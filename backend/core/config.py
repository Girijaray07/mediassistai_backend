from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "MediAssist AI"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    GEMINI_API_KEY: str
    DATABASE_URL: str
    SUPABASE_URL : str
    SUPABASE_KEY : str
    
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "gemma3:270m"
    
    SYSTEM_PROMPT: str = """You are MediAssist AI, a smart and friendly health assistant.

    Your job is to answer users questions on their health by analzing what they are asking 
    and use your knowledge about symptoms, lab reports, and general wellness,
    return only required response in strict markdown language with no additional text.

    Always be helpful, clear, and easy to understand."""

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
