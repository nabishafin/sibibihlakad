import React from "react";
export const HowToPlayGames = () => {
  return (
    <div className="bg-[#1a1f3a]/30 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">How to Play</h3>
      <ol className="space-y-4">
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#ffae2c] text-black font-bold mr-3">
            1
          </span>
          <span>Select your stake amount</span>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#ffae2c] text-black font-bold mr-3">
            2
          </span>
          <span>Click "Spin Now" to start the wheel</span>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#ffae2c] text-black font-bold mr-3">
            3
          </span>
          <span>The wheel will stop on a random segment</span>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#ffae2c] text-black font-bold mr-3">
            4
          </span>
          <span>If it lands on a multiplier, you win!</span>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#ffae2c] text-black font-bold mr-3">
            5
          </span>
          <span>Your winnings are automatically added to your balance</span>
        </li>
      </ol>
      <div className="mt-6 bg-[#1a1f3a] p-4 rounded-md">
        <div className="flex justify-between mb-2">
          <span>RTP:</span>
          <span>97.5%</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Min Stake:</span>
          <span>0.0005 BTC</span>
        </div>
        <div className="flex justify-between">
          <span>Final State:</span>
          <span>10x Stake</span>
        </div>
      </div>
    </div>
  );
};
