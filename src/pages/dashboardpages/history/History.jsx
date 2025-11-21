import React from "react";

import { GameHistoryTable } from "@/components/dashboardcomponents/History/GameHistoryTable";
import { StatsCard } from "@/components/dashboardcomponents/History/StatsCard";

function History() {
  return (
    <div className="flex min-h-screen bg-[#0e1624]">
      <main className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Games Played" value="50" trend="up" />
          <StatsCard title="Total Staked" value="458.5 stakes" trend="down" />
          <StatsCard
            title="Return to Player (RTP)"
            value="125%"
            trend="up"
            valueColor="text-[#16a34a]"
          />
        </div>

        {/* Game History */}
        <GameHistoryTable />
      </main>
    </div>
  );
}

export default History;
