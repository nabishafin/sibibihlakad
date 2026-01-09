import {
  CreditCard,
  TrendingUp,
  Dices,
  Gamepad2,
  WalletMinimal,
  SquareActivity,
} from "lucide-react";

export function StatsGrid({ stats }) {
  // Stats data from API: { gamesPlayed: 7, transactionsVolume: "$0.00", rtp: "100%" }
  // We need to map this to our display format.

  const displayStats = [
    {
      label: "Games Played",
      value: stats?.gamesPlayed || "0",
      icon: Gamepad2,
      color: "text-black",
    },
    {
      label: "Transactions",
      value: stats?.transactionsVolume || "$0.00",
      icon: WalletMinimal,
      color: "text-black",
    },
    {
      label: "Return to Player (RTP)",
      value: stats?.rtp || "0%",
      icon: SquareActivity,
      color: "text-black",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {displayStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#0E1624] p-6 rounded-lg shadow-md flex items-start justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`${stat.color}  bg-white rounded-sm p-[1px] `}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
