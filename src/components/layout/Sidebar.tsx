"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusCircle,
  Calendar,
  BarChart2,
  HelpCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils"; // shadcn-style class merge helper

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Create Events", icon: PlusCircle, href: "/create-event" },
    { name: "Manage Events", icon: Calendar, href: "/manage-events" },
    { name: "Artist Request", icon: MessageSquare, href: "/artist-request" },
    { name: "Stalls", icon: Store, href: "/stalls" },
    { name: "Analytics", icon: BarChart2, href: "/analytics" },
  ];

  const footerItems = [
    { name: "Help", icon: HelpCircle, href: "/help" },
    { name: "Feedback", icon: MessageSquare, href: "/feedback" },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-50 flex-col shadow-xl",
          isOpen ? "w-[260px]" : "w-[80px]"
        )}
      >
        {/* Header / Logo */}
        <div className="h-[64px] flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-3 overflow-hidden w-full">
            <div className="relative w-full h-[40px] flex items-center justify-start">
              {isOpen ? (
                <Image
                  src="/logo.svg"
                  alt="Baatasari"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/Vector.svg"
                  alt="Baatasari"
                  width={24}
                  height={24}
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-24 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md transition-all z-50"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Main Navigation */}
        <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl transition-colors",
                  isActive
                    ? "bg-(--brand-navy)/5 text-(--brand-navy) font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 min-w-[24px]",
                    isActive ? "text-(--brand-navy)" : "text-gray-500"
                  )}
                />

                <span
                  className={cn(
                    "whitespace-nowrap transition-opacity duration-300 font-poppins text-[15px]",
                    isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="py-4 border-t border-gray-100 px-3 flex flex-col gap-2">
          {footerItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-3 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Icon className="w-6 h-6 min-w-[24px]" />
                <span
                  className={cn(
                    "whitespace-nowrap transition-opacity duration-300 font-poppins text-[15px]",
                    isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 px-6 py-2">
        <div className="flex justify-between items-center">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 p-2"
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    isActive ? "text-(--brand-navy)" : "text-gray-400"
                  )}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
