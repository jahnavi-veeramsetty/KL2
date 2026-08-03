import { useState } from 'react'

import { CatalogFilters, type CatalogFiltersState, type SortOption } from '../components/catalog/CatalogFilters'
import { CardGrid } from '../components/catalog/CardGrid'
import { CourseCard } from '../components/courses/CourseCard'
import { useCatalogFilter } from '../hooks/useCatalogFilter'
import { courses } from '../data'

const DEFAULT_FILTERS: CatalogFiltersState = {
  search: '',
  category: 'All',
  level: 'All',
  sort: 'popular',
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'shortest', label: 'Shortest' },
]

export default function CoursesPage() {
  const [filters, setFilters] = useState<CatalogFiltersState>(DEFAULT_FILTERS)
  const filtered = useCatalogFilter(courses, filters)

  return (
    <>
      <CatalogFilters
        filters={filters}
        onChange={setFilters}
        searchPlaceholder="Search courses..."
        sortOptions={SORT_OPTIONS}
      />
      <div className="text-xs text-muted mb-4">
        {filtered.length} {filtered.length === 1 ? 'course' : 'courses'} found
      </div>
      <CardGrid
        items={filtered}
        renderCard={course => <CourseCard course={course} />}
        emptyTitle="No courses found"
        onClearFilters={() => setFilters(DEFAULT_FILTERS)}
        density="compact"
      />
    </>
  )
}
