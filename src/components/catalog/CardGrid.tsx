import { Fragment, type ReactNode } from 'react'
import { EmptyState } from '../../ui'

/**
 * comfortable — wide cards, max 2 per row (side-by-side card layouts)
 * compact     — narrow cards, up to 3 per row (stacked card layouts)
 */
type Density = 'comfortable' | 'compact'

const DENSITY_COLUMNS: Record<Density, string> = {
  comfortable: 'grid-cols-1 md:grid-cols-2',
  compact: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}

interface CardGridProps<T extends { id: string }> {
  items: T[]
  renderCard: (item: T) => ReactNode
  emptyTitle: string
  onClearFilters?: () => void
  density?: Density
}

export function CardGrid<T extends { id: string }>({
  items,
  renderCard,
  emptyTitle,
  onClearFilters,
  density = 'comfortable',
}: CardGridProps<T>) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title={emptyTitle}
        description="Try adjusting your filters or search query."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
      />
    )
  }

  return (
    <div className={`grid ${DENSITY_COLUMNS[density]} gap-5`}>
      {items.map(item => (
        <Fragment key={item.id}>{renderCard(item)}</Fragment>
      ))}
    </div>
  )
}
