"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Plus } from "lucide-react";



const Header: React.FC = () => {
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    return (
        <header
            className="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-100 h-[64px] flex items-center justify-between md:justify-end px-4 md:px-8 transition-all duration-300"
        >
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
                    <button className="flex items-center gap-1 md:gap-2 bg-[#0c1b33] text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg hover:bg-[#0c1b33]/90 transition-colors">
                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-poppins font-medium text-xs md:text-sm">Create Event</span>
                    </button>
                </Link>

                {/* Icons Removed as per request */}

                {/* User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 border border-gray-200 rounded-full pl-1 pr-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            {/* Placeholder Avatar */}
                            <Image
                                src="/placeholder-user.jpg" // Ensure this exists or use a fallback
                                alt="User"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 flex flex-col z-50">
                            <Link href="/profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0c1b33] font-poppins">
                                Profile Details
                            </Link>
                            <button
                                onClick={() => {
                                    alert("Logging out...");
                                    setIsProfileOpen(false);
                                }}
                                className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 font-poppins w-full"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
