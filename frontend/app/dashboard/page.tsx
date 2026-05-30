"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import YieldChart from "@/components/YieldChart";
import AIChat from "@/components/AIChat";
import DashboardWeather from "@/components/DashboardWeather";
import CropRecommendation from "@/components/CropRecommendation";
import DiseaseDetection from "@/components/DiseaseDetection";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");

    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">

      {/* HEADER */}

      <header className="bg-[#111827] border-b border-slate-800 px-8 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-green-400">
            🌾 AgriSmart AI
          </h1>

          <p className="text-slate-400 text-sm">
            Smart Farming Intelligence Platform
          </p>
        </div>

        <div className="flex items-center gap-4">

          <span className="text-slate-300">
            👨‍🌾 Welcome {userName || "Farmer"}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <div className="grid lg:grid-cols-4 gap-6 p-8">

        {/* SIDEBAR */}

        <aside className="bg-[#111827] rounded-3xl border border-slate-800 p-6 h-fit">

          <h2 className="font-bold text-xl mb-6">
            Navigation
          </h2>

          <div className="space-y-4 text-slate-300">

            <div className="hover:text-green-400 cursor-pointer transition">
              🏠 Dashboard
            </div>

            <div className="hover:text-green-400 cursor-pointer transition">
              🌦 Weather
            </div>

            <div className="hover:text-green-400 cursor-pointer transition">
              🌾 Crop Prediction
            </div>

            <div className="hover:text-green-400 cursor-pointer transition">
              🤖 AI Assistant
            </div>

            <div className="hover:text-green-400 cursor-pointer transition">
              📈 Market Insights
            </div>

            <div className="hover:text-green-400 cursor-pointer transition">
              🩺 Disease Detection
            </div>

          </div>

        </aside>

        {/* MAIN AREA */}

        <section className="lg:col-span-3 space-y-6">

          {/* TOP STATS */}

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">

              <p className="text-slate-400">
                Predicted Yield
              </p>

              <h2 className="text-4xl font-bold text-green-400 mt-2">
                41.9
              </h2>

              <p className="text-slate-500 text-sm">
                Quintal/Acre
              </p>

            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">

              <p className="text-slate-400">
                Estimated Profit
              </p>

              <h2 className="text-4xl font-bold text-blue-400 mt-2">
                ₹125K
              </h2>

              <p className="text-slate-500 text-sm">
                This Season
              </p>

            </div>

            <DashboardWeather />

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">

              <p className="text-slate-400">
                Disease Risk
              </p>

              <h2 className="text-4xl font-bold text-orange-400 mt-2">
                Low
              </h2>

              <p className="text-slate-500 text-sm">
                Current Status
              </p>

            </div>

          </div>

          {/* ANALYTICS */}

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-4">

            <YieldChart />

          </div>

          {/* AI + MARKET */}

          <div className="grid md:grid-cols-2 gap-6">

            <AIChat />

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-6">
                📈 Market Insights
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Wheat</span>
                  <span className="text-green-400">
                    ↑ 12%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Rice</span>
                  <span className="text-red-400">
                    ↓ 4%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Cotton</span>
                  <span className="text-green-400">
                    ↑ 9%
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* RECOMMENDATION */}

          <CropRecommendation />

          {/* DISEASE */}

          <DiseaseDetection />

        </section>

      </div>

    </main>
  );
}
























// "use client";

// import { useEffect, useState } from "react";

// import YieldChart from "@/components/YieldChart";
// import AIChat from "@/components/AIChat";
// import DashboardWeather from "@/components/DashboardWeather";
// import CropRecommendation from "@/components/CropRecommendation";
// import DiseaseDetection from "@/components/DiseaseDetection";

// export default function DashboardPage() {

//     const [userName, setUserName] = useState("");

// useEffect(() => {
//   const name = localStorage.getItem("userName");

//   if (name) {
//     setUserName(name);
//   }
// }, []);


//   return (
//     // <main className="min-h-screen bg-slate-100">
//     <main className="min-h-screen bg-[#0f172a] text-white">

//       {/* HEADER */}
//       {/* <div className="bg-white shadow-sm p-6 flex justify-between items-center"> */}
//       <div className="bg-[#111827] border-b border-slate-800 p-6 flex justify-between items-center">


//         <h1 className="text-3xl font-bold text-green-700">
//           🌾 AgriSmart AI
//         </h1>

//         <div className="flex items-center gap-4">

//   <span>
//     👨‍🌾 Welcome {userName || "Farmer"}
//   </span>

//   <button
//     onClick={() => {
//       localStorage.removeItem("userName");
//       localStorage.removeItem("userEmail");
//       window.location.href = "/";
//     }}
//     className="bg-red-500 text-white px-4 py-2 rounded-xl"
//   >
//     Logout
//   </button>

// </div>

//       </div>

//       <div className="grid lg:grid-cols-4 gap-6 p-8">

//         {/* SIDEBAR */}
//         {/* <div className="bg-white rounded-3xl p-6 shadow-lg"> */}
        

//           <div className="space-y-6">

//             <h2 className="font-bold text-xl">
//               Navigation
//             </h2>

//             <p>🏠 Dashboard</p>
//             <p>🌦 Weather</p>
//             <p>🌾 Crop Prediction</p>
//             <p>🤖 AI Assistant</p>
//             <p>📈 Market Insights</p>
//             <p>🩺 Disease Detection</p>

//           </div>

//         </div>

//         {/* MAIN CONTENT */}
//         <div className="lg:col-span-3 space-y-6">

//           {/* STATS */}
//           <div className="grid md:grid-cols-4 gap-6">

//             <div className="bg-white p-6 rounded-3xl shadow-lg">
//               <p className="text-gray-500">Yield</p>

//               <h2 className="text-4xl font-bold text-green-600">
//                 41.9
//               </h2>
//             </div>

//             <div className="bg-white p-6 rounded-3xl shadow-lg">
//               <p className="text-gray-500">Profit</p>

//               <h2 className="text-4xl font-bold">
//                 ₹125K
//               </h2>
//             </div>

//             <DashboardWeather />

//             <div className="bg-white p-6 rounded-3xl shadow-lg">
//               <p className="text-gray-500">Risk</p>

//               <h2 className="text-4xl font-bold text-green-600">
//                 Low
//               </h2>
//             </div>

//           </div>

//           {/* CHART */}
//           <YieldChart />

//           {/* AI + MARKET */}
//           <div className="grid md:grid-cols-2 gap-6">

//             <AIChat />

//             <div className="bg-white rounded-3xl p-6 shadow-lg">

//               <h3 className="text-2xl font-bold mb-4">
//                 📈 Market Insights
//               </h3>

//               <p>Wheat ↑ 12%</p>
//               <p>Rice ↓ 4%</p>
//               <p>Cotton ↑ 9%</p>

//             </div>

//           </div>

//           {/* CROP RECOMMENDATION */}
//           <CropRecommendation />

//           <DiseaseDetection />

//         </div>

//       </div>

//     </main>
//   );
// }