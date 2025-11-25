import React from "react";

export const StakeSelector = ({
  selectedStake,
  setSelectedStake,
  onSpin,
  onDoubleStake,
  isSpinning = false,
}) => {
  const stakeOptions = ["0.0005", "0.001", "0.002", "0.005"];

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-300">Select Stake</h3>

      <div className="flex flex-wrap gap-2">
        {stakeOptions.map((stake) => (
          <button
            key={stake}
            className={`px-4 py-2 rounded-lg transition-all font-medium ${selectedStake === stake
                ? "bg-[#ffae2c] text-[#0e1624]"
                : "bg-[#1a2536] text-white hover:bg-[#2a3546]"
              } ${isSpinning ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !isSpinning && setSelectedStake(stake)}
            disabled={isSpinning}
          >
            {stake} BTC
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className={`bg-[#ffae2c] hover:bg-[#d6b25e] text-[#0e1624] font-semibold px-6 py-3 rounded-lg transition-all ${isSpinning ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
            }`}
        >
          {isSpinning ? "Spinning..." : "Spin Now"}
        </button>

        <button
          onClick={onDoubleStake}
          disabled={isSpinning}
          className={`bg-[#2e7c83] hover:bg-[#3a9299] text-white font-semibold px-6 py-3 rounded-lg transition-all ${isSpinning ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
            }`}
        >
          Double Stake
        </button>
      </div>
    </div>
  );
};
