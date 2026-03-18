import { Mail, Phone, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Artist } from "@/lib/stalls-data"

import { DetailModalShell } from "./detail-modal-shell"

interface ArtistDetailsModalProps {
    artist: Artist | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirmBooking: () => void
    isBooked?: boolean
}

export function ArtistDetailsModal({
    artist,
    open,
    onOpenChange,
    onConfirmBooking,
    isBooked = false,
}: ArtistDetailsModalProps) {
    if (!artist) return null

    return (
        <DetailModalShell
            open={open}
            onOpenChange={onOpenChange}
            heroImage={artist.heroImage}
            badge={artist.badge}
            title={artist.name}
            subtitle={artist.tagline}
            thumbnailImage={artist.image}
            thumbnailAlt={artist.name}
            footer={
                <Button
                    type="button"
                    onClick={onConfirmBooking}
                    disabled={isBooked}
                    className="h-14 w-full rounded-full bg-(--artist-button-bg) text-xs font-semibold uppercase tracking-[0.26em] text-white shadow-[0_16px_35px_var(--artist-modal-button-shadow)] hover:bg-(--artist-button-hover-bg) disabled:bg-(--artist-button-disabled-bg) disabled:text-white"
                >
                    {isBooked ? "Booking Confirmed" : artist.ctaLabel}
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--artist-modal-section-label)">
                    <Sparkles className="h-4 w-4 text-(--artist-modal-section-icon)" />
                    Bio & Experience
                </div>

                <p className="max-w-[30rem] text-[1.05rem] leading-8 font-medium text-(--artist-modal-text) font-albert">
                    {artist.bio}
                </p>

                <div className="space-y-3">
                    <a
                        href={`mailto:${artist.email}`}
                        className="flex items-center gap-4 rounded-[24px] border border-(--artist-contact-border) bg-(--artist-contact-surface) px-4 py-4 shadow-[0_10px_28px_var(--artist-contact-shadow)] transition hover:border-(--artist-contact-hover-border)"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--artist-contact-icon-bg) text-(--artist-contact-icon-color) shadow-[0_8px_18px_var(--artist-contact-icon-shadow)]">
                            <Mail className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--artist-contact-label)">
                                Email
                            </div>
                            <div className="truncate text-base font-semibold text-(--artist-contact-text) font-albert">
                                {artist.email}
                            </div>
                        </div>
                    </a>

                    <a
                        href={`tel:${artist.phone}`}
                        className="flex items-center gap-4 rounded-[24px] border border-(--artist-contact-border) bg-(--artist-contact-surface) px-4 py-4 shadow-[0_10px_28px_var(--artist-contact-shadow)] transition hover:border-(--artist-contact-hover-border)"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--artist-contact-icon-bg) text-(--artist-contact-icon-color) shadow-[0_8px_18px_var(--artist-contact-icon-shadow)]">
                            <Phone className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--artist-contact-label)">
                                Contact
                            </div>
                            <div className="text-base font-semibold text-(--artist-contact-text) font-albert">
                                {artist.phone}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </DetailModalShell>
    )
}
