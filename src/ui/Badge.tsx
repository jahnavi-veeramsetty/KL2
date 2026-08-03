import React from 'react'
import { cn } from '../lib/cn'

type BadgeColor =
  | 'accent'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'purple'
  | 'orange'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  size?: 'sm' | 'md'
}

const colorMap: Record<BadgeColor, string> = {
  accent:  'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  easy:    'bg-green-500/15 text-green-400 border-green-500/30',
  medium:  'bg-amber-500/15 text-amber-400 border-amber-500/30',
  hard:    'bg-red-500/15 text-red-400 border-red-500/30',
  success: 'bg-green-500/15 text-green-400 border-green-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  danger:  'bg-red-500/15 text-red-400 border-red-500/30',
  neutral: 'bg-white/8 text-muted border-white/10',
  purple:  'bg-purple-500/15 text-purple-400 border-purple-500/30',
  orange:  'bg-orange-500/15 text-orange-400 border-orange-500/30',
}

export function Badge({ color = 'neutral', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        colorMap[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
