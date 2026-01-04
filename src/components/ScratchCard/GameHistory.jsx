import React from "react";
import { useGetScratchCardHistoryQuery } from "@/redux/features/games/gameApi";
import { Trophy, RefreshCw, History as HistoryIcon, Ticket } from "lucide-react";

export function GameHistory() {
  const { data: historyData, isLoading } = useGetScratchCardHistoryQuery();
  const historyItems = historyData?.data || [];

  const getIcon = (type) => {
    const baseClasses =
      "w-8 h-8 rounded-lg bg-[#0B121D] flex items-center justify-center border border-gray-800 group-hover:border-[#ffae2c]/30 transition-colors";

    // Icon mapping logic
    if (type === "win") {
      return (
        <div className={baseClasses}>
          <Trophy size={14} className="text-[#ffae2c]" />
        </div>
      );
    } else if (type === "bet") {
      return (
        <div className={baseClasses}>
          <Ticket size={14} className="text-gray-400" />
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
          Game History
        </h3>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <div className="space-y-2">
          {historyItems.map((item, index) => {
            const isWin = item.type === "win";
            const isNegative = item.amount.toString().includes("-");

            return (
              <div
                key={item.id || index}
                className="bg-[#1a2536] rounded-lg p-3 flex items-center group hover:bg-[#1f2c40] transition-colors"
              >
                {getIcon(item.type)}
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-white">{item.title}</span>
                    <span
                      className={`font-bold ${isWin
                        ? "text-[#16a34a]"
                        : isNegative
                          ? "text-red-500"
                          : "text-gray-400"
                        }`}
                    >
                      {item.amount}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">{item.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <button className="p-4 text-xs font-medium text-gray-500 hover:text-[#ffae2c] transition-colors border-t border-gray-800">
        View Full History
      </button>
    </div>
  );
}
