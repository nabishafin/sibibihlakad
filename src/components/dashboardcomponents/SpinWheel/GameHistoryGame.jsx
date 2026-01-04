import React from "react";
import { useGetSpinWheelHistoryQuery } from "@/redux/features/games/gameApi";
import { Trophy, RefreshCw, History as HistoryIcon } from "lucide-react";

export const GameHistoryGame = () => {
  const { data: historyData, isLoading } = useGetSpinWheelHistoryQuery();
  const historyItems = historyData?.data || [];

  const getIcon = (type) => {
    const baseClasses =
      "w-8 h-8 rounded-lg bg-[#0B121D] flex items-center justify-center border border-gray-800 group-hover:border-[#ffae2c]/30 transition-colors";

    if (type === "win") {
      return (
        <div className={baseClasses}>
          <Trophy size={14} className="text-[#ffae2c]" />
        </div>
      );
    }

    if (type === "bet") {
      return (
        <div className={baseClasses}>
          <RefreshCw size={14} className="text-gray-400" />
        </div>
      );
    }

    return (
      <div className={baseClasses}>
        <HistoryIcon size={14} className="text-gray-400" />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        Loading history...
      </div>
    );
  }

  if (!historyItems.length) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        No game history yet.
      </div>
    );
  }

  return (
    <div className="h-[420px] rounded-xl flex flex-col bg-[#0B121D] border border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ffae2c] rounded-full"></span>
          Recent Activity
        </h3>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <div className="space-y-2">
          {historyItems.map((item, index) => {
            const isWin = item.type === "win";

            return (
              <div
                key={item.id || index}
                className="flex items-center justify-between p-3 rounded-lg bg-[#141b2d] hover:bg-[#1a2332] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {getIcon(item.type)}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>

                <p
                  className={`text-sm font-bold ${isWin
                    ? "text-[#16a34a]"
                    : item.amount.toString().includes("-")
                      ? "text-red-500"
                      : "text-gray-400"
                    }`}
                >
                  {item.amount}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <button className="p-4 text-xs font-medium text-gray-500 hover:text-[#ffae2c] transition-colors border-t border-gray-800">
        View Transaction History
      </button>
    </div>
  );
};

export default GameHistoryGame;
