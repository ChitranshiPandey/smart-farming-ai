"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Account Created Successfully 🚀"
        );

        router.push("/login");
      } else {
        alert(
          data.message ||
            "Signup Failed"
        );
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex bg-black">

      {/* LEFT SIDE */}

      <div className="hidden lg:block relative w-1/2">

        <Image
          src="/images/farmer.jpg"
          alt="Farmer"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 p-14 flex flex-col justify-center text-white">

          <h1 className="text-5xl font-bold mb-10">
            AgriSmart
            <span className="text-lime-400">
              {" "}
              AI
            </span>
          </h1>

          <h2 className="text-7xl font-bold leading-tight max-w-xl">
            Smart Farming,
            <br />
            Better Yield,
            <br />
            <span className="text-lime-400">
              Better Future
            </span>
          </h2>

          <p className="mt-8 text-xl text-gray-200 max-w-lg">
            AI-powered crop prediction,
            disease detection,
            weather intelligence,
            and farming insights.
          </p>

          <div className="flex gap-6 mt-10">

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl w-48">
              <h3 className="text-5xl font-bold text-lime-400">
                50K+
              </h3>

              <p className="mt-2">
                Farmers Helped
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl w-48">
              <h3 className="text-5xl font-bold text-lime-400">
                92%
              </h3>

              <p className="mt-2">
                Prediction Accuracy
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#02150b] via-[#072c16] to-[#041b10]">

        <div className="w-full max-w-xl p-8">

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-10 shadow-2xl">

            <div className="text-center">

              <div className="w-24 h-24 rounded-full border border-lime-500 mx-auto flex items-center justify-center text-4xl mb-6">
                🌾
              </div>

              <h2 className="text-5xl font-bold text-white">
                Create Account 🌾
              </h2>

              <p className="text-slate-400 mt-4">
                Join AgriSmart AI and
                start smart farming
              </p>

            </div>

            <form
              onSubmit={handleSignup}
              className="mt-10 space-y-5"
            >

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-lime-500 to-green-500 text-black hover:scale-[1.02] transition"
              >
                {loading
                  ? "Creating..."
                  : "Create Account"}
              </button>

            </form>

            <div className="text-center mt-8">

              <p className="text-slate-400">
                Already have an account?
              </p>

              <button
                onClick={() =>
                  router.push("/login")
                }
                className="text-lime-400 font-semibold mt-2"
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}


























// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSignup() {
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//   setMessage("✅ Account created successfully!");

//   setTimeout(() => {
//     router.push("/login");
//   }, 1500);
// } else {
//         setMessage(data.message || "Signup failed");
//       }
//     } catch (error) {
//       setMessage("❌ Something went wrong");
//     }

//     setLoading(false);
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
//       <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

//         <h1 className="text-4xl font-bold text-center mb-2">
//           🌾 AgriSmart AI
//         </h1>

//         <p className="text-center text-gray-500 mb-8">
//           Create your account
//         </p>

//         <div className="space-y-4">

//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full border p-4 rounded-xl"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-4 rounded-xl"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border p-4 rounded-xl"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={handleSignup}
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl"
//           >
//             {loading ? "Creating..." : "Create Account"}
//           </button>

//           {message && (
//             <div className="text-center mt-4">
//               {message}
//             </div>
//           )}

//         </div>

//       </div>
//     </main>
//   );
// }