"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts"
import { ArrowUp, ShoppingBag, Users, Clock, BookmarkCheck } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  WAVE_DATA,
  REVENUE_CHART_CONFIG,
  RADIAL_DATA
} from "@/lib/analytics-data"

// Prevent hydration mismatch
function ClientOnlyPieChart({ radialData }: { radialData: { name: string; value: number; fill: string }[] }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[100px] h-[100px]" />
  }

  return (
    <PieChart width={100} height={100}>
      <Pie
        data={radialData}
        cx="50%"
        cy="50%"
        innerRadius={35}
        outerRadius={45}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        stroke="none"
      >
        <Cell key="cell-0" fill="var(--blue-500)" />
        <Cell key="cell-1" fill="var(--slate-700)" />
      </Pie>
    </PieChart>
  )
}

export function RevenueStats() {
  return (
    <div className="p-4 md:p-8 md:pt-0">
      <Card className="col-span-3">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-semibold mb-4">
            Revenue
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="vip" className="w-full">

            <TabsList className="w-full h-auto justify-start rounded-none border-b bg-transparent p-0 mb-6">

              {["vip", "regular", "child", "family"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-2 sm:px-4 pb-3 pt-2 text-xs sm:text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}

            </TabsList>

            <TabsContent value="vip" className="space-y-6">

              {/* Chart */}
              <div className="overflow-x-auto scrollbar-hide pb-2">
                <div className="relative h-[320px] w-full rounded-2xl bg-muted/10 p-4 border border-border/50">

                  {/* Revenue Header */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">₹10,800.80</span>

                      <div className="rounded-full border border-[var(--blue-200)] bg-white p-0.5">
                        <ArrowUp className="h-4 w-4 text-[var(--blue-500)]" />
                      </div>
                    </div>

                    <p className="text-sm font-medium text-muted-foreground">
                      Total Earning
                    </p>
                  </div>

                  {/* Chart */}
                  <ChartContainer config={REVENUE_CHART_CONFIG} className="h-full w-full">
                    <AreaChart data={WAVE_DATA} margin={{ left: 0, right: 0, top: 40, bottom: 10 }}>
                      <defs>
                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--revenue-color)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--revenue-color)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>

                      <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={4} interval={3} hide />

                      <CartesianGrid vertical horizontal={false} strokeDasharray="4 4" strokeOpacity={0.2} />

                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

                      <Area
                        dataKey="value"
                        type="natural"
                        fill="url(#fillRevenue)"
                        fillOpacity={0.4}
                        stroke="var(--revenue-color)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>

                  {/* Week Labels */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                {/* Booked */}
                <Card className="bg-[var(--zinc-950)] text-white border-none flex flex-col items-center justify-center p-4 shadow-lg">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <ClientOnlyPieChart radialData={RADIAL_DATA} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">79%</span>
                      <span className="text-[10px] text-[var(--zinc-400)]">Booked</span>
                    </div>
                  </div>
                </Card>

                {/* Add-Ons */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-[var(--zinc-50)]">
                  <ShoppingBag className="h-6 w-6 text-[var(--blue-600)] mb-2" />
                  <span className="text-2xl font-bold">43</span>
                  <span className="text-xs font-semibold text-muted-foreground">Add-Ons</span>
                </Card>

                {/* Sponsors */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-[var(--zinc-50)]">
                  <Users className="h-6 w-6 text-[var(--blue-600)] mb-2" />
                  <span className="text-2xl font-bold">4</span>
                  <span className="text-xs font-semibold text-muted-foreground">Sponsors</span>
                </Card>

                {/* Last Minute */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-[var(--zinc-50)]">
                  <Clock className="h-6 w-6 text-[var(--blue-600)] mb-2" />
                  <span className="text-2xl font-bold">234</span>
                  <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Last-Minute tickets
                  </span>
                </Card>

                {/* Early Birds */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-[var(--zinc-50)]">
                  <BookmarkCheck className="h-6 w-6 text-[var(--blue-600)] mb-2" />
                  <span className="text-2xl font-bold">75%</span>
                  <span className="text-xs font-semibold text-muted-foreground">Early Birds</span>
                </Card>

              </div>

            </TabsContent>

            <TabsContent value="regular" className="h-[200px] flex items-center justify-center text-muted-foreground">
              No data for Regular
            </TabsContent>

            <TabsContent value="child" className="h-[200px] flex items-center justify-center text-muted-foreground">
              No data for Child
            </TabsContent>

            <TabsContent value="family" className="h-[200px] flex items-center justify-center text-muted-foreground">
              No data for Family
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
