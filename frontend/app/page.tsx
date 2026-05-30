"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PredictionForm from "@/components/PredictionForm";
import WeatherCard from "@/components/WeatherCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import ChatBot from "@/components/ChatBot";

export default function HomePage() {
  return (
    <main className="dashboard-bg min-h-screen">

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
        className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-16 items-center"
      >

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >

          <div className="inline-flex items-center px-5 py-3 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-8">
            ✨ AI Powered Agriculture Platform
          </div>

          <h1 className="hero-title">
            Transform
            <br />
            Agriculture With
            <br />
            <span className="hero-gradient">
              Artificial Intelligence
            </span>
          </h1>

          <p className="mt-8 text-xl text-slate-500 max-w-xl leading-relaxed">
            Predict crop yield, monitor weather conditions,
            detect diseases and maximize profits with
            AI-powered agricultural intelligence.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              href="/signup"
              className="gradient-green text-white px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl bg-white border border-slate-200"
            >
              Login
            </Link>

          </div>

          <div className="flex gap-14 mt-14 flex-wrap">

            <div>
              <h3 className="text-4xl font-black">50K+</h3>
              <p className="text-slate-500">Farmers</p>
            </div>

            <div>
              <h3 className="text-4xl font-black">92%</h3>
              <p className="text-slate-500">Accuracy</p>
            </div>

            <div>
              <h3 className="text-4xl font-black">24/7</h3>
              <p className="text-slate-500">AI Support</p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8 }}
          className="glass-card p-8"
        >

          <div className="flex justify-between items-start mb-8">

            <div>

              <p className="text-slate-500">
                Predicted Yield
              </p>

              <h2 className="text-6xl font-black text-green-600">
                32.5
              </h2>

              <p className="text-slate-500">
                Quintal / Acre
              </p>

            </div>

            <div className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-bold">
              +18%
            </div>

          </div>

          <WeatherCard />

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
// import { ArrowRight } from "lucide-react";
// import PredictionForm from "@/components/PredictionForm";
// import WeatherCard from "@/components/WeatherCard";
// import AnalyticsChart from "@/components/AnalyticsChart";
// import ChatBot from "@/components/ChatBot";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main id="home" className="min-h-screen dashboard-bg">

//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between px-8 py-6">

//         <div className="text-2xl font-bold text-green-700">
//           🌾 AgriSmart AI
//         </div>

//        {/* <div className="hidden md:flex gap-8 text-gray-700 font-medium">

//   <a href="#home" className="hover:text-green-600 transition">
//     Home
//   </a>

//   <a href="#features" className="hover:text-green-600 transition">
//     Features
//   </a>

//   <a href="#dashboard" className="hover:text-green-600 transition">
//     Dashboard
//   </a>

//   <a href="#assistant" className="hover:text-green-600 transition">
//     AI Assistant
//   </a>

// </div> */}


// <div className="hidden md:flex gap-8 text-gray-700 font-medium">

//   <a href="#home">Home</a>

//   <a href="#features">Features</a>

//   <a href="#dashboard">Features</a>

//   <a href="#assistant">AI Assistant</a>

// </div>

// <div className="flex gap-3">

//   <Link
//     href="/login"
//     className="px-5 py-3 rounded-2xl border border-green-600 text-green-700"
//   >
//     Login
//   </Link>

//   <Link
//     href="/signup"
//     className="gradient-green text-white px-5 py-3 rounded-2xl shadow-lg"
//   >
//     Sign Up
//   </Link>

// </div>

//         <a
//   href="#dashboard"
//   className="gradient-green text-white px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
// >
//   Get Started
//   <ArrowRight size={18} />
// </a>

//       </nav>

      

//       {/* HERO SECTION */}
//       <section className="grid lg:grid-cols-2 gap-12 items-center px-8 py-16">

//         {/* LEFT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="space-y-8"
//         >

//           <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full">
//             AI Powered Agriculture Platform
//           </div>

//           <h1 className="hero-title">
//   Transform
//   <br />

//   Agriculture With
//   <br />

//   <span className="hero-gradient">
//     Artificial Intelligence
//   </span>
// </h1>



// <div className="flex gap-10 pt-10 flex-wrap">

//   <div>
//     <h3 className="text-3xl font-bold">
//       50K+
//     </h3>

//     <p className="text-slate-500">
//       Farmers
//     </p>
//   </div>

//   <div>
//     <h3 className="text-3xl font-bold">
//       92%
//     </h3>

//     <p className="text-slate-500">
//       Accuracy
//     </p>
//   </div>

//   <div>
//     <h3 className="text-3xl font-bold">
//       24/7
//     </h3>

//     <p className="text-slate-500">
//       AI Support
//     </p>
//   </div>

