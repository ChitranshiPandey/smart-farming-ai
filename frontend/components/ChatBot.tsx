"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function ChatBot() {

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message) return;

    try {

      setLoading(true);

      const response = await API.post("/chat", {
        message,
      });

      setReply(response.data.reply);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="bg-white p-8 rounded-3xl shadow-2xl border">

      <div className="mb-6">

        <h2 className="text-3xl font-bold">
          🤖 AI Farming Assistant
        </h2>

        <p className="text-gray-500 mt-2">
          Ask farming questions and get AI-powered advice.
        </p>

      </div>

      <div className="space-y-4">

        <textarea
          placeholder="Ask about crops, fertilizers, irrigation..."
          className="w-full h-32 border rounded-2xl p-4 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="gradient-green text-white px-6 py-3 rounded-2xl"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {reply && (

          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl mt-6">

            <h3 className="font-bold text-green-700 mb-2">
              AI Response
            </h3>

            <p className="text-gray-700 whitespace-pre-line">
              {reply}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}