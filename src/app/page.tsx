"use client"

import { Suspense } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { UpcomingEventHighlights } from "@/components/dashboard/upcoming-event-highlights"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"

const name = "Maggi"
const description = "Track, update, and grow your events the smart way."

export default function Home() {
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-[--upcoming-primary-700]">
            Hello {name}!
          </h1>
          <p className="text-[--upcoming-primary-700]">{description}</p>
        </div>

        <StatsGrid />
        <UpcomingEventHighlights />
        {/* <QuickActions /> - Hidden per user request */}

        <Suspense fallback={null}>
          <div className="w-full block min-h-[320px]">
            <AnalyticsChart />
          </div>
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
