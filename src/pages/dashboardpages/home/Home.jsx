import { ActivityFeed } from "../../../components/homeComponent/ActivityFeed";
import { BalanceCard } from "../../../components/homeComponent/BalanceCard";
import { StatsGrid } from "../../../components/homeComponent/StatsGrid";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col gap-6">
        {/* Top section: BalanceCard + StatsGrid */}
        <div className="flex gap-6 min-h-[300px]">
          {/* Left div - Balance Card */}
          <div className="w-6/12 h-full">
            <BalanceCard />
          </div>

          {/* Right div - Stats Grid */}
          <div className="w-6/12 h-full">
            <StatsGrid />
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <ActivityFeed />
        </div>
      </div>
    </main>
  );
}
