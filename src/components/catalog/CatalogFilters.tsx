import { SearchInput, Select, Chip } from '../../ui'
import type { CourseCategory, CourseLevel } from '../../types'

const CATEGORIES: { value: CourseCategory | 'All'; label: string }[] = [
  { value: 'All', label: 'All Categories' },
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
  category: CourseCategory | 'All'
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
        <Select
          options={LEVELS}
          value={filters.level}
          onChange={e => onChange({ ...filters, level: e.target.value as CourseLevel | 'All' })}
          className="sm:w-44"
        />
        <Select
          options={sortOptions}
          value={filters.sort}
          onChange={e => onChange({ ...filters, sort: e.target.value })}
          className="sm:w-44"
        />
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
