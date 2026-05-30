"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import WeatherCard from "@/components/WeatherCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import ChatBot from "@/components/ChatBot";
import Link from "next/link";

export default function HomePage() {
  return (
    <main id="home" className="min-h-screen dashboard-bg">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6">

        <div className="text-2xl font-bold text-green-700">
          🌾 AgriSmart AI
        </div>

       {/* <div className="hidden md:flex gap-8 text-gray-700 font-medium">

  <a href="#home" className="hover:text-green-600 transition">
    Home
  </a>

  <a href="#features" className="hover:text-green-600 transition">
    Features
  </a>

  <a href="#dashboard" className="hover:text-green-600 transition">
    Dashboard
  </a>

  <a href="#assistant" className="hover:text-green-600 transition">
    AI Assistant
  </a>

</div> */}


<div className="hidden md:flex gap-8 text-gray-700 font-medium">

  <a href="#home">Home</a>

  <a href="#features">Features</a>

  <a href="#dashboard">Features</a>

  <a href="#assistant">AI Assistant</a>

</div>

<div className="flex gap-3">

  <Link
    href="/login"
    className="px-5 py-3 rounded-2xl border border-green-600 text-green-700"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="gradient-green text-white px-5 py-3 rounded-2xl shadow-lg"
  >
    Sign Up
  </Link>

</div>

        <a
  href="#dashboard"
  className="gradient-green text-white px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
>
  Get Started
  <ArrowRight size={18} />
</a>

      </nav>

      {/* HERO SECTION */}
      <section className="grid lg:grid-cols-2 gap-12 items-center px-8 py-16">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >

          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full">
            AI Powered Agriculture Platform
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Smart Farming <br />
            Better Yield, <br />
            <span className="text-green-600">
              Better Future 🌱
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Predict crop yield, analyze weather,
            detect diseases, and grow smarter with
            AI-driven farming insights.
          </p>

          {/* <div className="flex gap-4">

            <button className="gradient-green text-white px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="bg-white border border-gray-200 px-6 py-4 rounded-2xl">
              Explore Demo
            </button>

          </div> */}


          <div className="flex gap-4">

  <Link
    href="/signup"
    className="gradient-green text-white px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
  >
    Get Started
    <ArrowRight size={18} />
  </Link>

  <Link
    href="/login"
    className="bg-white border border-gray-200 px-6 py-4 rounded-2xl"
  >
    Login
  </Link>

</div>

        </motion.div>

        {/* RIGHT ANALYTICS CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="glass-card p-8 shadow-2xl"
        >

          <div className="space-y-6">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500">
                  Predicted Yield
                </p>

                <h2 className="text-5xl font-bold text-green-600">
                  32.5
                </h2>

                <p className="text-gray-500">
                  Quintal/Acre
                </p>

              </div>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                +18%
              </div>

            </div>

          <WeatherCard />

            {/* SMALL CARDS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white p-4 rounded-2xl shadow">

                <p className="text-gray-500">
                  Soil Health
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  Good
                </h3>

              </div>

              <div className="bg-white p-4 rounded-2xl shadow">

                <p className="text-gray-500">
                  Weather
                </p>

                <h3 className="text-2xl font-bold">
                  26°C
                </h3>

              </div>

            </div>

          </div>

        </motion.div>

      </section>

      {/* FEATURES SECTION */}

<section
  id="features"
  className="px-8 py-20"
>

  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">

      <h2 className="text-5xl font-bold mb-4">
        Powerful AI Farming Features
      </h2>

      <p className="text-gray-600 text-lg">
        Smart agriculture tools powered by AI and analytics
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-white p-8 rounded-3xl shadow-xl border">

        <div className="text-5xl mb-4">
          🌦
        </div>

        <h3 className="text-2xl font-bold mb-3">
          Weather Insights
        </h3>

        <p className="text-gray-600">
          Real-time weather intelligence and rainfall analysis.
        </p>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border">

        <div className="text-5xl mb-4">
          📊
        </div>

        <h3 className="text-2xl font-bold mb-3">
          Yield Prediction
        </h3>

        <p className="text-gray-600">
          AI-powered crop yield and profit estimation system.
        </p>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border">

        <div className="text-5xl mb-4">
          🤖
        </div>

        <h3 className="text-2xl font-bold mb-3">
          AI Assistant
        </h3>

        <p className="text-gray-600">
          Smart chatbot for fertilizers and farming guidance.
        </p>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border">

        <div className="text-5xl mb-4">
          🌱
        </div>

        <h3 className="text-2xl font-bold mb-3">
          Smart Farming
        </h3>

        <p className="text-gray-600">
          Data-driven farming decisions for higher productivity.
        </p>

      </div>

    </div>

  </div>

</section>

      {/* PREDICTION SECTION */}
      <section
  id="dashboard"
  className="px-8 pb-20"
>

        <div className="max-w-7xl mx-auto">

          <div className="mb-10">

            <h2 className="text-4xl font-bold mb-4">
              🌾 Crop Yield Prediction
            </h2>

            <p className="text-gray-600 text-lg">
              Get AI-powered farming insights using weather and soil analysis.
            </p>

          </div>

          <PredictionForm />

        </div>

      </section>

      {/* ANALYTICS SECTION */}

<section className="px-8 pb-20">

  <div className="max-w-7xl mx-auto">

    <AnalyticsChart />

  </div>

</section>

{/* AI CHATBOT SECTION */}

<section
  id="assistant"
  className="px-8 pb-20"
>

  <div className="max-w-7xl mx-auto">

    <ChatBot />

  </div>

</section>

    </main>
  );
}