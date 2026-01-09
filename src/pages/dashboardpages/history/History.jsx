import React, { useState } from "react";
import { GameHistoryTable } from "@/components/dashboardcomponents/History/GameHistoryTable";
import { StatsCard } from "@/components/dashboardcomponents/History/StatsCard";
import { useGetHistoryQuery } from "@/redux/features/dashboard/dashboardApi";

function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 10;

  const { data: historyData, isLoading, isFetching } = useGetHistoryQuery({
    filter,
    page: currentPage,
    limit: itemsPerPage,
  });

  const stats = historyData?.data?.stats || {};
  const history = historyData?.data?.history || [];
  const pagination = historyData?.data?.pagination || {};

  const handlePageChange = (newPage) => {
    const totalPages = pagination.totalPages || 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="flex bg-[#0e1624] rounded-2xl">
      <main className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Games Played"
            value={stats.totalGamesPlayed || "0"}
            trend="up"
          />
          <StatsCard
            title="Total Staked"
            value={stats.totalStaked || "0 stakes"}
            trend="down"
          />
          <StatsCard
            title="Return to Player (RTP)"
            value={stats.rtp || "0%"}
            trend="up"
            valueColor="text-[#16a34a]"
          />
        </div>

        {/* Game History */}
        <GameHistoryTable
          history={history}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          filter={filter}
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </main>
    </div>
  );
}

export default History;
