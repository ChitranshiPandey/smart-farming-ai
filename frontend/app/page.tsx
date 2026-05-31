"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PredictionForm from "@/components/PredictionForm";
import WeatherCard from "@/components/WeatherCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import ChatBot from "@/components/ChatBot";
import MarketInsights from "@/components/MarketInsights";

export default function HomePage() {
  return (
    <main className="dashboard-bg min-h-screen relative overflow-hidden">

      {/* Floating Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* ================= NAVBAR ================= */}

      <nav className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">

        <div className="text-3xl font-black text-slate-900">
          🌾 AgriSmart AI
        </div>

        <div className="hidden md:flex items-center gap-10 text-slate-600 font-medium">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#assistant">AI Assistant</a>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-2xl border border-slate-200 bg-white"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="gradient-green text-white px-6 py-3 rounded-2xl shadow-lg"
          >
            Sign Up
          </Link>
        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="max-w-7xl mx-auto px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-20 items-center"
      >

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-flex items-center px-5 py-3 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-8">
            🚀 AI Powered Agriculture Intelligence
          </div>

          <h1 className="text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">

            Smart
            <br />

            Farming

            <br />

            <span className="bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Reimagined
            </span>

          </h1>

          <p className="mt-8 text-xl text-slate-500 max-w-xl leading-relaxed">
            Predict crop yield, monitor weather,
            detect diseases and maximize profits
            with AI-driven agricultural intelligence.
          </p>

          <div className="flex gap-5 mt-10 flex-wrap">

            <Link
              href="/signup"
              className="gradient-green text-white px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
            >
              Start Farming Smarter
              <ArrowRight size={18} />
            </Link>

            <a
              href="#dashboard"
              className="px-8 py-4 rounded-2xl bg-white border border-slate-200"
            >
              Explore Dashboard
            </a>

          </div>

          <div className="grid grid-cols-3 gap-8 mt-16">

            <div>
              <h3 className="text-5xl font-black text-green-600">
                50K+
              </h3>
              <p className="text-slate-500">
                Farmers
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-blue-600">
                92%
              </h3>
              <p className="text-slate-500">
                Accuracy
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-purple-600">
                24/7
              </h3>
              <p className="text-slate-500">
                AI Support
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8"
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-500">
                Predicted Yield
              </p>

              <h2 className="text-7xl font-black text-green-600">
                32.5
              </h2>

              <p className="text-slate-500">
                Quintal / Acre
              </p>

            </div>

            <div className="px-5 py-3 rounded-2xl bg-green-100 text-green-700 font-bold">
              +18%
            </div>

          </div>

          <div className="mt-8">
            <WeatherCard />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="premium-card p-5">

              <p className="text-slate-500">
                Soil Health
              </p>

              <h3 className="text-3xl font-black text-green-600">
                Excellent
              </h3>

            </div>

            <div className="premium-card p-5">

              <p className="text-slate-500">
                Disease Risk
              </p>

              <h3 className="text-3xl font-black text-red-500">
                Low
              </h3>

            </div>

          </div>

        </motion.div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="max-w-7xl mx-auto px-8 py-24"
      >

        <div className="text-center mb-16">

          <div className="inline-flex px-5 py-3 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-6">
            Powerful AI Features
          </div>

          <h2 className="text-6xl font-black">
            Smart Farming Solutions
          </h2>

          <p className="text-slate-500 text-xl mt-4">
            Everything farmers need in one AI platform
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          <div className="feature-card blue">
            <div className="feature-icon">🌦️</div>
            <h3>Weather Insights</h3>
            <p>Real-time weather intelligence and rainfall forecasting.</p>
          </div>

          <div className="feature-card green">
            <div className="feature-icon">📊</div>
            <h3>Yield Prediction</h3>
            <p>Advanced AI models for crop productivity forecasting.</p>
          </div>

          <div className="feature-card purple">
            <div className="feature-icon">🤖</div>
            <h3>AI Assistant</h3>
            <p>Get instant farming recommendations anytime.</p>
          </div>

          <div className="feature-card yellow">
            <div className="feature-icon">🌱</div>
            <h3>Smart Farming</h3>
            <p>Data-driven decisions for maximum profitability.</p>
          </div>

        </div>

      </section>

      {/* ================= PREDICTION ================= */}

      <section
        id="dashboard"
        className="max-w-7xl mx-auto px-8 py-24"
      >

        <div className="mb-12">

          <h2 className="text-5xl font-black mb-4">
            🌾 Crop Yield Prediction
          </h2>

          <p className="text-slate-500 text-xl">
            AI-powered yield estimation based on weather and soil conditions.
          </p>

        </div>

        <PredictionForm />

      </section>

      {/* ================= ANALYTICS ================= */}

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <AnalyticsChart />
      </section>


      <section className="max-w-7xl mx-auto px-8 pb-24">

  <MarketInsights />

</section>

      {/* ================= AI ASSISTANT ================= */}

      <section
        id="assistant"
        className="max-w-7xl mx-auto px-8 pb-24"
      >
        <ChatBot />
      </section>

    </main>
  );
}
































// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// import PredictionForm from "@/components/PredictionForm";
// import WeatherCard from "@/components/WeatherCard";
// import AnalyticsChart from "@/components/AnalyticsChart";
// import ChatBot from "@/components/ChatBot";

// export default function HomePage() {
//   return (
//     <main className="dashboard-bg min-h-screen">

      

