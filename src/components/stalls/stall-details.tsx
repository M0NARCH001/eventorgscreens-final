import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface StallDetailsProps {
    title: string
    subtitle: string
    items?: { name: string; price: number }[]
    onClose: () => void
    onApprove: () => void
    isApproved?: boolean
    onRevoke?: () => void
}

export function StallDetails({ title, subtitle, items = [], onClose, onApprove, isApproved, onRevoke }: StallDetailsProps) {
    return (
        <div className="flex flex-col w-full max-w-[340px] shadow-xl border-2 rounded-[30px] overflow-hidden bg-[var(--stall-details-bg)] border-[var(--stall-details-border)]">
            {/* Header Section - White Background */}
            <div className="p-6 pb-4 border-b relative bg-[var(--stall-header-bg)] border-[var(--stall-divider)]">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 h-8 w-8 hover:bg-transparent text-[var(--stall-close-icon)] hover:text-[var(--stall-close-hover)]"
                    onClick={onClose}
                >
                    <X className="h-5 w-5" />
                </Button>
                <h2 className="text-[28px] leading-tight font-bold font-bricolage mb-2 pr-6 text-[var(--stall-title-color)]">
                    {title}
                </h2>
                <p className="text-sm font-poppins text-[var(--stall-subtitle-color)]">{subtitle}</p>
            </div>

            {/* Body Section - Light Gray Background */}
            <div className="p-4 space-y-3">
                <div className="space-y-3 mb-6">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border rounded-[15px] px-5 py-3 bg-white border-[var(--stall-item-border)]"
                        >
                            <span className="font-medium font-poppins text-sm text-[var(--stall-item-text)]">
                                {item.name}
                            </span>
                            <span className="font-semibold text-xl font-poppins text-[var(--stall-price-color)]">
                                ₹{item.price}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-2 pb-2">
                    <Button
                        onClick={onClose}
                        className="flex-1 font-bold rounded-[30px] py-6 font-poppins text-sm border-none shadow-none text-[var(--stall-deny-text)] bg-[var(--stall-deny-bg)] hover:bg-[var(--stall-deny-hover-bg)]"
                    >
                        {isApproved ? "Close" : "Deny"}
                    </Button>

                    <Button
                        onClick={isApproved ? onRevoke : onApprove}
                        className={`flex-1 font-bold rounded-[30px] py-6 font-poppins text-sm shadow-none ${
                            isApproved
                                ? "text-white bg-[var(--stall-revoke-bg)] hover:bg-[var(--stall-revoke-hover-bg)]"
                                : "text-white bg-[var(--stall-approve-bg)] hover:bg-[var(--stall-approve-hover-bg)]"
                        }`}
                    >
                        {isApproved ? "Deny" : "Approve"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
