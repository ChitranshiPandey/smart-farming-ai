from fastapi import APIRouter
from pydantic import BaseModel

from app.ml.crop_prediction import predict_crop_yield

router = APIRouter()

# Request Body
class CropInput(BaseModel):
    soil_type: str
    crop_type: str
    rainfall: float
    temperature: float
    humidity: float
    land_size: float


@router.post("/predict")
def predict(data: CropInput):

    result = predict_crop_yield(data.dict())

    return {
        "success": True,
        "data": result
    }