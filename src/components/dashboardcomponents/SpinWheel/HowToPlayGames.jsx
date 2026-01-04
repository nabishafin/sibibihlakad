import React from "react";
import { useGetSpinWheelStatsQuery } from "@/redux/features/games/gameApi";

export const HowToPlayGames = () => {
  const { data: statsData, isLoading } = useGetSpinWheelStatsQuery();
  const stats = statsData?.data || {};

  const steps = [
    { id: 1, text: "Select your stake amount" },
    { id: 2, text: 'Click "Spin Now" to start the wheel' },
    { id: 3, text: "The wheel will stop on a random segment" },
    { id: 4, text: "If it lands on a multiplier, you win!" },
    { id: 5, text: "Your winnings are automatically added to your balance" },
  ];

  const gameStats = [
    { label: "RTP:", value: stats.rtp || "97.5%" },
    {
      label: "Min Stake:",
      value: stats.minStake ? `${stats.minStake} BTC` : "0.0005 BTC",
    },
    { label: "Final State:", value: stats.finalState || "10x Stake" },
  ];

  return (
    <div className="rounded-lg p-4 text-sm bg-[#0B121D]">
      <h3 className="text-lg font-bold mb-3">How to Play</h3>

      {/* Steps */}
      <ol className="space-y-2">
        {steps.map((step) => (
          <li key={step.id} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
              {step.id}
            </span>
            <span className="ml-2">{step.text}</span>
          </li>
        ))}
      </ol>

      {/* Game Stats */}
      <div className="mt-4 bg-[#1a2536] p-3 rounded-md text-xs">
        {gameStats.map((stat, index) => (
          <div
            key={index}
            className={`flex justify-between ${index !== gameStats.length - 1 ? "mb-1" : ""
              }`}
          >
            <span>{stat.label}</span>
            <span className="font-bold text-[#ffae2c]">
              {isLoading ? "..." : stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
