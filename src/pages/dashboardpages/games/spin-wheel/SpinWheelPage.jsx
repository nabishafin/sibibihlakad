import GameHistoryGame from "@/components/dashboardcomponents/SpinWheel/GameHistoryGame";
import { HowToPlayGames } from "@/components/dashboardcomponents/SpinWheel/HowToPlayGames";
import SpinWheelComponent from "@/components/dashboardcomponents/SpinWheel/SpinWheel";
import { StakeSelector } from "@/components/dashboardcomponents/SpinWheel/StakeSelector";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/redux/slices/authSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useSubmitSpinWheelResultMutation } from "@/redux/features/games/gameApi";
import toast from "react-hot-toast";

function SpinWheelPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { data: userData } = useGetMeQuery(); // Removed causing 500
  const balance = user?.wallet?.balance || 0;

  const [submitSpin, { isLoading: isSubmitting }] = useSubmitSpinWheelResultMutation();
  const [selectedStake, setSelectedStake] = useState("0.001");
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0);

  // Define segments consistent with SpinWheel component
  const SEGMENTS = [
    { multiplier: 10, weight: 5 },
    { multiplier: 5, weight: 10 },
    { multiplier: 3, weight: 15 },
    { multiplier: 0, weight: 20 }, // MISS
    { multiplier: 2, weight: 20 },
    { multiplier: 1, weight: 25 },
    { multiplier: 0, weight: 20 }, // MISS
    { multiplier: 0, weight: 10 }, // 0x
  ];

  const handleSpin = () => {
    // Removed balance check to allow testing
    if (isSpinning) return;

    // Determine Result Client-Side
    const totalWeight = SEGMENTS.reduce((sum, s) => sum + s.weight, 0);
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    let index = 0;

    for (let i = 0; i < SEGMENTS.length; i++) {
      currentWeight += SEGMENTS[i].weight;
      if (random <= currentWeight) {
        index = i;
        break;
      }
    }

    setTargetIndex(index);
    setIsSpinning(true);
  };

  const onSpinComplete = async (finalIndex) => {
    setIsSpinning(false);

    // Use the index directly from the wheel to be 100% sure it matches visual
    const result = SEGMENTS[finalIndex];
    const stake = parseFloat(selectedStake);
    const winAmount = stake * result.multiplier;
    const isWin = winAmount > 0;

    // Show toast notification based on result
    if (isWin) {
      toast.success(`🎰 You Won! ₿${winAmount.toFixed(4)} BTC (${result.multiplier}x)`, { duration: 4000 });
    } else {
      toast.error('No win this time. Try again!', { duration: 3000 });
    }

    // API call re-enabled as per user request
    try {
      const response = await submitSpin({
        currency: "BTC",
        stakeAmount: stake,
        multiplier: result.multiplier,
        isWin: isWin,
        winAmount: winAmount
      }).unwrap();

      // If API returns new balance, update local state for immediate feedback
      if (response?.data?.newBalance !== undefined) {
        dispatch(updateUser({
          wallet: {
            ...user?.wallet,
            balance: response.data.newBalance
          }
        }));
      }
    } catch (err) {
      console.error("Spin submission failed", err);
    }
  };

  const handleDoubleStake = () => {
    const currentStake = parseFloat(selectedStake);
    const newStake = (currentStake * 2).toFixed(4);
    setSelectedStake(newStake);
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
                  <p className="text-3xl font-bold">₿ {Number(balance).toFixed(4)} BTC</p>
                </div>
                {/* 
                <button className="flex items-center gap-2 border-2 border-[#ffae2c] text-[#ffae2c] px-4 py-2 rounded-lg hover:bg-[#ffae2c] hover:text-[#0e1624] transition-all font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  New Card
                </button> 
                */}
              </div>

              {/* Spin Wheel Container */}
              <div className="bg-[#0B121D] rounded-xl p-8 border border-gray-800">
                <SpinWheelComponent
                  isSpinning={isSpinning}
                  targetIndex={targetIndex}
                  onSpinComplete={onSpinComplete}
                />
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
