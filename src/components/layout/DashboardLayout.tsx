"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${isSidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"}`}
            >
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 mt-[64px] p-4 md:p-8 pb-20 md:pb-8 min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
