import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileSidebar } from "./DashboardSidebar";

export default function DashboardHeader() {
  return (
    <header className="bg-[#1a2332] text-white px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-700">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="bg-yellow-500 rounded-full p-1.5">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold hidden sm:inline">NASIIB</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Balance Display */}
          <div className="flex items-center gap-2 bg-[#2a3645] rounded-full px-3 py-1.5">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold">$12,020</span>
          </div>

          {/* Deposit Button */}
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-1.5 h-8 text-sm rounded-md">
            Deposit
          </Button>

          {/* Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-[#2a3645] h-9 w-9 rounded-md"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-[#2a3645] px-2 py-1.5 h-auto rounded-md"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback className="bg-teal-600 text-white text-xs font-semibold">
                    SC
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">
                  Shyami Chauhan
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#1a2332] border-gray-700 text-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Shyami Chauhan
                  </p>
                  <p className="text-xs leading-none text-gray-400">
                    shyami@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-[#2a3645] cursor-pointer">
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a3645] cursor-pointer">
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a3645] cursor-pointer">
                <span>Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-[#2a3645] cursor-pointer text-red-400">
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
