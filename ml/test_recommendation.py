"""
KisanSetu - ML Component Test Suite
===================================
Runs end-to-end tests across the data generator, training pipeline,
feature engineering, and smart recommendation engine.
"""

import sys
from pathlib import Path

# Add ml and ml/src to path
base_dir = Path(__file__).resolve().parent
src_dir = base_dir / "src"
sys.path.insert(0, str(base_dir))
sys.path.insert(0, str(src_dir))

from generate_demo_data import generate_demo_dataset
from train import train_model
from recommender import SmartCentreRecommender


def run_tests():
    print("=" * 70)
    print("RUNNING KISANSETU ML COMPONENT TEST SUITE")
    print("=" * 70)

    # 1. Test Demo Data Generation
    print("\n[TEST 1] Generating Demo Dataset...")
    data_path = generate_demo_dataset(num_samples=1500)
    assert data_path.exists(), "Demo dataset file was not created!"
    print(f"PASS: Demo dataset created at {data_path}")

    # 2. Test Model Training
    print("\n[TEST 2] Training Wait-Time Model on Demo Data...")
    metadata = train_model()
    assert metadata["is_demo_model"] is True
    assert metadata["metrics"]["r2_score"] > 0.60, "R2 score lower than expected!"
    print(f"PASS: Model trained successfully with R2 = {metadata['metrics']['r2_score']}")

    # 3. Test Recommender Initialization & Model Loading
    print("\n[TEST 3] Loading Recommender Engine...")
    recommender = SmartCentreRecommender()
    assert recommender.model is not None, "Model failed to load!"
    assert recommender.scaler is not None, "Scaler failed to load!"
    print("PASS: Recommender loaded trained model and scaler.")

    # 4. Test Scenario A: Farmer in Kalyani, Nadia selling Potato (500 kg)
    print("\n[TEST 4] Scenario A: Farmer in Kalyani selling 500 kg Potato...")
    res_a = recommender.recommend(
        crop="Potato",
        quantity_kg=500.0,
        farmer_village="Kalyani, Nadia",
        preferred_time_slot="10:00 - 12:00",
    )
    assert res_a["status"] == "success"
    best_a = res_a["recommended_centre"]
    print(f"  Recommended: {best_a['centre_name']} (ID: {best_a['centre_id']})")
    print(f"  Score: {best_a['score']} | Distance: {best_a['distance_km']} km | Est. Wait: {best_a['predicted_wait_time_minutes']} mins")
    print(f"  Explanation: {best_a['explanation']}")
    assert best_a["centre_id"] == "C-05", f"Expected Centre E (Kalyani) to win for Kalyani farmer! Got {best_a['centre_id']}"
    print("PASS: Scenario A correctly recommended closest compatible centre with available headroom.")

    # 5. Test Scenario B: Farmer in Burdwan Central selling 1200 kg Wheat
    print("\n[TEST 5] Scenario B: Farmer in Burdwan selling 1200 kg Wheat...")
    res_b = recommender.recommend(
        crop="Wheat",
        quantity_kg=1200.0,
        farmer_village="Burdwan Central",
        preferred_time_slot="10:00 - 12:00",
    )
    best_b = res_b["recommended_centre"]
    print(f"  Recommended: {best_b['centre_name']} (ID: {best_b['centre_id']})")
    print(f"  Score: {best_b['score']} | Distance: {best_b['distance_km']} km | Est. Wait: {best_b['predicted_wait_time_minutes']} mins")
    print(f"  Explanation: {best_b['explanation']}")
    assert best_b["centre_id"] == "C-01", f"Expected Centre A (Burdwan) for Burdwan wheat! Got {best_b['centre_id']}"
    print("PASS: Scenario B correctly recommended Burdwan Mandi.")

    # 6. Test Scenario C: Crop Incompatibility Handling
    print("\n[TEST 6] Scenario C: Crop Incompatibility Penalty...")
    res_c = recommender.recommend(
        crop="Wheat",
        quantity_kg=500.0,
        farmer_village="Singur, Hooghly",
    )
    # Centre B (Singur) does NOT support Wheat (only Potato, Mustard, Paddy)
    singur_centre = next((c for c in res_c["ranked_centres"] if c["centre_id"] == "C-02"), None)
    if singur_centre:
        assert singur_centre["score"] == 0.0, "Incompatible crop centre should have score 0!"
        print(f"PASS: Incompatible centre {singur_centre['centre_name']} correctly received score 0.0 ({singur_centre['explanation']})")

    # 7. Test Scenario D: Traffic Diversion & Congestion Penalty
    print("\n[TEST 7] Scenario D: Traffic Diversion & Overcapacity Handling...")
    res_d = recommender.recommend(
        crop="Paddy",
        quantity_kg=800.0,
        farmer_village="Guskara, Purba",
    )
    # Centre F (Guskara) is at 98% utilization and diversion is active
    guskara_centre = next((c for c in res_d["ranked_centres"] if c["centre_id"] == "C-06"), None)
    if guskara_centre:
        print(f"  Centre F Score: {guskara_centre['score']} | Diversion: {guskara_centre['diversion_enabled']} | Explanation: {guskara_centre['explanation']}")
        assert "Advisory: Diverted" in guskara_centre["tags"], "Expected diverted tag on Centre F"
    print("PASS: Diversion policy applied correctly.")

    print("\n" + "=" * 70)
    print("ALL 7 TESTS PASSED SUCCESSFULLY!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
