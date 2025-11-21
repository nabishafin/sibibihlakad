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
    <div className="mt-6">
      <h3 className="text-center text-lg mb-4">Select Stake</h3>

      <div className="flex justify-center space-x-2 mb-6">
        {stakeOptions.map((stake) => (
          <button
            key={stake}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedStake === stake
                ? "bg-[#ffae2c] text-black font-medium"
                : "bg-[#2a353d] text-white hover:bg-[#3a454d]"
            } ${isSpinning ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !isSpinning && setSelectedStake(stake)}
            disabled={isSpinning}
          >
            {stake} BTC
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className={`bg-[#ffae2c] hover:bg-[#d6b25e] text-black font-medium px-6 py-3 rounded-md w-48 transition-all ${
            isSpinning ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSpinning ? "Spinning..." : "Spin Now"}
        </button>

        <button
          onClick={onDoubleStake}
          disabled={isSpinning}
          className={`bg-[#2a8c9a] hover:bg-[#3a9ca9] text-white font-medium px-6 py-3 rounded-md w-48 transition-all ${
            isSpinning ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          Double Stake
        </button>
      </div>
    </div>
  );
};
