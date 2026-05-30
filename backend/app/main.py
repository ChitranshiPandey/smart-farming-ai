from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.routes.prediction import router as prediction_router
from app.routes.weather import router as weather_router
from app.routes.chat import router as chat_router
from app.routes.disease import router as disease_router


# -----------------------------
# Crop Recommendation Model
# -----------------------------
class RecommendationInput(BaseModel):
    soil_type: str
    temperature: float
    rainfall: float
    humidity: float


# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI(
    title="AgriSmart AI",
    version="1.0.0"
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Existing Routes
# -----------------------------
app.include_router(prediction_router)
app.include_router(weather_router)
app.include_router(chat_router)
app.include_router(disease_router)


# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "🌾 Smart Farming AI Backend Running"
    }


# -----------------------------
# Crop Recommendation API
# -----------------------------
@app.post("/recommend")
def recommend_crop(data: RecommendationInput):

    crop = "Wheat"
    confidence = 92
    expected_profit = 125000

    soil = data.soil_type.lower()

    if soil == "black":
        crop = "Cotton"
        confidence = 95
        expected_profit = 150000

    elif soil == "red":
        crop = "Groundnut"
        confidence = 88
        expected_profit = 110000

    elif soil == "alluvial":
        crop = "Rice"
        confidence = 93
        expected_profit = 140000

    elif soil == "loamy":
        crop = "Sugarcane"
        confidence = 90
        expected_profit = 170000

    return {
        "recommended_crop": crop,
        "confidence": confidence,
        "expected_profit": expected_profit,
        "reason": f"{crop} is suitable for {data.soil_type} soil under current weather conditions."
    }