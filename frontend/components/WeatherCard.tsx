"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function WeatherCard() {

  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {

    fetchWeather();

  }, []);

  const fetchWeather = async () => {

    try {

      const response = await API.get("/weather/Delhi");

      setWeather(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!weather) {

    return (

      <div className="glass-card p-6 rounded-3xl">
        Loading Weather...
      </div>

    );
  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-2xl border">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-gray-500">
            Current Weather
          </p>

          <h2 className="text-5xl font-bold text-green-600">
            {weather.temperature}°C
          </h2>

          <p className="text-lg text-gray-600 mt-2">
            {weather.city}
          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
          {weather.condition}
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-white p-4 rounded-2xl shadow">

          <p className="text-gray-500">
            Humidity
          </p>

          <h3 className="text-2xl font-bold">
            {weather.humidity}%
          </h3>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow">

          <p className="text-gray-500">
            Wind Speed
          </p>

          <h3 className="text-2xl font-bold">
            {weather.wind_speed}
          </h3>

        </div>

      </div>

    </div>
  );
}