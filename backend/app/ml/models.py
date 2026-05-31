# backend/app/ml/models.py
# Complete ML pipeline: yield prediction + crop recommendation
# Run  `python -m app.ml.models`  once to train and save models

import os, json, pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, accuracy_score

MODEL_DIR = os.path.join(os.path.dirname(__file__), "saved")
os.makedirs(MODEL_DIR, exist_ok=True)

# ═══════════════════════════════════════════════════════════════
#  1.  SYNTHETIC TRAINING DATA
#      Replace with real CSV paths when available.
#      Crop yield dataset: Kaggle "Crop Yield Prediction Dataset"
#      Crop recommendation: Kaggle "Crop Recommendation Dataset"
# ═══════════════════════════════════════════════════════════════

CROPS      = ["Rice","Wheat","Maize","Cotton","Sugarcane","Soybean","Groundnut","Millet","Bajra","Jowar"]
SOIL_TYPES = ["Black","Red","Sandy","Loamy","Clay","Alluvial"]

def _synthetic_yield_data(n=3000):
    rng = np.random.default_rng(42)
    rows = []
    for _ in range(n):
        crop      = rng.choice(CROPS)
        soil      = rng.choice(SOIL_TYPES)
        temp      = rng.uniform(18, 42)
        rainfall  = rng.uniform(300, 2500)
        humidity  = rng.uniform(40, 95)
        fertilizer= rng.uniform(50, 300)
        pesticide = rng.uniform(5, 80)

        base = {"Rice":35,"Wheat":28,"Maize":30,"Cotton":20,"Sugarcane":60,
                "Soybean":22,"Groundnut":18,"Millet":14,"Bajra":13,"Jowar":12}[crop]
        yield_q  = (base
                    + (rainfall/200 - 2) * 2
                    + (fertilizer/100 - 1) * 3
                    - abs(temp - 28) * 0.3
                    + rng.normal(0, 2))
        yield_q  = max(3, round(float(yield_q), 1))
        rows.append([crop, soil, temp, rainfall, humidity, fertilizer, pesticide, yield_q])

    return pd.DataFrame(rows, columns=["crop","soil","temperature","rainfall","humidity",
                                        "fertilizer","pesticide","yield"])

def _synthetic_crop_data(n=2200):
    rng  = np.random.default_rng(7)
    rows = []
    for _ in range(n):
        soil  = rng.choice(SOIL_TYPES)
        temp  = rng.uniform(18, 42)
        rain  = rng.uniform(300, 2500)
        humid = rng.uniform(40, 95)

        # simple rule-based label for training signal
        if soil in ["Black","Clay"] and rain > 800:
            crop = rng.choice(["Cotton","Rice","Sugarcane"], p=[0.5,0.3,0.2])
        elif soil in ["Sandy","Red"] and rain < 600:
            crop = rng.choice(["Millet","Bajra","Jowar"], p=[0.4,0.3,0.3])
        elif temp > 30 and humid > 70:
            crop = rng.choice(["Rice","Maize","Soybean"], p=[0.5,0.3,0.2])
        else:
            crop = rng.choice(CROPS)
        rows.append([soil, temp, rain, humid, crop])

    return pd.DataFrame(rows, columns=["soil","temperature","rainfall","humidity","crop"])

# ═══════════════════════════════════════════════════════════════
#  2.  TRAINING
# ═══════════════════════════════════════════════════════════════

def train_yield_model():
    df = _synthetic_yield_data()
    le_crop = LabelEncoder().fit(df["crop"])
    le_soil = LabelEncoder().fit(df["soil"])
    df["crop_enc"] = le_crop.transform(df["crop"])
    df["soil_enc"] = le_soil.transform(df["soil"])

    features = ["crop_enc","soil_enc","temperature","rainfall","humidity","fertilizer","pesticide"]
    X, y = df[features], df["yield"]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=200, max_depth=12, random_state=42, n_jobs=-1)
    model.fit(X_tr, y_tr)
    mae = mean_absolute_error(y_te, model.predict(X_te))
    print(f"[Yield] MAE: {mae:.2f} quintal/acre")

    pickle.dump(model,   open(f"{MODEL_DIR}/yield_model.pkl", "wb"))
    pickle.dump(le_crop, open(f"{MODEL_DIR}/yield_le_crop.pkl", "wb"))
    pickle.dump(le_soil, open(f"{MODEL_DIR}/yield_le_soil.pkl", "wb"))
    return model, le_crop, le_soil


