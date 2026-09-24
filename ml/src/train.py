"""
KisanSetu - ML Model Training Pipeline
=============================================================================
CRITICAL DISCLAIMER:
This script trains a Wait-Time & Congestion Estimation Model using clearly
labelled DEMO/SAMPLE data. This is NOT a real-world predictive model.
Predictions are suitable only for architectural validation, UI integration,
and functional testing within the development environment.
=============================================================================
"""

import json
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from generate_demo_data import generate_demo_dataset


def train_model():
    base_dir = Path(__file__).resolve().parent.parent
    data_path = base_dir / "data" / "demo_historical_procurement.csv"
    models_dir = base_dir / "models"
    models_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 70)
    print("KISANSETU ML TRAINING PIPELINE [DEMO / DEVELOPMENT MODE]")
    print("=" * 70)

    # 1. Ensure demo data exists
    if not data_path.exists():
        print(f"Demo data not found at {data_path}. Generating synthetic demo dataset...")
        generate_demo_dataset(num_samples=3000, output_path=data_path)

    print(f"Loading demo dataset from: {data_path}")
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} records. Sample disclaimer: {df['disclaimer'].iloc[0]}")

    # 2. Encode slot index
    slot_map = {
        "08:00 - 10:00": 0,
        "10:00 - 12:00": 1,
        "12:00 - 14:00": 2,
        "14:00 - 16:00": 3,
        "16:00 - 18:00": 4,
    }
    df["slot_index"] = df["time_slot"].map(lambda s: slot_map.get(str(s).strip(), 1))

    # 3. Feature Selection
    feature_cols = [
        "distance_km",
        "queue_length_at_arrival",
        "weighbridges_active",
        "current_utilization_ratio",
        "quantity_kg",
        "diversion_active",
        "slot_index",
    ]
    target_col = "actual_wait_time_minutes"

    X = df[feature_cols].values
    y = df[target_col].values

    # 4. Train-Test Split (80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 5. Fit Scaler and Regressor
    print("Fitting feature scaler and training RandomForestRegressor...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestRegressor(
        n_estimators=120,
        max_depth=12,
        min_samples_split=4,
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train_scaled, y_train)

    # 6. Evaluation
    y_pred = model.predict(X_test_scaled)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    print("\n--- Model Evaluation Results on Demo Test Split ---")
    print(f"  Mean Absolute Error (MAE) : {mae:.2f} minutes")
    print(f"  Root Mean Squared Error   : {rmse:.2f} minutes")
    print(f"  R² Score                  : {r2:.4f}")
    print("--------------------------------------------------")

    # Feature importances
    importances = dict(zip(feature_cols, [round(float(v), 4) for v in model.feature_importances_]))
    print(f"Feature Importances: {importances}")

    # 7. Save Artifacts
    model_artifact_path = models_dir / "wait_time_model.pkl"
    scaler_artifact_path = models_dir / "scaler.pkl"
    metadata_path = models_dir / "model_metadata.json"

    joblib.dump(model, model_artifact_path)
    joblib.dump(scaler, scaler_artifact_path)

    metadata = {
        "is_demo_model": True,
        "disclaimer": (
            "This model was trained on synthetic/demo data for development purposes only. "
            "Predictions are simulated estimates and not certified real-world mandi forecasts."
        ),
        "model_type": "RandomForestRegressor",
        "n_estimators": 120,
        "trained_on_samples": len(X_train),
        "test_samples": len(X_test),
        "metrics": {
            "mae_minutes": round(float(mae), 2),
            "rmse_minutes": round(float(rmse), 2),
            "r2_score": round(float(r2), 4),
        },
        "feature_names": feature_cols,
        "feature_importances": importances,
    }

    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\nSaved model artifact to: {model_artifact_path}")
    print(f"Saved scaler artifact to: {scaler_artifact_path}")
    print(f"Saved metadata to: {metadata_path}")
    print("Training finished successfully.\n")

    return metadata


if __name__ == "__main__":
    train_model()
