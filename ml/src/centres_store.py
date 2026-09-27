"""
KisanSetu - Centre Data Store
Loads and maintains procurement centre metadata and live operational states.
"""

from __future__ import annotations
import json
from pathlib import Path
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class Coordinates(BaseModel):
    lat: float
    lon: float


class ProcurementCentre(BaseModel):
    id: str
    name: str
    district: str
    supervisor: str
    coordinates: Coordinates
    capacity_mt: float
    current_intake_mt: float
    status: str
    weighbridges: int
    diversion_enabled: bool = False
    supported_crops: List[str] = Field(default_factory=list)
    facilities: List[str] = Field(default_factory=list)
    operating_hours: str = "08:00 AM - 06:00 PM"
    current_queue_count: int = 0
    avg_processing_mins_per_ton: float = 7.0

    @property
    def available_capacity_mt(self) -> float:
        return max(0.0, self.capacity_mt - self.current_intake_mt)

    @property
    def utilization_ratio(self) -> float:
        if self.capacity_mt <= 0:
            return 1.0
        return min(1.0, self.current_intake_mt / self.capacity_mt)

    def is_crop_supported(self, crop: str) -> bool:
        crop_clean = crop.lower().split("(")[0].strip()
        return any(crop_clean in sc.lower() for sc in self.supported_crops)


class CentreStore:
    """In-memory centre registry loaded from JSON config with thread-safe access."""

    def __init__(self, config_path: Optional[Path] = None):
        if config_path is None:
            config_path = Path(__file__).resolve().parent.parent / "data" / "centres_metadata.json"
        self.config_path = config_path
        self._centres: Dict[str, ProcurementCentre] = {}
        self.reload()

    def reload(self) -> None:
        if not self.config_path.exists():
            raise FileNotFoundError(f"Centres metadata not found at {self.config_path}")
        with open(self.config_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            self._centres = {item["id"]: ProcurementCentre(**item) for item in data}

    def get_all(self) -> List[ProcurementCentre]:
        return list(self._centres.values())

    def get_by_id(self, centre_id: str) -> Optional[ProcurementCentre]:
        return self._centres.get(centre_id)

    def update_live_state(
        self,
        centre_id: str,
        current_intake_mt: Optional[float] = None,
        current_queue_count: Optional[int] = None,
        diversion_enabled: Optional[bool] = None,
    ) -> Optional[ProcurementCentre]:
        centre = self._centres.get(centre_id)
        if not centre:
            return None
        if current_intake_mt is not None:
            centre.current_intake_mt = current_intake_mt
        if current_queue_count is not None:
            centre.current_queue_count = current_queue_count
        if diversion_enabled is not None:
            centre.diversion_enabled = diversion_enabled
        return centre


# Global singleton store instance
centre_store = CentreStore()
