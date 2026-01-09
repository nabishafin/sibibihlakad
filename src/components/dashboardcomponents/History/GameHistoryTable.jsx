import React from "react";
import { Button } from "@/components/ui/button";
import { TableLoading } from "@/components/ui/Loading";

export function GameHistoryTable({
  history = [],
  pagination = {},
  currentPage = 1,
  onPageChange,
  filter = "",
  onFilterChange,
  isLoading = false,
  isFetching = false
}) {
  const totalPages = pagination.totalPages || 1;

  // Filter data based on selected filter
  const filteredData = history.filter((entry) => {
    if (!filter || filter === "") return true;
    if (filter === "Scratch") return entry.game === "Scratch Card";
    if (filter === "Spin") return entry.game === "Spin Wheel";
    return true;
  });

  return (
    <div className="bg-[#0B121D] rounded-xl border border-gray-800 overflow-hidden">
      {/* Header with filters */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-white text-xl font-semibold">All Games</h2>

        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange("")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === ""
              ? "bg-[#DAA520] text-[#0e1624]"
              : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
              }`}
          >
            All
          </button>

          <button
            onClick={() => onFilterChange("Scratch")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "Scratch"
              ? "bg-[#ffae2c] text-[#0e1624]"
              : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
              }`}
          >
            Scratch
          </button>

          <button
            onClick={() => onFilterChange("Spin")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "Spin"
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
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Date</th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Game</th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Result</th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Stake</th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Payout</th>
              <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Net</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableLoading columns={6} text="Loading game history..." />
            ) : (
              filteredData.map((entry) => {
                const dateObj = new Date(entry.date);
                const formattedDate = dateObj.toLocaleDateString();

                return (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-800 hover:bg-[#141b34] transition-colors"
                  >
                    <td className="text-white px-6 py-4">{formattedDate}</td>

                    <td className="px-6 py-4">
                      <span className="inline-block bg-[#2a3142] text-white px-3 py-1 rounded-full text-sm">
                        {entry.game}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm border ${entry.result === "Win"
                          ? "text-[#3fb185] border-[#3fb185]"
                          : "text-[#f34f4f] border-[#f34f4f]"
                          }`}
                      >
                        {entry.result}
                      </span>
                    </td>

                    <td className="text-white px-6 py-4">{entry.stake} BTC</td>
                    <td className="text-white px-6 py-4">{entry.payout} BTC</td>
                    <td className={`px-6 py-4 font-semibold ${entry.net >= 0 ? "text-[#16a34a]" : "text-[#f34f4f]"}`}>
                      {entry.net >= 0 ? "+" : ""}{entry.net} BTC
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {!isLoading && filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No history found</p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredData.length > 0 && (
        <div className="flex items-center justify-between p-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isFetching}
              className="border-gray-700 text-gray-300 hover:bg-[#1a2536] hover:text-white"
            >
              Previous
            </Button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const showPage =
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

              const showEllipsisBefore = pageNum === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter = pageNum === currentPage + 2 && currentPage < totalPages - 2;

              if (!showPage && !showEllipsisBefore && !showEllipsisAfter) return null;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={`ellipsis-${pageNum}`} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={pageNum}
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  disabled={isFetching}
                  className={`border-gray-700 ${currentPage === pageNum
                    ? "bg-[#DAA520] text-black hover:bg-[#DAA520] hover:text-black"
                    : "text-gray-300 hover:bg-[#1a2536] hover:text-white"
                    }`}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className="border-gray-700 text-gray-300 hover:bg-[#1a2536] hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
