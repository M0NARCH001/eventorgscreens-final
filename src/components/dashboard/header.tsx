"use client"

import { Bell, Search, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="w-full bg-background border-b border-border px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button className="bg-primary text-primary-foreground h-9 px-3 md:px-4">
          <span className="text-lg mr-1">+</span> Create Event
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-2 gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  O
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
