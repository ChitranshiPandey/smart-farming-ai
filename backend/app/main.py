# backend/app/main.py
# Complete FastAPI app — replace your existing main.py

from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List
import os, jwt, shutil
from datetime import datetime
from dotenv import load_dotenv
from app.routes.chat import router as chat_router

load_dotenv()

# ── Import route modules ───────────────────────────────────────────────────
from app.routes.auth import router as auth_router, verify_token

# ── App setup ──────────────────────────────────────────────────────────────
app = FastAPI(title="AgriSmart AI API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "https://agrismart.vercel.app"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat_router)

# ── Lazy-load ML models (only after training) ──────────────────────────────
def get_ml():
    try:
        from app.ml.models import predict_yield, recommend_crop
        return predict_yield, recommend_crop
    except Exception:
        return None, None

# ── Schemas ────────────────────────────────────────────────────────────────
class YieldRequest(BaseModel):
    crop:        str
    soil_type:   str
    temperature: float
    rainfall:    float
    humidity:    float
    fertilizer:  float = 120
    pesticide:   float = 30

class CropRequest(BaseModel):
    soil_type:   str
    temperature: float
    rainfall:    float
    humidity:    float

class ChatMessage(BaseModel):
    message: str
    history: List[dict] = []

# ── Crop yield prediction ──────────────────────────────────────────────────
@app.post("/predict")
async def predict(body: YieldRequest):
    predict_yield, _ = get_ml()
    if predict_yield is None:
        # Fallback demo response if model not trained yet
        return {"predicted_yield": 32.5, "unit": "quintal/acre",
                "change_vs_average": 18.0, "crop": body.crop,
                "note": "Demo mode — run `python -m app.ml.models` to train real model"}

    result = predict_yield(
        crop=body.crop, soil=body.soil_type,
        temperature=body.temperature, rainfall=body.rainfall,
        humidity=body.humidity, fertilizer=body.fertilizer,
        pesticide=body.pesticide,
    )
    return result

# ── Crop recommendation ────────────────────────────────────────────────────
@app.post("/recommend")
async def recommend(body: CropRequest):
    _, recommend_crop = get_ml()
    if recommend_crop is None:
        return {"recommended_crop": "Cotton", "confidence": 87.0,
                "alternatives": [{"crop": "Wheat", "confidence": 8.5},
                                  {"crop": "Rice", "confidence": 4.5}],
                "note": "Demo mode"}

    result = recommend_crop(
        soil=body.soil_type, temperature=body.temperature,
        rainfall=body.rainfall, humidity=body.humidity,
    )
    return result

# ── AI Chat (Gemini) ───────────────────────────────────────────────────────
# import google.generativeai as genai

# GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")
# if GEMINI_KEY:
#     genai.configure(api_key=GEMINI_KEY)

# SYSTEM_PROMPT = """You are AgriSmart AI, an expert agricultural assistant for Indian farmers.
# You help with: crop selection, planting schedules, disease identification, weather impact on crops,
# soil health, fertilizer recommendations, pest management, and market prices.
# Always give practical, actionable advice. Respond in the language the user uses.
# Keep responses concise (max 150 words) but complete. Use bullet points for lists.
# Always mention which Indian state/season is most relevant if applicable."""

# @app.post("/chat")
# async def chat(body: ChatMessage, payload: dict = Depends(verify_token)):
#     if not GEMINI_KEY:
#         return {"response": "AI chat requires GEMINI_API_KEY in .env file."}

#     try:
#         model   = genai.GenerativeModel("gemini-1.5-flash")
#         history = [{"role": m["role"], "parts": [m["content"]]}
#                    for m in body.history[-10:]]  # keep last 10 turns
#         chat_session = model.start_chat(history=history)
#         full_prompt  = f"{SYSTEM_PROMPT}\n\nUser: {body.message}"
#         response     = chat_session.send_message(full_prompt)
#         return {"response": response.text}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# ── Weather ────────────────────────────────────────────────────────────────
import httpx

OWM_KEY = os.getenv("OPENWEATHER_API_KEY", "")

@app.get("/weather")
async def weather(city: str = "Delhi"):
    if not OWM_KEY:
        return {"temp": 32, "humidity": 65, "wind_speed": 12,
                "condition": "Clear", "city": city, "demo": True}
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={"q": city, "appid": OWM_KEY, "units": "metric"},
        )
        d = r.json()
        return {
            "temp":       d["main"]["temp"],
            "humidity":   d["main"]["humidity"],
            "wind_speed": d["wind"]["speed"],
            "condition":  d["weather"][0]["main"],
            "description":d["weather"][0]["description"],
            "city":       city,
        }

