import { useState, useMemo } from 'react'

import { CatalogFilters, type CatalogFiltersState, type SortOption } from '../components/catalog/CatalogFilters'
import { CardGrid } from '../components/catalog/CardGrid'
import { ShelfList } from '../components/catalog/ShelfList'
import { CatalogTile } from '../components/catalog/CatalogTile'
import { MasterclassCard } from '../components/masterclasses/MasterclassCard'
import { LiveSessionBanner } from '../components/masterclasses/LiveSessionBanner'
import { useCatalogFilter } from '../hooks/useCatalogFilter'
import { useMediaQuery, SM_QUERY } from '../hooks/useMediaQuery'
import { buildShelves } from '../lib/shelves'
import { nextSession, sessionState } from '../lib/masterclass'
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

function SectionHead({ title, count, tone, pulse }: { title: string; count: number; tone: string; pulse?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />}
      <h3 className={`text-xs font-bold uppercase tracking-[0.12em] ${tone}`}>{title}</h3>
      <span className="text-[11px] font-semibold text-faint tabular-nums">{count}</span>
      <span className="flex-1 h-px bg-raised" />
    </div>
  )
}

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

  // Live first, else the soonest upcoming — a schedule has to say what is on.
  const featured = useMemo(() => nextSession(masterclasses), [])

  // Grouped like the hackathon page: anything joinable right now gets its own
  // band above the catalogue rather than being one card among forty.
  const liveNow = useMemo(() => filtered.filter(m => sessionState(m.date) === 'live'), [filtered])
  const startingSoon = useMemo(() => filtered.filter(m => sessionState(m.date) === 'soon'), [filtered])
  const rest = useMemo(
    () => filtered.filter(m => !['live', 'soon'].includes(sessionState(m.date))),
    [filtered]
  )

  return (
    <>
      {featured && !isNarrowed && <LiveSessionBanner masterclass={featured} />}

      <CatalogFilters
        filters={filters}
        onChange={setFilters}
        searchPlaceholder="Search master classes..."
        sortOptions={SORT_OPTIONS}
      />
      <div className="text-xs text-subtle mb-4">
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
        <div className="space-y-8">
          {liveNow.length > 0 && (
            <section>
              <SectionHead title="Live now" count={liveNow.length} tone="text-green-400" pulse />
              <CardGrid
                items={liveNow}
                renderCard={masterclass => <MasterclassCard course={masterclass} />}
                emptyTitle="Nothing live"
                density="compact"
              />
            </section>
          )}

          {startingSoon.length > 0 && (
            <section>
              <SectionHead title="Starting soon" count={startingSoon.length} tone="text-amber-400" />
              <CardGrid
                items={startingSoon}
                renderCard={masterclass => <MasterclassCard course={masterclass} />}
                emptyTitle="Nothing soon"
                density="compact"
              />
            </section>
          )}

          <section>
            {(liveNow.length > 0 || startingSoon.length > 0) && (
              <SectionHead title="All sessions" count={rest.length} tone="text-faint" />
            )}
            <CardGrid
              items={rest}
              renderCard={masterclass => <MasterclassCard course={masterclass} />}
              emptyTitle="No master classes found"
              onClearFilters={() => setFilters(DEFAULT_FILTERS)}
              density="compact"
            />
          </section>
        </div>
      )}
    </>
  )
}
