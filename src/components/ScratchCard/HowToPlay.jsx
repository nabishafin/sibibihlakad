import React from "react";

export function HowToPlay() {
  return (
    <div className="rounded-lg p-4 text-sm bg-[#0B121D]">
      <h3 className="text-lg font-bold mb-3">How to Play</h3>
      <ol className="space-y-2">
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            1
          </span>
          <span>Select your stake amount</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            2
          </span>
          <span>Click "Play Now" to start</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            3
          </span>
          <span>Scratch the card to reveal symbols</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            4
          </span>
          <span>Match 3 BTC symbols to win</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            5
          </span>
          <span>Click "Reveal All" to see the full card</span>
        </li>
      </ol>

      <div className="bg-[#1a2536] rounded-md p-3 mt-4 text-xs">
        <div className="flex justify-between mb-1">
          <span>RTP:</span>
          <span>97.5%</span>
        </div>
        <div className="flex justify-between mb-1">
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
}
