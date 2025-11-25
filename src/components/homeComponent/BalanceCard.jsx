import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import btcVaultImg from "../../assets/Lockimg.png";
import AnimatedButton from "../ui/AnimatedButton";

export function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Simulate balance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setBalance(2.5);
      setUsdValue(95000);
      setIsRotating(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full  bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700 p-9">
      <div className="grid grid-cols-2 gap-8 items-center">
        {/* Left side - Balance Info */}
        <div className="space-y-10">
          <div>
            <p className="text-sm text-slate-400 mb-2">Your Balance</p>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-bold text-white">
                  {balance.toFixed(2)}
                </h2>
                <span className="text-xl text-yellow-500 font-semibold">
                  BTC
                </span>
              </div>
              <p className="text-sm text-slate-400">
                ≈ ${usdValue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <div className="rounded-full">
              <AnimatedButton
                text="Deposit"
                fillColor1="#FFCE00"
                fillColor2="#FFB800"
              />
            </div>
            <AnimatedButton
              text="Play now"
              fillColor1="#2E7C83"
              fillColor2="#32EEFF2E"
            />
          </div>
        </div>

        {/* Right side - Dynamic Vault Illustration */}
        <div className="flex justify-end items-center relative h-64">
          <img src={btcVaultImg} className="h-52" alt="BTC Vault" />
        </div>
      </div>
    </Card>
  );
}
