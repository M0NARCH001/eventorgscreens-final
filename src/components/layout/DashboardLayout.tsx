"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils"; // shadcn usually provides this helper

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 min-w-0",
          isSidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"
        )}
      >
        <Header />

        <main className="flex-1 mt-[64px] p-4 md:p-8 pb-20 md:pb-8 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
