import {
  LayoutDashboard,
  Users2,
  Settings,
  ScrollText,
  Menu,
  Music,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  {
    title: "English",
    href: "/dashboard/language",
    icon: Settings,
  },
];

// Logo Section
function LogoSection({ name = "Dance Attix", title = "Admin Panel" }) {
  return (
    <Link to="/dashboard">
      <div className="flex items-center p-4 sm:p-6 flex-col justify-center border-b border-gray-700">
        <img src="/logo.svg" alt="logo" className="w-8 h-8 sm:w-10 sm:h-10" />
        <h1 className="text-xl sm:text-2xl font-bold mt-2 text-white">
          {name}
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-gray-400">{title}</p>
      </div>
    </Link>
  );
}

// Live Stats Component
function LiveStats() {
  return (
    <div className="mt-auto p-4 border-t border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-semibold text-white">Live Stats</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-gray-300">
          <span>Players Online</span>
          <span className="text-white font-semibold">2,483</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Games Played</span>
          <span className="text-white font-semibold">15.2K</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>BTC Price</span>
          <span className="text-emerald-400 font-semibold">$94,951.58</span>
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
      <ul className="space-y-1 sm:space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          const hasChildren = !!item.children?.length;
          const expanded = isExpanded(item.href);

          return (
            <li key={item.href}>
              {hasChildren ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full justify-start gap-3 h-10 text-sm sm:text-base",
                      isActive || expanded
                        ? "bg-[#2a3645] text-white"
                        : "text-gray-300 hover:bg-[#2a3645] hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
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
                                  "w-full justify-start gap-3 h-9 text-sm pl-12",
                                  isChildActive
                                    ? "bg-[#374151] text-white"
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
                      "w-full justify-start gap-3 h-10 text-sm sm:text-base",
                      isActive
                        ? "bg-[#2a3645] text-white"
                        : "text-gray-300 hover:bg-[#2a3645] hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Desktop Sidebar
function DesktopSidebar() {
  return (
    <div className="hidden lg:flex h-full w-64 flex-col bg-[#1a2332] border-r border-gray-700">
      <LogoSection />
      <SidebarNav />
      <LiveStats />
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
          {/* Mobile Logo */}
          <div className="flex items-center p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Dance Attix
                </h2>
                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            </div>
          </div>
          <SidebarNav onLinkClick={() => setOpen(false)} isMobile={true} />
          <LiveStats />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Export individual components
export { DesktopSidebar, MobileSidebar };

// Export Combined Sidebar (only for desktop use)
export default function DashboardSidebar() {
  return <DesktopSidebar />;
}
