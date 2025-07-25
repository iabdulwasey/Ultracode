import { cn } from "@/lib/utils"

interface RadioToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  className?: string
}

export function RadioToggle({ checked, onCheckedChange, label, className }: RadioToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-secondary/50",
        className
      )}
    >
      {/* Toggle Switch */}
      <div className={cn(
        "relative w-8 h-4 rounded-full transition-all duration-300 ease-in-out",
        checked 
          ? "bg-gradient-to-r from-primary to-accent" 
          : "bg-secondary border border-border"
      )}>
        {/* Toggle Indicator */}
        <div className={cn(
          "absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out",
          checked ? "left-4 shadow-lg" : "left-0.5"
        )} />
        
        {/* Glow Effect */}
        {checked && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-sm animate-pulse" />
        )}
      </div>
      
      {/* Label */}
      <span className={cn(
        "text-xs font-medium transition-colors duration-200",
        checked 
          ? "text-primary" 
          : "text-muted-foreground group-hover:text-foreground"
      )}>
        {label}
      </span>
    </button>
  )
}