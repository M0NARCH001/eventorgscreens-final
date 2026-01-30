"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, Info, MapPin, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EventOverview() {
  const [eventData, setEventData] = useState({
    eventName: "Martiza Concert Vizag",
    date: "25 June 2025",
    time: "12:00 PM",
    status: "Past",
    location: "Visakhapatnam"
  });

  useEffect(() => {
    const storedData = localStorage.getItem("analyticsEventData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setEventData(prev => ({
          ...prev,
          eventName: parsed.eventName || prev.eventName,
          date: parsed.date || prev.date,
          status: parsed.status || prev.status,
        }));
      } catch (e) {
        console.error("Failed to parse analytics event data", e);
      }
    }
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground">
            {eventData.eventName}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 lg:gap-12">

            {/* Status */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Info className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-medium bg-muted px-2 rounded">
                  {eventData.status}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="font-medium">{eventData.time}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-medium">{eventData.location}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-medium">{eventData.date}</span>
              </div>
            </div>

          </div>
        </div>

        <Button className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Event
        </Button>
      </div>
    </div>
  )
}
