"use client";

import { useEffect, useState } from "react";

import YieldChart from "@/components/YieldChart";
import AIChat from "@/components/AIChat";
import DashboardWeather from "@/components/DashboardWeather";
import CropRecommendation from "@/components/CropRecommendation";
import DiseaseDetection from "@/components/DiseaseDetection";

export default function DashboardPage() {

    const [userName, setUserName] = useState("");

useEffect(() => {
  const name = localStorage.getItem("userName");

  if (name) {
    setUserName(name);
  }
}, []);


  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-white shadow-sm p-6 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-green-700">
          🌾 AgriSmart AI
        </h1>

        <div className="flex items-center gap-4">

  <span>
    👨‍🌾 Welcome {userName || "Farmer"}
  </span>

  <button
    onClick={() => {
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      window.location.href = "/";
    }}
    className="bg-red-500 text-white px-4 py-2 rounded-xl"
  >
    Logout
  </button>

</div>

      </div>

      <div className="grid lg:grid-cols-4 gap-6 p-8">

        {/* SIDEBAR */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">

          <div className="space-y-6">

            <h2 className="font-bold text-xl">
              Navigation
            </h2>

            <p>🏠 Dashboard</p>
            <p>🌦 Weather</p>
            <p>🌾 Crop Prediction</p>
            <p>🤖 AI Assistant</p>
            <p>📈 Market Insights</p>
            <p>🩺 Disease Detection</p>

          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <p className="text-gray-500">Yield</p>

              <h2 className="text-4xl font-bold text-green-600">
                41.9
              </h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <p className="text-gray-500">Profit</p>

              <h2 className="text-4xl font-bold">
                ₹125K
              </h2>
            </div>

            <DashboardWeather />

            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <p className="text-gray-500">Risk</p>

              <h2 className="text-4xl font-bold text-green-600">
                Low
              </h2>
            </div>

          </div>

          {/* CHART */}
          <YieldChart />

          {/* AI + MARKET */}
          <div className="grid md:grid-cols-2 gap-6">

            <AIChat />

            <div className="bg-white rounded-3xl p-6 shadow-lg">

              <h3 className="text-2xl font-bold mb-4">
                📈 Market Insights
              </h3>

              <p>Wheat ↑ 12%</p>
              <p>Rice ↓ 4%</p>
              <p>Cotton ↑ 9%</p>

            </div>

          </div>

          {/* CROP RECOMMENDATION */}
          <CropRecommendation />

          <DiseaseDetection />

        </div>

      </div>

    </main>
  );
}