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

      setReply(data.reply || "No response");
    } catch {
      setReply("Backend connection failed");
    }

    setLoading(false);
  }

 return (
  <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800">

    <h3 className="text-3xl font-bold mb-2">
      🤖 AI Assistant
    </h3>

    <p className="text-slate-400 mb-6">
      Ask anything about farming
    </p>

    <div className="flex gap-3 mb-6">
      <button className="px-4 py-2 rounded-xl bg-purple-500/20">
        Best Crops
      </button>

      <button className="px-4 py-2 rounded-xl bg-purple-500/20">
        Irrigation
      </button>

      <button className="px-4 py-2 rounded-xl bg-purple-500/20">
        Disease
      </button>
    </div>

    <textarea
      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl"
      rows={4}
      placeholder="Ask AI..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <button
      onClick={askAI}
      className="mt-6 w-full bg-green-500 hover:bg-green-600 py-4 rounded-2xl font-bold"
    >
      {loading ? "Thinking..." : "Ask AI"}
    </button>

    {reply && (
      <div className="mt-6 bg-slate-900 border border-slate-700 p-4 rounded-2xl">
        {reply}
      </div>
    )}

  </div>
);
}







// "use client";

// import { useState } from "react";

// export default function AIChat() {
//   const [message, setMessage] = useState("");
//   const [reply, setReply] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function askAI() {
//     if (!message) return;

//     setLoading(true);

//     try {
//       const res = await fetch(
//         "http://127.0.0.1:8000/chat",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message,
//           }),
//         }
//       );

//       const data = await res.json();

//       setReply(
//         data.reply ||
//         data.error ||
//         "No response received"
//       );

//     } catch (error) {
//       setReply("Backend connection failed");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="bg-white rounded-3xl p-6 shadow-lg">

//       <h3 className="text-2xl font-bold mb-4">
//         🤖 AgriSmart AI Assistant
//       </h3>

//       <textarea
//         className="w-full border p-3 rounded-xl"
//         rows={4}
//         placeholder="Ask anything about farming..."
//         value={message}
//         onChange={(e) =>
//           setMessage(e.target.value)
//         }
//       />

//       <button
//         onClick={askAI}
//         className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl"
//       >
//         {loading ? "Thinking..." : "Ask AI"}
//       </button>

//       {reply && (
//         <div className="mt-6 p-4 bg-green-50 rounded-xl">
//           <h4 className="font-bold mb-2">
//             AI Response:
//           </h4>

//           <p>{reply}</p>
//         </div>
//       )}

//     </div>
//   );
// }