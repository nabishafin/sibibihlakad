import {
  CreditCard,
  TrendingUp,
  Dices,
  Gamepad2,
  WalletMinimal,
  SquareActivity,
} from "lucide-react";

const stats = [
  {
    label: "Games Played",
    value: "50",
    icon: Gamepad2,
    color: "text-black",
  },
  {
    label: "Transactions",
    value: "$458,920.5",
    icon: WalletMinimal,
    color: "text-black",
  },
  {
    label: "Return to Player (RTP)",
    value: "125%",
    icon: SquareActivity,
    color: "text-black",
  },
];

export function StatsGrid() {
  return (
    <div className="flex flex-col gap-2">
      {stats.map((stat) => {
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
