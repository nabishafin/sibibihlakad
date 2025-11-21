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
      type: "deposit",
      icon: <ArrowDownCircle size={20} />,
      title: "Testnet BTC Deposit",
      time: "02:53 AM",
      amount: "+0.0025 BTC",
      isPositive: true,
    },
    {
      id: 2,
      type: "win",
      icon: <Gift size={20} />,
      title: "Scratch Card - Won 10x",
      time: "02:52 AM",
      amount: "+0.0025 BTC",
      isPositive: true,
    },
    {
      id: 3,
      type: "stake",
      icon: <DollarSign size={20} />,
      title: "Scratch Card - Stake",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
    {
      id: 4,
      type: "win",
      icon: <Repeat size={20} />,
      title: "Spin Wheel - Won 3x",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
  ];
  return (
    <div
      className="flex-1 p-8"
      style={{
        backgroundColor: "#0e1624",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Balance and Game Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Balance Card */}
          <div
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: "#1a1f3a",
              borderColor: "#374151",
            }}
          >
            <h2
              className="text-sm mb-3"
              style={{
                color: "#9ca3af",
              }}
            >
              Your Balance
            </h2>
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">0.00</span>
                <span
                  className="ml-2 text-xl font-semibold"
                  style={{
                    color: "#ffae2c",
                  }}
                >
                  BTC
                </span>
              </div>
              <span
                className="text-sm mt-1"
                style={{
                  color: "#6b7280",
                }}
              >
                ≈ $0.00
              </span>
            </div>
          </div>

          {/* Game Stats Card */}
          <div
            className="rounded-xl p-6 border flex justify-around"
            style={{
              backgroundColor: "#1a1f3a",
              borderColor: "#374151",
            }}
          >
            <div className="text-center">
              <span className="text-4xl font-bold block mb-1 text-white">
                50
              </span>
              <span
                className="text-sm"
                style={{
                  color: "#9ca3af",
                }}
              >
                Game Played
              </span>
            </div>
            <div
              className="w-px"
              style={{
                backgroundColor: "#374151",
              }}
            ></div>
            <div className="text-center">
              <span className="text-4xl font-bold block mb-1 text-white">
                2
              </span>
              <span
                className="text-sm"
                style={{
                  color: "#9ca3af",
                }}
              >
                Game Available
              </span>
            </div>
          </div>
        </div>

        {/* Deposit Address Card */}
        <div
          className="rounded-xl p-6 border mb-6"
          style={{
            backgroundColor: "#1a1f3a",
            borderColor: "#374151",
          }}
        >
          <h2 className="text-xl font-semibold mb-1 text-white">
            Your Deposit Address
          </h2>
          <p
            className="text-sm mb-6"
            style={{
              color: "#9ca3af",
            }}
          >
            Send Bitcoin Testnet to this address
          </p>
          <div className="flex items-start gap-6">
            <div className="bg-white p-3 rounded-lg flex-shrink-0">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=tb1qm5cezB6uFug547odShA6cjRxMhJsPYDevfb77MP"
                alt="QR Code"
                className="w-28 h-28"
              />
            </div>
            <div className="flex-1">
              <div
                className="rounded-lg p-4 flex items-center justify-between border"
                style={{
                  backgroundColor: "#0e1624",
                  borderColor: "#374151",
                }}
              >
                <span
                  className="text-sm font-mono break-all mr-3"
                  style={{
                    color: "#d1d5db",
                  }}
                >
                  {address}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: copied ? "#3fb185" : "#ffae2c",
                    color: copied ? "white" : "#0e1624",
                  }}
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                </button>
              </div>
              {copied && (
                <p
                  className="text-sm mt-2 flex items-center"
                  style={{
                    color: "#3fb185",
                  }}
                >
                  <CheckCircle2 size={14} className="mr-1" />
                  Address copied to clipboard
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Transaction History Card */}
        <div
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: "#1a1f3a",
            borderColor: "#374151",
          }}
        >
          <h2 className="text-xl font-semibold mb-6 text-white">
            Transaction History
          </h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{
                  backgroundColor: "#0e1624",
                  borderColor: "#374151",
                }}
              >
                <div className="flex items-center">
                  <div
                    className="p-3 rounded-lg mr-4 border"
                    style={{
                      backgroundColor: "#1a1f3a",
                      borderColor: "#374151",
                    }}
                  >
                    {transaction.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {transaction.title}
                    </h3>
                    <span
                      className="text-sm"
                      style={{
                        color: "#6b7280",
                      }}
                    >
                      {transaction.time}
                    </span>
                  </div>
                </div>
                <span
                  className="font-semibold"
                  style={{
                    color: transaction.isPositive ? "#3fb185" : "#f34f4f",
                  }}
                >
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wallet;
