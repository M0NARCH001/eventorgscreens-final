"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dashboardNavItems } from "./navigation";

// Simple class merger if utils doesn't exist yet
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  positionMode?: "fixed" | "absolute";
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, positionMode = "fixed" }) => {
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={classNames(
          "hidden md:block transition-all duration-300 ease-in-out shrink-0 bg-foreground border-r border-gray-800 border-b-2 border-b-white z-50",
          isOpen ? "w-[260px]" : "w-[80px]",
          positionMode === "fixed" ? "fixed top-0 left-0 h-screen" : "absolute bottom-0 left-0 h-screen"
        )}
      >
        <div className="h-full flex flex-col items-center">
          {/* Header / Logo */}
          <div className="h-[64px] flex items-center justify-between px-6 border-b border-gray-800 w-full">
            <div className="flex items-center gap-3 overflow-hidden w-full">
              {/* Logo Image */}
              <div className="relative w-full h-[40px] flex items-center justify-start">
                {isOpen ? (
                  <Image
                    src="/foot-logo.png"
                    alt="Baatasari"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/Vector.png"
                    alt="Baatasari"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-24 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md transition-all z-50"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-8 flex flex-col gap-2 px-3 w-full">
            {dashboardNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-colors w-full",
                    isActive
                      ? "bg-white/10 text-white font-medium"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={classNames("w-6 h-6 min-w-[24px]", isActive ? "text-white" : "text-gray-400")} />
                  <span
                    className={classNames(
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
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-foreground border-t border-gray-800 z-50 px-6 py-2">
        <div className="flex justify-between items-center">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 p-2"
              >
                <item.icon className={classNames("w-6 h-6", isActive ? "text-white" : "text-gray-500")} />
                {/* Optional label for mobile */}
                {/* <span className={classNames("text-[10px]", isActive ? "text-[#0c1b33] font-medium" : "text-gray-400")}>{item.name}</span> */}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
