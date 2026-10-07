"""
FLOATX — Agentic Ocean Intelligence Platform
FastAPI API Routes
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from backend.agents.orchestrator import orchestrator
from backend.data.argo_engine import argo_engine

router = APIRouter(prefix="/api")

class QueryRequest(BaseModel):
    query: str
    history: Optional[List[Dict[str, Any]]] = None

@router.post("/query")
async def execute_natural_language_query(req: QueryRequest):
    """
    Executes natural language query through the multi-agent pipeline.
    """
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query text cannot be empty.")

    try:
        response = orchestrator.process_natural_language_query(req.query, req.history)
        return response
    except Exception as e:
        print(f"[API Error] Query failure: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process ocean query: {str(e)}")

@router.get("/floats")
async def get_floats(region: Optional[str] = None):
    """
    Retrieves ARGO float metadata.
    """
    floats = argo_engine.get_all_floats(region=region)
    return {"count": len(floats), "floats": floats}

@router.get("/floats/{float_id}")
async def get_float_detail(float_id: str):
    """
    Retrieves detailed vertical profile for a single float.
    """
    float_data = argo_engine.get_float_by_id(float_id)
    if not float_data:
        raise HTTPException(status_code=404, detail=f"Float {float_id} not found.")
    return float_data

@router.get("/observations")
async def get_observations(
    region: Optional[str] = None,
    variable: str = "temperature",
    start_year: int = 2020,
    end_year: int = 2026,
    min_depth: float = 0,
    max_depth: float = 2000,
    limit: int = 500
):
    """
    Raw observation data API.
    """
    res = argo_engine.query_observations(
        region=region,
        variable=variable,
        start_year=start_year,
        end_year=end_year,
        min_depth=min_depth,
        max_depth=max_depth,
        limit=limit
    )
    return res

@router.get("/health")
async def health_check():
    return {
        "status": "HEALTHY",
        "service": "FLOATX Ocean Intelligence Platform Backend",
        "argo_floats_loaded": len(argo_engine.floats_df),
        "observations_loaded": len(argo_engine.observations_df)
    }
