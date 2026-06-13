from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from schemas.chat import ChatRequest
from services.agent_service import agent_service
from core.config import settings
from google import genai
from datetime import datetime
import httpx

router = APIRouter()

@router.get("/health")
def health():
    return {"success":True,"message": "MediAssist API is running", "timestamp":datetime.now()}

@router.get("/models")
async def list_models():
    try:
        # Gemini models
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        models = client.models.list()
        gemini_list = [m.name for m in models]
    
        return {"Gemini models": gemini_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def chat(request: ChatRequest):
    return StreamingResponse(
        agent_service.chat_stream(request.prompt),
        media_type="text/plain"
    )
