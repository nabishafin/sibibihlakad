import React from "react";
import { useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Loading } from "@/components/ui/Loading";

export function ProfileModal({ open, onOpenChange }) {
    const { user } = useSelector((state) => state.auth);
    const { data: userData, isLoading } = useGetMeQuery(undefined, {
        skip: !open, // Only fetch when modal is open
    });

    // Use API data if available, fallback to Redux state
    const profileData = userData?.data || user;

    const username = profileData?.username || "User";
    const email = profileData?.email || "email@example.com";
    const joinedDate = profileData?.createdAt
        ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        })
        : "N/A";

    // Stats from API response
    const totalGamesPlayed = profileData?.stats?.totalGamesPlayed || 0;
    const averageWager = profileData?.stats?.averageWager
        ? `₿${profileData.stats.averageWager.toFixed(4)}`
        : "₿0.0000";
    const totalWagered = profileData?.stats?.totalWagered
        ? `₿${profileData.stats.totalWagered.toFixed(4)}`
        : "₿0.0000";
    const totalWon = profileData?.stats?.totalWon
        ? `₿${profileData.stats.totalWon.toFixed(4)}`
        : "₿0.0000";

    const getInitials = (name) => {
        const parts = name.split(" ");
        return parts
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0B121D] border-gray-800 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white font-semibold">
                        Profile
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-8">
                        <Loading size="medium" text="Loading profile..." />
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        {/* User Info Section */}
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    src="/placeholder.svg?height=64&width=64"
                                    alt={username}
                                />
                                <AvatarFallback className="bg-teal-600 text-white text-xl font-semibold">
                                    {getInitials(username)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {username}
                                </h3>
                                <p className="text-sm text-gray-400">{email}</p>
                                <p className="text-xs text-gray-500">
                                    Joined: {joinedDate}
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Total Games Played */}
                            <div className="bg-[#1a2536] rounded-lg p-4 border border-gray-700">
                                <p className="text-xs text-[#DAA520] mb-1">
                                    Total Games Played
                                </p>
                                <p className="text-xl font-bold text-white">
                                    {totalGamesPlayed}
                                </p>
                            </div>

                            {/* Average Wager */}
                            <div className="bg-[#1a2536] rounded-lg p-4 border border-gray-700">
                                <p className="text-xs text-[#DAA520] mb-1">Average Wager</p>
                                <p className="text-xl font-bold text-white">{averageWager}</p>
                            </div>

                            {/* Total Wagered */}
                            <div className="bg-[#1a2536] rounded-lg p-4 border border-gray-700">
                                <p className="text-xs text-[#DAA520] mb-1">Total Wagered</p>
                                <p className="text-xl font-bold text-white">{totalWagered}</p>
                            </div>

                            {/* Total Won */}
                            <div className="bg-[#1a2536] rounded-lg p-4 border border-gray-700">
                                <p className="text-xs text-[#DAA520] mb-1">Total Won</p>
                                <p className="text-xl font-bold text-white">{totalWon}</p>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

