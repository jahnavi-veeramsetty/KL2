import { useState, useMemo } from 'react'

import { CatalogFilters, type CatalogFiltersState, type SortOption } from '../components/catalog/CatalogFilters'
import { CardGrid } from '../components/catalog/CardGrid'
import { ShelfList } from '../components/catalog/ShelfList'
import { CatalogTile } from '../components/catalog/CatalogTile'
import { CourseCard } from '../components/courses/CourseCard'
import { useCatalogFilter } from '../hooks/useCatalogFilter'
import { useMediaQuery, SM_QUERY } from '../hooks/useMediaQuery'
import { buildShelves } from '../lib/shelves'
import { ROUTES } from '../constants/routes'
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

  const isCompact = !useMediaQuery(SM_QUERY)

  // Shelves are a browse view. The moment someone searches or filters they want
  // a ranked answer, not a merchandised page, so narrowing collapses back to the
  // flat list. Sort alone keeps the shelves — it only reorders within each one.
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
        searchPlaceholder="Search courses..."
        sortOptions={SORT_OPTIONS}
      />
      <div className="text-xs text-muted mb-4">
        {filtered.length} {filtered.length === 1 ? 'course' : 'courses'} found
      </div>

      {showShelves ? (
        <ShelfList
          shelves={shelves}
          emptyTitle="No courses found"
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
          renderTile={course => (
            <CatalogTile
              to={ROUTES.COURSE_DETAIL(course.id)}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              level={course.level}
              rating={course.rating}
              durationHours={course.durationHours}
              price={course.price}
              progress={course.progress}
            />
          )}
        />
      ) : (
        <CardGrid
          items={filtered}
          renderCard={course => <CourseCard course={course} />}
          emptyTitle="No courses found"
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
          density="compact"
        />
      )}
    </>
  )
}
