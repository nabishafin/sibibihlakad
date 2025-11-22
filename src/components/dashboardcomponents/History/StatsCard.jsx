import React from "react";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

export function StatsCard({ title, value, trend, valueColor = "text-white" }) {
  return (
    <div className="bg-[#0B121D] rounded-xl p-6 border border-gray-800">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {trend && (
          <div
            className={`${
              trend === "up" ? "text-[#16a34a]" : "text-[#f34f4f]"
            }`}
          >
            {trend === "up" ? (
              <TrendingUpIcon size={20} />
            ) : (
              <TrendingDownIcon size={20} />
            )}
          </div>
        )}
      </div>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
