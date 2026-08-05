import type { ReactNode } from 'react'
import type { Shelf, Shelvable } from '../../lib/shelves'
import { EmptyState } from '../../ui'

/**
 * Mobile browse view: one horizontally scrolling row per shelf.
 *
 * The scroller is bled to the viewport edges with `-mx-6 px-6` — matching
 * AppLayout's page padding — so tiles scroll past the edge of the screen while
 * the first one still lines up with the heading above it. Without the bleed a
 * shelf looks like a boxed carousel rather than a continuing row.
 */
interface ShelfListProps<T extends Shelvable> {
  shelves: Shelf<T>[]
  renderTile: (item: T) => ReactNode
  emptyTitle: string
  onClearFilters?: () => void
}

export function ShelfList<T extends Shelvable>({
  shelves,
  renderTile,
  emptyTitle,
  onClearFilters,
}: ShelfListProps<T>) {
  if (shelves.length === 0) {
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
    <div className="flex flex-col gap-6">
      {shelves.map(shelf => (
        <section key={shelf.key} aria-label={shelf.title}>
          <div className="flex items-baseline justify-between gap-3 mb-2.5">
            <h2 className="text-sm font-bold text-strong tracking-tight">{shelf.title}</h2>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent tabular-nums">
              {shelf.items.length}
            </span>
          </div>

          {/* pt-1/pb-3: overflow-x-auto clips vertically too, so the tiles'
              hover lift needs room above and their shadow room below. */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x scroll-px-6 -mx-6 px-6 pt-1 pb-3">
            {shelf.items.map(item => (
              <div key={item.id} className="snap-start shrink-0">
                {renderTile(item)}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
