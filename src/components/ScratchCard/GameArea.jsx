import React, { useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";

export function GameArea() {
  const [selectedStake, setSelectedStake] = useState("0.001");
  const stakeOptions = ["0.0005", "0.001", "0.002", "0.005"];

  const renderSymbol = (symbol) => {
    switch (symbol) {
      case 'star':
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path
              d="M50 10 L61 38 L92 38 L67 56 L78 84 L50 66 L22 84 L33 56 L8 38 L39 38 Z"
              fill="url(#goldGradient)"
              stroke="#8B6914"
              strokeWidth="1"
            />
          </svg>
        );
      case 'moneybag':
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient
                id="goldGradient2"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path
              d="M35 25 L40 20 L45 25 L50 20 L55 25 L60 20 L65 25 L65 30 L35 30 Z"
              fill="url(#goldGradient2)"
              stroke="#8B6914"
              strokeWidth="1"
            />
            <ellipse
              cx="50"
              cy="60"
              rx="25"
              ry="30"
              fill="url(#goldGradient2)"
              stroke="#8B6914"
              strokeWidth="1"
            />
            <text
              x="50"
              y="70"
              fontSize="32"
              fontWeight="bold"
              fill="#1a0f0f"
              textAnchor="middle"
            >
              $
            </text>
          </svg>
        );
      case 'spade':
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient
                id="goldGradient3"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path
              d="M50 15 C35 30 20 40 20 55 C20 65 28 73 38 73 C42 73 45 71 47 68 C45 75 42 82 38 88 L62 88 C58 82 55 75 53 68 C55 71 58 73 62 73 C72 73 80 65 80 55 C80 40 65 30 50 15 Z"
              fill="url(#goldGradient3)"
              stroke="#8B6914"
              strokeWidth="1"
            />
          </svg>
        );
      case 'diamond':
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient
                id="goldGradient4"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path
              d="M50 20 L70 50 L50 80 L30 50 Z"
              fill="url(#goldGradient4)"
              stroke="#8B6914"
              strokeWidth="1"
            />
            <path
              d="M50 20 L50 80 M30 50 L70 50"
              stroke="#8B6914"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        );
      case 'center':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]" />
            <div className="absolute inset-2 rounded-full border-2 border-[#D4AF37]" />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 100 100"
                className="mb-1"
              >
                <defs>
                  <linearGradient
                    id="centerGoldGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 15 C35 30 20 40 20 55 C20 65 28 73 38 73 C42 73 45 71 47 68 C45 75 42 82 38 88 L62 88 C58 82 55 75 53 68 C55 71 58 73 62 73 C72 73 80 65 80 55 C80 40 65 30 50 15 Z"
                  fill="url(#centerGoldGradient)"
                  stroke="#8B6914"
                  strokeWidth="1"
                />
              </svg>
              <div className="text-[#D4AF37] text-lg font-bold tracking-wider">
                NASIIB
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const cards = [
    { id: 1, symbol: 'star', bg: 'bg-[#0a2420]' },
    { id: 2, symbol: 'star', bg: 'bg-[#1a1410]' },
    { id: 3, symbol: 'moneybag', bg: 'bg-[#0a2420]' },
    { id: 4, symbol: 'spade', bg: 'bg-[#1a0f0f]' },
    { id: 5, symbol: 'center', bg: 'bg-transparent' },
    { id: 6, symbol: 'star', bg: 'bg-[#1a1410]' },
    { id: 7, symbol: 'star', bg: 'bg-[#1a0f0f]' },
    { id: 8, symbol: 'diamond', bg: 'bg-[#0a2420]' },
    { id: 9, symbol: 'star', bg: 'bg-[#0a2420]' },
  ];

  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <div className="space-y-6">

        {/* Balance & New Card Button */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-3xl font-bold text-[#D4AF37]">₿ 0.00 BTC</p>
          </div>
          <button className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-lg hover:bg-[#D4AF37]/10 transition-all font-medium">
            New Card
          </button>
        </div>

        {/* Scratch Card Container */}
        <div className="bg-[#0a0a0a] rounded-2xl p-8 border-2 border-[#D4AF37]">
          {/* Card Grid */}
          <div className="relative grid grid-cols-3 gap-4">
            {cards.map((card) =>
              card.symbol === 'center' ? (
                <div key={card.id} className="aspect-square flex items-center justify-center">
                  {renderSymbol(card.symbol)}
                </div>
              ) : (
                <div
                  key={card.id}
                  className={`${card.bg} border-2 border-[#D4AF37] rounded-2xl aspect-square flex items-center justify-center`}
                >
                  {renderSymbol(card.symbol)}
                </div>
              )
            )}
          </div>
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
              >
                {stake} BTC
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <AnimatedButton
              text="Play Now"
              fillColor1="#FFCE00"
              fillColor2="#FFB800"
            />
            <AnimatedButton
              text="Double Stake"
              fillColor1="#2e7c83"
              fillColor2="#3a9299"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
