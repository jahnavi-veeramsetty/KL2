import { useMemo, useState } from 'react'
import { ContestCard } from '../components/compete/ContestCard'
import { ContestHero } from '../components/compete/ContestHero'
import { RatingCard } from '../components/compete/RatingCard'
import { ScopedStandings } from '../components/compete/ScopedStandings'
import { PastContestRow } from '../components/compete/PastContestRow'
import { LeaderboardPanel } from '../components/compete/LeaderboardPanel'
import { EmptyState } from '../ui'
import { contests } from '../data'
import type { ContestDifficulty } from '../types'
import { cn } from '../lib/cn'

/**
 * `difficulty` is really a division. It was on every contest and filterable
 * nowhere.
 *
 * Derived from the data rather than hardcoded, so a division nobody runs never
 * shows up as a chip — Div. 3 has no contests today and would have been a dead
 * option — and a new one appears the moment it is scheduled.
 */
const DIVISION_ORDER: ContestDifficulty[] = [
  'Div. 1', 'Div. 2', 'Div. 3', 'Educational', 'Global',
]
const DIVISIONS: (ContestDifficulty | 'All')[] = [
  'All',
  ...DIVISION_ORDER.filter(d => contests.some(c => c.difficulty === d)),
]

function SectionHead({ title, count, tone }: { title: string; count: number; tone: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className={cn('text-xs font-bold uppercase tracking-[0.12em]', tone)}>{title}</h3>
      <span className="text-[11px] font-semibold text-faint tabular-nums">{count}</span>
      <span className="flex-1 h-px bg-raised" />
    </div>
  )
}

export default function CompetePage() {
  const [division, setDivision] = useState<ContestDifficulty | 'All'>('All')

  const visible = useMemo(
    () => (division === 'All' ? contests : contests.filter(c => c.difficulty === division)),
    [division]
  )

  const live = visible.filter(c => c.status === 'live')
  const upcoming = visible.filter(c => c.status === 'upcoming')
  const past = visible.filter(c => c.status === 'past')

  // Feature whatever is most urgent: running now, else opening soonest.
  const featured =
    live[0] ??
    [...upcoming].sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime))[0]

  // The most recent finished contest — what the standings panel actually shows.
  const lastFinished = useMemo(
    () =>
      contests
        .filter(c => c.status === 'past' && c.leaderboard?.length)
        .sort((a, b) => +new Date(b.startTime) - +new Date(a.startTime))[0],
    []
  )

  return (
    <div className="space-y-8 mt-4">
      {featured && <ContestHero contest={featured} />}

      {/* Division filter */}
      <div className="flex flex-wrap gap-2">
        {DIVISIONS.map(d => (
          <button
            key={d}
            type="button"
            onClick={() => setDivision(d)}
            aria-pressed={division === d}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors',
              division === d
                ? 'bg-accent/15 text-accent border-accent/40'
                : 'bg-raised text-subtle border-line-strong hover:text-strong hover:border-line-strong'
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full min-w-0 space-y-8">
          {visible.length === 0 && (
            <EmptyState
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title={`No ${division} contests`}
              description="Try another division."
              actionLabel="Show all"
              onAction={() => setDivision('All')}
            />
          )}

          {live.length > 0 && (
            <section>
              <SectionHead title="Live now" count={live.length} tone="text-green-400" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {live.map(c => <ContestCard key={c.id} contest={c} />)}
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section>
              <SectionHead title="Upcoming" count={upcoming.length} tone="text-accent" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcoming.map(c => <ContestCard key={c.id} contest={c} />)}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <SectionHead title="Past results" count={past.length} tone="text-faint" />
              <div className="space-y-2.5">
                {past
                  .slice()
                  .sort((a, b) => +new Date(b.startTime) - +new Date(a.startTime))
                  .map(c => <PastContestRow key={c.id} contest={c} />)}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="w-full lg:w-[350px] lg:sticky lg:top-24 h-fit flex-shrink-0 space-y-6">
          <RatingCard />
          <ScopedStandings />

          {/* Last contest standings is the most redundant of the three on a
              phone — it is reference detail, and the full leaderboard covers
              it. Desktop has the column width to spare. */}
          {lastFinished?.leaderboard && (
            <div className="hidden lg:block">
              {/* Was headed "Global Leaderboard" while rendering a single
                  contest's standings. Named for what it actually is. */}
              <h2 className="text-sm font-bold text-strong tracking-tight mb-1">Last contest standings</h2>
              <p className="text-[11px] text-faint mb-3">{lastFinished.title}</p>
              <LeaderboardPanel
                entries={lastFinished.leaderboard}
                yourRank={lastFinished.yourRank}
                yourScore={lastFinished.yourScore}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
