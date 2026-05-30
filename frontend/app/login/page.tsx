"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {

  localStorage.setItem(
    "userName",
    data.user.name
  );

  localStorage.setItem(
    "userEmail",
    data.user.email
  );

  alert("Login Successful 🚀");

  window.location.href =
    "/dashboard";
} else {
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-3 rounded w-full"
        >
          Login
        </button>
      </form>

    </div>
  );
}