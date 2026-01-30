"use client"

import { Suspense } from "react"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { UpcomingEventHighlights } from "@/components/dashboard/upcoming-event-highlights"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import DashboardLayout from "@/components/layout/DashboardLayout"
const name = "Maggi"
const description = "Track, update, and grow your events the smart way."
export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hello {name}!</h1>
          <p className="text-gray-600 mt-1">
            {description}
          </p>
        </div>

        <StatsGrid />
        <UpcomingEventHighlights />
        <QuickActions />

        {/* Render boundary fixed + container size fixed */}
        <Suspense fallback={null}>
          <div className="w-full min-w-px h-[320px] min-h-px">
            <AnalyticsChart />
          </div>
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