def train_crop_model():
    df = _synthetic_crop_data()
    le_soil = LabelEncoder().fit(df["soil"])
    le_crop = LabelEncoder().fit(df["crop"])
    df["soil_enc"] = le_soil.transform(df["soil"])
    df["crop_enc"] = le_crop.transform(df["crop"])

    features = ["soil_enc","temperature","rainfall","humidity"]
    X, y = df[features], df["crop_enc"]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42, n_jobs=-1)
    model.fit(X_tr, y_tr)
    acc = accuracy_score(y_te, model.predict(X_te))
    print(f"[Crop] Accuracy: {acc*100:.1f}%")

    pickle.dump(model,   open(f"{MODEL_DIR}/crop_model.pkl", "wb"))
    pickle.dump(le_soil, open(f"{MODEL_DIR}/crop_le_soil.pkl", "wb"))
    pickle.dump(le_crop, open(f"{MODEL_DIR}/crop_le_crop.pkl", "wb"))
    return model, le_soil, le_crop

# ═══════════════════════════════════════════════════════════════
#  3.  INFERENCE HELPERS  (imported by route files)
# ═══════════════════════════════════════════════════════════════

def _load(name):
    return pickle.load(open(f"{MODEL_DIR}/{name}", "rb"))

def predict_yield(crop: str, soil: str, temperature: float,
                  rainfall: float, humidity: float,
                  fertilizer: float = 120, pesticide: float = 30) -> dict:
    model   = _load("yield_model.pkl")
    le_crop = _load("yield_le_crop.pkl")
    le_soil = _load("yield_le_soil.pkl")

    crop_enc = le_crop.transform([crop])[0]
    soil_enc = le_soil.transform([soil])[0]
    X = [[crop_enc, soil_enc, temperature, rainfall, humidity, fertilizer, pesticide]]
    pred = round(float(model.predict(X)[0]), 1)

    # Calculate trend vs average
    avg = {"Rice":35,"Wheat":28,"Maize":30,"Cotton":20,"Sugarcane":60,
           "Soybean":22,"Groundnut":18,"Millet":14,"Bajra":13,"Jowar":12}.get(crop, 25)
    change_pct = round((pred - avg) / avg * 100, 1)

    return {"predicted_yield": pred, "unit": "quintal/acre",
            "change_vs_average": change_pct, "crop": crop}


def recommend_crop(soil: str, temperature: float, rainfall: float, humidity: float) -> dict:
    model   = _load("crop_model.pkl")
    le_soil = _load("crop_le_soil.pkl")
    le_crop = _load("crop_le_crop.pkl")

    soil_enc = le_soil.transform([soil])[0]
    X        = [[soil_enc, temperature, rainfall, humidity]]
    proba    = model.predict_proba(X)[0]

    top3_idx    = proba.argsort()[-3:][::-1]
    top3_crops  = le_crop.inverse_transform(top3_idx)
    top3_scores = proba[top3_idx]

    return {
        "recommended_crop": top3_crops[0],
        "confidence":       round(float(top3_scores[0]) * 100, 1),
        "alternatives":     [
            {"crop": c, "confidence": round(float(s)*100, 1)}
            for c, s in zip(top3_crops[1:], top3_scores[1:])
        ],
    }

# ═══════════════════════════════════════════════════════════════
#  4.  TRAIN ON FIRST RUN
# ═══════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("Training yield model...")
    train_yield_model()
    print("Training crop recommendation model...")
    train_crop_model()
    print("✅ All models saved to", MODEL_DIR)