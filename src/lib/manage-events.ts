export interface EventItem {
    date: string;
    name: string;
    category: string;
    status: string;
    action: string;
}

export const UPCOMING_EVENT_DETAILS = {
    title: "MARITZA CORREA Vizag",
    date: "Wednesday, 28 May 2025",
    timeRange: "4:15 – 8:30 PM",
    type: "Music Concert",
    venue: "Qubaa (Vizag)",
    aboutTitle: "About The Event",
    aboutDescription: "Get ready for an electrifying musical transformation as we dive into the world of heavyweight mutati",
    highlightsTitle: "Event Highlights",
    highlights: [
        "one of the sensational USA maestros",
        "@djmaritzacorrea who has set hearts racing with her mind-blowing"
    ],
    posterImage: "/event-img.svg",
    stats: {
        registrations: "375",
        revenue: "₹10,00,000",
        addOns: "20",
        dateChange: "45"
    },
    // Data for actions
    formData: {
        eventName: "MARITZA CORREA Vizag",
        category: "Music Concert",
        description: "Music Concert Description",
        date: "2025-05-28",
        time: "16:15",
        endTime: "20:30",
        venue: "Qubaa (Vizag)"
    },
    analyticsData: {
        eventName: "MARITZA CORREA Vizag",
        date: "Wednesday, 28 May 2025",
        category: "Music Concert",
        status: "Upcoming"
    }
};

export const ALL_EVENTS_DATA = {
    page1: [
        { date: "May 3, 2025", name: "Elyzium Band Live", category: "Entertainment", status: "Ongoing", action: "Edit" },
        { date: "May 14–16, 2025", name: "Bharat Marine Systems 2025", category: "Defense", status: "Upcoming", action: "Edit" },
        { date: "May 14–16, 2025", name: "GeoSpace Bharat 2025", category: "Technology", status: "Upcoming", action: "Edit" },
        { date: "May 14–16, 2025", name: "SwaRaksha Mahotsav 2025", category: "Public Safety", status: "Upcoming", action: "Edit" },
        { date: "May 14–16, 2025", name: "Drone Shaurya Global Summit & Expo", category: "Technology", status: "Upcoming", action: "Edit" },
    ],
    page2: [
        { date: "March 21, 2025", name: "MARITZA CORREA Vizag", category: "Music Concert", status: "Past", action: "Repeat" },
        { date: "March 21, 2025", name: "MARITZA CORREA Vizag", category: "Music Concert", status: "Past", action: "Repeat" },
        { date: "March 21, 2025", name: "MARITZA CORREA Vizag", category: "Music Concert", status: "Past", action: "Repeat" },
    ]
};
