import { ChartConfig } from "@/components/ui/chart"

// --- Event Stats Data ---

// Chart 1: Registered
export const REGISTERED_DATA = [{ category: "total", registered: 375, available: 25 }]

export const REGISTERED_CONFIG = {
    registered: { label: "Registered", color: "hsl(230, 60%, 65%)" },
    available: { label: "Available", color: "hsl(100, 70%, 65%)" }
} satisfies ChartConfig

// Chart 2: Demographics
export const DEMOGRAPHICS_DATA = [
    { type: "Male", visitors: 50, fill: "hsl(210, 90%, 75%)" },
    { type: "Female", visitors: 30, fill: "hsl(340, 80%, 75%)" },
    { type: "Other", visitors: 10, fill: "hsl(0, 0%, 75%)" },
]

export const DEMOGRAPHICS_CONFIG = {
    visitors: { label: "Visitors" }
} satisfies ChartConfig

// Chart 3: Cancelled
export const CANCELLED_VALUE = 8
export const CANCELLED_CONFIG = {
    Cancelled: { label: "Cancelled" }
} satisfies ChartConfig


// --- Revenue Stats Data ---

export const REVENUE_DATA_RAW = [
    { day: "Mon", revenue: 1500 },
    { day: "Tue", revenue: 2300 },
    { day: "Wed", revenue: 3200 }, // Peak 1
    { day: "Thu", revenue: 1600 },
    { day: "Fri", revenue: 2500 }, // Peak 2
    { day: "Sat", revenue: 1200 },
    { day: "Sun", revenue: 4000 }, // Peak 3
    { day: "Mon2", revenue: 2800 },
    { day: "Tue2", revenue: 3800 },
    { day: "Wed2", revenue: 2000 },
    { day: "Thu2", revenue: 3500 },
    { day: "Fri2", revenue: 2300 },
    { day: "Sat2", revenue: 3000 },
    { day: "Sun2", revenue: 1000 },
]

export const WAVE_DATA = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 1000 },
    { name: "Wed", value: 800 },
    { name: "Thu", value: 2500 },
    { name: "Fri", value: 1200 },
    { name: "Sat", value: 2000 },
    { name: "Sun", value: 800 },
    { name: "Mon2", value: 2200 },
    { name: "Tue2", value: 1100 },
    { name: "Wed2", value: 2600 },
    { name: "Thu2", value: 1700 },
    { name: "Fri2", value: 2400 },
    { name: "Sat2", value: 1600 },
    { name: "Sun2", value: 400 },
    { name: "Mon3", value: 0 },
].map((item) => ({
    ...item,
    value: item.value + 500
}));

export const REVENUE_CHART_CONFIG = {
    revenue: {
        label: "Revenue",
        color: "hsl(215, 60%, 45%)", // Dark blueish
    },
} satisfies ChartConfig

export const RADIAL_DATA = [
    { name: "Booked", value: 79, fill: "hsl(215, 60%, 50%)" },
    { name: "Remaining", value: 21, fill: "transparent" }
]
