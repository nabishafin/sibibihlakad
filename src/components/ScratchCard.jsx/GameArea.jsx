import React, { useState } from "react";
import { RefreshCcwIcon } from "lucide-react";

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
    if (gameState !== "playing") return;
    if (scratchedCards.includes(index)) return;

    const newScratchedCards = [...scratchedCards, index];
    setScratchedCards(newScratchedCards);

    if (newScratchedCards.length === 3) {
      setTimeout(() => {
        checkWin(newScratchedCards);
      }, 500);
    }
  };

  const checkWin = (scratched) => {
    const scratchedSymbols = scratched.map((i) => cardSymbols[i]);
    const isWin = scratchedSymbols.every(
      (symbol) => symbol === scratchedSymbols[0]
    );
    setGameState("finished");

    if (isWin) {
      alert(`🎉 You won! Matched 3 ${scratchedSymbols[0]} symbols!`);
    } else {
      alert("Try again! No matching symbols.");
    }
  };

  const handleNewCard = () => {
    setGameState("idle");
    setScratchedCards([]);
    setCardSymbols([]);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-lg text-gray-400">Your Balance</div>
            <div className="text-4xl font-bold">0.00 BTC</div>
          </div>
          <button
            className="flex items-center gap-2 border border-[#ffae2c] text-[#ffae2c] px-4 py-2 rounded-lg hover:bg-[#ffae2c] hover:text-[#0e1624] transition-colors"
            onClick={handleNewCard}
          >
            <RefreshCcwIcon size={18} />
            <span>New Card</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 my-6">
          {[...Array(9)].map((_, index) => {
            const isScratched = scratchedCards.includes(index);
            const isClickable = gameState === "playing" && !isScratched;

            return (
              <div
                key={index}
                className={`
                  aspect-square rounded-md flex items-center justify-center transition-all
                  ${
                    isClickable
                      ? "cursor-pointer hover:scale-105 hover:bg-[#3a9299]"
                      : ""
                  }
                  ${isScratched ? "bg-[#1a2536]" : "bg-[#2e7c83]"}
                `}
                onClick={() => handleCardClick(index)}
              >
                {isScratched ? (
                  <div className="text-3xl animate-bounce">
                    {cardSymbols[index]}
                  </div>
                ) : (
                  <div className="text-[#ffae2c]">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
          <div className="text-center mb-4 text-[#ffae2c] font-medium">
            Click on 3 cards to scratch! ({scratchedCards.length}/3)
          </div>
        )}

        <div className="mb-6">
          <div className="text-lg mb-2">Select Stake</div>
          <div className="flex flex-wrap gap-2">
            {stakeOptions.map((stake) => (
              <button
                key={stake}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedStake === stake
                    ? "bg-[#ffae2c] text-[#0e1624] font-medium"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="bg-[#ffae2c] text-[#0e1624] font-medium py-3 rounded-lg hover:bg-[#ffbe56] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePlayNow}
            disabled={gameState === "playing"}
          >
            {gameState === "idle"
              ? "Play Now"
              : gameState === "playing"
              ? "Playing..."
              : "Play Again"}
          </button>
          <button
            className="bg-[#2e7c83] text-white font-medium py-3 rounded-lg hover:bg-[#3a9299] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={gameState === "playing"}
          >
            Double Stake
          </button>
        </div>
      </div>
    </div>
  );
}
