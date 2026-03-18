"use client"

import type { Stall } from "@/lib/stalls-data"

import { StallCard } from "./stall-card"

export function StallsGrid({
    stalls,
    onApprove,
    onViewMore,
    className = "",
}: {
    stalls: Stall[]
    onApprove?: (stall: Stall) => void
    onViewMore?: (stall: Stall) => void
    className?: string
}) {
    return (
        <div
            className={[
                "grid gap-6 auto-rows-fr",
                "grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
                className,
            ].join(" ")}
        >
            {stalls.map((stall) => (
                <StallCard
                    key={stall.title}
                    title={stall.title}
                    badge={stall.badge}
                    zone={stall.zone}
                    summary={stall.summary}
                    image={stall.image}
                    onViewMore={() => onViewMore?.(stall)}
                    onApprove={() => onApprove?.(stall)}
                />
            ))}
        </div>
    )
}
