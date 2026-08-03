import { cn } from '../lib/cn'

type ProgressColor = 'accent' | 'easy' | 'medium' | 'hard' | 'default'

interface ProgressBarProps {
  value: number
  max?: number
  color?: ProgressColor
  size?: 'sm' | 'md'
  showLabel?: boolean
  className?: string
}

const colorMap: Record<ProgressColor, string> = {
  accent:  'bg-accent',
  easy:    'bg-easy',
  medium:  'bg-medium',
  hard:    'bg-hard',
  default: 'bg-accent-strong',
}

export function ProgressBar({ value, max = 100, color = 'default', size = 'sm', showLabel = false, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('w-full rounded-full bg-white/10 overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colorMap[color])}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && <span className="text-xs text-muted min-w-[3ch]">{Math.round(pct)}%</span>}
    </div>
  )
}
