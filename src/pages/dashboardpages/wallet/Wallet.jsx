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
    <div className="flex-1  bg-gray-800">
      <div className="mx-auto">
        {/* ================= BALANCE + GAME STATS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* BALANCE */}
          <div className="rounded-xl p-6 border bg-[#0E1624] border-[#374151]">
            <h2 className="text-sm text-gray-400 mb-3">Your Balance</h2>

            <div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">0.00</span>
                <span className="ml-2 text-xl font-semibold text-yellow-400">
                  BTC
                </span>
              </div>
              <span className="text-sm text-gray-500 mt-1">≈ $0.00</span>
            </div>
          </div>

          {/* GAME STATS */}
          <div className="rounded-xl p-6 border bg-[#0E1624] border-[#374151] flex justify-around">
            <div className="text-center">
              <span className="text-4xl font-bold text-white block mb-1">
                50
              </span>
              <span className="text-sm text-gray-400">Game Played</span>
            </div>

            <div className="w-px bg-[#374151]"></div>

            <div className="text-center">
              <span className="text-4xl font-bold text-white block mb-1">
                2
              </span>
              <span className="text-sm text-gray-400">Game Available</span>
            </div>
          </div>
        </div>

        {/* ================= DEPOSIT ADDRESS ================= */}
        <div className="rounded-xl p-6 border bg-[#0E1624] border-[#374151] mb-6">
          <h2 className="text-xl font-semibold mb-1 text-white">
            Your Deposit Address
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Send Bitcoin Testnet to this address
          </p>

          {/* QR on top — Address below */}
          <div className="flex flex-col items-center gap-6">
            {/* QR */}
            <div className="bg-white p-3 rounded-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
                alt="QR Code"
                className="w-36 h-36"
              />
            </div>

            {/* ADDRESS + COPY */}
            <div className="w-full">
              <div className="rounded-lg p-4 flex items-center justify-between border bg-[#374151] border-[#374151]">
                <span className="text-sm font-mono break-all text-gray-300 mr-3">
                  {address}
                </span>

                <button
                  onClick={handleCopy}
                  className={`p-2 rounded-lg transition ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                </button>
              </div>

              {copied && (
                <p className="text-sm mt-2 flex items-center text-green-500">
                  <CheckCircle2 size={14} className="mr-1" /> Address copied!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= TRANSACTION HISTORY ================= */}
        <div className="rounded-xl p-6 border bg-[#0B121D] border-[#374151]">
          <h2 className="text-xl font-semibold mb-6 text-white">
            Transaction History
          </h2>

          <div className="space-y-3">
            {transactions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-[#0e1624] border-[#0B121D]"
                >
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg mr-4 border bg-[#3E4550] border-[#374151]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <span className="text-sm text-gray-500">{item.time}</span>
                    </div>
                  </div>

                  <span
                    className={`font-semibold ${
                      item.isPositive ? "text-green-500" : "text-red-500"
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
