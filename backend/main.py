from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import vertexai
from vertexai.language_models import TextGenerationModel, ChatModel
import logging
import time
from datetime import datetime, timedelta
from collections import defaultdict
import secrets

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(
    title="PakistanAI API",
    description="A powerful AI chat platform with Pakistani cultural elements",
    version="1.0.0",
    docs_url=None if os.getenv("ENVIRONMENT") == "production" else "/docs",
)

# Security: API Key auth
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# Rate limiting setup
RATE_LIMIT_DURATION = timedelta(minutes=1)
MAX_REQUESTS = 50  # 50 requests per minute
request_history = defaultdict(list)

def get_api_key(api_key_header: str = Depends(api_key_header)) -> Optional[str]:
    if api_key_header == os.getenv("API_KEY"):
        return api_key_header
    return None

# Rate limiting middleware
async def rate_limit(request: Request):
    client_ip = request.client.host
    now = datetime.now()
    
    # Clean old requests
    request_history[client_ip] = [
        req_time for req_time in request_history[client_ip]
        if now - req_time < RATE_LIMIT_DURATION
    ]
    
    if len(request_history[client_ip]) >= MAX_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later."
        )
    
    request_history[client_ip].append(now)

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[os.getenv("ALLOWED_HOSTS", "*")]
)

# Initialize Google AI
try:
    vertexai.init(
        project=os.getenv("GOOGLE_CLOUD_PROJECT"),
        location=os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1"),
    )
    
    # Use your fine-tuned model
    FINE_TUNED_MODEL = os.getenv("FINE_TUNED_MODEL_ID", "your-model-id")
    model = ChatModel.from_pretrained(FINE_TUNED_MODEL)
    
    logger.info(f"Successfully initialized fine-tuned model: {FINE_TUNED_MODEL}")
except Exception as e:
    logger.error(f"Failed to initialize Google AI: {str(e)}")
    raise

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1024

class ChatResponse(BaseModel):
    response: str
    usage: dict

@app.post("/api/chat", response_model=ChatResponse, dependencies=[Depends(rate_limit)])
async def chat(
    request: ChatRequest,
    api_key: str = Depends(get_api_key)
):
    if not api_key and os.getenv("ENVIRONMENT") == "production":
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )

    try:
        start_time = time.time()
        
        # Format conversation history for the fine-tuned model
        chat = model.start_chat()
        
        # Add all previous messages to the chat
        for msg in request.messages[:-1]:  # All messages except the last one
            if msg.role == "user":
                chat.send_message(msg.content)
            # We don't need to add assistant messages as they're part of the response
        
        # Send the final message and get response
        response = chat.send_message(
            request.messages[-1].content,
            temperature=request.temperature,
            max_output_tokens=request.max_tokens,
        )
        
        # Calculate usage metrics
        end_time = time.time()
        processing_time = end_time - start_time
        
        usage = {
            "processing_time_ms": round(processing_time * 1000),
            "prompt_tokens": len(" ".join([m.content for m in request.messages]).split()),
            "completion_tokens": len(response.text.split()),
        }
        
        logger.info(f"Generated response in {processing_time:.2f}s")
        return ChatResponse(response=response.text, usage=usage)
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}"
        )

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "model": os.getenv("FINE_TUNED_MODEL_ID", "not-set")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=os.getenv("ENVIRONMENT") != "production",
        workers=4
    ) 