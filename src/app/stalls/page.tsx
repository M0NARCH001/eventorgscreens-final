"use client"

import { StallCard } from "@/components/stalls/stall-card"
import { ArtistCard } from "@/components/stalls/artist-card"
import { useState } from "react"
import { StallDetails } from "@/components/stalls/stall-details"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useToast } from "@/components/ui/use-toast"

import { STALLS_DATA, ARTISTS, generateRandomItems, type Stall } from "@/lib/stalls-data"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function EventsPage() {
    const [selectedStall, setSelectedStall] = useState<Stall | null>(null)
    const [stallItems, setStallItems] = useState<Array<{ name: string, price: number }>>([])
    const [approvedStalls, setApprovedStalls] = useLocalStorage<string[]>("approvedStalls", [])
    const { toast } = useToast()

    const handleViewMore = (stall: Stall) => {
        if (selectedStall?.title === stall.title) {
            setSelectedStall(null)
        } else {
            setSelectedStall(stall)
            setStallItems(generateRandomItems())
        }
    }

    const handleClose = () => {
        setSelectedStall(null)
    }

    const handleApprove = (stallTitle: string) => {
        if (!approvedStalls.includes(stallTitle)) {
            setApprovedStalls([...approvedStalls, stallTitle])
            toast({
                title: "✓ Stall Approved",
                description: `${stallTitle} has been approved successfully.`,
                duration: 3000,
            })
        }
    }

    const handleRevoke = (stallTitle: string) => {
        setApprovedStalls(approvedStalls.filter(t => t !== stallTitle))
        toast({
            title: "✓ Stall Denied",
            description: `${stallTitle} has been denied.`,
            duration: 3000,
        })
    }

    // Handle approval/revoke from within the details panel
    const handlePanelApprove = () => {
        if (selectedStall) {
            handleApprove(selectedStall.title)
            handleClose()
        }
    }

    const handlePanelRevoke = () => {
        if (selectedStall) {
            handleRevoke(selectedStall.title)
            handleClose()
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-16">

                {/* Stalls Section with Side Panel */}
                <div className="flex transition-all duration-500 ease-in-out">
                    {/* Stalls Grid */}
                    <div className={`flex-1 transition-all duration-500 ease-in-out`}>
                        <section>
                            <div className="mb-8">
                                <h1 className="text-3xl font-medium text-slate-900 mb-2 font-bricolage">Stalls</h1>
                                <p className="text-slate-500 font-albert">You can choose the stalls you want to add here.</p>
                            </div>
                            <div className={`grid gap-6 lg:gap-8 transition-all duration-500 ${selectedStall
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                }`}>
                                {STALLS_DATA.filter(stall => !approvedStalls.includes(stall.title)).map((stall) => (
                                    <StallCard
                                        key={stall.title}
                                        {...stall}
                                        isApproved={approvedStalls.includes(stall.title)}
                                        onApprove={() => handleApprove(stall.title)}
                                        onViewMore={() => handleViewMore(stall)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Side Panel */}
                    <div className={`transition-all duration-500 ease-in-out 
              ${selectedStall
                            ? 'fixed inset-0 z-50 lg:z-0 flex items-center justify-center bg-black/50 p-4 lg:bg-transparent lg:p-0 lg:static lg:block lg:w-[380px] lg:ml-6 lg:opacity-100 lg:translate-x-0'
                            : 'hidden lg:block lg:static lg:w-0 lg:ml-0 lg:opacity-0 lg:translate-x-10 lg:overflow-hidden'
                        }`}>
                        <div className="w-full max-w-[340px] lg:max-w-none lg:sticky lg:top-24">
                            {selectedStall && (
                                <StallDetails
                                    title={selectedStall.title}
                                    subtitle="Where Style Meets Sparkle"
                                    items={stallItems}
                                    onClose={handleClose}
                                    onApprove={handlePanelApprove}
                                    isApproved={approvedStalls.includes(selectedStall.title)}
                                    onRevoke={handlePanelRevoke}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Artists Section - Independent */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-medium text-slate-900 mb-2 font-bricolage">Artists</h2>
                        <p className="text-slate-500 font-albert">You can meet all talented artists here</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {ARTISTS.map((artist) => (
                            <ArtistCard key={artist.name} {...artist} />
                        ))}
                    </div>
                </section>

            </div>
        </DashboardLayout>
    )
}
