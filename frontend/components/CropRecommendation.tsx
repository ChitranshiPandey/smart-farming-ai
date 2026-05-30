"use client";

import { useState } from "react";

export default function CropRecommendation() {
  const [soilType, setSoilType] = useState("Black");
  const [temperature, setTemperature] = useState(30);
  const [rainfall, setRainfall] = useState(80);
  const [humidity, setHumidity] = useState(70);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function getRecommendation() {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="text-4xl">🌾</div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Crop Recommendation
          </h2>

          <p className="text-slate-400">
            AI-powered crop suggestions based on soil and weather
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-4 gap-4">

        <input
          value={soilType}
          onChange={(e) =>
            setSoilType(e.target.value)
          }
          placeholder="Soil Type"
          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-green-500"
        />

        <input
          type="number"
          value={temperature}
          onChange={(e) =>
            setTemperature(Number(e.target.value))
          }
          placeholder="Temperature"
          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-green-500"
        />

        <input
          type="number"
          value={rainfall}
          onChange={(e) =>
            setRainfall(Number(e.target.value))
          }
          placeholder="Rainfall"
          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-green-500"
        />

        <input
          type="number"
          value={humidity}
          onChange={(e) =>
            setHumidity(Number(e.target.value))
          }
          placeholder="Humidity"
          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-green-500"
        />
      </div>

      <button
        onClick={getRecommendation}
        className="mt-6 bg-green-500 hover:bg-green-600 transition-all px-8 py-4 rounded-2xl text-white font-bold"
      >
        {loading
          ? "Analyzing..."
          : "Get Recommendation"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-8">

          <div className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 border border-green-500/30 rounded-3xl p-8">

            <div className="flex items-center justify-between flex-wrap gap-6">

              <div>
                <p className="text-slate-400 mb-2">
                  Recommended Crop
                </p>

                <h3 className="text-5xl font-bold text-green-400">
                  {result.recommended_crop}
                </h3>
              </div>

              <div className="bg-green-500/20 px-6 py-3 rounded-2xl">
                <span className="text-green-300 font-semibold">
                  AI Suggested
                </span>
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <div className="bg-slate-900/50 p-5 rounded-2xl">
                <p className="text-slate-400">
                  Confidence
                </p>

                <h4 className="text-3xl font-bold text-white mt-2">
                  {result.confidence}%
                </h4>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-2xl">
                <p className="text-slate-400">
                  Expected Profit
                </p>

                <h4 className="text-3xl font-bold text-green-400 mt-2">
                  ₹{result.expected_profit}
                </h4>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-2xl">
                <p className="text-slate-400">
                  Suitability
                </p>

                <h4 className="text-3xl font-bold text-green-400 mt-2">
                  Excellent
                </h4>
              </div>

            </div>

            <div className="mt-8 bg-slate-900/40 rounded-2xl p-5">
              <p className="text-slate-300 leading-7">
                {result.reason}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}















// "use client";

// import { useState } from "react";

// export default function CropRecommendation() {
//   const [soilType, setSoilType] = useState("Black");
//   const [temperature, setTemperature] = useState(30);
//   const [rainfall, setRainfall] = useState(80);
//   const [humidity, setHumidity] = useState(70);

//   const [result, setResult] = useState<any>(null);

//   async function getRecommendation() {
//     try {
//       const res = await fetch(
//         "http://127.0.0.1:8000/recommend",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             soil_type: soilType,
//             temperature,
//             rainfall,
//             humidity,
//           }),
//         }
//       );

//       const data = await res.json();

//       setResult(data);

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="bg-white rounded-3xl p-6 shadow-lg">

//       <h2 className="text-3xl font-bold mb-6">
//         🌾 Crop Recommendation Engine
//       </h2>

//       <div className="grid md:grid-cols-2 gap-4">

//         <input
//           className="border p-3 rounded-xl"
//           placeholder="Soil Type"
//           value={soilType}
//           onChange={(e) =>
//             setSoilType(e.target.value)
//           }
//         />

//         <input
//           type="number"
//           className="border p-3 rounded-xl"
//           placeholder="Temperature"
//           value={temperature}
//           onChange={(e) =>
//             setTemperature(Number(e.target.value))
//           }
//         />

//         <input
//           type="number"
//           className="border p-3 rounded-xl"
//           placeholder="Rainfall"
//           value={rainfall}
//           onChange={(e) =>
//             setRainfall(Number(e.target.value))
//           }
//         />

//         <input
//           type="number"
//           className="border p-3 rounded-xl"
//           placeholder="Humidity"
//           value={humidity}
//           onChange={(e) =>
//             setHumidity(Number(e.target.value))
//           }
//         />

//       </div>

//       <button
//         onClick={getRecommendation}
//         className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
//       >
//         Get Recommendation
//       </button>

//       {result && (
//         <div className="mt-8 bg-green-50 p-6 rounded-2xl">

//           <h3 className="text-2xl font-bold text-green-700">
//             {result.recommended_crop}
//           </h3>

//           <p className="mt-2">
//             Confidence: {result.confidence}%
//           </p>

//           <p>
//             Expected Profit:
//             ₹{result.expected_profit}
//           </p>

//           <p className="mt-2 text-gray-700">
//             {result.reason}
//           </p>

//         </div>
//       )}

//     </div>
//   );
// }