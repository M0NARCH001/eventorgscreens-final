"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import DashboardLayout from "@/components/layout/DashboardLayout"
import EventPage from "@/components/event-org/EventPage"

function CreateEventContent() {
    const searchParams = useSearchParams()
    const mode = searchParams.get("mode")
    const action = searchParams.get("action")
    const startDirectly =
        mode === "create" || searchParams.get("startDirectly") === "true"

    return <EventPage isDashboardMode startDirectly={startDirectly} action={action} />
}

export default function CreateEventPage() {
    return (
        <DashboardLayout>
            <Suspense fallback={null}>
                <CreateEventContent />
            </Suspense>
        </DashboardLayout>
    )
}
