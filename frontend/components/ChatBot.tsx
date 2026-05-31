"use client";

import { useState } from "react";
import API from "@/lib/api";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "🌾 Hello Farmer! I am AgriGPT. Ask me anything about crops, weather, fertilizers, irrigation or diseases.",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      setLoading(true);

      const response = await API.post("/chat", {
        message: currentMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.data.reply ||
            "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Unable to connect to AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Best crop for black soil?",
    "How much water does wheat need?",
    "Best fertilizer for rice?",
    "Weather impact on crops?",
  ];

  return (
    <div className="glass-card p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-black">
            🤖 AgriGPT Assistant
          </h2>

          <p className="text-slate-500">
            AI Farming Expert
          </p>

        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          Online
        </div>

      </div>

      {/* QUICK PROMPTS */}

      <div className="flex flex-wrap gap-3 mb-6">

        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setMessage(prompt)}
            className="px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm hover:bg-green-100"
          >
            {prompt}
          </button>
        ))}

      </div>

      {/* CHAT AREA */}

      <div className="bg-white rounded-3xl border p-5 h-[450px] overflow-y-auto space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] px-5 py-4 rounded-3xl ${
                msg.role === "user"
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >

              <div className="text-sm font-semibold mb-1">

                {msg.role === "user"
                  ? "👨 Farmer"
                  : "🤖 AgriGPT"}

              </div>

              <p className="whitespace-pre-wrap">
                {msg.content}
              </p>

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-slate-100 px-5 py-4 rounded-3xl">

              🤖 AgriGPT is thinking...

            </div>

          </div>

        )}

      </div>

      {/* INPUT */}

      <div className="flex gap-4 mt-6">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about crops, weather, fertilizers..."
          className="flex-1 border rounded-2xl px-5 py-4"
        />

        <button
          onClick={sendMessage}
          className="gradient-green text-white px-8 rounded-2xl"
        >
          Send
        </button>

      </div>

    </div>
  );
}




























// "use client";

// import { useState } from "react";
// import API from "@/lib/api";

// export default function ChatBot() {

//   const [message, setMessage] = useState("");

//   const [reply, setReply] = useState("");

//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {

//     if (!message) return;

//     try {

//       setLoading(true);

//       const response = await API.post("/chat", {
//         message,
//       });

//       setReply(response.data.reply);

//     } catch (error) {

//       console.log(error);

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (

//     <div className="bg-white p-8 rounded-3xl shadow-2xl border">

//       <div className="mb-6">

//         <h2 className="text-3xl font-bold">
//           🤖 AI Farming Assistant
//         </h2>

//         <p className="text-gray-500 mt-2">
//           Ask farming questions and get AI-powered advice.
//         </p>

//       </div>

//       <div className="space-y-4">

//         <textarea
//           placeholder="Ask about crops, fertilizers, irrigation..."
//           className="w-full h-32 border rounded-2xl p-4 outline-none"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendMessage}
//           className="gradient-green text-white px-6 py-3 rounded-2xl"
//         >
//           {loading ? "Thinking..." : "Ask AI"}
//         </button>

//         {reply && (

//           <div className="bg-green-50 border border-green-200 p-6 rounded-2xl mt-6">

//             <h3 className="font-bold text-green-700 mb-2">
//               AI Response
//             </h3>

//             <p className="text-gray-700 whitespace-pre-line">
//               {reply}
//             </p>

//           </div>

//         )}

//       </div>

//     </div>
//   );
// }