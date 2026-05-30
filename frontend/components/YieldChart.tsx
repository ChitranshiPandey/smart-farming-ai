"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", yield: 22 },
  { month: "Feb", yield: 28 },
  { month: "Mar", yield: 35 },
  { month: "Apr", yield: 31 },
  { month: "May", yield: 42 },
  { month: "Jun", yield: 48 },
];

export default function YieldChart() {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="text-3xl font-bold text-white">
            🌾 Yield Analytics
          </h3>

          <p className="text-slate-400">
            Monthly crop performance
          </p>
        </div>

        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
          +18%
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="yield"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                fill: "#22c55e",
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}














// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { month: "Jan", yield: 22 },
//   { month: "Feb", yield: 28 },
//   { month: "Mar", yield: 35 },
//   { month: "Apr", yield: 31 },
//   { month: "May", yield: 42 },
//   { month: "Jun", yield: 48 },
// ];

// export default function YieldChart() {
//   return (
//     <div className="bg-white rounded-3xl shadow-lg p-6">
//       <h3 className="text-2xl font-bold mb-4">
//         🌾 Yield Analytics
//       </h3>

//       <div className="h-80">
//         <ResponsiveContainer
//           width="100%"
//           height="100%"
//         >
//           <LineChart data={data}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />

//             <Line
//               type="monotone"
//               dataKey="yield"
//               stroke="#16a34a"
//               strokeWidth={4}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }