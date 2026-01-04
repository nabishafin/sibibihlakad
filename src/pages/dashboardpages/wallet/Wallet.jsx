import React, { useState } from "react";
import {
  Copy,
  CheckCircle2,
  ArrowDownCircle,
  Gift,
  DollarSign,
  Repeat,
} from "lucide-react";

const Wallet = () => {
  const [copied, setCopied] = useState(false);

  const address = "tb1qm5cezB6uFug547odShA6cjRxMhJsPYDevfb77MP";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transactions = [
    {
      id: 1,
      icon: ArrowDownCircle,
      title: "Testnet BTC Deposit",
      time: "02:53 AM",
      amount: "+0.0025 BTC",
      isPositive: true,
    },
    {
      id: 2,
      icon: Gift,
      title: "Scratch Card - Won 10x",
      time: "02:52 AM",
      amount: "+0.0025 BTC",
      isPositive: true,
    },
    {
      id: 3,
      icon: DollarSign,
      title: "Scratch Card - Stake",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
    {
      id: 4,
      icon: Repeat,
      title: "Spin Wheel - Won 3x",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
  ];

  return (
    <div className="bg-[#0e1624] rounded-2xl">
      <div className="p-6 space-y-6">

        {/* ================= BALANCE + GAME STATS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* BALANCE CARD */}
          <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800">
            <p className="text-sm text-gray-400 mb-2">Your Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">0.00</span>
              <span className="text-xl font-semibold text-[#ffae2c]">BTC</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">≈ $0.00</p>
          </div>

          {/* GAME STATS CARD */}
          <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800 flex justify-around items-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-1">50</p>
              <p className="text-sm text-gray-400">Game Played</p>
            </div>

            <div className="w-px h-16 bg-gray-700"></div>

            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-1">2</p>
              <p className="text-sm text-gray-400">Game Available</p>
            </div>
          </div>
        </div>

        {/* ================= DEPOSIT ADDRESS SECTION ================= */}
        <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800">
          <h2 className="text-lg font-semibold mb-1 text-white">
            Your Deposit Address
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Send Bitcoin Testnet to this address
          </p>

          {/* QR Code and Address */}
          <div className="flex flex-col items-center gap-6">

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
                alt="QR Code"
                className="w-32 h-32"
              />
            </div>

            {/* Address Input with Copy Button */}
            <div className="w-full">
              <div className="rounded-lg p-4 flex items-center justify-between bg-[#1a2536] border border-gray-700">
                <span className="text-sm font-mono text-gray-300 mr-3 truncate">
                  {address}
                </span>

                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${copied
                    ? "bg-green-500 text-white"
                    : "bg-[#ffae2c] text-[#0e1624] hover:bg-[#d6b25e]"
                    }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRANSACTION HISTORY ================= */}
        <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Transaction History
          </h2>

          <div className="space-y-2">
            {transactions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#1a2536] hover:bg-[#1f2a3d] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0e1624]">
                      <Icon size={20} className="text-gray-400" />
                    </div>

                    <div>
                      <p className="font-medium text-white text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>

                  <span
                    className={`font-semibold text-sm ${item.isPositive ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {item.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
