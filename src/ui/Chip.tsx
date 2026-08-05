import React from 'react'
import { cn } from '../lib/cn'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  color?: string
}

export function Chip({ selected = false, color, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
        selected
          ? 'border-accent/60 text-accent bg-accent/10 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
          : 'border-line-strong text-subtle bg-raised hover:border-line-strong hover:text-strong',
        className
      )}
      style={selected && color ? { borderColor: `${color}60`, color, backgroundColor: `${color}18` } : undefined}
      {...props}
    >
      {children}
    </button>
  )
}
