import { Link } from 'react-router-dom'
import { LearningConsistency } from './LearningConsistency'
import { useProfile } from '../../hooks/useProfile'
import { dailyChallenges } from '../../data'
import { getDailyStats, toISODate } from '../../lib/daily'
import { ROUTES } from '../../constants/routes'
import { formatNumber } from '../../lib/format'
import { cn } from '../../lib/cn'

/**
 * The dashboard's right-hand column, ordered by urgency: what you should act
 * on today first, reference figures last.
 *
 *   1. LearningConsistency — streak, score, month tracker. Tied to today.
 *   2. WeekActivity        — the last seven days at a glance.
 *   3. Numbers             — lifetime totals. Reference, not a prompt.
 *
 * Everything here is for glancing at, not reading — the motivating sentence
 * lives above the work column where the eye lands first, not in here.
 */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-page/80 p-4', className)}>
      {children}
    </div>
  )
}

function PanelHead({ title, action, to }: { title: string; action?: string; to?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <h3 className="text-sm font-bold text-strong tracking-tight">{title}</h3>
      {action && to && (
        <Link to={to} className="text-[11px] font-semibold text-accent hover:text-accent/80 transition-colors">
          {action}
        </Link>
      )}
    </div>
  )
}

/**
 * Seven-day activity, from the contribution heatmap.
 *
 * This counts *all* learning activity — lessons, problems, submissions — which
 * is a different measure from the challenge completion shown in
 * LearningConsistency below. Labelled "Activity" rather than a bare "This week"
 * so the two panels cannot be read as the same number disagreeing with itself.
 */
function WeekActivity() {
  const { profile } = useProfile()
  const week = profile.contributions.slice(-7)
  const peak = Math.max(1, ...week.map(d => d.count))
  const activeDays = week.filter(d => d.count > 0).length
  const todayISO = toISODate(new Date())

  return (
    <Panel>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h3 className="text-sm font-bold text-strong tracking-tight">Activity this week</h3>
        <span className="text-[11px] font-semibold text-subtle tabular-nums">{activeDays} of 7</span>
      </div>
      <div className="flex items-end gap-1.5 h-11" role="img" aria-label={`Active on ${activeDays} of the last 7 days`}>
        {week.map(day => (
          <span
            key={day.date}
            title={`${day.date}: ${day.count} ${day.count === 1 ? 'activity' : 'activities'}`}
            className={cn(
              'flex-1 rounded-t-sm transition-colors',
              day.date === todayISO ? 'bg-accent' : day.count > 0 ? 'bg-accent/30' : 'bg-raised'
            )}
            // Floor so a day with any activity is always visibly taller than an empty one.
            style={{ height: `${day.count === 0 ? 8 : Math.max(20, (day.count / peak) * 100)}%` }}
          />
        ))}
      </div>
    </Panel>
  )
}

function Numbers() {
  const { profile } = useProfile()
  const { globalRank, totalXP, totalActiveDays } = profile.stats
  const { easy, medium, hard } = profile.solveStats
  const solved = easy.solved + medium.solved + hard.solved
  const daily = getDailyStats(dailyChallenges)

  const cells = [
    { label: 'Solved', value: solved.toString(), tone: 'text-accent' },
    { label: 'XP', value: formatNumber(totalXP), tone: 'text-violet-300' },
    { label: 'Rank', value: `#${globalRank.toLocaleString()}`, tone: 'text-green-400' },
    { label: 'Active days', value: totalActiveDays.toString(), tone: 'text-amber-400' },
  ]

  return (
    <Panel>
      <PanelHead title="Your numbers" action="Profile" to={ROUTES.PROFILE} />
      <div className="grid grid-cols-2 gap-2">
        {cells.map(cell => (
          <div key={cell.label} className="rounded-xl border border-line bg-raised px-3 py-2.5">
            <p className={cn('text-base font-bold tracking-tight tabular-nums leading-none', cell.tone)}>
              {cell.value}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-faint mt-1.5">
              {cell.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-line flex items-baseline justify-between gap-3">
        <span className="text-[11px] text-faint">Daily challenges</span>
        <span className="text-[11px] font-semibold text-body tabular-nums">
          {daily.solved}/{daily.total} &middot; {daily.completionRate}%
        </span>
      </div>
    </Panel>
  )
}

export function ProductivityRail() {
  return (
    <div className="flex flex-col gap-4">
      <LearningConsistency />
      <WeekActivity />
      <Numbers />
    </div>
  )
}
