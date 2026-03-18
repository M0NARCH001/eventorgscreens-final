import Image from "next/image"
import { CheckCircle2, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface StallCardProps {
    title: string
    badge: string
    zone: string
    summary: string
    image: string
    onViewMore?: () => void
    onApprove?: () => void
}

export function StallCard({
    title,
    badge,
    zone,
    summary,
    image,
    onViewMore,
    onApprove,
}: StallCardProps) {
    return (
        <Card
            className="group h-full cursor-pointer gap-0 overflow-hidden rounded-[30px] border border-(--hub-shell-border) bg-(--stall-card-bg) p-3 shadow-[0_18px_45px_var(--stall-card-shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_var(--stall-card-hover-shadow)]"
            onClick={onViewMore}
        >
            <div className="relative aspect-[1.04] overflow-hidden rounded-[24px]">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1440px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 42vw, 92vw"
                />
                <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-(--stall-badge-bg) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {badge}
                </div>
            </div>

            <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-4">
                <h3 className="text-[1.35rem] leading-tight font-semibold font-bricolage text-(--stall-title-color)">
                    {title}
                </h3>

                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--stall-category-color)">
                    <MapPin className="h-3.5 w-3.5 text-(--stall-meta-icon)" />
                    {zone}
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-6 font-medium text-(--stall-subtitle-color) font-albert">
                    {summary}
                </p>
            </CardContent>

            <CardFooter className="px-3 pb-3 pt-0">
                <Button
                    type="button"
                    className="h-14 w-full rounded-full bg-(--stall-approve-bg) text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_16px_35px_var(--stall-approve-shadow)] hover:bg-(--stall-approve-hover-bg)"
                    onClick={(event) => {
                        event.stopPropagation()
                        onApprove?.()
                    }}
                >
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                </Button>
            </CardFooter>
        </Card>
    )
}
