"""
KisanSetu - Smart Procurement Centre Recommendation Engine
============================================================
Combines ML-driven dynamic wait-time estimation with Multi-Criteria
Decision Analysis (MCDA) to rank procurement centres for farmers.

Considers:
1. Geodesic distance (transportation burden on farmer)
2. ML-predicted queue wait time & turnaround
3. Available capacity margin & current utilization
4. Crop handling compatibility & specialized facilities
5. Live admin traffic diversion policies
"""

from __future__ import annotations
import json
from pathlib import Path
from typing import Any, Dict, List, Optional
import joblib
import numpy as np

from centres_store import ProcurementCentre, centre_store
from features import FeatureEngineer, feature_engineer


class SmartCentreRecommender:
    """Intelligent recommendation engine for APMC procurement centres."""

    def __init__(self, models_dir: Optional[Path] = None):
        if models_dir is None:
            models_dir = Path(__file__).resolve().parent.parent / "models"
        self.models_dir = models_dir
        self.model = None
        self.scaler = None
        self.metadata = {}
        self.load_model()

    def load_model(self) -> bool:
        """Loads trained model artifacts or falls back to analytical heuristics."""
        model_path = self.models_dir / "wait_time_model.pkl"
        scaler_path = self.models_dir / "scaler.pkl"
        metadata_path = self.models_dir / "model_metadata.json"

        if model_path.exists() and scaler_path.exists():
            try:
                self.model = joblib.load(model_path)
                self.scaler = joblib.load(scaler_path)
                if metadata_path.exists():
                    with open(metadata_path, "r", encoding="utf-8") as f:
                        self.metadata = json.load(f)
                return True
            except Exception as e:
                print(f"Warning: Failed loading ML model ({e}). Using analytical fallback.")
                self.model = None
                self.scaler = None
                return False
        return False

    def predict_wait_time(self, feat_dict: Dict[str, Any]) -> float:
        """Predicts waiting time in minutes using ML model or analytical physics."""
        if self.model is not None and self.scaler is not None:
            try:
                vec = feature_engineer.to_ml_vector(feat_dict)
                vec_scaled = self.scaler.transform(vec)
                pred = float(self.model.predict(vec_scaled)[0])
                return max(5.0, round(pred, 1))
            except Exception:
                pass

        # Analytical fallback if ML model is not available
        wb = max(1, feat_dict["weighbridges"])
        q_count = feat_dict["queue_count"]
        rate = 7.0 / wb
        wait = (q_count * rate) + (feat_dict["quantity_mt"] * 6.5)
        if feat_dict["utilization_ratio"] > 0.85:
            wait += 15.0
        if feat_dict["diversion_active"]:
            wait += 20.0
        return max(5.0, round(wait, 1))

    def recommend(
        self,
        crop: str,
        quantity_kg: float,
        farmer_village: Optional[str] = None,
        farmer_coords: Optional[Dict[str, float]] = None,
        preferred_time_slot: str = "10:00 - 12:00",
        top_n: int = 5,
    ) -> Dict[str, Any]:
        """
        Evaluates all available procurement centres and returns ranked recommendations.
        """
        # 1. Resolve farmer coordinates
        f_lat, f_lon = feature_engineer.resolve_farmer_coordinates(
            village_name=farmer_village, coords=farmer_coords
        )

        all_centres: List[ProcurementCentre] = centre_store.get_all()
        scored_candidates = []

        for centre in all_centres:
            is_crop_supported = centre.is_crop_supported(crop)
            c_lat = centre.coordinates.lat
            c_lon = centre.coordinates.lon

            # Extract standardized features
            feat = feature_engineer.extract_features(
                farmer_coords=(f_lat, f_lon),
                centre_coords=(c_lat, c_lon),
                centre_capacity_mt=centre.capacity_mt,
                centre_current_intake_mt=centre.current_intake_mt,
                centre_weighbridges=centre.weighbridges,
                centre_queue_count=centre.current_queue_count,
                diversion_enabled=centre.diversion_enabled,
                crop_supported=is_crop_supported,
                quantity_kg=quantity_kg,
                time_slot=preferred_time_slot,
            )

            # ML-predicted wait time
            pred_wait_mins = self.predict_wait_time(feat)

            # Scoring factors (0 to 100)
            # Factor 1: Distance (Weight: 35%)
            # Optimal under 10km (80-100), drops at ~45km to 10
            dist_km = feat["distance_km"]
            score_distance = max(0.0, min(100.0, 100.0 - (dist_km * 2.0)))

            # Factor 2: Predicted Wait Time & Congestion (Weight: 30%)
            # < 15 mins -> 90-100, 60 mins -> ~30
            score_wait = max(0.0, min(100.0, 100.0 - (pred_wait_mins * 1.25)))

            # Factor 3: Capacity Margin (Weight: 25%)
            # High headroom -> 100, nearing full -> 10-20
            score_capacity = max(0.0, min(100.0, (1.0 - feat["utilization_ratio"]) * 100.0))

            # Factor 4: Facility & Handling Bonus (Weight: 10%)
            score_facility = 50.0
            if "Cold Storage" in centre.facilities and "potato" in crop.lower():
                score_facility += 40.0
            if "Automated Moisture Meter" in centre.facilities:
                score_facility += 10.0
            score_facility = min(100.0, score_facility)

            # Weighted Base Score
            composite_score = (
                (score_distance * 0.35)
                + (score_wait * 0.30)
                + (score_capacity * 0.25)
                + (score_facility * 0.10)
            )

            # Policy Adjustments & Penalties
            reasons = []
            tags = []

            if not is_crop_supported:
                composite_score = 0.0
                reasons.append(f"Centre does not accept {crop}.")
                tags.append("Crop Incompatible")
            else:
                tags.append(f"Accepts {crop}")

            if not feat["fits_capacity"]:
                composite_score *= 0.2
                reasons.append(
                    f"Requested {quantity_kg} kg exceeds remaining quota ({centre.available_capacity_mt:.1f} MT)."
                )
                tags.append("Capacity Constrained")

            if centre.diversion_enabled:
                composite_score = max(0.0, composite_score - 35.0)
                reasons.append("Traffic diversion advisory active to alleviate mandi congestion.")
                tags.append("Advisory: Diverted")

            # Positive highlighting reasons
            if dist_km <= 15.0:
                reasons.append(f"Proximity advantage: only {dist_km:.1f} km away.")
                tags.append("Nearby Centre")
            if pred_wait_mins <= 20.0 and is_crop_supported:
                reasons.append(f"Short estimated wait: ~{int(pred_wait_mins)} mins.")
                tags.append("Fast Processing")
            if centre.utilization_ratio < 0.50 and is_crop_supported:
                reasons.append(f"Abundant capacity: {centre.available_capacity_mt:.1f} MT free.")
                tags.append("High Headroom")

            explanation_text = " · ".join(reasons) if reasons else "Standard operational depot."

            candidate_result = {
                "centre_id": centre.id,
                "centre_name": centre.name,
                "district": centre.district,
                "supervisor": centre.supervisor,
                "coordinates": {"lat": c_lat, "lon": c_lon},
                "score": round(composite_score, 1),
                "distance_km": dist_km,
                "predicted_wait_time_minutes": pred_wait_mins,
                "available_capacity_mt": round(centre.available_capacity_mt, 1),
                "total_capacity_mt": centre.capacity_mt,
                "current_utilization_pct": round(centre.utilization_ratio * 100, 1),
                "current_queue_count": centre.current_queue_count,
                "weighbridges": centre.weighbridges,
                "operating_hours": centre.operating_hours,
                "is_crop_supported": is_crop_supported,
                "diversion_enabled": centre.diversion_enabled,
                "tags": tags,
                "explanation": explanation_text,
            }
            scored_candidates.append(candidate_result)

        # 2. Sort descending by score
        scored_candidates.sort(key=lambda x: x["score"], reverse=True)

        # Assign ranks
        for idx, item in enumerate(scored_candidates):
            item["rank"] = idx + 1
            item["is_recommended"] = (idx == 0 and item["score"] > 0)

        best_choice = scored_candidates[0] if scored_candidates else None

        return {
            "status": "success",
            "is_demo_data": True,
            "disclaimer": (
                "DEMO NOTICE: Recommendations and wait-time predictions are calculated using "
                "sample models and demo data for development/testing. Not real-world APMC advisories."
            ),
            "input_summary": {
                "crop": crop,
                "quantity_kg": quantity_kg,
                "resolved_farmer_location": {
                    "village": farmer_village or "Resolved by coordinates",
                    "lat": f_lat,
                    "lon": f_lon,
                },
                "preferred_time_slot": preferred_time_slot,
            },
            "recommended_centre": best_choice,
            "ranked_centres": scored_candidates[:top_n],
        }


# Global recommender instance
recommender = SmartCentreRecommender()
