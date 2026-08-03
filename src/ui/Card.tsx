import React from 'react'
import { cn } from '../lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative bg-[#0a0f1c] border border-blue-500/20 rounded-[20px] shadow-lg overflow-hidden',
        'hover:border-blue-500/40 hover:shadow-[0_0_24px_rgba(59,130,246,0.12)] transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
