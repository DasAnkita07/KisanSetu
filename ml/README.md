# KisanSetu - Smart Procurement Centre Recommendation (ML Engine)

Welcome to the **Smart Procurement Centre Recommendation** component of **KisanSetu**.

This subproject is completely self-contained within the `ml/` folder to ensure zero coupling or modification to the existing Next.js frontend during development.

---

## ⚠️ CRITICAL NOTICE: REAL VS. DEMO DATA

| Component | Status | Description |
|---|---|---|
| **Procurement Centres Metadata** | **Aligned with Project Specs** | Centre names, IDs (`C-01` to `C-06`), supervisor names, daily capacities (40–100 MT), and weighbridge counts strictly align with the existing KisanSetu admin dashboard. Realistic West Bengal coordinates (Burdwan, Singur, Memari, Ranaghat, Kalyani, Guskara) are mapped to enable true geographic distance calculation. |
| **Historical Intake & Queue Dataset** | **DEMO / SYNTHETIC ONLY** | No real-world government APMC mandi intake database was attached to the project repository. Therefore, a synthetic dataset (`demo_historical_procurement.csv`) is generated to train the wait-time model and validate recommendation mechanics. |
| **Model Predictions** | **DEMO PREDICTIONS** | All wait times and suitability scores produced in development mode are **demonstration estimates**. They must **NOT** be treated as real-world certified government mandi advisories. |

---

## 📁 Project Architecture & File Directory

```text
ml/
├── data/
│   ├── centres_metadata.json          # 6 Procurement centres with WB coordinates, capacities & facilities
│   ├── villages_reference.json        # Village-to-coordinate lookup table for farmer locations
│   └── demo_historical_procurement.csv# Synthetic historical queue logs for training
├── models/
│   ├── wait_time_model.pkl            # Trained RandomForest wait-time regression model
│   ├── scaler.pkl                     # StandardScaler feature normalizer
│   └── model_metadata.json            # Model parameters, evaluation metrics, and feature importances
├── src/
│   ├── __init__.py                    # Python package initializer
│   ├── centres_store.py               # Centre data store and live state manager
│   ├── generate_demo_data.py          # Generator for labelled synthetic training data
│   ├── features.py                    # Haversine distance, utilization ratio, and feature vectors
│   ├── train.py                       # ML model training and artifact export pipeline
│   └── recommender.py                 # Multi-Criteria Decision Recommendation Algorithm (ML + Rules)
├── service.py                         # Standalone FastAPI recommendation service (REST API)
├── test_recommendation.py             # End-to-end automated test suite
├── requirements.txt                   # ML dependencies
└── README.md                          # Comprehensive documentation
```

---

## 🧠 How the Recommendation Engine Works

The engine uses a **Hybrid Architecture** combining:
1. **Machine Learning Model (RandomForestRegressor):** Predicts the expected waiting time in minutes based on active queue length, number of weighbridges, batch quantity, arrival time slot, and utilization ratio.
2. **Multi-Criteria Decision Analysis (MCDA):** Evaluates all eligible candidate centres on a 0–100 normalized composite scale across five key factors:

### Factor Breakdown:
1. **Geographic Proximity (Weight: 35%):**
   - Uses the **Haversine formula** to measure real-world distance between the farmer's village and the depot.
   - Closer depots minimize transportation cost and travel stress for the farmer.
2. **Predicted Wait Time & Turnaround (Weight: 30%):**
   - Predicted using the ML regressor.
   - Depots with shorter queues and more active weighbridges score higher.
3. **Available Capacity Margin (Weight: 25%):**
   - Favors centres with healthy headroom (e.g., 20–50 MT remaining).
   - Depresses scores for centres nearing maximum capacity (>85% utilization).
4. **Specialized Facility Bonus (Weight: 10%):**
   - Grants bonus points if a depot has specialized equipment matching the crop (e.g. Cold Storage for Potato, Automated Moisture Meter for grains).
5. **Policy & Constraint Penalties:**
   - **Crop Incompatibility:** If a centre does not accept the farmer's crop, score is set to **0** and flagged as `Crop Incompatible`.
   - **Capacity Exceeded:** If the requested lot exceeds available capacity, a severe penalty is applied.
   - **Traffic Diversion Flag:** If the admin has enabled `diversion_enabled = true` on a centre, a -35 point penalty is applied and tagged `Advisory: Diverted`.

---

## 🚀 Setup and Usage Instructions

### 1. Install Dependencies

From the project root or inside `ml/`:
```bash
pip install -r ml/requirements.txt
```

### 2. Generate Demo Training Data & Train the Model

Run the training pipeline:
```bash
python ml/src/train.py
```
This will:
- Generate `demo_historical_procurement.csv` (if not already present).
- Train a `RandomForestRegressor` with 80/20 train/test split.
- Print evaluation metrics (MAE, RMSE, $R^2$ score).
- Save `wait_time_model.pkl`, `scaler.pkl`, and `model_metadata.json` into `ml/models/`.

### 3. Run Automated Tests

To verify data generation, model training, feature extraction, and multiple farmer scenarios:
```bash
python ml/test_recommendation.py
```

### 4. Start the Standalone Recommendation Microservice

Run the FastAPI service:
```bash
python ml/service.py
```
Or with Uvicorn:
```bash
uvicorn ml.service:app --host 127.0.0.1 --port 8000 --reload
```

Once running:
- **Interactive Swagger Documentation:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check:** `GET http://127.0.0.1:8000/health`
- **List Centres:** `GET http://127.0.0.1:8000/centres`
- **Get Recommendations:** `POST http://127.0.0.1:8000/recommend`

---

## 📡 Sample API Request & Response

### Request (`POST /recommend`):
```json
{
  "crop": "Potato",
  "quantity_kg": 500.0,
  "farmer_village": "Kalyani, Nadia",
  "preferred_time_slot": "10:00 - 12:00",
  "top_n": 3
}
```

### Response:
```json
{
  "status": "success",
  "is_demo_data": true,
  "disclaimer": "DEMO NOTICE: Recommendations and wait-time predictions are calculated using sample models and demo data for development/testing. Not real-world APMC advisories.",
  "recommended_centre": {
    "centre_id": "C-05",
    "centre_name": "Centre E - Kalyani Storage & Hub",
    "district": "Nadia",
    "score": 93.4,
    "distance_km": 0.0,
    "predicted_wait_time_minutes": 11.2,
    "available_capacity_mt": 38.0,
    "total_capacity_mt": 50.0,
    "current_utilization_pct": 24.0,
    "current_queue_count": 2,
    "weighbridges": 2,
    "tags": ["Accepts Potato", "Nearby Centre", "Fast Processing", "High Headroom"],
    "explanation": "Proximity advantage: only 0.0 km away. · Short estimated wait: ~11 mins. · Abundant capacity: 38.0 MT free."
  },
  "ranked_centres": [ ... ]
}
```
