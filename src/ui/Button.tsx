import React from 'react'
import { cn } from '../lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variantStyles: Record<string, string> = {
    // text-on-accent, not text-strong: text-strong is near-black in the light
    // theme, which put dark ink on the dark teal fill.
    primary: 'bg-accent-strong hover:bg-accent text-on-accent shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5',
    secondary: 'bg-line-strong hover:bg-line-strong text-strong border border-line-strong hover:-translate-y-0.5',
    ghost: 'hover:bg-line-strong text-subtle hover:text-strong',
    link: 'text-accent hover:text-accent/80 p-0 hover:bg-transparent underline-offset-4 hover:underline',
  }

  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        variantStyles[variant],
        variant !== 'link' && sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
