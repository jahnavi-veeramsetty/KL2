import { SearchInput, Select, Chip } from '../../ui'
import type { CourseCategory, CourseLevel } from '../../types'

const CATEGORIES: { value: CourseCategory | 'All' | 'My Courses'; label: string }[] = [
  { value: 'All', label: 'All Categories' },
  { value: 'My Courses', label: 'My Courses' },
  { value: 'AI/ML', label: 'AI/ML' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Data', label: 'Data' },
]

const LEVELS: { value: CourseLevel | 'All'; label: string }[] = [
  { value: 'All', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
]

export interface SortOption {
  value: string
  label: string
}

export interface CatalogFiltersState {
  search: string
  category: CourseCategory | 'All' | 'My Courses'
  level: CourseLevel | 'All'
  sort: string
}

interface CatalogFiltersProps {
  filters: CatalogFiltersState
  onChange: (filters: CatalogFiltersState) => void
  searchPlaceholder: string
  sortOptions: SortOption[]
}

export function CatalogFilters({ filters, onChange, searchPlaceholder, sortOptions }: CatalogFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Search + Selects row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          className="flex-1"
          placeholder={searchPlaceholder}
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          onClear={() => onChange({ ...filters, search: '' })}
        />
        {/* Two half-width selects on one line below sm. `sm:contents` dissolves
            this wrapper from sm up, so they become direct flex children again
            and the desktop row is unchanged. Search keeps its own line — split
            three ways at 342px it would be too narrow to read a query in. */}
        <div className="grid grid-cols-2 gap-3 sm:contents">
          <Select
            options={LEVELS}
            value={filters.level}
            onChange={e => onChange({ ...filters, level: e.target.value as CourseLevel | 'All' })}
            className="min-w-0 sm:w-44"
          />
          <Select
            options={sortOptions}
            value={filters.sort}
            onChange={e => onChange({ ...filters, sort: e.target.value })}
            className="min-w-0 sm:w-44"
          />
        </div>
      </div>
      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <Chip
            key={cat.value}
            selected={filters.category === cat.value}
            onClick={() => onChange({ ...filters, category: cat.value })}
          >
            {cat.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}
