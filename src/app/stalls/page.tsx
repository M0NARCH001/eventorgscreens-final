"use client"

import { useState } from "react"
import {
    MapPin,
    MicVocal,
    Music2,
    Sparkles,
    Store,
} from "lucide-react"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { ArtistDetailsModal } from "@/components/stalls/artist-details-modal"
import { ArtistCard } from "@/components/stalls/artist-card"
import { StallCard } from "@/components/stalls/stall-card"
import { StallDetails } from "@/components/stalls/stall-details"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import {
    ARTISTS,
    STALLS_DATA,
    type Artist,
    type ArtistCategory,
    type Stall,
} from "@/lib/stalls-data"
import { cn } from "@/lib/utils"

type HubView = "All Stalls" | ArtistCategory

const HUB_TABS: {
    id: HubView
    label: string
    icon: typeof Store
}[] = [
    { id: "All Stalls", label: "All Stalls", icon: Store },
    { id: "Singers", label: "Singers", icon: MicVocal },
    { id: "Dancers", label: "Dancers", icon: Music2 },
    { id: "Performers", label: "Performers", icon: Sparkles },
]

const VIEW_COPY: Record<HubView, { heading: string; description: string }> = {
    "All Stalls": {
        heading: "Baatasari Hub",
        description:
            "Explore artisanal stalls, gourmet food vendors, and featured local discoveries curated for your Vizag event floor.",
    },
    Singers: {
        heading: "Baatasari Hub",
        description:
            "Browse vocal talent built for headline slots, sunset sets, and crowd-led singalong moments.",
    },
    Dancers: {
        heading: "Baatasari Hub",
        description:
            "Review movement-led acts and choreography teams designed to raise the energy of your event lineup.",
    },
    Performers: {
        heading: "Baatasari Hub",
        description:
            "Find immersive stage performers and feature acts that bring spectacle, pacing, and memorable transitions.",
    },
}

