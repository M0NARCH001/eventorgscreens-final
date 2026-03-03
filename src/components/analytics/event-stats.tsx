"use client"

import * as React from "react"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  REGISTERED_DATA,
  REGISTERED_CONFIG,
  DEMOGRAPHICS_DATA,
  DEMOGRAPHICS_CONFIG,
  CANCELLED_VALUE,
} from "@/lib/analytics-data"

// --- Gauge Arc (Left fill only) ---
function CancelledGauge({ value }: { value: number }) {
  const percent = Math.max(0, Math.min(100, value))
  const radius = 50
  const startX = 10
  const endX = 110
  const y = 55
  const halfCircle = Math.PI * radius
  const arcLength = (percent / 100) * halfCircle
  const arcPath = `M${startX} ${y} A${radius} ${radius} 0 0 1 ${endX} ${y}`

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 60"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cancelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            stopColor="var(--color-destructive)"
            stopOpacity="0.7"
          />
          <stop offset="100%" stopColor="var(--color-destructive)" />
        </linearGradient>
      </defs>

      <path
        d={arcPath}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={8}
        strokeLinecap="round"
      />

      <path
        d={arcPath}
        fill="none"
        stroke="url(#cancelGradient)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${halfCircle}`}
        strokeDashoffset={0}
      />
    </svg>
  )
}

export function EventStats() {
  return (
    <div className="w-full">
      <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2 text-center">
            <CardTitle className="text-lg font-medium text-foreground">
              Registered Participants
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col items-center justify-center">
            <div className="mb-4 flex justify-between w-full px-4 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Registered
                </span>
                <div className="text-2xl font-bold text-foreground">375</div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Available
                </span>
                <div className="text-2xl font-bold text-foreground">25</div>
              </div>
            </div>

            <ChartContainer config={REGISTERED_CONFIG} className="h-[50px] w-full">
              <BarChart
                data={REGISTERED_DATA}
                layout="vertical"
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                barSize={32}
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="registered"
                  stackId="a"
                  fill="var(--color-chart-1)"
                  radius={[20, 0, 0, 20]}
                />
                <Bar
                  dataKey="available"
                  stackId="a"
                  fill="var(--color-chart-2)"
                  radius={[0, 20, 20, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2 text-center">
            <CardTitle className="text-lg font-medium text-foreground">
              Demographics (M/F/O)
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col items-center justify-center">
            <ChartContainer
              config={DEMOGRAPHICS_CONFIG}
              className="mx-auto max-h-[140px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={DEMOGRAPHICS_DATA}
                  dataKey="visitors"
                  nameKey="type"
                  innerRadius={30}
                  outerRadius={60}
                  strokeWidth={5}
                />
              </PieChart>
            </ChartContainer>

            <div className="flex justify-center gap-4 pt-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-chart-1"></span> Male
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-chart-2"></span> Female
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-muted"></span> Other
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2 text-center">
            <CardTitle className="text-lg font-medium text-foreground">
              Cancelled Tickets
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 items-center justify-center gap-5 text-center">
            <div className="flex justify-center items-center w-full max-w-[170px] h-[85px]">
              <CancelledGauge value={CANCELLED_VALUE} />
            </div>

            <span className="text-sm font-semibold whitespace-nowrap text-foreground">
              {CANCELLED_VALUE}% Cancelled
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
