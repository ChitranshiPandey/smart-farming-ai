
"use client";

import { useState } from "react";

export default function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  async function detectDisease() {
    if (!file) return;

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
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-3xl font-bold mb-6">
        🩺 Disease Detection
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={detectDisease}
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Analyze Leaf
      </button>

      {result && (
        <div className="mt-6 bg-green-50 p-4 rounded-xl">

          {result && (
  <div className="mt-6 bg-green-50 p-4 rounded-xl">

    <h3 className="text-xl font-bold mb-3">
      AI Diagnosis
    </h3>

    <pre className="whitespace-pre-wrap">
      {result.analysis}
    </pre>

  </div>
)}

          <p>
            Confidence: {result.confidence}%
          </p>

          <p>
            Treatment: {result.treatment}
          </p>

        </div>
      )}

    </div>
  );
}