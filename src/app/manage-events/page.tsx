"use client"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { UpcomingEventsSection } from "@/components/manage-events/upcoming-events-section"
import { AllEventsSection } from "@/components/manage-events/all-events-section"

export default function ManageEventsPage() {
    return (
        <DashboardLayout>
            <div className="w-full mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-6 flex flex-col gap-6">
                <UpcomingEventsSection />
                <AllEventsSection />
            </div>
        </DashboardLayout>
    )
}
