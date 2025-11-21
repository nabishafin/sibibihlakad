import React from "react";

export function HowToPlay() {
  return (
    <div className="text-sm">
      <h2 className="text-lg font-bold mb-4">How to Play</h2>
      <div className="space-y-2">
        <div className="flex gap-2 items-start">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            1
          </div>
          <div>Select your stake amount</div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            2
          </div>
          <div>Click "Play Now" to start</div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            3
          </div>
          <div>Scratch the card to reveal symbols</div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            4
          </div>
          <div>Match 3 BTC symbols to win</div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c] text-xs">
            5
          </div>
          <div>Click "Reveal All" to see the full card</div>
        </div>
      </div>

      <div className="bg-[#1a2536] rounded-md p-3 mt-4 text-xs">
        <div className="mb-1">RTP: 97.5%</div>
        <div className="mb-1">Min Stake: 0.0005 BTC</div>
        <div>Final State: 10x Stake</div>
      </div>
    </div>
  );
}
