"""
KisanSetu - Smart Procurement Centre Recommendation Service
============================================================
FastAPI Microservice providing ML-powered procurement centre recommendations
for the farmer portal.

Run with:
    python service.py
or:
    uvicorn service:app --host 127.0.0.1 --port 8000 --reload
"""

from __future__ import annotations
import sys
from pathlib import Path
from typing import Dict, List, Optional

# Add ml/src to sys.path so modules resolve cleanly
src_dir = Path(__file__).resolve().parent / "src"
if str(src_dir) not in sys.path:
    sys.path.insert(0, str(src_dir))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from centres_store import ProcurementCentre, centre_store
from recommender import SmartCentreRecommender, recommender


app = FastAPI(
    title="KisanSetu Smart Centre Recommendation API",
    version="1.0.0",
    description=(
        "Smart Procurement Centre Recommendation Microservice for KisanSetu. "
        "Provides ML-driven queue wait-time estimation and multi-criteria centre ranking. "
        "NOTICE: Uses clearly labelled DEMO/SAMPLE data for development and testing."
    ),
)

# Enable CORS for local Next.js frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CoordinatesInput(BaseModel):
    lat: float
    lon: float


class RecommendationRequest(BaseModel):
    crop: str = Field(..., example="Potato", description="Crop name (e.g. Potato, Paddy, Wheat, Mustard)")
    quantity_kg: float = Field(..., gt=0, example=500.0, description="Lot quantity in kilograms")
    farmer_village: Optional[str] = Field(None, example="Kalyani, Nadia", description="Village or block name")
    farmer_coords: Optional[CoordinatesInput] = Field(None, description="Direct GPS coordinates")
    preferred_time_slot: Optional[str] = Field("10:00 - 12:00", example="10:00 - 12:00", description="Intended arrival slot")
    top_n: Optional[int] = Field(5, ge=1, le=10, description="Number of ranked centres to return")


class CentreStateUpdate(BaseModel):
    current_intake_mt: Optional[float] = None
    current_queue_count: Optional[int] = None
    diversion_enabled: Optional[bool] = None


@app.get("/")
def root():
    return {
        "service": "KisanSetu Smart Centre Recommendation Service",
        "version": "1.0.0",
        "mode": "DEMO / DEVELOPMENT",
        "disclaimer": "Predictions and data are synthetic for development and testing purposes only.",
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "centres": "/centres",
            "recommend": "POST /recommend",
        },
    }


@app.get("/health")
def health_check():
    model_loaded = recommender.model is not None
    return {
        "status": "healthy",
        "ml_model_loaded": model_loaded,
        "is_demo_model": True,
        "model_metadata": recommender.metadata,
        "total_centres_registered": len(centre_store.get_all()),
        "disclaimer": "This service is running in DEMO mode using simulated data.",
    }


@app.get("/centres", response_model=List[ProcurementCentre])
def get_all_centres():
    """Returns all registered procurement centres with live capacity & queue metrics."""
    return centre_store.get_all()


@app.post("/recommend")
def get_recommendation(payload: RecommendationRequest):
    """
    Computes smart centre recommendation for a farmer based on crop, quantity,
    geographic distance, predicted wait time, and available capacity.
    """
    try:
        coords_dict = payload.farmer_coords.dict() if payload.farmer_coords else None
        result = recommender.recommend(
            crop=payload.crop,
            quantity_kg=payload.quantity_kg,
            farmer_village=payload.farmer_village,
            farmer_coords=coords_dict,
            preferred_time_slot=payload.preferred_time_slot or "10:00 - 12:00",
            top_n=payload.top_n or 5,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation error: {str(e)}")


@app.patch("/centres/{centre_id}/status")
def update_centre_status(centre_id: str, payload: CentreStateUpdate):
    """Development helper to update live centre conditions and test recommendation dynamics."""
    updated = centre_store.update_live_state(
        centre_id=centre_id,
        current_intake_mt=payload.current_intake_mt,
        current_queue_count=payload.current_queue_count,
        diversion_enabled=payload.diversion_enabled,
    )
    if not updated:
        raise HTTPException(status_code=404, detail=f"Centre {centre_id} not found")
    return {"status": "success", "centre": updated}


if __name__ == "__main__":
    import uvicorn
    print("Starting KisanSetu Smart Centre Recommendation Service on http://127.0.0.1:8000 ...")
    uvicorn.run("service:app", host="127.0.0.1", port=8000, reload=True)
