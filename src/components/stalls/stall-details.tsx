import { CircleAlert, CheckCircle2, NotebookTabs } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Stall } from "@/lib/stalls-data"

import { DetailModalShell } from "./detail-modal-shell"

interface StallDetailsProps {
    stall: Stall | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onApprove: () => void
    onDeny: () => void
}

export function StallDetails({
    stall,
    open,
    onOpenChange,
    onApprove,
    onDeny,
}: StallDetailsProps) {
    if (!stall) return null

    return (
        <DetailModalShell
            open={open}
            onOpenChange={onOpenChange}
            heroImage={stall.image}
            badge={stall.verified ? "Verified" : stall.badge}
            title={stall.title}
            subtitle={stall.subtitle}
            footer={
                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onDeny}
                        className="h-14 flex-1 rounded-full border border-(--stall-deny-border) bg-(--white) text-xs font-semibold uppercase tracking-[0.26em] text-(--stall-deny-accent) shadow-none"
                    >
                        <CircleAlert className="h-4 w-4" />
                        Deny
                    </Button>
                    <Button
                        type="button"
                        onClick={onApprove}
                        className="h-14 flex-1 rounded-full bg-(--stall-approve-bg) text-xs font-semibold uppercase tracking-[0.26em] text-white shadow-[0_16px_35px_var(--stall-accept-shadow)] hover:bg-(--stall-approve-hover-bg)"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Accept
                    </Button>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--stall-section-label)">
                    <NotebookTabs className="h-4 w-4 text-(--stall-section-icon)" />
                    Catalog
                </div>

                <p className="max-w-[28rem] text-[1.05rem] leading-8 font-medium text-(--stall-subtitle-color) font-albert">
                    {stall.description}
                </p>

                <div className="space-y-3">
                    {stall.catalog.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between rounded-[22px] border border-(--stall-item-border) bg-(--stall-item-surface) px-5 py-4 shadow-[0_10px_28px_var(--stall-item-shadow)]"
                        >
                            <span className="text-base font-semibold text-(--stall-item-text) font-albert">
                                {item.name}
                            </span>
                            <span className="text-[1.45rem] font-semibold text-(--stall-price-color) font-bricolage">
                                {"\u20B9"}
                                {item.price}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </DetailModalShell>
    )
}
