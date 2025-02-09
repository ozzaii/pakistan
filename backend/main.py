from fastapi import FastAPI, HTTPException, Request, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Set
import os
from dotenv import load_dotenv
import logging
import time
from datetime import datetime, timedelta
from collections import defaultdict
import secrets
import httpx
import json
import re

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

# Enhanced Rate limiting setup
RATE_LIMIT_DURATION = int(os.getenv("RATE_LIMIT_DURATION", "60"))  # 60 seconds default
MAX_REQUESTS = int(os.getenv("RATE_LIMIT_REQUESTS", "50"))  # 50 requests per minute default
MAX_TOKENS_PER_REQUEST = 1024  # Maximum tokens per request
MAX_REQUEST_SIZE = 4096  # Maximum request size in bytes
BLOCKED_IPS: Set[str] = set()  # Set of blocked IPs

class RequestTracker:
    def __init__(self):
        self.requests: Dict[str, List[datetime]] = defaultdict(list)
        self.blocked_until: Dict[str, datetime] = {}
        
    def is_rate_limited(self, ip: str) -> bool:
        now = datetime.now()
        
        # Clean old requests
        self.requests[ip] = [
            req_time for req_time in self.requests[ip]
            if now - req_time < timedelta(seconds=RATE_LIMIT_DURATION)
        ]
        
        # Check if blocked
        if ip in self.blocked_until and now < self.blocked_until[ip]:
            return True
            
        # Check rate limit
        if len(self.requests[ip]) >= MAX_REQUESTS:
            self.blocked_until[ip] = now + timedelta(minutes=5)  # Block for 5 minutes
            logger.warning(f"IP {ip} blocked for excessive requests")
            return True
            
        self.requests[ip].append(now)
        return False

request_tracker = RequestTracker()

class Message(BaseModel):
    role: str
    content: str = Field(..., max_length=MAX_REQUEST_SIZE)

class ChatRequest(BaseModel):
    messages: List[Message]
    temperature: Optional[float] = Field(0.7, ge=0.0, le=1.0)
    max_tokens: Optional[int] = Field(default=1024, le=MAX_TOKENS_PER_REQUEST)

class ChatResponse(BaseModel):
    response: str
    usage: dict

def get_api_key(api_key_header: str = Depends(api_key_header)) -> Optional[str]:
    if api_key_header == os.getenv("API_KEY"):
        return api_key_header
    return None

async def validate_request(request: Request):
    client_ip = request.client.host
    
    # Check if IP is blocked
    if client_ip in BLOCKED_IPS:
        raise HTTPException(
            status_code=403,
            detail="Your IP has been blocked. Please contact support."
        )
    
    # Check rate limit
    if request_tracker.is_rate_limited(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later."
        )

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
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

async def call_gemini_api(messages: List[Message], temperature: float, max_tokens: int) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    # Add system prompt for Pakistani context
    system_prompt = {
        "parts": [{
            "text": """You are a knowledgeable AI assistant with deep understanding of Pakistani culture, relationships, and values. Your role is to:

1. Provide guidance based on Pakistani cultural values and traditions
2. Understand and respect family dynamics in Pakistani society
3. Consider Islamic principles when relevant to relationships
4. Be aware of cultural sensitivities and traditions
5. Offer advice that balances modern perspectives with traditional values
6. Help with relationship matters while respecting cultural boundaries
7. Share insights about Pakistani customs, celebrations, and social norms
8. Provide emotional support in a culturally appropriate way
9. Help navigate intergenerational relationships
10. Address marriage, family, and social relationships in the Pakistani context

Remember to:
- Be respectful of cultural and religious values
- Consider regional differences within Pakistan
- Acknowledge the balance between tradition and modernity
- Provide practical advice that works in Pakistani society
- Use appropriate Urdu/Hindi phrases when relevant
- Share relevant examples from Pakistani culture
- Be mindful of gender dynamics in Pakistani society

Your responses should reflect understanding of:
- Joint family systems
- Marriage customs and expectations
- Parent-child relationships
- In-law dynamics
- Community and social obligations
- Cultural celebrations and traditions
- Religious influences on relationships
- Modern challenges in Pakistani society

Always maintain a respectful, understanding, and culturally sensitive approach."""
        }]
    }
    
    # Format messages for Gemini, including system prompt
    formatted_messages = [system_prompt] + [{
        "parts": [{"text": msg.content}]
    } for msg in messages]
    
    payload = {
        "contents": formatted_messages,
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": max_tokens,
            "topP": 0.9,
            "topK": 32,
            "candidateCount": 1,
            "stopSequences": ["User:", "Human:"]
        },
        "safetySettings": [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url,
            json=payload,
            timeout=30.0
        )
        
        if response.status_code != 200:
            logger.error(f"Gemini API error: {response.text}")
            raise HTTPException(
                status_code=response.status_code,
                detail="Error generating response"
            )
            
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]

@app.post("/api/chat", response_model=ChatResponse, dependencies=[Depends(validate_request)])
async def chat(
    request: ChatRequest,
    background_tasks: BackgroundTasks,
    api_key: str = Depends(get_api_key)
):
    if not api_key and os.getenv("ENVIRONMENT") == "production":
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )

    try:
        start_time = time.time()
        
        response_text = await call_gemini_api(
            request.messages,
            request.temperature,
            request.max_tokens
        )
        
        # Calculate usage metrics
        end_time = time.time()
        processing_time = end_time - start_time
        
        usage = {
            "processing_time_ms": round(processing_time * 1000),
            "prompt_tokens": len(" ".join([m.content for m in request.messages]).split()),
            "completion_tokens": len(response_text.split()),
        }
        
        # Log request (in background)
        background_tasks.add_task(
            logger.info,
            f"Chat request processed: {usage}"
        )
        
        return ChatResponse(response=response_text, usage=usage)
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request"
        )

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "blocked_ips_count": len(BLOCKED_IPS)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )