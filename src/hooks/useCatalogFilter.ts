import { useMemo } from 'react'
import type { CourseCategory, CourseLevel } from '../types'
import type { CatalogFiltersState } from '../components/catalog/CatalogFilters'

/**
 * The shape shared by every catalog listing (courses, master classes).
 * Both `Course` and `Masterclass` structurally satisfy this.
 */
export interface CatalogItem {
  id: string
  title: string
  shortDescription: string
  tags: string[]
  category: CourseCategory
  level: CourseLevel
  durationHours: number
  studentsEnrolled: number
  rating: number
  isNew?: boolean
}

export function useCatalogFilter<T extends CatalogItem>(items: T[], filters: CatalogFiltersState): T[] {
  return useMemo(() => {
    let result = [...items]

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (filters.category !== 'All') {
      result = result.filter(c => c.category === filters.category)
    }

    if (filters.level !== 'All') {
      result = result.filter(c => c.level === filters.level)
    }

    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'shortest':
        result.sort((a, b) => a.durationHours - b.durationHours)
        break
      default: // popular
        result.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
    }

    return result
  }, [items, filters])
}
