import React from 'react'
import { cn } from '../lib/cn'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'secondary'
}

export function IconButton({ label, size = 'md', variant = 'ghost', className, children, ...props }: IconButtonProps) {
  const sizeMap = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-11 h-11' }
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200',
        variant === 'ghost' ? 'hover:bg-white/10 text-muted hover:text-tertiary' : 'bg-white/10 border border-white/10 hover:bg-white/20 text-muted hover:text-tertiary',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
