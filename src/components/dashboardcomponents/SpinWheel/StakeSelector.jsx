import React from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";

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
        <AnimatedButton
          text={isSpinning ? "Spinning..." : "Spin Now"}
          fillColor1="#FFCE00"
          fillColor2="#FFB800"
          onClick={onSpin}
          className={isSpinning ? "opacity-50 cursor-not-allowed" : ""}
        />

        <AnimatedButton
          text="Double Stake"
          fillColor1="#2e7c83"
          fillColor2="#3a9299"
          onClick={onDoubleStake}
          className={isSpinning ? "opacity-50 cursor-not-allowed" : ""}
        />
      </div>
    </div>
  );
};
