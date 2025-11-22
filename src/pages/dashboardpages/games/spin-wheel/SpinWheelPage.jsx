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
    // Reset after 5 seconds (matching animation duration)
    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };
  const handleDoubleStake = () => {
    const currentStake = parseFloat(selectedStake);
    setSelectedStake((currentStake * 2).toFixed(4));
  };
  return (
    <div className="flex flex-col  bg-[#0E1624] text-white rounded-2xl ">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col md:flex-row p-4 overflow-auto">
          <div className="flex-1  mx-auto">
            <div className=" rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg text-gray-400">Your Balance</h2>
                  <p className="text-3xl font-bold">{balance} BTC</p>
                </div>
                <button className="bg-[#ffae2c] hover:bg-[#d6b25e] text-black font-medium px-4 py-2 rounded-lg flex items-center transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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

              <SpinWheelComponent isSpinning={isSpinning} />

              <StakeSelector
                selectedStake={selectedStake}
                setSelectedStake={setSelectedStake}
                onSpin={handleSpin}
                onDoubleStake={handleDoubleStake}
                isSpinning={isSpinning}
              />
            </div>
          </div>

          <div className="md:w-80 border-l-[1px] border-gray-800 md:ml-4 space-y-6">
            <HowToPlayGames />
            <GameHistoryGame />
          </div>
        </main>
      </div>
    </div>
  );
}
export default SpinWheelPage;
