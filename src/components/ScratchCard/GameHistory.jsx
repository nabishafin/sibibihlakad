import React from "react";

export function GameHistory() {
  const historyItems = [
    {
      type: "deposit",
      title: "Testnet BTC Deposit",
      time: "02:53 AM",
      amount: "+0.0025 BTC",
      positive: true,
    },
    {
      type: "scratch",
      title: "Scratch Card - Won 10x",
      time: "02:52 AM",
      amount: "+0.0025 BTC",
      positive: true,
    },
    {
      type: "scratch",
      title: "Scratch Card - Stake",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      positive: false,
    },
    {
      type: "spin",
      title: "Spin Wheel - Won 3x",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      positive: false,
    },
    {
      type: "spin",
      title: "Spin Wheel - Won 3x",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      positive: false,
    },
  ];

  const renderIcon = (type) => {
    switch (type) {
      case "deposit":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        );
      case "scratch":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01" />
          </svg>
        );
      case "spin":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden text-sm">
      <h2 className="text-lg font-bold mb-2">Game History</h2>
      <div
        className="space-y-1 overflow-y-auto pr-1"
        style={{ maxHeight: "calc(100vh - 400px)" }}
      >
        {historyItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a2536] rounded-md p-2 flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-md bg-[#2a3546] flex items-center justify-center flex-shrink-0">
              {renderIcon(item.type)}
            </div>
            <div className="flex-grow">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-400">{item.time}</div>
            </div>
            <div
              className={`font-medium text-sm ${
                item.positive ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
