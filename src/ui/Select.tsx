import React from 'react'
import { cn } from '../lib/cn'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-muted font-medium">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            'w-full appearance-none pl-3 pr-8 py-2 bg-secondary/40 border border-white/10 rounded-lg text-sm text-tertiary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/50 transition-all duration-200 cursor-pointer',
            className
          )}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-secondary text-tertiary">
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
