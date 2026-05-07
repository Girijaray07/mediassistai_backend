from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from schemas.chat import ChatRequest
from services.agent_service import agent_service
import httpx
from core.config import settings
from google import genai

router = APIRouter()

@router.get("/models")
async def list_models():
    try:
        # Gemini models
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        models = client.models.list()
        gemini_list = [m.name for m in models]
        
        # Ollama models
        ollama_list = []
        try:
            async with httpx.AsyncClient() as client:
                res = await client.get(f"{settings.OLLAMA_BASE_URL}/api/tags")
                if res.status_code == 200:
                    ollama_data = res.json()
                    ollama_list = [
                        model["name"]
                        for model in ollama_data.get("models", [])
                    ]
        except Exception:
            pass # Ollama might not be running
            
        return {
            "Gemini models": gemini_list,
            "Ollama Models": ollama_list
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def chat(request: ChatRequest):
    return StreamingResponse(
        agent_service.chat_stream(request.prompt),
        media_type="text/plain"
    )
