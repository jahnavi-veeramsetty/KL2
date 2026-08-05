import React from 'react'
import { cn } from '../lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        // card-edge rather than a literal border colour: a 20%-opacity blue
        // reads on near-black and all but disappears on a light page.
        'relative bg-page border card-edge rounded-[20px] shadow-lg overflow-hidden',
        // The lift is the hover response that survives both themes. The bloom
        // below only reads on near-black; light swaps it for a cast shadow in
        // index.css, but the card moving works either way.
        'hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(59,130,246,0.12)] transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
