"""
KisanSetu - Feature Preparation & Engineering
==============================================
Calculates spatial distances, queue congestion ratios, capacity margins,
and vectors for the ML wait-time prediction model and recommendation engine.
"""

from __future__ import annotations
import json
import math
from pathlib import Path
from typing import Dict, Optional, Tuple, Any
import numpy as np


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance in kilometers between two points
    on the Earth using the Haversine formula.
    """
    R = 6371.0  # Earth's radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2.0) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2.0) ** 2
    )
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(R * c, 2)


class FeatureEngineer:
    """Prepares and transforms features for recommendation scoring and ML inference."""

    def __init__(self, villages_path: Optional[Path] = None):
        if villages_path is None:
            villages_path = Path(__file__).resolve().parent.parent / "data" / "villages_reference.json"
        self.villages_path = villages_path
        self._village_coords: Dict[str, Tuple[float, float]] = {}
        self._load_villages()

    def _load_villages(self) -> None:
        if self.villages_path.exists():
            with open(self.villages_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for name, info in data.items():
                    coords = info.get("coordinates", {})
                    self._village_coords[name.lower()] = (coords.get("lat", 0.0), coords.get("lon", 0.0))

    def resolve_farmer_coordinates(
        self,
        village_name: Optional[str] = None,
        coords: Optional[Dict[str, float]] = None,
    ) -> Tuple[float, float]:
        """
        Resolves farmer coordinates from explicit lat/lon dict or village name lookup.
        Defaults to central Burdwan if unknown.
        """
        if coords and "lat" in coords and "lon" in coords:
            return float(coords["lat"]), float(coords["lon"])
        if village_name:
            v_clean = village_name.lower().strip()
            # Exact match
            if v_clean in self._village_coords:
                return self._village_coords[v_clean]
            # Partial match
            for v_name, (v_lat, v_lon) in self._village_coords.items():
                if any(part in v_clean for part in v_name.split(",")):
                    return v_lat, v_lon
        # Fallback coordinate (Burdwan region default)
        return 23.2324, 87.8615

    def extract_features(
        self,
        farmer_coords: Tuple[float, float],
        centre_coords: Tuple[float, float],
        centre_capacity_mt: float,
        centre_current_intake_mt: float,
        centre_weighbridges: int,
        centre_queue_count: int,
        diversion_enabled: bool,
        crop_supported: bool,
        quantity_kg: float,
        time_slot: str = "10:00 - 12:00",
    ) -> Dict[str, Any]:
        """
        Constructs standardized feature dictionary for a single candidate centre.
        """
        dist_km = haversine_distance(
            farmer_coords[0], farmer_coords[1], centre_coords[0], centre_coords[1]
        )
        available_cap = max(0.0, centre_capacity_mt - centre_current_intake_mt)
        utilization_ratio = min(1.0, centre_current_intake_mt / max(1.0, centre_capacity_mt))
        quantity_mt = quantity_kg / 1000.0

        # Capacity fit
        fits_capacity = available_cap >= quantity_mt
        remaining_after_batch = max(0.0, available_cap - quantity_mt)

        # Queue load per weighbridge
        queue_per_wb = centre_queue_count / max(1, centre_weighbridges)

        # Slot index (0 to 4)
        slot_order = {
            "08:00 - 10:00": 0,
            "10:00 - 12:00": 1,
            "12:00 - 14:00": 2,
            "14:00 - 16:00": 3,
            "16:00 - 18:00": 4,
        }
        slot_idx = slot_order.get(time_slot, 1)

        return {
            "distance_km": dist_km,
            "available_capacity_mt": available_cap,
            "utilization_ratio": round(utilization_ratio, 3),
            "quantity_mt": quantity_mt,
            "fits_capacity": fits_capacity,
            "remaining_after_batch": remaining_after_batch,
            "weighbridges": centre_weighbridges,
            "queue_count": centre_queue_count,
            "queue_per_weighbridge": round(queue_per_wb, 2),
            "diversion_active": 1 if diversion_enabled else 0,
            "crop_supported": 1 if crop_supported else 0,
            "slot_index": slot_idx,
        }

    def to_ml_vector(self, feat: Dict[str, Any]) -> np.ndarray:
        """
        Converts feature dictionary to numerical array for ML model prediction:
        [distance_km, queue_count, weighbridges, utilization_ratio, quantity_kg, diversion_active, slot_index]
        """
        return np.array([
            feat["distance_km"],
            feat["queue_count"],
            feat["weighbridges"],
            feat["utilization_ratio"],
            feat["quantity_mt"] * 1000.0,
            feat["diversion_active"],
            feat["slot_index"],
        ], dtype=np.float32).reshape(1, -1)


# Global feature engineer instance
feature_engineer = FeatureEngineer()
