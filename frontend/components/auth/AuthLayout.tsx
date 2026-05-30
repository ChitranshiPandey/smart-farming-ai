import Image from "next/image";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="min-h-screen flex bg-[#021b14] overflow-hidden">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-[55%] relative">

        <Image
          src="/images/farmer.jpg"
          alt="Farmer"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b14]/80 to-transparent" />

        <div className="absolute z-20 p-12 text-white h-full flex flex-col">

          <div className="mb-12">

            <h1 className="text-5xl font-bold">
              AgriSmart
              <span className="text-lime-400">
                {" "}AI
              </span>
            </h1>

          </div>

          <div className="max-w-xl">

            <h2 className="text-7xl font-bold leading-tight">
              Smart Farming,
              <br />
              Better Yield,
              <br />
              <span className="text-lime-400">
                Better Future
              </span>
            </h2>

            <p className="mt-8 text-xl text-slate-200">
              AI-powered crop prediction,
              disease detection,
              weather intelligence,
              and farming insights.
            </p>

          </div>

          <div className="mt-12 flex gap-5">

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 w-52">
              <h3 className="text-5xl font-bold text-lime-400">
                50K+
              </h3>

              <p className="mt-2">
                Farmers Helped
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 w-52">
              <h3 className="text-5xl font-bold text-lime-400">
                92%
              </h3>

              <p className="mt-2">
                Prediction Accuracy
              </p>
            </div>

          </div>

          <div className="mt-auto">

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 flex justify-between">

              <span>🌾 Crop Prediction</span>

              <span>🩺 Disease Detection</span>

              <span>🌦 Weather AI</span>

              <span>📈 Smart Insights</span>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex-1 relative flex items-center justify-center">

        <div className="absolute inset-0">

          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-green-500/20 blur-[140px]" />

          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-lime-400/20 blur-[140px]" />

        </div>

        <div className="relative z-20 w-full max-w-xl">

          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 shadow-[0_0_80px_rgba(0,255,100,0.1)]">

            <div className="text-center mb-10">

              <div className="w-24 h-24 rounded-full border border-lime-400 flex items-center justify-center mx-auto mb-6 text-4xl">
                🌾
              </div>

              <h1 className="text-5xl font-bold text-white">
                {title}
              </h1>

              <p className="text-slate-300 mt-4">
                {subtitle}
              </p>

            </div>

            {children}

          </div>

        </div>

      </div>

    </main>
  );
}