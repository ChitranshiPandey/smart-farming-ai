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

  {
    month: "Jan",
    yield: 20,
  },

  {
    month: "Feb",
    yield: 28,
  },

  {
    month: "Mar",
    yield: 35,
  },

  {
    month: "Apr",
    yield: 30,
  },

  {
    month: "May",
    yield: 42,
  },

  {
    month: "Jun",
    yield: 50,
  },

];

export default function AnalyticsChart() {

  return (

    <div className="bg-white p-6 rounded-3xl shadow-xl border">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          🌾 Crop Yield Analytics
        </h2>

        <p className="text-gray-500">
          Monthly farming performance insights
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

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