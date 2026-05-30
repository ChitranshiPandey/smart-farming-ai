"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
  setMessage("✅ Account created successfully!");

  setTimeout(() => {
    router.push("/login");
  }, 1500);
} else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("❌ Something went wrong");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2">
          🌾 AgriSmart AI
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {message && (
            <div className="text-center mt-4">
              {message}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}