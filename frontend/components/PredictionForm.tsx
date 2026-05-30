"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function PredictionForm() {

  const [formData, setFormData] = useState({
    soil_type: "",
    crop_type: "",
    rainfall: "",
    temperature: "",
    humidity: "",
    land_size: "",
  });

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const response = await API.post("/predict", {

        soil_type: formData.soil_type,
        crop_type: formData.crop_type,
        rainfall: Number(formData.rainfall),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        land_size: Number(formData.land_size),

      });

      console.log(response.data);

      setResult(response.data.data);

    } catch (error) {

      console.log("ERROR:", error);

      alert("Backend connection failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="bg-white rounded-3xl p-8 shadow-xl border">

      <h2 className="text-3xl font-bold mb-6 text-green-700">
        AI Crop Prediction
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="soil_type"
          placeholder="Soil Type"
          onChange={handleChange}
          className="p-4 rounded-xl border"
        />

        <input
          type="text"
          name="crop_type"
          placeholder="Crop Type"
          onChange={handleChange}
          className="p-4 rounded-xl border"
        />

        <input
          type="number"
          name="rainfall"
          placeholder="Rainfall"
          onChange={handleChange}
          className="p-4 rounded-xl border"
        />

        <input
          type="number"
          name="temperature"
          placeholder="Temperature"
          onChange={handleChange}
          className="p-4 rounded-xl border"
        />

        <input
          type="number"
          name="humidity"
          placeholder="Humidity"
          onChange={handleChange}
          className="p-4 rounded-xl border"
        />

        <input
          type="number"
          name="land_size"
          placeholder="Land Size"
          onChange={handleChange}
          className="p-4 rounded-xl border"
        />

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
      >

        {loading ? "Predicting..." : "Predict Now"}

      </button>

      {result && (

        <div className="mt-8 bg-green-50 p-6 rounded-2xl">

          <h3 className="text-2xl font-bold mb-4">
            Prediction Result
          </h3>

          <div className="space-y-2 text-lg">

            <p>
              🌾 Yield:
              <span className="font-bold ml-2">
                {result.predicted_yield}
              </span>
            </p>

            <p>
              💰 Profit:
              <span className="font-bold ml-2">
                ₹{result.profit_estimate}
              </span>
            </p>

            <p>
              💧 Water:
              <span className="font-bold ml-2">
                {result.water_requirement} L
              </span>
            </p>

            <p>
              ⚠️ Risk:
              <span className="font-bold ml-2">
                {result.risk_level}
              </span>
            </p>

          </div>

        </div>

      )}

    </div>
  );
}