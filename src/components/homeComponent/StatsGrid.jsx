import { CreditCard, TrendingUp, Dices } from "lucide-react";

const stats = [
  {
    label: "Games Played",
    value: "50",
    icon: Dices,
    color: "text-blue-400",
  },
  {
    label: "Transactions",
    value: "$458,920.5",
    icon: CreditCard,
    color: "text-emerald-400",
  },
  {
    label: "Return to Player (RTP)",
    value: "125%",
    icon: TrendingUp,
    color: "text-purple-400",
  },
];

export function StatsGrid() {
  return (
    <div className="flex flex-col gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#0E1624] p-4 rounded-lg shadow-md flex items-start justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`${stat.color} opacity-70`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
