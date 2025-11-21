import { ActivityFeed } from "../../../components/homeComponent/ActivityFeed";
import { BalanceCard } from "../../../components/homeComponent/BalanceCard";
import { StatsGrid } from "../../../components/homeComponent/StatsGrid";

export default function Home() {
  return (
    <main className="">
      <div className="">
        <div className="flex gap-6">
          {/* Left div - Balance Card */}
          <div className="w-6/12">
            <BalanceCard />
          </div>

          {/* Right div - Stats Grid */}
          <div className="w-6/12">
            <StatsGrid />
          </div>
        </div>

        {/* Activity feed */}
        <ActivityFeed />
      </div>
    </main>
  );
}
