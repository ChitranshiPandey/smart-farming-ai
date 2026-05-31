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
        crop: formData.crop_type,
        soil_type: formData.soil_type,
        rainfall: Number(formData.rainfall),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        fertilizer: 120,
        pesticide: 30,
      });

      console.log(response.data);

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-10 relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-72 h-72 bg-green-400/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        <div className="mb-10">
          <div className="inline-flex px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-4">
            🤖 AI Forecast Engine
          </div>

          
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* FORM */}

          <div className="space-y-5">

            <input
              type="text"
              name="soil_type"
              placeholder="🌱 Soil Type"
              onChange={handleChange}
              className="premium-input"
            />

            <input
              type="text"
              name="crop_type"
              placeholder="🌾 Crop Type"
              onChange={handleChange}
              className="premium-input"
            />

            <input
              type="number"
              name="rainfall"
              placeholder="🌧 Rainfall (mm)"
              onChange={handleChange}
              className="premium-input"
            />

            <input
              type="number"
              name="temperature"
              placeholder="🌡 Temperature (°C)"
              onChange={handleChange}
              className="premium-input"
            />

            <input
              type="number"
              name="humidity"
              placeholder="💧 Humidity (%)"
              onChange={handleChange}
              className="premium-input"
            />

            <button
              onClick={handleSubmit}
              className="
              w-full
              gradient-green
              text-white
              py-4
              rounded-2xl
              font-bold
              text-lg
              shadow-xl
              transition
              hover:scale-[1.02]
              "
            >
              {loading ? "Analyzing..." : "🚀 Predict Yield"}
            </button>

          </div>

          {/* RESULT PANEL */}

          <div className="premium-card p-8">

            <p className="text-slate-500">
              Predicted Yield
            </p>

            <h2 className="text-7xl font-black text-green-600 mt-2">
              {result?.predicted_yield || "32.5"}
            </h2>

            <p className="text-slate-500">
              Quintal / Acre
            </p>

            <div className="mt-6">

              <span
                className="
                px-4 py-2
                rounded-full
                bg-green-100
                text-green-700
                font-bold
                "
              >
                +18% Better Than Average
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-green-50 p-4 rounded-2xl">
                <p className="text-sm text-slate-500">
                  Soil Health
                </p>

                <h3 className="font-bold text-green-700">
                  Excellent
                </h3>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-sm text-slate-500">
                  Weather
                </p>

                <h3 className="font-bold text-blue-700">
                  Favorable
                </h3>
              </div>

              <div className="bg-yellow-50 p-4 rounded-2xl">
                <p className="text-sm text-slate-500">
                  Risk
                </p>

                <h3 className="font-bold text-yellow-700">
                  Low
                </h3>
              </div>

              <div className="bg-purple-50 p-4 rounded-2xl">
                <p className="text-sm text-slate-500">
                  Confidence
                </p>

                <h3 className="font-bold text-purple-700">
                  92%
                </h3>
              </div>

            </div>

          </div>

        </div>

        {result && (

          <div className="mt-10 premium-card p-8">

            <h3 className="text-3xl font-black mb-6">
              📊 Prediction Results
            </h3>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="stat-card">
                <h4>🌾 Yield</h4>
                <p>{result.predicted_yield}</p>
              </div>

              <div className="stat-card">
                <h4>📈 Change</h4>
                <p>{result.change_vs_average || 18}%</p>
              </div>

              <div className="stat-card">
                <h4>🌱 Crop</h4>
                <p>{result.crop || formData.crop_type}</p>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}




































// "use client";

// import { useState } from "react";
// import API from "@/lib/api";

// export default function PredictionForm() {

//   const [formData, setFormData] = useState({
//     soil_type: "",
//     crop_type: "",
//     rainfall: "",
//     temperature: "",
//     humidity: "",
//     land_size: "",
//   });

//   const [result, setResult] = useState<any>(null);

//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {

//     try {

//       setLoading(true);

//       const response = await API.post("/predict", {

//         soil_type: formData.soil_type,
//         crop_type: formData.crop_type,
//         rainfall: Number(formData.rainfall),
//         temperature: Number(formData.temperature),
//         humidity: Number(formData.humidity),
//         land_size: Number(formData.land_size),

//       });

//       console.log(response.data);

//       setResult(response.data.data);

//     } catch (error) {

//       console.log("ERROR:", error);

//       alert("Backend connection failed");

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (

//    <div
//   className="
//   glass-card
//   p-10
//   relative
//   overflow-hidden
// "
// >

//       <h2 className="text-3xl font-bold mb-6 text-green-700">
//         AI Crop Prediction
//       </h2>

//       <div className="grid md:grid-cols-2 gap-4">

//         <input
//           type="text"
//           name="soil_type"
//           placeholder="Soil Type"
//           onChange={handleChange}
//           className="p-4 rounded-xl border"
//         />

//         <input
//           type="text"
//           name="crop_type"
//           placeholder="Crop Type"
//           onChange={handleChange}
//           className="p-4 rounded-xl border"
//         />

//         <input
//           type="number"
//           name="rainfall"
//           placeholder="Rainfall"
//           onChange={handleChange}
//           className="p-4 rounded-xl border"
//         />

//         <input
//           type="number"
//           name="temperature"
//           placeholder="Temperature"
//           onChange={handleChange}
//           className="p-4 rounded-xl border"
//         />

//         <input
//           type="number"
//           name="humidity"
//           placeholder="Humidity"
//           onChange={handleChange}
//           className="p-4 rounded-xl border"
//         />

//         <input
//           type="number"
//           name="land_size"
//           placeholder="Land Size"
//           onChange={handleChange}
//           className="p-4 rounded-xl border"
//         />

//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
//       >

//         {loading ? "Predicting..." : "Predict Now"}

//       </button>

//       {result && (

//         <div className="mt-8 bg-green-50 p-6 rounded-2xl">

//           <h3 className="text-2xl font-bold mb-4">
//             Prediction Result
//           </h3>

//           <div className="space-y-2 text-lg">

//             <p>
//               🌾 Yield:
//               <span className="font-bold ml-2">
//                 {result.predicted_yield}
//               </span>
//             </p>

//             <p>
//               💰 Profit:
//               <span className="font-bold ml-2">
//                 ₹{result.profit_estimate}
//               </span>
//             </p>

//             <p>
//               💧 Water:
//               <span className="font-bold ml-2">
//                 {result.water_requirement} L
//               </span>
//             </p>

//             <p>
//               ⚠️ Risk:
//               <span className="font-bold ml-2">
//                 {result.risk_level}
//               </span>
//             </p>

//           </div>

//         </div>

//       )}

//     </div>
//   );
