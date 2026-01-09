import React, { useState } from "react";
import {
    ArrowDownCircle,
    Gift,
    DollarSign,
    Repeat,
} from "lucide-react";
import { useGetAllActivityQuery } from "@/redux/features/dashboard/dashboardApi";
import { Button } from "@/components/ui/button";

const AllActivity = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: activityData, isLoading, isFetching } = useGetAllActivityQuery({
        page: currentPage,
        limit: itemsPerPage,
    });

    const activities = activityData?.data?.items || [];
    const pagination = activityData?.data?.pagination || {};
    const totalPages = pagination.totalPages || 1;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Helper to determine icon based on description or type
    const getIcon = (activity) => {
        const desc = activity.description?.toLowerCase() || "";
        if (desc.includes("scratch")) return Gift;
        if (desc.includes("spin")) return Repeat;
        if (activity.type === "deposit") return ArrowDownCircle;
        return DollarSign;
    };

    return (
        <div className="bg-[#0e1624] rounded-2xl">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-white text-2xl font-bold mb-1">
                            All Activity
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Complete history of all your transactions and game activities
                        </p>
                    </div>
                </div>

                {/* Activity Table */}
                <div className="bg-[#0B121D] rounded-xl border border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Type</th>
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Activity</th>
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Date</th>
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Time</th>
                                    <th className="text-right text-gray-400 font-medium text-sm px-6 py-4">Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-400">Loading...</td>
                                    </tr>
                                ) : (
                                    activities.map((activity) => {
                                        const Icon = getIcon(activity);
                                        const dateObj = new Date(activity.timestamp);
                                        const date = dateObj.toLocaleDateString();
                                        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                        return (
                                            <tr
                                                key={activity.id}
                                                className="border-b border-gray-800 hover:bg-[#141b34] transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2536]">
                                                        <Icon size={20} className="text-white" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-white font-medium">{activity.description}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-400">{date}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-400">{time}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`font-semibold ${activity.isPositive ? "text-[#16a34a]" : "text-[#f34f4f]"}`}>
                                                        {activity.amount} {activity.currency}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {!isLoading && activities.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No activities found</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && activities.length > 0 && (
                        <div className="flex items-center justify-between p-4 border-t border-gray-800">
                            <div className="text-sm text-gray-400">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || isFetching}
                                    className="border-gray-700 text-gray-300 hover:bg-[#1a2536] hover:text-white"
                                >
                                    Previous
                                </Button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                    // Show first page, last page, current page, and pages around current
                                    const showPage =
                                        pageNum === 1 ||
                                        pageNum === totalPages ||
                                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                                    // Show ellipsis
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
                                            onClick={() => handlePageChange(pageNum)}
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
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || isFetching}
                                    className="border-gray-700 text-gray-300 hover:bg-[#1a2536] hover:text-white"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllActivity;
