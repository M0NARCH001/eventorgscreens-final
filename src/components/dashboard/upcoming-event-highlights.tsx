"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { EVENT_HIGHLIGHTS } from "@/lib/dashboard-data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function UpcomingEventHighlights() {
  const router = useRouter()
  const {
    title,
    date,
    time,
    type,
    venue,
    aboutTitle,
    aboutDescription,
    highlightsTitle,
    highlights,
    stats,
  } = EVENT_HIGHLIGHTS

  return (
    <Card className="w-full">
      <CardContent className="p-6 pb-2">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Upcoming Event Highlights
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Event Poster */}
          <div className="relative aspect-2/3 w-full max-w-[280px] shrink-0 mx-auto lg:mx-0 shadow-sm rounded-lg overflow-hidden">
            <Image
              src="/event_poster_music.png"
              alt="Music Concert Poster"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>

          {/* Content Container */}
          <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
            {/* Top Details Section */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              {/* Event Info */}
              <div className="space-y-4 flex-1 min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-foreground wrap-break-word">
                    {title}
                  </h3>
                  <p className="text-base text-black mt-1">{date}</p>
                </div>

                <div className="space-y-1 text-sm text-black">
                  <p>Time: {time}</p>
                  <p>Type: {type}</p>
                  <p>Venue: {venue}</p>
                </div>

                <div>
                  <h4 className="text-section-title">{aboutTitle}</h4>
                  <p className="text-sm text-black leading-relaxed">
                    {aboutDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-section-title">{highlightsTitle}</h4>
                  <ul className="text-sm text-black space-y-1">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex gap-2">
                        <span>•</span>
                        <span className="wrap-break-word">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stats Grid and Buttons */}
              <div className="w-full lg:w-[360px] flex flex-col justify-between">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Stat title="Event Registrations" value={stats.registrations} />
                  <Stat title="Total Revenue" value={stats.revenue} />
                  <Stat title="Ad Ons" value={stats.addOns} />
                  <Stat title="Date Change" value={stats.dateChange} />
                </div>

                {/* Buttons */}
                <div className="flex flex-nowrap items-center gap-2 sm:gap-3 mt-10 w-full justify-between sm:justify-start pb-2 border-t pt-4 border-border lg:border-t-0 lg:pt-0">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-full text-xs sm:text-sm px-2 sm:px-4 py-2 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive whitespace-nowrap flex-1 sm:flex-none"
                      >
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will cancel the event. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Event</AlertDialogCancel>
                        <AlertDialogAction onClick={() => console.log("Event cancelled")}>Cancel Event</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    variant="outline"
                    className="rounded-full text-xs sm:text-sm px-2 sm:px-4 py-2 border-foreground text-foreground hover:bg-foreground/10 whitespace-nowrap flex-1 sm:flex-none"
                    onClick={() => {
                      const formData = {
                        eventName: title,
                        category: type,
                        description: aboutDescription,
                        date: date,
                        time: time,
                        venue: venue,
                        tagline: highlightsTitle,
                      };
                      localStorage.setItem("eventFormData", JSON.stringify(formData));
                      router.push("/create-event?startDirectly=true&action=reschedule");
                    }}
                  >
                    Reschedule
                  </Button>

                  <Button
                    className="rounded-full text-xs sm:text-sm px-2 sm:px-4 py-2 bg-foreground text-background hover:bg-foreground hover:opacity-90 whitespace-nowrap flex-1 sm:flex-none"
                    onClick={() => router.push("/analytics")}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border border-border rounded-lg p-3 text-center bg-card">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  )
}

