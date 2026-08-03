import { useState } from 'react'
import { cn } from '../lib/cn'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  meta?: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
  defaultOpen?: string[]
}

export function Accordion({ items, allowMultiple = false, className, defaultOpen = [] }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen))

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map(item => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id} className="border border-white/8 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-secondary/30 hover:bg-secondary/50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-tertiary">{item.title}</span>
                {item.meta && <span className="text-xs text-muted">{item.meta}</span>}
              </div>
              <svg
                className={cn('w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 py-4 border-t border-white/5 bg-primary/40">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
