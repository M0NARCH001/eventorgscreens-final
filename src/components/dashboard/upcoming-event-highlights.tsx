"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EVENT_HIGHLIGHTS } from "@/lib/dashboard-data"

export function UpcomingEventHighlights() {
  const { title, date, time, type, venue, aboutTitle, aboutDescription, highlightsTitle, highlights, stats } = EVENT_HIGHLIGHTS;

  return (
    <Card>
      <CardContent className="p-6 pb-2">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Upcoming Event Highlights
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 items-start overflow-hidden">

          {/* Event Poster */}
          <div className="bg-muted rounded-lg aspect-2/3 w-full max-w-[280px] shrink-0 mx-auto lg:mx-0 shadow-sm" />

          {/* Content Container */}
          <div className="flex-1 flex flex-col gap-6 w-full">

            {/* Top Details Section */}
            <div className="flex flex-col md:flex-row gap-6 justify-between">

              {/* Event Info */}
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl font-bold text-foreground wrap-break-word">
                    {title}
                  </h3>
                  <p className="text-base text-muted-foreground mt-1">
                    {date}
                  </p>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Time: {time}</p>
                  <p>Type: {type}</p>
                  <p>Venue: {venue}</p>
                </div>

                <div>
                  <h4 className="text-section-title">
                    {aboutTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {aboutDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-section-title">
                    {highlightsTitle}
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex gap-2">
                        <span>•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto md:min-w-[320px] lg:min-w-[380px]">
                <Card className="card-stat">
                  <CardContent className="p-4">
                    <p className="text-stat-label">
                      Event Registrations
                    </p>
                    <p className="text-stat-value">{stats.registrations}</p>
                  </CardContent>
                </Card>

                <Card className="card-stat">
                  <CardContent className="p-4">
                    <p className="text-stat-label">Total Revenue</p>
                    <p className="text-stat-value">
                      {stats.revenue}
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-stat">
                  <CardContent className="p-4">
                    <p className="text-stat-label">Ad Ons</p>
                    <p className="text-stat-value">{stats.addOns}</p>
                  </CardContent>
                </Card>

                <Card className="card-stat">
                  <CardContent className="p-4">
                    <p className="text-stat-label">Date Change</p>
                    <p className="text-stat-value">{stats.dateChange}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-end border-t pt-4 border-border">
              <Button
                variant="outline"
                className="btn-outline-red"
                onClick={() => alert('Cancel Event functionality needs to be implemented')}
              >
                Cancel
              </Button>

              <Button
                variant="outline"
                className="btn-outline-gray"
                onClick={() => alert('Reschedule Event functionality needs to be implemented')}
              >
                Reschedule
              </Button>

              <Button
                className="btn-primary"
                onClick={() => alert('Viewing Event Details...')}
              >
                View Details
              </Button>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}
