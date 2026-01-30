import { Button } from "@/components/ui/button"
import Image from "next/image"

interface StallCardProps {
    title: string
    category: string
    image: string
    isApproved?: boolean
    onApprove?: () => void
    onViewMore?: () => void
}

export function StallCard({ title, category, image, isApproved, onApprove, onViewMore }: StallCardProps) {
    return (
        <div
            className="rounded-xl overflow-hidden shadow-sm border flex flex-col transition-transform hover:scale-[1.02] bg-[var(--stall-card-bg)] border-[var(--stall-card-border)]"
        >
            <div className="relative aspect-video w-full">
                <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="font-medium text-lg leading-tight font-albert text-[var(--stall-title-color)]">{title}</h3>
                    <p className="text-sm font-poppins text-[var(--stall-category-color)]">{category}</p>
                </div>
                <div className="mt-auto flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-[25px] py-5 bg-transparent font-poppins text-xs font-medium border-[1.5px] border-[var(--stall-outline-color)] text-[var(--stall-outline-color)] hover:bg-[var(--stall-outline-hover-bg)]"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewMore?.();
                        }}
                    >
                        View more
                    </Button>
                    <Button
                        className={`flex-1 rounded-[25px] py-5 font-poppins text-xs font-medium border transition-colors ${
                            isApproved
                                ? "text-white border-[var(--stall-approved-bg)] bg-[var(--stall-approved-bg)] hover:bg-[var(--stall-approved-hover-bg)]"
                                : "text-white border-[var(--stall-approve-bg)] bg-[var(--stall-approve-bg)] hover:bg-[var(--stall-approve-hover-bg)]"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isApproved) onApprove?.();
                        }}
                        disabled={isApproved}
                    >
                        {isApproved ? "Approved" : "Approve"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
