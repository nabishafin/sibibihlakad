import { Card } from "@/components/ui/card";
import btcVaultImg from "../../assets/Lockimg.png";
import AnimatedButton from "../ui/AnimatedButton";

export function BalanceCard({ balance = { btc: "0.00", usd: "0.00" } }) {
  // Parse numeric values for display if needed, but the API returns strings/numbers.
  // Assuming API returns strings like "0.1895" and "$17993.32".
  // If we need to format them, we can do it here.
  const btcDisplay = balance.btc || "0.00";
  const usdDisplay = balance.usd || "$0.00";

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
                  {btcDisplay}
                </h2>
                <span className="text-xl text-yellow-500 font-semibold">
                  BTC
                </span>
              </div>
              <p className="text-sm text-slate-400">
                ≈ {usdDisplay}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <div className="rounded-full">
              <AnimatedButton
                text="Deposit"
                width="w-auto"
                className="px-6"
                fillColor1="#FFCE00"
                fillColor2="#FFB800"
              />
            </div>
            <AnimatedButton
              text="Play now"
              width="w-auto"
              className="px-6"
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

