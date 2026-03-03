"use client"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { EventOverview } from "@/components/analytics/event-overview"
import { EventStats } from "@/components/analytics/event-stats"
import { RevenueStats } from "@/components/analytics/revenue-stats"
import { DateReviewsSection } from "@/components/analytics/date-reviews"
import { EventDetailsDescription } from "@/components/analytics/event-details-description"
import { ApprovedStallsSection } from "@/components/analytics/approved-stalls"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="w-full px-0 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <EventOverview />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <div className="lg:col-span-12">
            <EventStats />
          </div>
          <div className="lg:col-span-12">
            <RevenueStats />
          </div>
        </div>
        <ApprovedStallsSection />
        <DateReviewsSection />
        <EventDetailsDescription />
      </div>
    </DashboardLayout>
  )
}
