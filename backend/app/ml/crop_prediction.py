import random

def predict_crop_yield(data):

    soil = data["soil_type"]
    crop = data["crop_type"]
    rainfall = data["rainfall"]
    temperature = data["temperature"]
    humidity = data["humidity"]
    land_size = data["land_size"]

    # Basic AI logic (temporary)
    base_yield = 20

    if rainfall > 70:
        base_yield += 5

    if temperature < 35:
        base_yield += 4

    if humidity > 60:
        base_yield += 3

    if soil.lower() == "black":
        base_yield += 5

    predicted_yield = round(base_yield + random.uniform(1, 5), 2)

    profit = round(predicted_yield * 1500 * land_size, 2)

    water_requirement = round(land_size * 1200, 2)

    risk = "Low"

    if temperature > 40:
        risk = "High"

    return {
        "predicted_yield": predicted_yield,
        "profit_estimate": profit,
        "water_requirement": water_requirement,
        "risk_level": risk,
        "recommended_crop": crop
    }