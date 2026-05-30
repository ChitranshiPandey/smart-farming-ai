"use client";

import { useEffect, useState } from "react";

export default function DashboardWeather() {

  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {

    async function loadWeather() {

      try {

        const res = await fetch(
          "http://127.0.0.1:8000/weather/Delhi"
        );

        const data = await res.json();

        setWeather(data);

      } catch (err) {

        console.log(err);

      }
    }

    loadWeather();

  }, []);

  if (!weather) {

    return (

      <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl">

        <p className="text-slate-400">
          Loading Weather...
        </p>

      </div>

    );
  }

  return (

    <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl">

      <p className="text-slate-400 mb-2">
        Current Weather
      </p>

      <h2 className="text-5xl font-bold text-white">
        {weather.temperature}°C
      </h2>

      <p className="text-green-400 mt-2">
        {weather.condition}
      </p>

      <div className="grid grid-cols-2 gap-3 mt-5">

        <div className="bg-slate-900 p-3 rounded-xl">

          <p className="text-slate-400 text-sm">
            City
          </p>

          <p className="text-white">
            {weather.city}
          </p>

        </div>

        <div className="bg-slate-900 p-3 rounded-xl">

          <p className="text-slate-400 text-sm">
            Humidity
          </p>

          <p className="text-white">
            {weather.humidity}%
          </p>

        </div>

        <div className="bg-slate-900 p-3 rounded-xl">

          <p className="text-slate-400 text-sm">
            Wind
          </p>

          <p className="text-white">
            {weather.wind_speed}
          </p>

        </div>

        <div className="bg-slate-900 p-3 rounded-xl">

          <p className="text-slate-400 text-sm">
            Condition
          </p>

          <p className="text-white">
            {weather.condition}
          </p>

        </div>

      </div>

    </div>

  );
}
















// "use client";

// import { useEffect, useState } from "react";

// export default function DashboardWeather() {
//   const [weather, setWeather] = useState<any>(null);

//   useEffect(() => {
//     async function loadWeather() {
//       try {
//         const res = await fetch(
//           "http://127.0.0.1:8000/weather/Delhi"
//         );

//         const data = await res.json();

//         setWeather(data);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     loadWeather();
//   }, []);

//   if (!weather)
//     return (
//       <div className="bg-white p-6 rounded-3xl shadow-lg">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="bg-white p-6 rounded-3xl shadow-lg">

//       <p className="text-gray-500">
//         Current Weather
//       </p>

//       <h2 className="text-4xl font-bold">
//         {weather.temperature}°C
//       </h2>

//       <p>📍 {weather.city}</p>
//       <p>💧 {weather.humidity}%</p>
//       <p>🌬 {weather.wind_speed}</p>
//       <p>☁ {weather.condition}</p>

//     </div>
//   );
// }