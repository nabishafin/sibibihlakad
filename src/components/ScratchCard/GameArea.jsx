import React, { useState } from "react";
import { RefreshCcwIcon } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

export function GameArea() {
  const [selectedStake, setSelectedStake] = useState("0.001 BTC");
  const [gameState, setGameState] = useState("idle"); // 'idle' | 'playing' | 'finished'
  const [scratchedCards, setScratchedCards] = useState([]);
  const [cardSymbols, setCardSymbols] = useState([]);
  const stakeOptions = ["0.0005 BTC", "0.001 BTC", "0.002 BTC", "0.005 BTC"];
  const symbols = ["₿", "💎", "⭐", "🎰", "💰"];

  const handlePlayNow = () => {
    const newSymbols = Array(9)
      .fill(0)
      .map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    setCardSymbols(newSymbols);
    setScratchedCards([]);
    setGameState("playing");
  };

  const handleCardClick = (index) => {
    if (gameState !== "playing" || scratchedCards.includes(index)) return;
    const newScratchedCards = [...scratchedCards, index];
    setScratchedCards(newScratchedCards);
    if (newScratchedCards.length === 3)
      setTimeout(() => checkWin(newScratchedCards), 500);
  };

  const checkWin = (scratched) => {
    const scratchedSymbols = scratched.map((i) => cardSymbols[i]);
    const isWin = scratchedSymbols.every((s) => s === scratchedSymbols[0]);
    setGameState("finished");
    alert(
      isWin
        ? `🎉 You won! Matched 3 ${scratchedSymbols[0]}!`
        : "Try again! No matching symbols."
    );
  };

  const handleNewCard = () => {
    setGameState("idle");
    setScratchedCards([]);
    setCardSymbols([]);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto p-6">
      <div className="space-y-6">

        {/* Balance & New Card */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400 mb-1">Your Balance</p>
            <p className="text-3xl font-bold">0.00 BTC</p>
          </div>
          <button
            className="flex items-center gap-2 border-2 border-[#ffae2c] text-[#ffae2c] px-4 py-2 rounded-lg hover:bg-[#ffae2c] hover:text-[#0e1624] transition-all font-medium"
            onClick={handleNewCard}
          >
            <RefreshCcwIcon size={18} />
            <span>New Card</span>
          </button>
        </div>

        {/* Scratch Cards Grid */}
        <div className="bg-[#0B121D] rounded-xl p-8 border border-gray-800">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[...Array(9)].map((_, index) => {
              const isScratched = scratchedCards.includes(index);
              const isClickable = gameState === "playing" && !isScratched;
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all
                    ${isClickable
                      ? "cursor-pointer hover:scale-105 hover:bg-[#3a9299]"
                      : ""
                    }
                    ${isScratched ? "bg-[#1a2536]" : "bg-[#2e7c83]"}`}
                  onClick={() => handleCardClick(index)}
                >
                  {isScratched ? (
                    <div className="text-4xl animate-bounce">
                      {cardSymbols[index]}
                    </div>
                  ) : (
                    <div className="text-[#ffae2c]">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2L14.2451 8.90983H21.5106L15.6327 13.1803L17.8779 20.0902L12 15.8197L6.12215 20.0902L8.36729 13.1803L2.48944 8.90983H9.75486L12 2Z"
                          stroke="#ffae2c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {gameState === "playing" && (
            <div className="text-center mt-4 text-[#ffae2c] font-medium text-sm">
              Click 3 cards ({scratchedCards.length}/3)
            </div>
          )}
        </div>

        {/* Stake Selection */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-300">Select Stake</h3>
          <div className="flex flex-wrap gap-2">
            {stakeOptions.map((stake) => (
              <button
                key={stake}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${selectedStake === stake
                  ? "bg-[#ffae2c] text-[#0e1624]"
                  : "bg-[#1a2536] text-white hover:bg-[#2a3546]"
                  }`}
                onClick={() => setSelectedStake(stake)}
                disabled={gameState === "playing"}
              >
                {stake}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatedButton
            text={
              gameState === "idle"
                ? "Play Now"
                : gameState === "playing"
                  ? "Playing..."
                  : "Play Again"
            }
            fillColor1="#FFCE00"
            fillColor2="#FFB800"
            onClick={handlePlayNow}
            className={gameState === "playing" ? "opacity-50 cursor-not-allowed" : ""}
          />
          <AnimatedButton
            text="Double Stake"
            fillColor1="#2e7c83"
            fillColor2="#3a9299"
            className={gameState === "playing" ? "opacity-50 cursor-not-allowed" : ""}
          />
        </div>
      </div>
    </div>
  );
}
