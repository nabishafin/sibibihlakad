import React from "react";
export function HowToPlay() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">How to Play</h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c]">
            1
          </div>
          <div>Select your stake amount</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c]">
            2
          </div>
          <div>Click "Play Now" to start</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c]">
            3
          </div>
          <div>Scratch the card to reveal symbols</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c]">
            4
          </div>
          <div>Match 3 BTC symbols to win</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2536] flex items-center justify-center text-[#ffae2c]">
            5
          </div>
          <div>Click "Reveal All" to see the full card</div>
        </div>
      </div>
      <div className="bg-[#1a2536] rounded-lg p-4 mt-6">
        <div className="mb-2">RTP: 97.5%</div>
        <div className="mb-2">Min Stake: 0.0005 BTC</div>
        <div>Final State: 10x Stake</div>
      </div>
    </div>
  );
}