# ── Disease Detection (placeholder → add real CNN later) ──────────────────
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/disease-detect")
async def disease_detect(
    file: UploadFile = File(...)
):
    path = f"{UPLOAD_DIR}/{file.filename}"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # TODO: replace with real TF model inference
    # from app.ml.disease_model import predict_disease
    # result = predict_disease(path)

    diseases = [
        {"disease": "Healthy Leaf",         "confidence": 94},
        {"disease": "Bacterial Blight",     "confidence": 78},
        {"disease": "Leaf Rust",            "confidence": 82},
        {"disease": "Powdery Mildew",       "confidence": 71},
        {"disease": "Early Blight",         "confidence": 85},
    ]
    import random
    result = random.choice(diseases)
    return {**result,
            "recommendation": "Apply copper-based fungicide" if result["disease"] != "Healthy Leaf" else "No action needed",
            "severity": "Low" if result["confidence"] > 90 else "Medium"}

# ── Market Insights ────────────────────────────────────────────────────────
@app.get("/market-prices")
async def market_prices():
    """Returns MSP + demo market prices. Wire to Agmarknet API for live data."""
    prices = [
        {"crop": "Rice",      "msp": 2183, "market": 2250, "trend": "+3.1%"},
        {"crop": "Wheat",     "msp": 2275, "market": 2310, "trend": "+1.5%"},
        {"crop": "Cotton",    "msp": 6620, "market": 7100, "trend": "+7.2%"},
        {"crop": "Soybean",   "msp": 4600, "market": 4820, "trend": "+4.8%"},
        {"crop": "Maize",     "msp": 2090, "market": 2150, "trend": "+2.9%"},
        {"crop": "Sugarcane", "msp": 315,  "market": 330,  "trend": "+4.7%"},
    ]
    return {"prices": prices, "updated": datetime.utcnow().strftime("%d %b %Y")}





























# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# from app.routes.prediction import router as prediction_router
# from app.routes.weather import router as weather_router
# from app.routes.chat import router as chat_router
# from app.routes.disease import router as disease_router


# # -----------------------------
# # Crop Recommendation Model
# # -----------------------------
# class RecommendationInput(BaseModel):
#     soil_type: str
#     temperature: float
#     rainfall: float
#     humidity: float


# # -----------------------------
# # FastAPI App
# # -----------------------------
# app = FastAPI(
#     title="AgriSmart AI",
#     version="1.0.0"
# )

# # -----------------------------
# # CORS
# # -----------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -----------------------------
# # Existing Routes
# # -----------------------------
# app.include_router(prediction_router)
# app.include_router(weather_router)
# app.include_router(chat_router)
# app.include_router(disease_router)


# # -----------------------------
# # Home Route
# # -----------------------------
# @app.get("/")
# def home():
#     return {
#         "message": "🌾 Smart Farming AI Backend Running"
#     }


# # -----------------------------
# # Crop Recommendation API
# # -----------------------------
# @app.post("/recommend")
# def recommend_crop(data: RecommendationInput):

#     crop = "Wheat"
#     confidence = 92
#     expected_profit = 125000

#     soil = data.soil_type.lower()

#     if soil == "black":
#         crop = "Cotton"
#         confidence = 95
#         expected_profit = 150000

#     elif soil == "red":
#         crop = "Groundnut"
#         confidence = 88
#         expected_profit = 110000

#     elif soil == "alluvial":
#         crop = "Rice"
#         confidence = 93
#         expected_profit = 140000

#     elif soil == "loamy":
#         crop = "Sugarcane"
#         confidence = 90
#         expected_profit = 170000

#     return {
#         "recommended_crop": crop,
#         "confidence": confidence,
#         "expected_profit": expected_profit,
#         "reason": f"{crop} is suitable for {data.soil_type} soil under current weather conditions."
#     }