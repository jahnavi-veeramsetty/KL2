import { useState } from 'react'

import { CatalogFilters, type CatalogFiltersState, type SortOption } from '../components/catalog/CatalogFilters'
import { CardGrid } from '../components/catalog/CardGrid'
import { MasterclassCard } from '../components/masterclasses/MasterclassCard'
import { useCatalogFilter } from '../hooks/useCatalogFilter'
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
      <CardGrid
        items={filtered}
        renderCard={masterclass => <MasterclassCard course={masterclass} />}
        emptyTitle="No master classes found"
        onClearFilters={() => setFilters(DEFAULT_FILTERS)}
        density="compact"
      />
    </>
  )
}
