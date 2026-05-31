"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

interface Price {
  crop: string;
  msp: number;
  market: number;
  trend: string;
}

export default function MarketInsights() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await API.get("/market-prices");

      setPrices(response.data.prices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-4xl font-black">
            📈 Market Intelligence
          </h2>

          <p className="text-slate-500 mt-2">
            Real-time crop pricing and market trends
          </p>

        </div>

        <div className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
          Live Data
        </div>

      </div>

      {loading ? (

        <p>Loading market data...</p>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">Crop</th>
                <th className="text-left py-4">MSP</th>
                <th className="text-left py-4">Market Price</th>
                <th className="text-left py-4">Trend</th>

              </tr>

            </thead>

            <tbody>

              {prices.map((item) => (

                <tr
                  key={item.crop}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-5 font-semibold">
                    {item.crop}
                  </td>

                  <td>
                    ₹{item.msp}
                  </td>

                  <td className="font-bold text-green-600">
                    ₹{item.market}
                  </td>

                  <td className="text-green-600 font-semibold">
                    {item.trend}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}