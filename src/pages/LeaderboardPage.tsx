import { useMemo, useState } from 'react'
import { Trophy, TrendingUp, TrendingDown, Minus, X, ChevronRight, ChevronDown } from 'lucide-react'
import { Avatar, Breadcrumbs } from '../ui'
import { ROUTES } from '../constants/routes'
import type { LeaderboardPeriod, LeaderboardScope } from '../types/leaderboard'
import { YOUR_PLAYER_ID } from '../data/leaderboard'
import {
  type BoardFilter, type GroupStanding,
  allStandings, bestStanding, districtStandings, filterLabel,
  institutionById, institutionStandings, playersIn,
} from '../lib/leaderboard'
import { cn } from '../lib/cn'

const PERIODS: { id: LeaderboardPeriod; label: string }[] = [
  { id: 'all', label: 'All time' },
  { id: 'month', label: 'This month' },
]

/** Districts and colleges are league tables; students are the drill-down. */
type View = 'students' | 'districts' | 'colleges'

const VIEWS: { id: View; label: string }[] = [
  { id: 'students', label: 'Students' },
  { id: 'districts', label: 'Districts' },
  { id: 'colleges', label: 'Colleges' },
]

/**
 * Fixed widths, so the Student column stops absorbing every spare pixel and
 * dragging the name away from its header. Alignment is declared once here and
 * applied to both the header and the body cell, so they cannot drift apart.
 */
const COLUMNS = [
  { label: 'Rank',     w: 'w-14 sm:w-[68px]',   align: 'left' as const },
  // indent: the cell starts with an avatar (w-8) + gap-2.5, so a header flush
  // to the cell edge sits over the avatar rather than over the name. 42px puts
  // it exactly above the name at every breakpoint.
  { label: 'Student',  w: '',                   align: 'left' as const, indent: true },
  { label: 'College',  w: 'w-[190px]',          align: 'left' as const, hide: true },
  { label: 'District', w: 'w-[120px]',          align: 'left' as const, hide: true },
  { label: 'Contests', w: 'w-[96px]',           align: 'center' as const, hide: true },
  { label: 'Score',    w: 'w-[86px] sm:w-[110px]', align: 'right' as const },
  { label: 'Change',   w: 'w-[96px]',           align: 'right' as const, hide: true },
]

const MEDALS = ['🥇', '🥈', '🥉']
const PODIUM_TONE = ['text-amber-400', 'text-body', 'text-orange-400']

function Delta({ value }: { value: number }) {
  const Icon = value > 0 ? TrendingUp : value < 0 ? TrendingDown : Minus
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-[11px] font-bold tabular-nums',
      value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-faint'
    )}>
      <Icon className="w-3 h-3" />
      {value === 0 ? '—' : Math.abs(value)}
    </span>
  )
}

function Chip({
  active, onClick, children, tone = 'accent',
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  tone?: 'accent' | 'violet'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors',
        active
          ? tone === 'violet'
            ? 'bg-violet-400/15 text-violet-300 border-violet-400/40'
            : 'bg-accent/15 text-accent border-accent/40'
          : 'bg-raised text-subtle border-line-strong hover:text-strong hover:border-line-strong'
      )}
    >
      {children}
    </button>
  )
}

