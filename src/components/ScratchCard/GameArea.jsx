import React, { useState, useEffect } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";
import { useSubmitScratchResultMutation } from "@/redux/features/games/gameApi";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/redux/slices/authSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

// Symbols
const SYMBOLS = {
  NASIIB: 'center', // Using 'center' as the Nasib/Winning symbol
  STAR: 'star',
  MONEYBAG: 'moneybag',
  SPADE: 'spade',
  DIAMOND: 'diamond'
};

const STAKE_OPTIONS = ["0.0005", "0.001", "0.002", "0.005"];

export function GameArea() {
  const dispatch = useDispatch();
  // Redux & User State
  const { user } = useSelector((state) => state.auth);
  // Fetch latest balance/data
  // const { data: userData } = useGetMeQuery(); // Removed causing 500
  const balance = user?.wallet?.balance || 0;

  const [submitResult, { isLoading: isSubmitting }] = useSubmitScratchResultMutation();

  // Game State
  const [selectedStake, setSelectedStake] = useState(null);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'finished'
  const [cards, setCards] = useState(Array(9).fill({ revealed: false, symbol: SYMBOLS.STAR }));
  const [winStatus, setWinStatus] = useState(null); // 'win', 'loss', null

  // Initialize/Reset Game
  const initializeGame = (fullReset = false) => {
    setGameState('idle');
    setWinStatus(null);
    setCards(Array(9).fill({ revealed: false, symbol: SYMBOLS.STAR }));
    if (fullReset) {
      setSelectedStake(null);
    }
  };

  const handleStakeSelect = (stake) => {
    if (gameState === 'playing') return;
    setSelectedStake(stake);
  };

  const handlePlayNow = () => {
    console.log("Play Now Clicked. Stake:", selectedStake, "Balance:", balance);
    if (!selectedStake || gameState === 'playing') {
      console.warn("Play blocked: selectedStake missing or game playing");
      return;
    }

    // Deduct Stake Visual
    // We rely on API for actual balance update but UI shows immediate action
    setGameState('playing');
    setWinStatus(null);

    // Generate Board
    // 3 Winning (Nasib) cards, 6 Loser cards (Random mix)
    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const shuffled = positions.sort(() => Math.random() - 0.5);
    const winningIndices = shuffled.slice(0, 3);

    // Fill Logic
    const newCards = Array(9).fill(null).map((_, index) => {
      if (winningIndices.includes(index)) {
        return { revealed: false, symbol: SYMBOLS.NASIIB, isWinning: true };
      } else {
        // Random loser symbol
        const loserSymbols = [SYMBOLS.MONEYBAG, SYMBOLS.SPADE, SYMBOLS.DIAMOND];
        const randomSymbol = loserSymbols[Math.floor(Math.random() * loserSymbols.length)];
        return { revealed: false, symbol: randomSymbol, isWinning: false };
      }
    });

    setCards(newCards);
  };

  const handleRevealCard = (index) => {
    if (gameState !== 'playing' || cards[index].revealed) return;

    const revealedCount = cards.filter(c => c.revealed).length;
    // Safety check
    if (revealedCount >= 3) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], revealed: true };
    setCards(newCards);

    // Check if 3 cards are now revealed
    const updatedRevealedCount = revealedCount + 1;
    if (updatedRevealedCount === 3) {
      handleGameEnd(newCards);
    }
  };

  const handleGameEnd = async (currentCards) => {
    console.log("Game Ended. Calculating results...");
    setGameState('finished');

    // Check Win
    // User picked 3 cards. If ALL 3 are Nasib -> Win.
    const revealedCards = currentCards.filter(c => c.revealed);
    const isWin = revealedCards.every(c => c.symbol === SYMBOLS.NASIIB);
    const stakeAmount = parseFloat(selectedStake);
    const winAmount = isWin ? stakeAmount * 10 : 0;

    console.log("Result:", { isWin, stakeAmount, winAmount });

    if (isWin) {
      setWinStatus('win');
      toast.success(`🎉 You Won! ₿${winAmount.toFixed(4)} BTC (10x)`, { duration: 4000 });
    } else {
      setWinStatus('loss');
      toast.error('Better luck next time!', { duration: 3000 });
    }

    // Call API to report result
    try {
      console.log("Submitting result to API...");
      const response = await submitResult({
        currency: "BTC",
        stakeAmount: stakeAmount,
        isWin: isWin,
        winAmount: winAmount
      }).unwrap();
      console.log("API Success:", response);
      // Update local state for immediate feedback
      if (response?.data?.newBalance !== undefined) {
        dispatch(updateUser({
          wallet: {
            ...user?.wallet,
            balance: response.data.newBalance
          }
        }));
      }
    } catch (error) {
      console.error("Failed to submit game result:", error);
    }
  };

  const handleRevealAll = () => {
    if (gameState !== 'playing') return;

    // Auto pick remaining until 3 are selected
    let currentCards = [...cards];
    let revealedCount = currentCards.filter(c => c.revealed).length;
    const unrevealedIndices = currentCards.map((c, i) => !c.revealed ? i : -1).filter(i => i !== -1);

    // Shuffle unrevealed
    const shuffled = unrevealedIndices.sort(() => Math.random() - 0.5);

    // Pick enough to reach 3
    const needed = 3 - revealedCount;
    for (let i = 0; i < needed; i++) {
      const idx = shuffled[i];
      currentCards[idx] = { ...currentCards[idx], revealed: true };
    }

    setCards(currentCards);
    handleGameEnd(currentCards);
  };

  const handleNewCard = () => {
    initializeGame(false);
  };


  // Render Helpers
  const renderSymbol = (symbol) => {
    switch (symbol) {
      case 'star':
        return (
          <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path d="M50 10 L61 38 L92 38 L67 56 L78 84 L50 66 L22 84 L33 56 L8 38 L39 38 Z" fill="url(#goldGradient)" stroke="#8B6914" strokeWidth="1" />
          </svg>
        );
      case 'moneybag':
        return (
          <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg">
            <defs>
              <linearGradient id="bagGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2D5016" />
                <stop offset="100%" stopColor="#1A3A0F" />
              </linearGradient>
            </defs>
            <path d="M35 25 L40 20 L45 25 L50 20 L55 25 L60 20 L65 25 L65 30 L35 30 Z" fill="url(#bagGradient)" stroke="#8B6914" strokeWidth="1" />
            <ellipse cx="50" cy="60" rx="25" ry="30" fill="url(#bagGradient)" stroke="#8B6914" strokeWidth="1" />
            <text x="50" y="70" fontSize="32" fontWeight="bold" fill="#D4AF37" textAnchor="middle">$</text>
          </svg>
        );
      case 'spade':
        return (
          <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg">
            <path d="M50 15 C35 30 20 40 20 55 C20 65 28 73 38 73 C42 73 45 71 47 68 C45 75 42 82 38 88 L62 88 C58 82 55 75 53 68 C55 71 58 73 62 73 C72 73 80 65 80 55 C80 40 65 30 50 15 Z" fill="#1a0f0f" stroke="#8B6914" strokeWidth="1" />
          </svg>
        );
      case 'diamond':
        return (
          <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg">
            <path d="M50 20 L70 50 L50 80 L30 50 Z" fill="#B22222" stroke="#8B6914" strokeWidth="1" />
          </svg>
        );
      case 'center': // THE WINNING SYMBOL (NASIIB)
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="animate-pulse absolute inset-0 rounded-full border-4 border-[#D4AF37] opacity-50" />
            <svg width="50" height="50" viewBox="0 0 100 100" className="mb-1">
              <defs>
                <linearGradient id="centerGoldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
              <path d="M50 15 C35 30 20 40 20 55 C20 65 28 73 38 73 C42 73 45 71 47 68 C45 75 42 82 38 88 L62 88 C58 82 55 75 53 68 C55 71 58 73 62 73 C72 73 80 65 80 55 C80 40 65 30 50 15 Z" fill="url(#centerGoldGradient)" stroke="#8B6914" strokeWidth="1" />
            </svg>
            <div className="absolute bottom-2 text-[#D4AF37] text-xs font-bold tracking-wider">NASIIB</div>
          </div>
        );
      default:
        return null; // Fallback
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <div className="space-y-6">

        {/* Balance & New Card Button */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-3xl font-bold text-[#D4AF37]">₿ {Number(balance).toFixed(4)} BTC</p>
          </div>
          <button
            onClick={handleNewCard}
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-lg hover:bg-[#D4AF37]/10 transition-all font-medium"
          >
            New Card
          </button>
        </div>

        {/* Message Status */}
        <div className="h-8 text-center">
          {winStatus === 'win' && <span className="text-green-500 font-bold text-lg animate-bounce">YOU WON! 10x Multiplier!</span>}
          {winStatus === 'loss' && <span className="text-red-500 font-bold text-lg">Better luck next time!</span>}
          {gameState === 'playing' && !winStatus && (
            <span className="text-yellow-500">Pick {3 - cards.filter(c => c.revealed).length} more Card{3 - cards.filter(c => c.revealed).length !== 1 ? 's' : ''}!</span>
          )}
        </div>

        {/* Scratch Card Container */}
        <div className="bg-[#0a0a0a] rounded-2xl p-8 border-2 border-[#D4AF37]">
          {/* Card Grid */}
          <div className="relative grid grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleRevealCard(index)}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-2xl border-2 transition-all cursor-pointer",
                  !card.revealed
                    ? "bg-[#1a1410] border-[#D4AF37] hover:bg-[#251d18]"
                    : (card.symbol === SYMBOLS.NASIIB ? "bg-black/50 border-[#D4AF37] shadow-[0_0_15px_rgba(218,165,32,0.5)]" : "bg-[#0a2420] border-gray-700")
                )}
              >
                {!card.revealed && gameState === 'idle' ? (
                  // Idle state, always show STAR
                  renderSymbol(SYMBOLS.STAR)
                ) : !card.revealed && gameState === 'playing' ? (
                  // Playing but hidden, show STAR
                  renderSymbol(SYMBOLS.STAR)
                ) : (
                  // Revealed or Game Finished
                  renderSymbol(card.symbol)
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stake Selection */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-300">Select Stake</h3>
          <div className="flex flex-wrap gap-2">
            {STAKE_OPTIONS.map((stake) => (
              <button
                key={stake}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all font-medium",
                  selectedStake === stake
                    ? "bg-[#ffae2c] text-[#0e1624]"
                    : "bg-[#1a2536] text-white hover:bg-[#2a3546]",
                  gameState === 'playing' && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleStakeSelect(stake)}
                disabled={gameState === 'playing'}
              >
                {stake} BTC
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {gameState === 'idle' ? (
              <AnimatedButton
                text="Play Now"
                fillColor1="#FFCE00"
                fillColor2="#FFB800"
                onClick={handlePlayNow}
                // Disabled if no stake selected
                className={!selectedStake ? "opacity-50 cursor-not-allowed" : ""}
              />
            ) : (
              <AnimatedButton
                text="Reveal All"
                fillColor1="#2e7c83"
                fillColor2="#3a9299"
                onClick={handleRevealAll}
                // Disabled if finished
                className={gameState === 'finished' ? "opacity-50 cursor-not-allowed" : ""}
              />
            )}

            <AnimatedButton
              text="Double Stake"
              fillColor1="#2e7c83"
              fillColor2="#3a9299"
              onClick={() => {
                if (gameState === 'idle' && selectedStake) {
                  const idx = STAKE_OPTIONS.indexOf(selectedStake);
                  if (idx < STAKE_OPTIONS.length - 1) {
                    setSelectedStake(STAKE_OPTIONS[idx + 1]);
                  }
                }
              }}
              className={gameState === 'playing' || !selectedStake ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
