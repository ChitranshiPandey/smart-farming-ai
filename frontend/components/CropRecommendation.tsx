"use client";

import { useState } from "react";

export default function CropRecommendation() {
  const [soilType, setSoilType] = useState("Black");
  const [temperature, setTemperature] = useState(30);
  const [rainfall, setRainfall] = useState(80);
  const [humidity, setHumidity] = useState(70);

  const [result, setResult] = useState<any>(null);

  async function getRecommendation() {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            soil_type: soilType,
            temperature,
            rainfall,
            humidity,
          }),
        }
      );

      const data = await res.json();

      setResult(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-3xl font-bold mb-6">
        🌾 Crop Recommendation Engine
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          className="border p-3 rounded-xl"
          placeholder="Soil Type"
          value={soilType}
          onChange={(e) =>
            setSoilType(e.target.value)
          }
        />

        <input
          type="number"
          className="border p-3 rounded-xl"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) =>
            setTemperature(Number(e.target.value))
          }
        />

        <input
          type="number"
          className="border p-3 rounded-xl"
          placeholder="Rainfall"
          value={rainfall}
          onChange={(e) =>
            setRainfall(Number(e.target.value))
          }
        />

        <input
          type="number"
          className="border p-3 rounded-xl"
          placeholder="Humidity"
          value={humidity}
          onChange={(e) =>
            setHumidity(Number(e.target.value))
          }
        />

      </div>

      <button
        onClick={getRecommendation}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Get Recommendation
      </button>

      {result && (
        <div className="mt-8 bg-green-50 p-6 rounded-2xl">

          <h3 className="text-2xl font-bold text-green-700">
            {result.recommended_crop}
          </h3>

          <p className="mt-2">
            Confidence: {result.confidence}%
          </p>

          <p>
            Expected Profit:
            ₹{result.expected_profit}
          </p>

          <p className="mt-2 text-gray-700">
            {result.reason}
          </p>

        </div>
      )}

    </div>
  );
}