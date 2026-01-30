"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { UPCOMING_EVENT_DETAILS } from "@/lib/manage-events"

export function UpcomingEventsSection() {
    const router = useRouter()

    const handleEventClick = () => {
        localStorage.setItem("analyticsEventData", JSON.stringify(UPCOMING_EVENT_DETAILS.analyticsData));
        router.push("/analytics");
    };

    const handleReschedule = (e: React.MouseEvent) => {
        e.stopPropagation();
        localStorage.setItem("eventFormData", JSON.stringify(UPCOMING_EVENT_DETAILS.formData));
        router.push("/create-event?startDirectly=true");
    };

    return (
        <section
            className="rounded-xl border p-4 sm:p-6 mb-8 hover:shadow-md transition-shadow cursor-pointer bg-[var(--upcoming-white)]"
            onClick={handleEventClick}
        >
            <h2 className="text-xl font-semibold mb-5 text-[var(--upcoming-primary-700)]">
                Upcoming Events
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">

                {/* Poster */}
                <div className="shrink-0">
                    <Image
                        src={UPCOMING_EVENT_DETAILS.posterImage}
                        alt="Event poster"
                        width={180}
                        height={260}
                        className="rounded-lg object-cover mx-auto lg:mx-0"
                    />
                    <p className="text-center text-sm font-medium mt-3 text-[var(--upcoming-gray-700)]">
                        {UPCOMING_EVENT_DETAILS.title}
                    </p>
                </div>

                {/* Details */}
                <div className="flex-1 text-sm space-y-2">
                    <p className="font-semibold text-[var(--upcoming-primary-800)]">
                        {UPCOMING_EVENT_DETAILS.date}
                    </p>

                    <p><b>Time:</b> {UPCOMING_EVENT_DETAILS.timeRange}</p>
                    <p><b>Type:</b> {UPCOMING_EVENT_DETAILS.type}</p>
                    <p>
                        <b>Venue:</b>{" "}
                        <span className="font-medium text-[var(--upcoming-blue-600)]">
                            {UPCOMING_EVENT_DETAILS.venue}
                        </span>
                    </p>

                    {/* About */}
                    <div className="pt-3">
                        <p className="font-semibold mb-1 text-[var(--upcoming-primary-700)]">
                            {UPCOMING_EVENT_DETAILS.aboutTitle}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--upcoming-gray-600)]">
                            {UPCOMING_EVENT_DETAILS.aboutDescription}
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2">
                        <p className="font-semibold mb-1 text-[var(--upcoming-primary-700)]">
                            {UPCOMING_EVENT_DETAILS.highlightsTitle}
                        </p>
                        <ul className="list-disc ml-4 text-sm text-[var(--upcoming-gray-600)]">
                            <li>
                                {UPCOMING_EVENT_DETAILS.highlights[0]}
                                <br />
                                <span className="ml-0">
                                    {UPCOMING_EVENT_DETAILS.highlights[1]}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Stats */}
                <div className="w-full lg:w-[300px]">
                    <div className="grid grid-cols-2 gap-4">
                        <Stat title="Event Registrations" value={UPCOMING_EVENT_DETAILS.stats.registrations} />
                        <Stat title="Total Revenue" value={UPCOMING_EVENT_DETAILS.stats.revenue} />
                        <Stat title="Ad Ons" value={UPCOMING_EVENT_DETAILS.stats.addOns} />
                        <Stat title="Date Change" value={UPCOMING_EVENT_DETAILS.stats.dateChange} />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 justify-center">

                        <Button
                            variant="outline"
                            className="rounded-full text-xs sm:text-sm px-4 py-2 border-[var(--upcoming-red-200)] text-[var(--upcoming-red-600)] hover:bg-[var(--upcoming-red-50)] hover:text-[var(--upcoming-red-700)]"
                            onClick={(e) => { e.stopPropagation(); }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-full text-xs sm:text-sm px-4 py-2 border-[var(--upcoming-gray-800)] text-[var(--upcoming-gray-900)] hover:bg-[var(--upcoming-gray-50)]"
                            onClick={handleReschedule}
                        >
                            Reschedule
                        </Button>

                        <Button
                            className="rounded-full text-xs sm:text-sm px-4 py-2 bg-[var(--upcoming-primary-900)] text-[var(--upcoming-white)]"
                            onClick={(e) => { e.stopPropagation(); handleEventClick(); }}
                        >
                            View Details
                        </Button>

                    </div>
                </div>
            </div>
        </section>
    )
}

function Stat({ title, value }: { title: string; value: string }) {
    return (
        <div className="border rounded-lg p-3 text-center">
            <p className="text-xs text-[var(--upcoming-gray-500)]">{title}</p>
            <p className="text-lg font-bold">{value}</p>
        </div>
    )
}
