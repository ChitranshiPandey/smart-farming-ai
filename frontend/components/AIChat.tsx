"use client";

import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!message) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      setReply(
        data.reply ||
        data.error ||
        "No response received"
      );

    } catch (error) {
      setReply("Backend connection failed");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h3 className="text-2xl font-bold mb-4">
        🤖 AgriSmart AI Assistant
      </h3>

      <textarea
        className="w-full border p-3 rounded-xl"
        rows={4}
        placeholder="Ask anything about farming..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={askAI}
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h4 className="font-bold mb-2">
            AI Response:
          </h4>

          <p>{reply}</p>
        </div>
      )}

    </div>
  );
}