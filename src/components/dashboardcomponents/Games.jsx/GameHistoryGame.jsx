import React from "react";

export const GameHistoryGame = () => {
  const historyItems = [
    {
      type: "deposit",
      title: "Testnet BTC Deposit",
      time: "02:53 AM",
      amount: "+0.0025 BTC",
      isPositive: true,
    },
    {
      type: "scratch",
      title: "Scratch Card - Won 10x",
      time: "02:52 AM",
      amount: "+0.0025 BTC",
      isPositive: true,
    },
    {
      type: "scratch",
      title: "Scratch Card - Stake",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
    {
      type: "spin",
      title: "Spin Wheel - Won 3x",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
    {
      type: "spin",
      title: "Spin Wheel - Won 3x",
      time: "02:52 AM",
      amount: "-0.0025 BTC",
      isPositive: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "deposit":
        return (
          <div className="w-8 h-8 rounded-full bg-[#1a1f3a] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "scratch":
        return (
          <div className="w-8 h-8 rounded-full bg-[#1a1f3a] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "spin":
        return (
          <div className="w-8 h-8 rounded-full bg-[#1a1f3a] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1a1f3a]/30 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Game History</h3>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {historyItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a1f3a] rounded-lg p-4 flex items-center"
          >
            {getIcon(item.type)}
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{item.title}</span>
                <span
                  className={
                    item.isPositive ? "text-green-400" : "text-red-400"
                  }
                >
                  {item.amount}
                </span>
              </div>
              <div className="text-sm text-gray-400">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GameHistoryGame;
