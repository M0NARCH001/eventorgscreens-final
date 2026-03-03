"use client"

import {
  Home,
  Calendar,
  Network,
  TrendingUp,
  HelpCircle,
  MessageSquare,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <>
      {/* Backdrop (mobile) */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-60 bg-sidebar border-r border-sidebar-border border-b-2 border-b-white
        transform transition-transform duration-300 flex flex-col
        ${collapsed ? "-translate-x-full" : "translate-x-0"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[64px] px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/logo.svg" alt="Baatasari Logo" fill className="object-contain" />
            </div>
            <span className="font-serif italic text-xl text-foreground">
              baatasari
            </span>
          </div>

          {/* Close (mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 rounded bg-muted md:hidden"
            onClick={onToggle}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 bg-muted px-3"
            >
              <Home className="h-5 w-5 shrink-0" />
              <span>Home</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3"
            >
              <Calendar className="h-5 w-5 shrink-0" />
              <span>Create Events</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3"
            >
              <Network className="h-5 w-5 shrink-0" />
              <span>Manage Events</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3"
            >
              <TrendingUp className="h-5 w-5 shrink-0" />
              <span>Analytics</span>
            </Button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-3"
          >
            <HelpCircle className="h-5 w-5 shrink-0" />
            <span>Help</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-3"
          >
            <MessageSquare className="h-5 w-5 shrink-0" />
            <span>Feedback</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
