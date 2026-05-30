"use client";

import { useState } from "react";

export default function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function detectDisease() {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "http://127.0.0.1:8000/disease-detect",
        {
          method: "POST",
          body: formData,
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

        <div className="text-4xl">
          🩺
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Disease Detection
          </h2>

          <p className="text-slate-400">
            Upload a leaf image for AI analysis
          </p>
        </div>

      </div>

      {/* Upload Area */}

      <div className="border-2 border-dashed border-slate-700 rounded-3xl p-10 text-center bg-slate-900/40">

        <div className="text-6xl mb-4">
          🌿
        </div>

        <p className="text-slate-300 mb-4">
          Upload Leaf Image
        </p>

        <input
          type="file"
          accept="image/*"
          className="text-white"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        {file && (
          <p className="mt-4 text-green-400">
            {file.name}
          </p>
        )}

      </div>

      {/* Button */}

      <button
        onClick={detectDisease}
        className="mt-6 bg-green-500 hover:bg-green-600 transition-all px-8 py-4 rounded-2xl text-white font-bold"
      >
        {loading
          ? "Analyzing..."
          : "Analyze Leaf"}
      </button>

      {/* Result */}

      {result && (

        <div className="mt-8 bg-gradient-to-r from-red-500/10 to-green-500/10 border border-slate-700 rounded-3xl p-6">

          <h3 className="text-2xl font-bold text-green-400 mb-4">
            AI Diagnosis
          </h3>

          <div className="bg-slate-900/60 rounded-2xl p-5">

            <pre className="whitespace-pre-wrap text-slate-300">
              {result.analysis}
            </pre>

          </div>

        </div>

      )}

    </div>
  );
}


















// "use client";

// import { useState } from "react";

// export default function DiseaseDetection() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);

//   async function detectDisease() {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch(
//       "http://127.0.0.1:8000/disease-detect",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await res.json();
//     setResult(data);
//   }

//   return (
//     <div className="bg-white rounded-3xl p-6 shadow-lg">

//       <h2 className="text-3xl font-bold mb-6">
//         🩺 Disease Detection
//       </h2>

//       <input
//         type="file"
//         onChange={(e) =>
//           setFile(e.target.files?.[0] || null)
//         }
//       />

//       <button
//         onClick={detectDisease}
//         className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl"
//       >
//         Analyze Leaf
//       </button>

//       {result && (
//         <div className="mt-6 bg-green-50 p-4 rounded-xl">

//           {result && (
//   <div className="mt-6 bg-green-50 p-4 rounded-xl">

//     <h3 className="text-xl font-bold mb-3">
//       AI Diagnosis
//     </h3>

//     <pre className="whitespace-pre-wrap">
//       {result.analysis}
//     </pre>

//   </div>
// )}

//           <p>
//             Confidence: {result.confidence}%
//           </p>

//           <p>
//             Treatment: {result.treatment}
//           </p>

//         </div>
//       )}

//     </div>
//   );
// }