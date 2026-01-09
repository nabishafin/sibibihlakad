import { ActivityFeed } from "../../../components/homeComponent/ActivityFeed";
import { BalanceCard } from "../../../components/homeComponent/BalanceCard";
import { StatsGrid } from "../../../components/homeComponent/StatsGrid";
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi";
import { Loading } from "@/components/ui/Loading";

export default function Home() {
  // Hardcoded userId for now as per requirements
  const userId = "694a6355f7db1eca322dfa38";
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery(userId);

  if (isLoading) {
    return <Loading size="large" text="Loading your account..." />;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading your data</div>;
  }

  const { balance, userStats, liveActivity } = dashboardData?.data || {};


  return (
    <main className="">
      <div className="flex flex-col gap-6">
        {/* Top section: BalanceCard + StatsGrid */}
        <div className="flex gap-6 min-h-[300px]">
          {/* Left div - Balance Card */}
          <div className="w-6/12 h-full">
            <BalanceCard balance={balance} />
          </div>

          {/* Right div - Stats Grid */}
          <div className="w-6/12 h-full">
            <StatsGrid stats={userStats} />
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <ActivityFeed activities={liveActivity} />
        </div>
      </div>
    </main>
  );
}
