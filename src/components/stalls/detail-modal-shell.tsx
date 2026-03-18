"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { BadgeCheck, X } from "lucide-react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface DetailModalShellProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    heroImage: string
    badge: string
    title: string
    subtitle: string
    thumbnailImage?: string
    thumbnailAlt?: string
    children: ReactNode
    footer?: ReactNode
    contentClassName?: string
}

export function DetailModalShell({
    open,
    onOpenChange,
    heroImage,
    badge,
    title,
    subtitle,
    thumbnailImage,
    thumbnailAlt,
    children,
    footer,
    contentClassName,
}: DetailModalShellProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className={cn(
                    "flex max-h-[88vh] w-[calc(100%-2rem)] max-w-[430px] flex-col overflow-hidden rounded-[34px] border border-(--hub-shell-border) bg-(--white) p-0 shadow-[0_32px_120px_var(--stall-modal-shadow)] sm:max-w-[520px]",
                    contentClassName
                )}
            >
                <div className="relative h-[190px] shrink-0 overflow-hidden sm:h-[220px]">
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 640px) 560px, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--stall-modal-overlay-start)_0%,var(--stall-modal-overlay-mid)_50%,var(--stall-modal-overlay-end)_100%)]" />

                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20"
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </button>
                    </DialogClose>

                    <div
                        className={cn(
                            "absolute inset-x-0 bottom-0 p-7 sm:p-8",
                            thumbnailImage && "flex items-end gap-4"
                        )}
                    >
                        {thumbnailImage && (
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[20px] border-[3px] border-(--stall-thumbnail-border) shadow-[0_12px_32px_var(--stall-thumbnail-shadow)]">
                                <Image
                                    src={thumbnailImage}
                                    alt={thumbnailAlt || title}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </div>
                        )}

                        <div className="min-w-0">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
                                <BadgeCheck className="h-3.5 w-3.5 text-(--stall-badge-highlight)" />
                                {badge}
                            </div>

                            <DialogTitle className="text-[2rem] leading-none font-semibold font-bricolage text-white sm:text-[2.3rem]">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="mt-2 max-w-lg text-base leading-6 font-medium text-white/82 font-albert">
                                {subtitle}
                            </DialogDescription>
                        </div>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="px-6 py-6 sm:px-8 sm:py-7">{children}</div>
                </div>

                {footer && (
                    <div className="shrink-0 border-t border-(--stall-divider) px-6 py-5 sm:px-8 sm:py-6">
                        {footer}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
