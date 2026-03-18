import Image from "next/image"
import { MapPin, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ArtistCardProps {
    name: string
    role: string
    badge: string
    summary: string
    image: string
    heroImage: string
    location: string
    isBooked?: boolean
    onSelect?: () => void
}

export function ArtistCard({
    name,
    role,
    badge,
    summary,
    image,
    heroImage,
    location,
    isBooked = false,
    onSelect,
}: ArtistCardProps) {
    return (
        <Card
            className="group h-full cursor-pointer gap-0 overflow-hidden rounded-[30px] border border-(--hub-shell-border) bg-(--artist-card-bg) p-3 shadow-[0_18px_45px_var(--artist-card-shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_var(--artist-card-hover-shadow)]"
            onClick={onSelect}
        >
            <div className="relative aspect-[1.05] overflow-hidden rounded-[24px]">
                <Image
                    src={heroImage || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1440px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 42vw, 92vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--artist-hero-overlay-start)_0%,var(--artist-hero-overlay-mid)_52%,var(--artist-hero-overlay-end)_100%)]" />
                <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-(--artist-badge-bg) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {badge}
                </div>
            </div>

            <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-0">
                <div className="-mt-8 flex items-end gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[20px] border-[3px] border-white shadow-[0_12px_32px_var(--artist-thumbnail-shadow)]">
                        <Image
                            src={image || "/placeholder-user.jpg"}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                    </div>

                    <div className="pb-1">
                        <h3 className="text-[1.35rem] leading-tight font-semibold font-bricolage text-(--artist-name-color)">
                            {name}
                        </h3>
                        <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--artist-role-color)">
                            <Sparkles className="h-3.5 w-3.5 text-(--artist-meta-icon)" />
                            {role}
                        </div>
                    </div>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-6 font-medium text-(--artist-summary-color) font-albert">
                    {summary}
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--artist-role-color)">
                    <MapPin className="h-3.5 w-3.5 text-(--artist-meta-icon)" />
                    {location}
                </div>
            </CardContent>

            <CardFooter className="px-3 pb-3 pt-0">
                <Button
                    type="button"
                    className="h-14 w-full rounded-full bg-(--artist-button-bg) text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_16px_35px_var(--artist-modal-button-shadow)] hover:bg-(--artist-button-hover-bg) disabled:bg-(--artist-button-disabled-bg)"
                    disabled={isBooked}
                    onClick={(event) => {
                        event.stopPropagation()
                        onSelect?.()
                    }}
                >
                    {isBooked ? "Booked" : "View Profile"}
                </Button>
            </CardFooter>
        </Card>
    )
}
