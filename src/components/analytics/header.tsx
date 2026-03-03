"use client"

import Image from "next/image"
import { Bell, Plus, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"

export function Header() {
  const { state } = useSidebar()

  return (
    <header className="w-full flex h-16 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        {state === "collapsed" && (
          <Image
            src="/logo_big.svg"
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <Bell className="h-5 w-5 text-foreground" />
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <Search className="h-5 w-5 text-foreground" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  SC
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 bg-popover border-border"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">
                  shadcn
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
