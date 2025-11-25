import React, { useState } from "react";
import {
    ArrowDownCircle,
    Gift,
    DollarSign,
    Repeat,
    Bitcoin,
} from "lucide-react";

const AllActivity = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    // Extended activity data
    const allActivities = [
        {
            id: 1,
            type: "deposit",
            title: "Testnet BTC Deposit",
            time: "02:53 AM",
            date: "12/25/24",
            amount: "+0.0025 BTC",
            isPositive: true,
            icon: ArrowDownCircle,
        },
        {
            id: 2,
            type: "scratch",
            title: "Scratch Card - Won 10x",
            time: "02:52 AM",
            date: "12/25/24",
            amount: "+0.0025 BTC",
            isPositive: true,
            icon: Gift,
        },
        {
            id: 3,
            type: "scratch",
            title: "Scratch Card - Stake",
            time: "02:52 AM",
            date: "12/25/24",
            amount: "-0.0025 BTC",
            isPositive: false,
            icon: DollarSign,
        },
        {
            id: 4,
            type: "spin",
            title: "Spin Wheel - Won 3x",
            time: "02:52 AM",
            date: "12/25/24",
            amount: "+0.0075 BTC",
            isPositive: true,
            icon: Repeat,
        },
        {
            id: 5,
            type: "spin",
            title: "Spin Wheel - Stake",
            time: "02:51 AM",
            date: "12/25/24",
            amount: "-0.0025 BTC",
            isPositive: false,
            icon: DollarSign,
        },
        {
            id: 6,
            type: "deposit",
            title: "Testnet BTC Deposit",
            time: "01:30 AM",
            date: "12/25/24",
            amount: "+0.0050 BTC",
            isPositive: true,
            icon: ArrowDownCircle,
        },
        {
            id: 7,
            type: "scratch",
            title: "Scratch Card - Won 5x",
            time: "01:15 AM",
            date: "12/25/24",
            amount: "+0.0125 BTC",
            isPositive: true,
            icon: Gift,
        },
        {
            id: 8,
            type: "scratch",
            title: "Scratch Card - Stake",
            time: "01:14 AM",
            date: "12/25/24",
            amount: "-0.0025 BTC",
            isPositive: false,
            icon: DollarSign,
        },
        {
            id: 9,
            type: "spin",
            title: "Spin Wheel - Won 2x",
            time: "12:45 AM",
            date: "12/25/24",
            amount: "+0.0050 BTC",
            isPositive: true,
            icon: Repeat,
        },
        {
            id: 10,
            type: "deposit",
            title: "Testnet BTC Deposit",
            time: "11:20 PM",
            date: "12/24/24",
            amount: "+0.0100 BTC",
            isPositive: true,
            icon: ArrowDownCircle,
        },
        {
            id: 11,
            type: "scratch",
            title: "Scratch Card - Stake",
            time: "11:10 PM",
            date: "12/24/24",
            amount: "-0.0025 BTC",
            isPositive: false,
            icon: DollarSign,
        },
        {
            id: 12,
            type: "spin",
            title: "Spin Wheel - Won 10x",
            time: "10:55 PM",
            date: "12/24/24",
            amount: "+0.0250 BTC",
            isPositive: true,
            icon: Repeat,
        },
        {
            id: 13,
            type: "spin",
            title: "Spin Wheel - Stake",
            time: "10:54 PM",
            date: "12/24/24",
            amount: "-0.0025 BTC",
            isPositive: false,
            icon: DollarSign,
        },
        {
            id: 14,
            type: "scratch",
            title: "Scratch Card - Won 3x",
            time: "10:30 PM",
            date: "12/24/24",
            amount: "+0.0075 BTC",
            isPositive: true,
            icon: Gift,
        },
        {
            id: 15,
            type: "deposit",
            title: "Testnet BTC Deposit",
            time: "09:15 PM",
            date: "12/24/24",
            amount: "+0.0200 BTC",
            isPositive: true,
            icon: ArrowDownCircle,
        },
    ];

    const filteredActivities = allActivities.filter((activity) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Deposits") return activity.type === "deposit";
        if (activeFilter === "Scratch") return activity.type === "scratch";
        if (activeFilter === "Spin") return activity.type === "spin";
        return true;
    });

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

                {/* Filter Buttons */}
                {/* <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveFilter("All")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === "All"
                                ? "bg-[#ffae2c] text-[#0e1624]"
                                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveFilter("Deposits")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === "Deposits"
                                ? "bg-[#ffae2c] text-[#0e1624]"
                                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
                            }`}
                    >
                        Deposits
                    </button>
                    <button
                        onClick={() => setActiveFilter("Scratch")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === "Scratch"
                                ? "bg-[#ffae2c] text-[#0e1624]"
                                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
                            }`}
                    >
                        Scratch Card
                    </button>
                    <button
                        onClick={() => setActiveFilter("Spin")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === "Spin"
                                ? "bg-[#ffae2c] text-[#0e1624]"
                                : "bg-[#4f585d] text-white hover:bg-[#5f686d]"
                            }`}
                    >
                        Spin Wheel
                    </button>
                </div> */}

                {/* Activity Table */}
                <div className="bg-[#0B121D] rounded-xl border border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                                        Type
                                    </th>
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                                        Activity
                                    </th>
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                                        Date
                                    </th>
                                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">
                                        Time
                                    </th>
                                    <th className="text-right text-gray-400 font-medium text-sm px-6 py-4">
                                        Amount
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredActivities.map((activity) => {
                                    const Icon = activity.icon;
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
                                                <span className="text-white font-medium">
                                                    {activity.title}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-gray-400">{activity.date}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-gray-400">{activity.time}</span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={`font-semibold ${activity.isPositive
                                                        ? "text-[#16a34a]"
                                                        : "text-[#f34f4f]"
                                                        }`}
                                                >
                                                    {activity.amount}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredActivities.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No activities found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllActivity;
