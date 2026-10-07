"""
FLOATX — Agentic Ocean Intelligence Platform
FastAPI Application Entry Point
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.routes import router as api_router

app = FastAPI(
    title="FLOATX — Agentic Ocean Intelligence Platform",
    description="Conversational AI platform for ARGO oceanographic data discovery, visualization, and scientific analysis.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
async def root():
    return {
        "title": "FLOATX Agentic Ocean Intelligence Platform",
        "system": "Smart India Hackathon — SIH25040 (Ministry of Earth Sciences)",
        "status": "OPERATIONAL",
        "docs": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
