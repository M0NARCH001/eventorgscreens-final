"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-100 h-[64px] flex items-center justify-between md:justify-end px-4 md:px-8 transition-all duration-300">
      {/* Mobile Logo */}
      <div className="md:hidden flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Baatasari"
            width={100}
            height={32}
            className="object-contain h-8 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0 ml-auto md:ml-0">
        {/* Create Event Button */}
        <Link href="/create-event?mode=create">
          <button className="flex items-center gap-1 md:gap-2 bg-(--brand-navy) text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg hover:bg-(--brand-navy)/90 transition-colors">
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-poppins font-medium text-xs md:text-sm">
              Create Event
            </span>
          </button>
        </Link>

        {/* User Profile dropdown (shadcn) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex items-center gap-3 border border-gray-200 rounded-full pl-1 pr-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src="/placeholder-user.jpg"
                  alt="User"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>

              <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="font-poppins">
                Profile Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="font-poppins text-red-600 focus:text-red-600"
              onSelect={() => {
                alert("Logging out...");
              }}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
