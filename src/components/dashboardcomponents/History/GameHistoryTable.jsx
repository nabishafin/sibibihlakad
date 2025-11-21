import React, { useState } from "react";

const gameData = [
  {
    date: "12/4/17",
    game: "Scratch Card",
    result: "Win",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "12/4/17",
    game: "Scratch Card",
    result: "Win",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "8/30/14",
    game: "Spin Wheel",
    result: "loss",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "8/30/14",
    game: "Spin Wheel",
    result: "loss",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "6/21/19",
    game: "Scratch Card",
    result: "Win",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "6/21/19",
    game: "Scratch Card",
    result: "Win",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "9/18/16",
    game: "Spin Wheel",
    result: "loss",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
  {
    date: "9/18/16",
    game: "Spin Wheel",
    result: "loss",
    stake: "$50",
    payout: "$50",
    net: "$50",
  },
];

export function GameHistoryTable() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredData = gameData.filter((entry) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Scratch") return entry.game === "Scratch Card";
    if (activeFilter === "Spin") return entry.game === "Spin Wheel";
    return true;
  });

  return (
    <div className="bg-[#1a1f3a] rounded-xl border border-gray-800 overflow-hidden">
      {/* Header with filters */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-white text-xl font-semibold">All Games</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === "All"
                ? "bg-[#ffae2c] text-[#0e1624]"
                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setActiveFilter("Scratch")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === "Scratch"
                ? "bg-[#ffae2c] text-[#0e1624]"
                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
            }`}
          >
            Scratch
          </button>

          <button
            onClick={() => setActiveFilter("Spin")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === "Spin"
                ? "bg-[#ffae2c] text-[#0e1624]"
                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
            }`}
          >
            Spin
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                Date
              </th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                Game
              </th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                Result
              </th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                Stake
              </th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                Payout
              </th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                Net
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((entry, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-[#141b34] transition-colors"
              >
                <td className="text-white px-6 py-4">{entry.date}</td>

                <td className="px-6 py-4">
                  <span className="inline-block bg-[#2a3142] text-white px-3 py-1 rounded-full text-sm">
                    {entry.game}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm border ${
                      entry.result === "Win"
                        ? "text-[#3fb185] border-[#3fb185]"
                        : "text-[#f34f4f] border-[#f34f4f]"
                    }`}
                  >
                    {entry.result}
                  </span>
                </td>

                <td className="text-white px-6 py-4">{entry.stake}</td>
                <td className="text-white px-6 py-4">{entry.payout}</td>
                <td className="text-white px-6 py-4">{entry.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
