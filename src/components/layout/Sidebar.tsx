"use client";

import React, { useState } from "react";
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
    Search,
    Menu,
    Store,
} from "lucide-react";

// Simple class merger if utils doesn't exist yet
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();

    const menuItems = [
        { name: "Home", icon: Home, href: "/" },
        { name: "Create Events", icon: PlusCircle, href: "/create-event" }, // New route
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
                className={classNames(
                    "hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-50 flex-col shadow-xl",
                    isOpen ? "w-[260px]" : "w-[80px]"
                )}
            >
                {/* Header / Logo */}
                <div className="h-[64px] flex items-center justify-between px-6 border-b border-gray-100">
                    <div className="flex items-center gap-3 overflow-hidden w-full">
                        {/* Logo Image */}
                        <div className="relative w-full h-[40px] flex items-center justify-start">
                            {isOpen ? (
                                <Image
                                    src="/logo.svg"
                                    alt="Baatasari"
                                    width={120}
                                    height={40}
                                    className="object-contain"
                                />
                            ) : (
                                <Image
                                    src="/Vector.svg"
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
                <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={classNames(
                                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-colors",
                                    isActive
                                        ? "bg-[#0c1b33]/5 text-[#0c1b33] font-medium"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={classNames("w-6 h-6 min-w-[24px]", isActive ? "text-[#0c1b33]" : "text-gray-500")} />
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

                {/* Footer Navigation */}
                <div className="py-4 border-t border-gray-100 px-3 flex flex-col gap-2">
                    {footerItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-4 px-3 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <item.icon className="w-6 h-6 min-w-[24px]" />
                            <span
                                className={classNames(
                                    "whitespace-nowrap transition-opacity duration-300 font-poppins text-[15px]",
                                    isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* MOBILE BOTTOM NAV */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 px-6 py-2">
                <div className="flex justify-between items-center">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1 p-2"
                            >
                                <item.icon className={classNames("w-6 h-6", isActive ? "text-[#0c1b33]" : "text-gray-400")} />
                                {/* Optional label for mobile */}
                                {/* <span className={classNames("text-[10px]", isActive ? "text-[#0c1b33] font-medium" : "text-gray-400")}>{item.name}</span> */}
                            </Link>
                        )
                    })}
                    {/* Combine important footer items or just hamburger menu? Let's stick to main menu items + maybe a generic menu for the rest if needed, 
                        but for now 5 items fit well. */}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
