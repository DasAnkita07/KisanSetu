"""
KisanSetu - Demo / Sample Data Generator
=============================================================================
CRITICAL NOTICE - DEMO DATA ONLY:
This script generates purely synthetic / simulated procurement logs and
queue metrics for development, algorithmic verification, and testing purposes.
This is NOT real-world government APMC/mandi historical procurement data.
Models trained on this dataset produce DEMO predictions that must NOT be
used for real agricultural logistics without calibration against real data.
=============================================================================
"""

import csv
import json
import math
import random
from pathlib import Path


def generate_demo_dataset(num_samples: int = 2500, output_path: Path = None) -> Path:
    if output_path is None:
        output_path = Path(__file__).resolve().parent.parent / "data" / "demo_historical_procurement.csv"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    centres_file = Path(__file__).resolve().parent.parent / "data" / "centres_metadata.json"
    with open(centres_file, "r", encoding="utf-8") as f:
        centres = json.load(f)

    crops = ["Potato", "Paddy", "Wheat", "Mustard", "Maize"]
    time_slots = [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "12:00 - 14:00",
        "14:00 - 16:00",
        "16:00 - 18:00",
    ]
    slot_traffic_multiplier = {
        "08:00 - 10:00": 1.1,
        "10:00 - 12:00": 1.5,  # Peak morning mandi rush
        "12:00 - 14:00": 1.0,
        "14:00 - 16:00": 0.8,
        "16:00 - 18:00": 0.6,
    }

    random.seed(42)

    fields = [
        "is_demo_data",
        "record_id",
        "centre_id",
        "centre_name",
        "distance_km",
        "crop_type",
        "quantity_kg",
        "time_slot",
        "weighbridges_active",
        "centre_capacity_mt",
        "current_utilization_ratio",
        "queue_length_at_arrival",
        "diversion_active",
        "crop_compatible",
        "actual_wait_time_minutes",  # Ground truth target to learn
        "disclaimer",
    ]

    records = []
    for i in range(num_samples):
        centre = random.choice(centres)
        crop = random.choice(crops)
        time_slot = random.choice(time_slots)

        # Distance between 2 km and 45 km
        distance_km = round(random.uniform(2.0, 45.0), 1)

        # Quantity in kg (200 kg to 3500 kg typical farmer vehicle load)
        quantity_kg = round(random.uniform(200, 3500), -1)

        weighbridges = centre["weighbridges"]
        capacity_mt = centre["capacity_mt"]

        # Utilization level
        utilization = round(random.uniform(0.15, 0.98), 2)

        # Queue length depends on time of day and center capacity
        base_queue = int(random.uniform(1, 8) * slot_traffic_multiplier[time_slot])
        if utilization > 0.85:
            base_queue += random.randint(4, 10)
        queue_len = max(0, base_queue)

        diversion = 1 if (utilization > 0.90 or centre["id"] == "C-06") else 0
        crop_compat = 1 if crop in centre["supported_crops"] else 0

        # Wait time physics simulation:
        # Base wait: ~5-8 mins per vehicle ahead divided by active weighbridges
        # + extra unload time proportional to quantity
        # + surge penalty if centre is near full capacity (>85%)
        throughput_rate = 7.0 / max(1, weighbridges)
        queue_wait = queue_len * throughput_rate
        unload_time = (quantity_kg / 1000.0) * centre["avg_processing_mins_per_ton"]
        congestion_penalty = 15.0 if utilization > 0.85 else 0.0
        diversion_delay = 20.0 if diversion else 0.0

        noise = random.gauss(0, 3.0)
        actual_wait = max(5.0, round(queue_wait + unload_time + congestion_penalty + diversion_delay + noise, 1))

        records.append({
            "is_demo_data": "TRUE",
            "record_id": f"DEMO-{i+1:05d}",
            "centre_id": centre["id"],
            "centre_name": centre["name"],
            "distance_km": distance_km,
            "crop_type": crop,
            "quantity_kg": quantity_kg,
            "time_slot": time_slot,
            "weighbridges_active": weighbridges,
            "centre_capacity_mt": capacity_mt,
            "current_utilization_ratio": utilization,
            "queue_length_at_arrival": queue_len,
            "diversion_active": diversion,
            "crop_compatible": crop_compat,
            "actual_wait_time_minutes": actual_wait,
            "disclaimer": "SYNTHETIC DEMO LOG FOR DEVELOPMENT/TESTING ONLY",
        })

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(records)

    print(f"Generated {len(records)} DEMO procurement records at: {output_path}")
    return output_path


if __name__ == "__main__":
    generate_demo_dataset()
