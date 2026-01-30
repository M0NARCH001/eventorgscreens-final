"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, subMonths, format } from "date-fns"

import { STALLS_DATA } from "@/lib/stalls-data"
import { useLocalStorage } from "@/hooks/use-local-storage"

// --- Mock Data ---
const highlightedDates = [
    { date: new Date(2025, 0, 10), count: 20, color: "pink" },
    { date: new Date(2025, 0, 13), count: 100, color: "green" },
    { date: new Date(2025, 0, 14), count: 52, color: "yellow" },
    { date: new Date(2025, 0, 15), count: 17, color: "pink" },
    { date: new Date(2025, 0, 19), count: 31, color: "pink" },
    { date: new Date(2025, 0, 20), count: 83, color: "yellow" },
    { date: new Date(2025, 0, 27), count: 145, color: "green" },
]

const reviews = [
    { id: 1, name: "Riya Mehta", avatar: "/avatars/01.png", rating: 5, text: "Amazing experience!", time: "18 minutes ago" },
    { id: 2, name: "Rahul Deshmukh", avatar: "/avatars/02.png", rating: 5, text: "Fantastic event", time: "18 minutes ago" },
    { id: 3, name: "Sanya Kapoor", avatar: "/avatars/03.png", rating: 4, text: "Loved it", time: "2 hours ago" },
    { id: 4, name: "Amit Patel", avatar: "/avatars/04.png", rating: 5, text: "Superb!", time: "1 day ago" }
]

export function DateReviewsSection() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 0, 10))
    const [month, setMonth] = React.useState<Date>(new Date(2025, 0, 1))

    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[400px_1fr] lg:grid-cols-[350px_1fr] md:p-8 p-4">

            {/* Left Card */}
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-primary">
                    Date Change
                </h2>

                <div className="border border-border rounded-2xl p-4 md:p-6 bg-background shadow-sm flex flex-col">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-transparent"
                            onClick={() => setMonth(prev => subMonths(prev, 1))}
                        >
                            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                        </Button>

                        <span className="text-lg text-muted-foreground font-normal">
                            {format(month, "yyyy, d MMMM")}
                        </span>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-transparent"
                            onClick={() => setMonth(prev => addMonths(prev, 1))}
                        >
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </div>

                    {/* Calendar */}
                    <Calendar
                        mode="single"
                        month={month}
                        onMonthChange={setMonth}
                        selected={date}
                        onSelect={setDate}
                        className="p-0 w-full [&_.rdp-month]:w-full"
                        classNames={{
                            months: "w-full",
                            month: "w-full",
                            caption: "hidden",
                            nav: "hidden",
                            table: "w-full border-collapse",
                            head_cell: "text-muted-foreground font-normal text-sm p-2 text-center",
                            cell: "p-1 text-center relative",
                            day: "p-0 font-normal",
                            day_selected: "bg-transparent text-foreground",
                            day_today: "bg-muted rounded-xl",
                            day_outside: "text-muted-foreground opacity-50",
                            day_disabled: "text-muted-foreground opacity-50",
                        }}
                        components={{
                            DayButton: (props) => {
                                const { day, modifiers, ...buttonProps } = props;
                                const dateObj = day.date;

                                const data = highlightedDates.find(d =>
                                    d.date.getDate() === dateObj.getDate() &&
                                    d.date.getMonth() === dateObj.getMonth() &&
                                    d.date.getFullYear() === dateObj.getFullYear()
                                )

                                let wrapperClass = "bg-muted text-muted-foreground hover:bg-muted/80"
                                let countColor = ""

                                if (data) {
                                    if (data.color === "pink") wrapperClass = "bg-destructive/10 text-destructive hover:bg-destructive/20"
                                    if (data.color === "green") wrapperClass = "bg-primary/10 text-primary hover:bg-primary/20"
                                    if (data.color === "yellow") wrapperClass = "bg-accent/20 text-accent-foreground hover:bg-accent/30"

                                    if (data.color === "pink") countColor = "text-destructive"
                                    if (data.color === "green") countColor = "text-primary"
                                    if (data.color === "yellow") countColor = "text-accent-foreground"
                                }

                                if (modifiers.selected && !data) {
                                    wrapperClass = "bg-primary text-primary-foreground hover:bg-primary/90"
                                }

                                return (
                                    <button
                                        {...buttonProps}
                                        className={`w-10 h-12 sm:w-12 sm:h-14 flex flex-col items-center justify-center rounded-xl transition-all ${wrapperClass}`}
                                    >
                                        <span className="text-sm font-medium">
                                            {dateObj.getDate()}
                                        </span>

                                        {data && (
                                            <span className={`text-[10px] font-bold leading-none mt-0.5 ${countColor}`}>
                                                {data.count}
                                            </span>
                                        )}
                                    </button>
                                )
                            }
                        }}
                    />
                </div>
            </div>

            {/* Reviews */}
            <Card className="flex flex-col h-[600px]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                        Customer Reviews
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col h-full overflow-hidden gap-6">

                    {/* Ratings */}
                    <div className="flex items-center gap-6">
                        <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-2">
                                    <span className="text-xs w-6 text-muted-foreground">{star}.0</span>
                                    <Progress value={50} className="h-2 [&>div]:bg-accent" />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-center min-w-[100px]">
                            <span className="text-5xl font-bold text-foreground">4.0</span>

                            <div className="flex gap-0.5 my-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < 4 ? "fill-accent text-accent" : "text-muted-foreground"}`}
                                    />
                                ))}
                            </div>

                            <span className="text-xs text-muted-foreground">500 reviews</span>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="rounded-lg border border-border p-4 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={review.avatar} />
                                            <AvatarFallback>
                                                {review.name.split(" ").map(n => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className="font-semibold text-sm text-foreground">
                                            {review.name}
                                        </span>
                                    </div>

                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {review.text}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {review.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