// </div>

//           <p className="text-gray-600 text-lg max-w-xl">
//             Predict crop yield, analyze weather,
//             detect diseases, and grow smarter with
//             AI-driven farming insights.
//           </p>

//           {/* <div className="flex gap-4">

//             <button className="gradient-green text-white px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl">
//               Get Started
//               <ArrowRight size={18} />
//             </button>

//             <button className="bg-white border border-gray-200 px-6 py-4 rounded-2xl">
//               Explore Demo
//             </button>

//           </div> */}


//           <div className="flex gap-4">

//   <Link
//     href="/signup"
//     className="gradient-green text-white px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
//   >
//     Get Started
//     <ArrowRight size={18} />
//   </Link>

//   <Link
//     href="/login"
//     className="bg-white border border-gray-200 px-6 py-4 rounded-2xl"
//   >
//     Login
//   </Link>

// </div>

//         </motion.div>

//         {/* RIGHT ANALYTICS CARD */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7 }}
//           className="glass-card p-8 shadow-2xl"
//         >

//           <div className="space-y-6">

//             <div className="flex justify-between items-start">

//               <div>

//                 <p className="text-gray-500">
//                   Predicted Yield
//                 </p>

//                 <h2 className="text-5xl font-bold text-green-600">
//                   32.5
//                 </h2>

//                 <p className="text-gray-500">
//                   Quintal/Acre
//                 </p>

//               </div>

//               <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
//                 +18%
//               </div>

//             </div>

//           <WeatherCard />

//             {/* SMALL CARDS */}
//             <div className="grid grid-cols-2 gap-4">

//               <div className="bg-white p-4 rounded-2xl shadow">

//                 <p className="text-gray-500">
//                   Soil Health
//                 </p>

//                 <h3 className="text-2xl font-bold text-green-600">
//                   Good
//                 </h3>

//               </div>

//               <div className="bg-white p-4 rounded-2xl shadow">

//                 <p className="text-gray-500">
//                   Weather
//                 </p>

//                 <h3 className="text-2xl font-bold">
//                   26°C
//                 </h3>

//               </div>

//             </div>

//           </div>

//         </motion.div>

//       </section>



      

//       {/* FEATURES SECTION */}

// <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

//   {/* CARD 1 */}

//   <div className="feature-card blue">

//     <div className="feature-icon">
//       🌦️
//     </div>

//     <div className="feature-dots"></div>

//     <h3>Weather Insights</h3>

//     <p>
//       Real-time weather intelligence and rainfall analysis.
//     </p>

//     <div className="feature-arrow">
//       →
//     </div>

//   </div>

//   {/* CARD 2 */}

//   <div className="feature-card green">

//     <div className="feature-icon">
//       📊
//     </div>

//     <div className="feature-dots"></div>

//     <h3>Yield Prediction</h3>

//     <p>
//       AI-powered crop yield and profit estimation system.
//     </p>

//     <div className="feature-arrow">
//       →
//     </div>

//   </div>

//   {/* CARD 3 */}

//   <div className="feature-card purple">

//     <div className="feature-icon">
//       🤖
//     </div>

//     <div className="feature-dots"></div>

//     <h3>AI Assistant</h3>

//     <p>
//       Smart chatbot for fertilizers and farming guidance.
//     </p>

//     <div className="feature-arrow">
//       →
//     </div>

//   </div>

//   {/* CARD 4 */}

//   <div className="feature-card yellow">

//     <div className="feature-icon">
//       🌱
//     </div>

//     <div className="feature-dots"></div>

//     <h3>Smart Farming</h3>

//     <p>
//       Data-driven farming decisions for higher productivity.
//     </p>

//     <div className="feature-arrow">
//       →
//     </div>

//   </div>

// </div>

//       {/* PREDICTION SECTION */}
//       <section
//   id="dashboard"
//   className="px-8 pb-20"
// >

//         <div className="max-w-7xl mx-auto">

//           <div className="mb-10">

//             <h2 className="text-4xl font-bold mb-4">
//               🌾 Crop Yield Prediction
//             </h2>

//             <p className="text-gray-600 text-lg">
//               Get AI-powered farming insights using weather and soil analysis.
//             </p>

//           </div>

//           <PredictionForm />

//         </div>



//       </section>
      

//       {/* ANALYTICS SECTION */}

// <section className="px-8 pb-20">

//   <div className="max-w-7xl mx-auto">

//     <AnalyticsChart />

//   </div>

// </section>

// {/* AI CHATBOT SECTION */}

// <section
//   id="assistant"
//   className="px-8 pb-20"
// >

//   <div className="max-w-7xl mx-auto">

//     <ChatBot />

//   </div>

// </section>

//     </main>
//   );
// }