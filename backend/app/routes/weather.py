import os
import requests

from fastapi import APIRouter
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

API_KEY = os.getenv("WEATHER_API_KEY")


@router.get("/weather/{city}")
def get_weather(city: str):

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    data = response.json()

    return {
        "city": city,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "condition": data["weather"][0]["main"]
    }