import { Link } from 'react-router-dom'

interface SectionHeadingProps {
  title: string
  viewAllLabel?: string
  viewAllTo?: string
  onViewAll?: () => void
  className?: string
}

export function SectionHeading({ title, viewAllLabel = 'View All', viewAllTo, onViewAll, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <h3 className="text-white font-bold text-2xl tracking-wide">{title}</h3>
      {(viewAllTo || onViewAll) && (
        viewAllTo ? (
          <Link
            to={viewAllTo}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-colors hover:underline underline-offset-4"
          >
            {viewAllLabel} →
          </Link>
        ) : (
          <button
            onClick={onViewAll}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-colors hover:underline underline-offset-4"
          >
            {viewAllLabel} →
          </button>
        )
      )}
    </div>
  )
}
