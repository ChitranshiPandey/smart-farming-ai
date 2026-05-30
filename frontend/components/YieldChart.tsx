"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4">
        🌾 Yield Analytics
      </h3>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="yield"
              stroke="#16a34a"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}