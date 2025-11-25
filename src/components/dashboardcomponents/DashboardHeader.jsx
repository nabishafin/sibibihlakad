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
import { Search, ChevronDown, Coins, Bitcoin } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileSidebar } from "./DashboardSidebar";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function DashboardHeader() {
  return (
    <header className="bg-[#0E1624] text-white px-2 sm:px-6 lg:px-8 py-2 ">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>

          {/* Logo */}
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-[#0B121D] border border-gray-800 rounded-xl p-2 pl-4">
          <div className="flex gap-2 items-center">
            <div className="bg-yellow-500 rounded-full p-2 rotate-0">
              <Bitcoin />
            </div>
            <span className="text-md font-semibold">$12,020</span>
          </div>

          <AnimatedButton
            text="Deposit"
            width="w-auto"
            className="px-6"
            fillColor1="#FFCE00"
            fillColor2="#FFB800"
          />
        </div>

        <div className="flex items-center gap-4 rounded-md">
          {/* Balance & Deposit Group */}

          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white bg-[#0B121D] hover:bg-[#1a2332] border border-gray-800 h-14 w-14 rounded-xl"
          >
            <Search size={20} className="h-8 w-8" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 bg-[#0B121D] hover:bg-[#1a2332] border border-gray-800 rounded-xl p-2 pr-4 h-auto"
              >
                <Avatar className="h-9 w-9">
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