//       {/* ================= NAVBAR ================= */}

//       <nav className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">

//         <div className="text-3xl font-black text-slate-900">
//           🌾 AgriSmart AI
//         </div>

//         <div className="hidden md:flex items-center gap-10 text-slate-600 font-medium">

//           <a href="#home">Home</a>
//           <a href="#features">Features</a>
//           <a href="#dashboard">Dashboard</a>
//           <a href="#assistant">AI Assistant</a>

//         </div>

//         <div className="flex gap-4">

//           <Link
//             href="/login"
//             className="px-6 py-3 rounded-2xl border border-slate-200 bg-white"
//           >
//             Login
//           </Link>

//           <Link
//             href="/signup"
//             className="gradient-green text-white px-6 py-3 rounded-2xl shadow-lg"
//           >
//             Sign Up
//           </Link>

//         </div>

//       </nav>

//       {/* ================= HERO ================= */}

//       <section
//         id="home"
//         className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-16 items-center"
//       >

//         {/* LEFT */}

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: .7 }}
//         >

//           <div className="inline-flex items-center px-5 py-3 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-8">
//             ✨ AI Powered Agriculture Platform
//           </div>

//           <h1 className="hero-title">
//             Transform
//             <br />
//             Agriculture With
//             <br />
//             <span className="hero-gradient">
//               Artificial Intelligence
//             </span>
//           </h1>

//           <p className="mt-8 text-xl text-slate-500 max-w-xl leading-relaxed">
//             Predict crop yield, monitor weather conditions,
//             detect diseases and maximize profits with
//             AI-powered agricultural intelligence.
//           </p>

//           <div className="flex gap-5 mt-10">

//             <Link
//               href="/signup"
//               className="gradient-green text-white px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
//             >
//               Get Started
//               <ArrowRight size={18} />
//             </Link>

//             <Link
//               href="/login"
//               className="px-8 py-4 rounded-2xl bg-white border border-slate-200"
//             >
//               Login
//             </Link>

//           </div>

//           <div className="flex gap-14 mt-14 flex-wrap">

//             <div>
//               <h3 className="text-4xl font-black">50K+</h3>
//               <p className="text-slate-500">Farmers</p>
//             </div>

//             <div>
//               <h3 className="text-4xl font-black">92%</h3>
//               <p className="text-slate-500">Accuracy</p>
//             </div>

//             <div>
//               <h3 className="text-4xl font-black">24/7</h3>
//               <p className="text-slate-500">AI Support</p>
//             </div>

//           </div>

//         </motion.div>

//         {/* RIGHT */}

//         <motion.div
//           initial={{ opacity: 0, scale: .9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: .8 }}
//           className="glass-card p-8"
//         >

//           <div className="flex justify-between items-start mb-8">

//             <div>

//               <p className="text-slate-500">
//                 Predicted Yield
//               </p>

//               <h2 className="text-6xl font-black text-green-600">
//                 32.5
//               </h2>

//               <p className="text-slate-500">
//                 Quintal / Acre
//               </p>

//             </div>

//             <div className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-bold">
//               +18%
//             </div>

//           </div>

//           <WeatherCard />

//         </motion.div>

//       </section>

//       {/* ================= FEATURES ================= */}

//       <section
//         id="features"
//         className="max-w-7xl mx-auto px-8 py-24"
//       >

//         <div className="text-center mb-16">

//           <div className="inline-flex px-5 py-3 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-6">
//             Powerful AI Features
//           </div>

//           <h2 className="text-6xl font-black">
//             Smart Farming Solutions
//           </h2>

//           <p className="text-slate-500 text-xl mt-4">
//             Everything farmers need in one AI platform
//           </p>

//         </div>

//         <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

//           <div className="feature-card blue">
//             <div className="feature-icon">🌦️</div>
//             <h3>Weather Insights</h3>
//             <p>Real-time weather intelligence and rainfall forecasting.</p>
//           </div>

//           <div className="feature-card green">
//             <div className="feature-icon">📊</div>
//             <h3>Yield Prediction</h3>
//             <p>Advanced AI models for crop productivity forecasting.</p>
//           </div>

//           <div className="feature-card purple">
//             <div className="feature-icon">🤖</div>
//             <h3>AI Assistant</h3>
//             <p>Get instant farming recommendations anytime.</p>
//           </div>

//           <div className="feature-card yellow">
//             <div className="feature-icon">🌱</div>
//             <h3>Smart Farming</h3>
//             <p>Data-driven decisions for maximum profitability.</p>
//           </div>

//         </div>

//       </section>

//       {/* ================= PREDICTION ================= */}

//       <section
//         id="dashboard"
//         className="max-w-7xl mx-auto px-8 py-24"
//       >

//         <div className="mb-12">

//           <h2 className="text-5xl font-black mb-4">
//             🌾 Crop Yield Prediction
//           </h2>

//           <p className="text-slate-500 text-xl">
//             AI-powered yield estimation based on weather and soil conditions.
//           </p>

//         </div>

//         <PredictionForm />

//       </section>

//       {/* ================= ANALYTICS ================= */}

//       <section className="max-w-7xl mx-auto px-8 pb-24">

//         <AnalyticsChart />

//       </section>

//       {/* ================= AI ASSISTANT ================= */}

//       <section
//         id="assistant"
//         className="max-w-7xl mx-auto px-8 pb-24"
//       >

//         <ChatBot />

//       </section>

//     </main>
//   );
// }

















