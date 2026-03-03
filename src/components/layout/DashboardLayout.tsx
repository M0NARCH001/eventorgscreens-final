"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<"fixed" | "absolute">("fixed");
  const layoutRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!layoutRef.current) return;

    // Get the bottom of the entire layout container
    const layoutRect = layoutRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // If the bottom of the layout is visible in the viewport,
    // (meaning the footer is on screen), switch to absolute bottom.
    // We add a tiny offset so it triggers right as the footer appears.
    if (layoutRect.bottom <= windowHeight) {
      setSidebarMode("absolute");
    } else {
      setSidebarMode("fixed");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Container tracking the body height */}
      <div ref={layoutRef} className="flex flex-1 relative">
        {/* Sidebar (sticky — scrolls up with content when footer appears) */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          positionMode={sidebarMode}
        />

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col transition-all duration-300 min-w-0 md:ml-[80px] relative"
        >
          {/* Dark Overlay when sidebar is open */}
          <div
            className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 mt-[64px] min-h-[calc(100vh-64px)] flex flex-col">
            <div className="flex-1 p-4 md:p-8 pb-24 md:pb-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer — full width, below sidebar + content */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