function Select({
  label, value, onChange, options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { id: string; label: string }[]
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-line-strong bg-raised/40 pl-3 pr-8 py-2.5 text-xs font-semibold text-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 [&>option]:bg-panel [&>option]:text-strong"
      >
        {options.map(o => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-faint" />
    </label>
  )
}

/** One row of a league table — a district or a college. Clicking drills in. */
function GroupRow({ group, onOpen }: { group: GroupStanding; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group w-full flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-3.5 rounded-xl border text-left transition-colors',
        group.isYours
          ? 'border-accent/30 bg-accent/[0.06] hover:border-accent/50'
          : 'border-line bg-raised/25 hover:border-line-strong'
      )}
    >
      <span className={cn(
        'w-7 text-center text-base font-bold tabular-nums shrink-0',
        PODIUM_TONE[group.rank - 1] ?? 'text-faint'
      )}>
        {group.rank}
      </span>

      <span className="w-10 h-10 rounded-xl bg-raised border border-line-strong flex items-center justify-center text-[10.5px] font-bold text-accent shrink-0">
        {group.short}
      </span>

      <span className="flex-1 min-w-0">
        <span className="block text-[13px] font-semibold text-strong truncate">
          {group.name}
          {group.isYours && <span className="text-[9.5px] text-accent font-bold ml-2 tracking-wide">YOURS</span>}
        </span>
        <span className="block text-[11px] text-faint truncate">
          {group.sub} · {group.competing} competing
        </span>
      </span>

      <span className="text-right shrink-0">
        <span className="block text-sm font-bold text-strong tabular-nums leading-none">
          {group.averageScore.toLocaleString()}
        </span>
        <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-faint mt-1">avg</span>
      </span>

      <span className="text-right shrink-0 hidden sm:block w-20">
        <span className="flex items-center justify-end gap-1 text-[12px] font-semibold text-amber-400/80 tabular-nums leading-none">
          <Trophy className="w-3 h-3" />
          {group.totalScore.toLocaleString()}
        </span>
        <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-faint mt-1">total</span>
      </span>

      <ChevronRight className="w-4 h-4 text-faint group-hover:text-accent transition-colors shrink-0" />
    </button>
  )
}

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<BoardFilter>({ kind: 'college' })
  const [period, setPeriod] = useState<LeaderboardPeriod>('all')
  const [view, setView] = useState<View>('students')

  const standings = useMemo(() => allStandings(period), [period])
  const best = useMemo(() => bestStanding(standings), [standings])
  const ranked = useMemo(() => playersIn(filter, period), [filter, period])
  const districts = useMemo(() => districtStandings(period), [period])

  // Colleges narrow to the chosen district, so a district drill-down stays in context.
  const collegeDistrictId = filter.kind === 'district' ? filter.id : undefined
  const colleges = useMemo(
    () => institutionStandings(period, collegeDistrictId),
    [period, collegeDistrictId]
  )

  const podium = ranked.slice(0, 3)
  const scoreOf = (p: (typeof ranked)[number]) => (period === 'month' ? p.monthScore : p.score)

  // A filter is "pinned" when it names a specific place rather than one of yours.
  const pinned = filter.id !== undefined

  const openGroup = (kind: LeaderboardScope, id: string) => {
    setFilter({ kind, id })
    setView('students')
  }

  return (
    <div className="space-y-6">
      {/* Above the title, so the way out is the first thing on the page.
          The route is deliberately absent from PAGE_TITLES — AppLayout renders
          its heading above the outlet, which would put it above these. */}
      <div>
        <Breadcrumbs backTo={ROUTES.COMPETE} items={[{ label: 'Coding Contest', to: ROUTES.COMPETE }, { label: 'Leaderboard' }]} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-strong tracking-tight">Leaderboard</h1>
        <p className="text-sm text-subtle mt-1">
          Where you stand across Telangana, your district and your college.
        </p>
      </div>

      {/* Every scope at once — the whole idea in one row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {standings.map(s => {
          const isBest = s.scope === best.scope
          // District and College open their league tables — "how does my
          // district compare" is the question those cards actually raise.
          // State stays a student list; there is no wider grouping above it.
          const opensBoard = s.scope === 'district' || s.scope === 'college'
          const active = opensBoard
            ? view === (s.scope === 'district' ? 'districts' : 'colleges')
            : view === 'students' && filter.kind === s.scope && !filter.id
          return (
            <button
              key={s.scope}
              type="button"
              onClick={() => {
                if (opensBoard) {
                  setFilter({ kind: 'state' })
                  setView(s.scope === 'district' ? 'districts' : 'colleges')
                } else {
                  setFilter({ kind: s.scope })
                  setView('students')
                }
              }}
              aria-pressed={active}
              className={cn(
                'relative text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors',
                active
                  ? 'border-accent/45 bg-accent/[0.08]'
                  : isBest
                    ? 'border-green-500/30 bg-green-500/[0.05] hover:border-green-500/50'
                    : 'border-line bg-raised/25 hover:border-line-strong'
              )}
            >
              {isBest && (
                <>
                  <span className="sm:hidden absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
                  <span className="hidden sm:inline absolute top-3 right-3 text-[8.5px] font-bold uppercase tracking-[0.1em] text-green-400 bg-green-400/12 border border-green-400/25 px-1.5 py-0.5 rounded">
                    Best
                  </span>
                </>
              )}
              <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.13em] text-faint mb-1.5 sm:mb-2 truncate pr-3 sm:pr-10">
                {s.label}
              </p>
              <p className="text-lg sm:text-2xl font-bold text-strong tracking-tight leading-none tabular-nums">
                #{s.rank.toLocaleString()}
              </p>
              {/* The field size does not fit at 107px and is the less useful
                  half — the percentile already says how good the rank is. */}
              <p className="text-[9.5px] sm:text-[10.5px] text-subtle mt-1 sm:mt-1.5 tabular-nums truncate">
                top {s.topPercent}%<span className="hidden sm:inline"> · {s.total.toLocaleString()} students</span>
              </p>
            </button>
          )
        })}
      </div>

      {/* Filters. Native selects on phones — five chips wrap to three lines at
          342px, and a select is the control people already know there. */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        <Select label="View" value={view} onChange={v => setView(v as View)} options={VIEWS} />
        <Select label="Period" value={period} onChange={v => setPeriod(v as LeaderboardPeriod)} options={PERIODS} />
      </div>

      <div className="hidden sm:flex flex-wrap items-center gap-2">
        {VIEWS.map(v => (
          <Chip key={v.id} tone="violet" active={view === v.id} onClick={() => setView(v.id)}>
            {v.label}
          </Chip>
        ))}

        <span className="w-px h-5 bg-line-strong mx-1" />

        {PERIODS.map(p => (
          <Chip key={p.id} active={period === p.id} onClick={() => setPeriod(p.id)}>
            {p.label}
          </Chip>
        ))}
      </div>

      {/* Active drill-down */}
      {pinned && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-faint">Showing</span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/12 border border-accent/30 text-xs font-semibold text-accent">
            {filterLabel(filter)}
            <button
              type="button"
              onClick={() => setFilter({ kind: 'college' })}
              aria-label="Clear filter"
              className="hover:text-strong transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        </div>
      )}

      {view === 'districts' && (
        <div className="space-y-2.5">
          <p className="text-[11px] text-faint">
            Districts ranked by <span className="text-body font-semibold">average</span> student score —
            ranking by total would just reward whichever district has the most students here. Open one to see
            its students.
          </p>
          {districts.map(d => (
            <GroupRow key={d.id} group={d} onOpen={() => openGroup('district', d.id)} />
          ))}
        </div>
      )}

      {view === 'colleges' && (
        <div className="space-y-2.5">
          <p className="text-[11px] text-faint">
            Colleges ranked by <span className="text-body font-semibold">average</span> student score
            {collegeDistrictId && <> in <span className="text-body font-semibold">{filterLabel(filter)}</span></>}.
            Open one to see its students.
          </p>
          {colleges.map(c => (
            <GroupRow key={c.id} group={c} onOpen={() => openGroup('college', c.id)} />
          ))}
        </div>
      )}

      {view === 'students' && (
        <>
          {/* Podium — 2nd, 1st, 3rd so the winner sits centre and taller */}
          {podium.length === 3 && (
            <div className="hidden sm:grid grid-cols-3 gap-3 items-end">
              {[podium[1], podium[0], podium[2]].map((p, i) => {
                const place = [1, 0, 2][i]
                return (
                  <div
                    key={p.id}
                    className={cn(
                      'rounded-2xl border p-4 text-center',
                      place === 0
                        ? 'border-amber-400/40 bg-gradient-to-b from-amber-400/[0.12] to-transparent light:bg-none light:bg-amber-400/20 py-6'
                        : 'border-line bg-raised/25'
                    )}
                  >
                    <p className="text-base mb-1.5">{MEDALS[place]}</p>
                    <div className="flex justify-center mb-2">
                      <Avatar name={p.username} size={place === 0 ? 'lg' : 'md'} src={p.avatar} />
                    </div>
                    <p className="text-[13px] font-bold text-strong truncate">{p.username}</p>
                    <p className="text-[10px] text-faint truncate mt-0.5">{p.branch} · year {p.year}</p>
                    <p className={cn('text-sm font-bold tabular-nums mt-2', PODIUM_TONE[place])}>
                      {scoreOf(p).toLocaleString()}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          <div className="rounded-2xl border border-line bg-raised/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed md:min-w-[900px]">
                <thead>
                  <tr className="border-b border-line">
                    {COLUMNS.map(c => (
                      <th
                        key={c.label}
                        className={cn(
                          'text-[9px] font-medium uppercase tracking-[0.14em] text-faint px-3 sm:px-4 py-3',
                          c.w,
                          c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left',
                          // letter-spacing is added after the last glyph too, so a
                          // right-aligned tracked header optically sits short of
                          // the figures under it. Pull it back by one unit.
                          c.align === 'right' && '-mr-[0.14em]',
                          c.hide && 'hidden md:table-cell'
                        )}
                      >
                        <span className={cn('inline-block', c.indent && 'ml-[42px]')}>{c.label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ranked.slice(0, 25).map((p, i) => {
                    const you = p.id === YOUR_PLAYER_ID
                    const college = institutionById(p.collegeId)
                    return (
                      <tr key={p.id} className={cn('border-b border-line last:border-b-0', you && 'bg-accent/[0.08]')}>
                        <td className={cn(
                          'px-3 sm:px-4 py-3 text-sm tabular-nums',
                          you ? 'text-accent font-bold shadow-[inset_3px_0_0_var(--color-accent)]' : 'text-faint'
                        )}>
                          {i + 1}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {/* Subline lives inside the flex rather than being
                              padded to a guessed offset — it stays aligned to
                              the name whatever the avatar size. */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar name={p.username} size="sm" src={p.avatar} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={cn('text-[13px] font-semibold truncate', you ? 'text-accent' : 'text-strong')}>
                                  {p.username}
                                </span>
                                {you && (
                                  <span className="text-[8.5px] font-bold tracking-[0.1em] text-accent bg-accent/15 px-1.5 py-0.5 rounded shrink-0">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <p className="md:hidden text-[10px] text-faint truncate mt-0.5">
                                {college?.short ?? '—'} · {college?.district ?? '—'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-4 py-3 max-w-[190px]">
                          <p className="text-[12px] text-body truncate">{college?.name ?? '—'}</p>
                          <p className="text-[10px] text-faint truncate">{p.branch} · year {p.year}</p>
                        </td>
                        <td className="hidden md:table-cell px-4 py-3 text-[12px] text-faint whitespace-nowrap">
                          {college?.district ?? '—'}
                        </td>
                        <td className="hidden md:table-cell px-4 py-3 text-[12px] text-faint text-center tabular-nums">{p.contests}</td>
                        <td className="px-3 sm:px-4 py-3 text-[13px] font-bold text-strong text-right tabular-nums">
                          {scoreOf(p).toLocaleString()}
                        </td>
                        <td className="hidden md:table-cell px-4 py-3 text-right"><Delta value={p.rankDelta} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-faint text-center py-3 border-t border-line">
              {ranked.length > 25
                ? `Showing top 25 of ${ranked.length.toLocaleString()} in ${filterLabel(filter)}`
                : `${ranked.length.toLocaleString()} students in ${filterLabel(filter)}`}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
