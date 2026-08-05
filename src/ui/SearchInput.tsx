import React from 'react'
import { cn } from '../lib/cn'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  shortcut?: string
}

export function SearchInput({ className, value, onClear, shortcut, ...props }: SearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <svg
        className="absolute left-3 w-4 h-4 text-subtle pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        className={cn(
          "w-full pl-10 py-2.5 bg-raised border border-line rounded-xl text-sm text-strong placeholder:text-faint focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/50 transition-all duration-200",
          (value && onClear) ? "pr-9" : shortcut ? "pr-20" : "pr-4"
        )}
        {...props}
      />
      {shortcut && !value && (
        <div className="absolute right-3 flex items-center pointer-events-none">
          <span className="px-2 py-1 rounded bg-raised border border-line-strong text-[11px] font-medium text-subtle/80 font-mono">
            {shortcut}
          </span>
        </div>
      )}
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 text-subtle hover:text-strong transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
