import GameHistoryGame from "@/components/dashboardcomponents/SpinWheel/GameHistoryGame";
import { HowToPlayGames } from "@/components/dashboardcomponents/SpinWheel/HowToPlayGames";
import SpinWheelComponent from "@/components/dashboardcomponents/SpinWheel/SpinWheel";
import { StakeSelector } from "@/components/dashboardcomponents/SpinWheel/StakeSelector";
import React, { useState } from "react";

function SpinWheelPage() {
  const [balance, setBalance] = useState("0.00");
  const [selectedStake, setSelectedStake] = useState("0.001");
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Reset after 10 seconds (matching animation duration)
    setTimeout(() => {
      setIsSpinning(false);
    }, 10000);
  };

  const handleDoubleStake = () => {
    const currentStake = parseFloat(selectedStake);
    setSelectedStake((currentStake * 2).toFixed(4));
  };

  return (
    <div className="flex flex-col bg-[#0e1624] text-white rounded-2xl">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col md:flex-row p-6 overflow-auto">

          {/* Left Section - Game Area */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="space-y-6">

              {/* Balance & New Card Button */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Your Balance</p>
                  <p className="text-3xl font-bold">{balance} BTC</p>
                </div>
                <button className="flex items-center gap-2 border-2 border-[#ffae2c] text-[#ffae2c] px-4 py-2 rounded-lg hover:bg-[#ffae2c] hover:text-[#0e1624] transition-all font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Card
                </button>
              </div>

              {/* Spin Wheel Container */}
              <div className="bg-[#0B121D] rounded-xl p-8 border border-gray-800">
                <SpinWheelComponent isSpinning={isSpinning} />
              </div>

              {/* Stake Selector */}
              <StakeSelector
                selectedStake={selectedStake}
                setSelectedStake={setSelectedStake}
                onSpin={handleSpin}
                onDoubleStake={handleDoubleStake}
                isSpinning={isSpinning}
              />
            </div>
          </div>

          {/* Right Sidebar - Info Panel */}
          <div className="md:w-[450px] md:ml-6 mt-6 md:mt-0 space-y-6">
            <HowToPlayGames />
            <GameHistoryGame />
          </div>

        </main>
      </div>
    </div>
  );
}

export default SpinWheelPage;
