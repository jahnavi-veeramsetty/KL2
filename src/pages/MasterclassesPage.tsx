import { useState, useMemo } from 'react'

import { CatalogFilters, type CatalogFiltersState, type SortOption } from '../components/catalog/CatalogFilters'
import { CardGrid } from '../components/catalog/CardGrid'
import { ShelfList } from '../components/catalog/ShelfList'
import { CatalogTile } from '../components/catalog/CatalogTile'
import { MasterclassCard } from '../components/masterclasses/MasterclassCard'
import { useCatalogFilter } from '../hooks/useCatalogFilter'
import { useMediaQuery, SM_QUERY } from '../hooks/useMediaQuery'
import { buildShelves } from '../lib/shelves'
import { ROUTES } from '../constants/routes'
import { masterclasses } from '../data'

const DEFAULT_FILTERS: CatalogFiltersState = {
  search: '',
  category: 'All',
  level: 'All',
  sort: 'popular',
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'shortest', label: 'Shortest' },
]

export default function MasterclassesPage() {
  const [filters, setFilters] = useState<CatalogFiltersState>(DEFAULT_FILTERS)
  const filtered = useCatalogFilter(masterclasses, filters)

  const isCompact = !useMediaQuery(SM_QUERY)

  // Same rule as Courses: browsing gets shelves, narrowing gets a flat list.
  const isNarrowed =
    filters.search.trim() !== '' || filters.category !== 'All' || filters.level !== 'All'
  const canShelve = isCompact && !isNarrowed

  // buildShelves returns [] when there is too little to shelve, so a thin
  // catalog falls back to the flat list on its own.
  const shelves = useMemo(
    () => (canShelve ? buildShelves(filtered) : []),
    [canShelve, filtered]
  )
  const showShelves = shelves.length > 0

  return (
    <>
      <CatalogFilters
        filters={filters}
        onChange={setFilters}
        searchPlaceholder="Search master classes..."
        sortOptions={SORT_OPTIONS}
      />
      <div className="text-xs text-muted mb-4">
        {filtered.length} {filtered.length === 1 ? 'master class' : 'master classes'} found
      </div>

      {showShelves ? (
        <ShelfList
          shelves={shelves}
          emptyTitle="No master classes found"
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
          renderTile={masterclass => (
            <CatalogTile
              to={ROUTES.MASTERCLASS_DETAIL(masterclass.id)}
              thumbnail={masterclass.thumbnail}
              title={masterclass.title}
              category={masterclass.category}
              level={masterclass.level}
              rating={masterclass.rating}
              durationHours={masterclass.durationHours}
              price={masterclass.price}
              date={masterclass.date}
            />
          )}
        />
      ) : (
        <CardGrid
          items={filtered}
          renderCard={masterclass => <MasterclassCard course={masterclass} />}
          emptyTitle="No master classes found"
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
          density="compact"
        />
      )}
    </>
  )
}