export default function StallsPage() {
    const [activeView, setActiveView] = useState<HubView>("All Stalls")
    const [selectedStall, setSelectedStall] = useState<Stall | null>(null)
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
    const [approvedStalls, setApprovedStalls, approvedReady] = useLocalStorage<string[]>(
        "approvedStalls",
        []
    )
    const [deniedStalls, setDeniedStalls, deniedReady] = useLocalStorage<string[]>(
        "deniedStalls",
        []
    )
    const [bookedArtists, setBookedArtists, bookedReady] = useLocalStorage<string[]>(
        "bookedArtists",
        []
    )
    const { toast } = useToast()

    const isReady = approvedReady && deniedReady && bookedReady
    const visibleStalls = STALLS_DATA.filter(
        (stall) =>
            !approvedStalls.includes(stall.title) && !deniedStalls.includes(stall.title)
    )
    const visibleArtists =
        activeView === "All Stalls"
            ? []
            : ARTISTS.filter((artist) => artist.category === activeView)

    const handleViewChange = (view: HubView) => {
        setActiveView(view)
        setSelectedStall(null)
        setSelectedArtist(null)
    }

    const handleApprove = (stallTitle: string) => {
        if (approvedStalls.includes(stallTitle)) return

        setApprovedStalls([...approvedStalls, stallTitle])
        if (selectedStall?.title === stallTitle) {
            setSelectedStall(null)
        }

        toast({
            title: "Stall Approved",
            description: `${stallTitle} is now part of your event selection.`,
            duration: 3000,
        })
    }

    const handleDeny = (stallTitle: string) => {
        if (approvedStalls.includes(stallTitle)) {
            setApprovedStalls(approvedStalls.filter((title) => title !== stallTitle))
        }

        if (!deniedStalls.includes(stallTitle)) {
            setDeniedStalls([...deniedStalls, stallTitle])
        }

        if (selectedStall?.title === stallTitle) {
            setSelectedStall(null)
        }

        toast({
            title: "Stall Denied",
            description: `${stallTitle} has been removed from the shortlist.`,
            duration: 3000,
        })
    }

    const handleConfirmBooking = (artistName: string) => {
        if (bookedArtists.includes(artistName)) {
            setSelectedArtist(null)
            return
        }

        setBookedArtists([...bookedArtists, artistName])
        setSelectedArtist(null)

        toast({
            title: "Booking Confirmed",
            description: `${artistName} has been added to your artist roster.`,
            duration: 3000,
        })
    }

    return (
        <DashboardLayout>
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
                {!isReady ? (
                    <div className="h-[620px] animate-pulse rounded-[42px] border border-(--hub-shell-border) bg-(--hub-shell-skeleton-bg) shadow-[0_24px_80px_var(--hub-shell-skeleton-shadow)]" />
                ) : (
                    <section className="relative isolate overflow-hidden rounded-[42px] border border-(--hub-shell-border) bg-[linear-gradient(180deg,var(--hub-shell-bg)_0%,var(--hub-shell-bg-muted)_100%)] px-4 py-5 shadow-[0_30px_100px_var(--hub-shell-shadow)] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                        <div className="absolute -left-16 top-16 h-48 w-48 rounded-full bg-(--hub-ornament-blue) blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-(--hub-ornament-peach) blur-3xl" />

                        <div className="relative space-y-8">
                            <div className="overflow-hidden rounded-full border border-(--hub-nav-border) bg-(--hub-nav-bg) p-2 shadow-[0_18px_44px_var(--hub-nav-shadow)]">
                                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                                    <div className="flex shrink-0 items-center gap-2 rounded-full bg-(--hub-chip-bg) px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--hub-chip-text)">
                                        <MapPin className="h-4 w-4 text-(--hub-chip-icon)" />
                                        Vizag Discovery
                                    </div>

                                    {HUB_TABS.map((tab) => {
                                        const Icon = tab.icon
                                        const isActive = activeView === tab.id

                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => handleViewChange(tab.id)}
                                                className={cn(
                                                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
                                                    isActive
                                                        ? "bg-(--hub-tab-active-bg) text-white shadow-[0_10px_30px_var(--hub-tab-active-shadow)]"
                                                        : "bg-(--hub-tab-inactive-bg) text-(--hub-tab-inactive-text) hover:bg-(--hub-tab-inactive-hover-bg)"
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                                {tab.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                                <div className="flex max-w-3xl gap-4">
                                    <div className="mt-1 hidden h-[76px] w-[3px] rounded-full bg-[linear-gradient(180deg,var(--hub-accent-start)_0%,var(--hub-accent-end)_100%)] sm:block" />
                                    <div className="space-y-3">
                                        <h1 className="text-4xl leading-none font-semibold font-bricolage text-(--hub-title-color) sm:text-[3.2rem]">
                                            {VIEW_COPY[activeView].heading}
                                        </h1>
                                        <p className="max-w-2xl text-base leading-8 font-medium text-(--hub-body-text) font-albert">
                                            {VIEW_COPY[activeView].description}
                                        </p>
                                    </div>
                                </div>

                                <div className="max-w-md rounded-[28px] border border-(--hub-panel-border) bg-(--hub-panel-bg) px-5 py-4 shadow-[0_18px_42px_var(--hub-panel-shadow)] backdrop-blur-sm">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--hub-meta-text)">
                                        {activeView === "All Stalls"
                                            ? `${visibleStalls.length} pending stalls`
                                            : `${visibleArtists.length} available artists`}
                                    </div>
                                    <p className="mt-2 text-sm leading-6 font-medium text-(--artist-summary-color) font-albert">
                                        {activeView === "All Stalls"
                                            ? "Approve directly from a card or open the full catalog popup for a closer review."
                                            : "Open a profile card to check the artist bio, contact details, and final booking action."}
                                    </p>
                                </div>
                            </div>

                            {activeView === "All Stalls" ? (
                                visibleStalls.length === 0 ? (
                                    <div className="rounded-[34px] border border-dashed border-(--hub-empty-border) bg-(--hub-empty-bg) px-6 py-16 text-center shadow-[0_14px_35px_var(--hub-empty-shadow)]">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--hub-empty-icon-bg) text-(--hub-empty-icon-color)">
                                            <Store className="h-7 w-7" />
                                        </div>
                                        <h2 className="mt-5 text-2xl font-semibold font-bricolage text-(--hub-title-color)">
                                            Stall approvals are complete
                                        </h2>
                                        <p className="mx-auto mt-3 max-w-xl text-base leading-7 font-medium text-(--artist-summary-color) font-albert">
                                            Everything in the current shortlist has been reviewed. Switch tabs to continue with artist bookings.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                        {visibleStalls.map((stall) => (
                                            <StallCard
                                                key={stall.title}
                                                title={stall.title}
                                                badge={stall.badge}
                                                zone={stall.zone}
                                                summary={stall.summary}
                                                image={stall.image}
                                                onViewMore={() => setSelectedStall(stall)}
                                                onApprove={() => handleApprove(stall.title)}
                                            />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                    {visibleArtists.map((artist) => (
                                        <ArtistCard
                                            key={artist.name}
                                            name={artist.name}
                                            role={artist.role}
                                            badge={artist.badge}
                                            summary={artist.summary}
                                            image={artist.image}
                                            heroImage={artist.heroImage}
                                            location={artist.location}
                                            isBooked={bookedArtists.includes(artist.name)}
                                            onSelect={() => setSelectedArtist(artist)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                <StallDetails
                    stall={selectedStall}
                    open={Boolean(selectedStall)}
                    onOpenChange={(open) => {
                        if (!open) setSelectedStall(null)
                    }}
                    onApprove={() =>
                        selectedStall && handleApprove(selectedStall.title)
                    }
                    onDeny={() => selectedStall && handleDeny(selectedStall.title)}
                />

                <ArtistDetailsModal
                    artist={selectedArtist}
                    open={Boolean(selectedArtist)}
                    onOpenChange={(open) => {
                        if (!open) setSelectedArtist(null)
                    }}
                    onConfirmBooking={() =>
                        selectedArtist && handleConfirmBooking(selectedArtist.name)
                    }
                    isBooked={selectedArtist ? bookedArtists.includes(selectedArtist.name) : false}
                />
            </div>
        </DashboardLayout>
    )
}
