"use client";

import { useEffect, useState } from "react";

export default function DashboardWeather() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/weather/Delhi"
        );

        const data = await res.json();

        setWeather(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadWeather();
  }, []);

  if (!weather)
    return (
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        Loading...
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">

      <p className="text-gray-500">
        Current Weather
      </p>

      <h2 className="text-4xl font-bold">
        {weather.temperature}°C
      </h2>

      <p>📍 {weather.city}</p>
      <p>💧 {weather.humidity}%</p>
      <p>🌬 {weather.wind_speed}</p>
      <p>☁ {weather.condition}</p>

    </div>
  );
}