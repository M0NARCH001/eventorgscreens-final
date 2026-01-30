"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, ChevronDown, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ALL_EVENTS_DATA, type EventItem } from "@/lib/manage-events"

export function AllEventsSection() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)

    const events = currentPage === 1 ? ALL_EVENTS_DATA.page1 : ALL_EVENTS_DATA.page2

    const handleAction = (event: EventItem, e: React.MouseEvent) => {
        e.stopPropagation();

        const formData = {
            eventName: event.name,
            category: event.category,
            description: `Description for ${event.name}`,
            date: event.date,
            time: "",
            endTime: "",
            venue: "",
            googleMapsUrl: "",
            personnel: "",
            tagline: "",
            contactInfo: { mobile: "", email: "", website: "", additionalLinks: "" },
        };

        if (event.action === "Repeat") {
            formData.date = "";
            formData.time = "";
            formData.endTime = "";
        }

        localStorage.setItem("eventFormData", JSON.stringify(formData));
        router.push("/create-event?startDirectly=true");
    };

    const handleRowClick = (event: EventItem) => {
        const analyticsData = {
            eventName: event.name,
            date: event.date,
            category: event.category,
            status: event.status
        };
        localStorage.setItem("analyticsEventData", JSON.stringify(analyticsData));
        router.push("/analytics");
    };

    return (
        <section className="rounded-xl border overflow-hidden bg-[var(--events-white)]">

            {/* Header */}
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-[var(--events-bg-primary)]">
                <h3 className="text-[var(--events-white)] font-medium text-lg">
                    All Events
                </h3>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="relative w-full sm:w-auto">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--events-white)]/70"
                        />
                        <Input
                            placeholder="Search Events"
                            className="pl-9 h-10 w-full sm:w-56 bg-[var(--events-bg-primary)] text-[var(--events-white)] placeholder:text-[var(--events-white)]/70 border border-[var(--events-white)]/40"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="h-10 bg-[var(--events-white)] text-[var(--events-bg-primary)]">
                            <Calendar size={16} className="mr-2" />
                            Calendar
                        </Button>

                        <button className="h-10 w-10 bg-[var(--events-white)] rounded flex items-center justify-center">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-[var(--events-gray-50)] border-[var(--events-gray-200)]">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--events-gray-700)]">
                                <div className="flex items-center gap-2">
                                    Date <ChevronDown size={16} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--events-gray-700)]">
                                Event name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--events-gray-700)]">
                                <div className="flex items-center gap-2">
                                    Category <ChevronDown size={16} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--events-gray-700)]">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--events-gray-700)]">
                                Action required
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-[var(--events-gray-200)] hover:bg-[var(--events-gray-50)] cursor-pointer transition-colors"
                                onClick={() => handleRowClick(event)}
                            >
                                <td className="px-6 py-4 text-sm text-[var(--events-gray-700)]">{event.date}</td>
                                <td className="px-6 py-4 text-sm text-[var(--events-gray-700)]">{event.name}</td>
                                <td className="px-6 py-4 text-sm text-[var(--events-gray-700)]">{event.category}</td>

                                <td className="px-6 py-4 text-sm">
                                    <span className={`${event.status === "Ongoing"
                                        ? "text-[var(--events-green-600)]"
                                        : event.status === "Upcoming"
                                            ? "text-[var(--events-blue-600)]"
                                            : "text-[var(--events-gray-500)]"
                                        }`}>
                                        {event.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    <Button
                                        size="sm"
                                        onClick={(e) => handleAction(event, e)}
                                        className={`${event.action === "Repeat"
                                            ? "bg-[var(--events-blue-900)] hover:bg-[var(--events-blue-800)]"
                                            : "bg-[var(--events-gray-900)] hover:bg-[var(--events-gray-800)]"
                                            } text-[var(--events-white)] px-6 rounded-full`}
                                    >
                                        {event.action}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-[var(--events-gray-200)]">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft size={16} />
                    Previous
                </Button>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={`px-3 py-1 rounded border text-sm font-medium ${currentPage === 1
                            ? 'border-[var(--events-gray-400)] bg-[var(--events-gray-100)]'
                            : 'border-[var(--events-gray-300)] bg-[var(--events-white)] hover:bg-[var(--events-gray-100)]'
                            }`}
                    >
                        1
                    </button>

                    <button
                        onClick={() => setCurrentPage(2)}
                        className={`px-3 py-1 rounded border text-sm font-medium ${currentPage === 2
                            ? 'border-[var(--events-gray-400)] bg-[var(--events-gray-100)]'
                            : 'border-[var(--events-gray-300)] bg-[var(--events-white)] hover:bg-[var(--events-gray-100)]'
                            }`}
                    >
                        2
                    </button>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
                    disabled={currentPage === 2}
                    className="flex items-center gap-2"
                >
                    Next
                    <ChevronRight size={16} />
                </Button>
            </div>

        </section>
    )
}
