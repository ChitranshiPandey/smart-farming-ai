"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("test@agri.com");
  const [password, setPassword] = useState("123456");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
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

        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Login Failed");
    }
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
              {" "}AI
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
                Welcome Back 👋
              </h2>

              <p className="text-slate-400 mt-4">
                Login to your AgriSmart account
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-5"
            >

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
                className="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-lime-500 to-green-500 text-black hover:scale-[1.02] transition"
              >
                Login
              </button>

            </form>

            <div className="text-center mt-8">

              <p className="text-slate-400">
                Don't have an account?
              </p>

              <button
                onClick={() =>
                  router.push("/signup")
                }
                className="text-lime-400 font-semibold mt-2"
              >
                Create Account
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
// import Image from "next/image";
// import Button from "@/components/shared/Button";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem(
//           "userName",
//           data.user.name
//         );

//         localStorage.setItem(
//           "userEmail",
//           data.user.email
//         );

//         router.push("/dashboard");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert("Login Failed");
//     }
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 flex">

//       {/* LEFT PANEL */}

//       <div className="hidden lg:flex w-1/2 relative">

//         <Image
//           src="/images/farmer.jpg"
//           alt="Farmer"
//           fill
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-black/30" />

//         <div className="absolute z-10 p-12 text-white">

//           <h1 className="text-5xl font-bold mb-6">
//             🌾 AgriSmart AI
//           </h1>

//           <h2 className="text-4xl font-bold leading-tight mb-6">
//             Smart Farming,
//             <br />
//             Better Yield,
//             <br />
//             Better Future
//           </h2>

//           <p className="text-lg max-w-md opacity-90">
//             AI-powered crop prediction,
//             disease detection,
//             weather intelligence,
//             and farming insights.
//           </p>

//           <div className="grid grid-cols-2 gap-4 mt-10">

//             <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
//               <h3 className="text-2xl font-bold">
//                 50K+
//               </h3>
//               <p>Farmers Helped</p>
//             </div>

//             <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
//               <h3 className="text-2xl font-bold">
//                 92%
//               </h3>
//               <p>Prediction Accuracy</p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* RIGHT PANEL */}

//       <div className="flex-1 flex items-center justify-center p-6">

//         <div className="w-full max-w-md">

//           <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white">

//             <h2 className="text-4xl font-bold mb-2">
//               Welcome Back 👋
//             </h2>

//             <p className="text-gray-500 mb-8">
//               Login to your AgriSmart account
//             </p>

//             <form
//               onSubmit={handleLogin}
//               className="space-y-5"
//             >

//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full p-4 rounded-2xl border"
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(e.target.value)
//                 }
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full p-4 rounded-2xl border"
//                 value={password}
//                 onChange={(e) =>
//                   setPassword(e.target.value)
//                 }
//               />

//               <Button
//                 type="submit"
//                 className="w-full"
//               >
//                 Login
//               </Button>

//             </form>

//             <div className="mt-6 text-center">

//               <p className="text-gray-500">
//                 Don't have an account?
//               </p>

//               <button
//                 onClick={() =>
//                   router.push("/signup")
//                 }
//                 className="text-green-600 font-semibold mt-2"
//               >
//                 Create Account
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>

//     </main>
//   );
// }















// "use client";

// // import { useState } from "react";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Button from "@/components/shared/Button";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   async function handleLogin(e: any) {
//     e.preventDefault();

//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     const data = await res.json();

//    if (data.success) {

//   localStorage.setItem(
//     "userName",
//     data.user.name
//   );

//   localStorage.setItem(
//     "userEmail",
//     data.user.email
//   );

//   router.push("/dashboard");
// } else {
//       alert(data.message);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">

//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-lg w-96"
//       >
//         <h1 className="text-3xl font-bold mb-6">
//           Login
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 w-full mb-4"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 w-full mb-4"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//         />

//         <Button
//   type="submit"
//   className="w-full"
// >
//   Login
// </Button>
//       </form>

//     </div>
//   );
// }