import { Button } from "@/components/ui/button"
import { QUICK_ACTIONS } from "@/lib/dashboard-data"

export function QuickActions() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full h-20 border-2 border-border flex items-center justify-center gap-3 bg-background rounded-xl"
          >
            <action.icon className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base font-medium text-primary truncate">
              {action.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
