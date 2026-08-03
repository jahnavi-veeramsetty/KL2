import React from 'react'
import { cn } from '../lib/cn'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
  size?: 'sm' | 'md'
}

export function Tabs({ tabs, activeTab, onChange, className, size = 'md' }: TabsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center bg-secondary/40 border border-white/8 rounded-xl p-1 gap-1',
        className
      )}
      role="tablist"
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200',
            size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
            activeTab === tab.id
              ? 'bg-accent-strong text-white shadow-md shadow-cyan-500/20'
              : 'text-muted hover:text-tertiary hover:bg-white/5'
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              'rounded-full px-1.5 py-0.5 text-xs font-bold',
              activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
