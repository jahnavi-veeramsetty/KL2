import { Link } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-muted">/</span>}
            {!isLast && item.to ? (
              <Link to={item.to} className="text-muted hover:text-accent transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-tertiary font-medium' : 'text-muted'}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
