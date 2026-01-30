"use client"

import * as React from "react"
import { Calendar, MapPin, Users, Tag, ArrowRight } from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EventDetailsDescription() {
  return (
    <div className="p-4 md:p-8 md:pt-0">
      <Card className="w-full">
        <CardContent className="p-6 md:p-10 flex flex-col md:flex-row gap-10">

          {/* Left Column: Event Details */}
          <div className="w-full md:w-1/3 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">Event Details</h2>

            <div className="space-y-6">
              {/* Date & Time */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <Calendar className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Date & Time</h3>
                  <p className="text-muted-foreground">March 22, 2025; 7:00 PM onwards</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <MapPin className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Location</h3>
                  <p className="text-muted-foreground">VMRDA Grounds, Visakhapatnam</p>
                </div>
              </div>

              {/* Organized By */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Organized By</h3>
                  <p className="text-muted-foreground">Moonlight Events</p>
                </div>
              </div>

              {/* Category */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <Tag className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Category</h3>
                  <p className="text-muted-foreground">Music Concert</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Description</h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A sensational live performance by Maritza Correa, bringing Latin pop and soul to the heart of Vizag. Enjoy an electrifying evening filled with vibrant music, food stalls, light shows, and crowd interaction. This open-air concert is a must-attend for music lovers and cultural enthusiasts.
              </p>
              <p>
                Entry starts at 6:00 PM.
                <br />
                All age groups welcome.
                <br />
                Food & beverage stalls available.
                <br />
                Security and medical assistance will be on-site.
              </p>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="rounded-full px-8 border-border text-primary hover:text-primary hover:bg-muted"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
