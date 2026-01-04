import {
  LayoutDashboard,
  Users2,
  ScrollText,
  Menu,
  Music,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ArrowLeftFromLine,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import nasib from "../../assets/Nasib.png";
import { useGetLiveStatsQuery } from "@/redux/features/dashboard/dashboardApi";

// Sidebar Items
const sidebarItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Games",
    href: "/dashboard/games",
    icon: Music,
    children: [
      {
        title: "Spin Wheel",
        href: "/dashboard/games/spin-wheel",
      },
      {
        title: "Scratch Card",
        href: "/dashboard/games/scratch-card",
      },
    ],
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Users2,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: ScrollText,
  },
];

// Live Stats Component
function LiveStats() {
  const { data: queryData, isLoading } = useGetLiveStatsQuery();
  const stats = queryData?.data || {};

  return (
    <div className="mt-4 p-4 border border-gray-700 rounded-xl bg-[#1F2937]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-[#D6B25E]" />
        <span className="text-sm font-semibold text-white">Live Stats</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-gray-300">
          <span>Players Online</span>
          <span className="text-white font-semibold">
            {isLoading ? "..." : stats.playersOnline || "0"}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Games Played</span>
          <span className="text-white font-semibold">
            {isLoading ? "..." : stats.gamesPlayed || "0"}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>BTC Price</span>
          <span className="text-[#D6B25E] font-semibold">
            {isLoading ? "..." : stats.btcPrice || "$0.00"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Sidebar Navigation List
function SidebarNav({ onLinkClick, isMobile = false }) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (href) =>
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((i) => i !== href) : [...prev, href]
    );

  const isExpanded = (href) => expandedItems.includes(href);

  return (
    <nav className="flex-1 p-2 sm:p-4 overflow-y-auto flex flex-col">
      <ul className="space-y-4">
        {sidebarItems.map((item) => {
          const hasChildren = !!item.children?.length;

          // ✅ Active logic updated: parent active only if its route or child route is active
          const isActive =
            location.pathname === item.href ||
            item.children?.some((child) => child.href === location.pathname);

          const expanded = isExpanded(item.href);

          return (
            <li key={item.href}>
              {hasChildren ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-sm sm:text-base rounded-lg font-medium",
                      isActive || expanded
                        ? "bg-[#D6B25E] border-b text-black hover:bg-[#D6B25E]"
                        : "text-gray-300 bg-white/20 hover:bg-white/20 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>

                  <div
                    className={cn(
                      "transition-all overflow-hidden duration-200",
                      expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1 mt-1">
                      {item.children.map((child) => {
                        const isChildActive = location.pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link to={child.href} onClick={onLinkClick}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 h-10 text-sm pl-12 rounded-md",
                                  isChildActive
                                    ? "bg-[#D6B25E] text-black hover:bg-[#D6B25E]"
                                    : "text-gray-400 hover:bg-[#2a3645] hover:text-gray-200"
                                )}
                              >
                                {child.title}
                              </Button>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <Link to={item.href} onClick={onLinkClick}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-sm sm:text-base rounded-lg font-medium",
                      isActive
                        ? "bg-[#D6B25E] border-b text-black hover:bg-[#D6B25E]"
                        : "text-gray-300 bg-white/20 hover:bg-white/20 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Button>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <LiveStats />
    </nav>
  );
}

// Desktop Sidebar
function DesktopSidebar() {
  return (
    <div className="hidden lg:flex h-full w-72 flex-col bg-[#0E1624] border-r border-gray-700">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src={nasib} className="w-44" alt="" />
        </Link>
      </div>
      <SidebarNav />
    </div>
  );
}

// Mobile Sidebar
function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/20 h-8 w-8 bg-transparent border border-white/20 transition-colors"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0 sm:max-w-sm">
        <div className="flex h-full flex-col bg-[#1a2332]">
          <SidebarNav onLinkClick={() => setOpen(false)} isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { DesktopSidebar, MobileSidebar };

export default function DashboardSidebar() {
  return <DesktopSidebar />;
}
