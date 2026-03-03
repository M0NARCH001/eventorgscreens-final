'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error('Chart components must be used inside <ChartContainer>')
  return ctx
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: {
  id?: string
  className?: string
  children: React.ReactNode
  config: ChartConfig
}) {
  const uid = React.useId()
  const chartId = `chart-${id || uid.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn('flex aspect-video justify-center text-xs', className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colored = Object.entries(config).filter(([, v]) => v.theme || v.color)
  if (!colored.length) return null

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = colored
        .map(([k, v]) => {
          const c = v.theme?.[theme as keyof typeof v.theme] || v.color
          return c ? `  --color-${k}: ${c};` : ''
        })
        .join('\n')
      return `\n${prefix} [data-chart=${id}] {\n${vars}\n${vars ? '}\n' : ''}`
    })
    .join('\n')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

interface TooltipPayloadItem {
  name?: string
  value?: string | number
  dataKey?: string
}

interface TooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  className?: string
  hideLabel?: boolean
  indicator?: 'line' | 'dot' | 'dashed'
}

// ---- Tooltip fixed safely ----
function ChartTooltipContent(props: TooltipProps) {
  const { active, payload, className, hideLabel } = props
  if (!active || !payload || !Array.isArray(payload) || payload.length === 0) return null

  return (
    <div
      className={cn(
        'border-border/50 bg-background rounded-lg border p-2 text-xs shadow-xl',
        className,
      )}
    >
      {payload.map((item: TooltipPayloadItem, i: number) => (
        <div key={i}>
          {hideLabel ? item.value : `${item.name}: ${item.value}`}
        </div>
      ))}
    </div>
  )
}

interface LegendPayloadItem {
  dataKey?: string
  name?: string
  value?: string | number
}

// ---- Legend fixed safely ----
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: {
  className?: string;
  hideIcon?: boolean;
  payload?: LegendPayloadItem[];
  verticalAlign?: 'top' | 'bottom';
  nameKey?: string;
}) {
  const { config } = useChart()

  if (!payload || !Array.isArray(payload) || payload.length === 0) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 text-xs',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item: LegendPayloadItem, i: number) => {
        const key = nameKey || item?.dataKey || item?.name || 'value'
        const itemConfig = config[key]

        return (
          <div key={i} className="flex items-center gap-2">
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div className="h-2 w-2 rounded-sm bg-(--color-bg)" />
            )}
            <span className="text-muted-foreground">
              {itemConfig?.label || item?.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip
const ChartLegend = RechartsPrimitive.Legend

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
