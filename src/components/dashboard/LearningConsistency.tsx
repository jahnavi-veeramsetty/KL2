import { useState } from 'react'
import { ChevronLeft, ChevronRight, Flame, Zap, Target } from 'lucide-react'
import { dailyChallenges } from '../../data'
import { useProfile } from '../../hooks/useProfile'
import { buildDailyIndex, getDailyStats, toISODate } from '../../lib/daily'
import { cn } from '../../lib/cn'

/**
 * Streak, consistency score and a month-at-a-glance tracker.
 *
 * The grid is 10 columns rather than a 7-column calendar on purpose — it is a
 * consistency strip, not a date picker, so it reads as one continuous run of
 * days instead of being broken into weeks.
 *
 * Only three day states are derivable today: achieved, missed, and rest (no
 * challenge was scheduled). "Paused" and "Streak freeze" would need fields that
 * do not exist on DailyChallenge yet, so they are deliberately absent rather
 * than shown in a legend that can never light up.
 */
type DayState = 'achieved' | 'missed' | 'rest' | 'today' | 'future'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** The next streak worth chasing — stands in for a goal the user cannot set yet. */
const MILESTONES = [7, 14, 30, 50, 100, 180, 365]
function nextMilestone(streak: number): number {
  return MILESTONES.find(m => m > streak) ?? streak + 100
}

const CELL_STYLE: Record<DayState, string> = {
  achieved: 'bg-green-400/75 border-green-400/40',
  missed: 'bg-white/[0.05] border-white/10',
  rest: 'border-white/10 bg-transparent',
  today: 'bg-accent/25 border-accent ring-1 ring-accent/50',
  future: 'border-white/[0.06] bg-white/[0.015]',
}

function Legend({ swatch, label }: { swatch: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      {swatch}
      <span className="text-[10px] text-slate-500 truncate">{label}</span>
    </div>
  )
}

export function LearningConsistency() {
  const { profile } = useProfile()
  const [cursor, setCursor] = useState(() => new Date())
  const [view, setView] = useState<'daily' | 'weekly'>('daily')

  const index = buildDailyIndex(dailyChallenges)
  const stats = getDailyStats(dailyChallenges)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = toISODate(today)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1)
    const iso = toISODate(date)
    const solved = index.get(iso)

    let state: DayState
    if (iso === todayISO) state = 'today'
    else if (date > today) state = 'future'
    else if (solved === true) state = 'achieved'
    else if (solved === false) state = 'missed'
    else state = 'rest'

    return { day: i + 1, iso, state }
  })

  // Weekly view: one cell per 7-day block, filled by how much of it was achieved.
  const weeks = Array.from({ length: Math.ceil(daysInMonth / 7) }, (_, w) => {
    const slice = days.slice(w * 7, w * 7 + 7)
    const scheduled = slice.filter(d => d.state === 'achieved' || d.state === 'missed')
    const achieved = slice.filter(d => d.state === 'achieved')
    return {
      week: w + 1,
      achieved: achieved.length,
      scheduled: scheduled.length,
      ratio: scheduled.length === 0 ? 0 : achieved.length / scheduled.length,
    }
  })

  const goal = nextMilestone(profile.stats.currentStreak)

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-primary/80 p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="text-sm font-bold text-white tracking-tight">Learning consistency</h3>
        <span
          className="flex items-center gap-1 shrink-0 text-[10px] font-bold text-orange-300 bg-orange-500/12 border border-orange-500/25 rounded-full px-2 py-1 tabular-nums"
          title={`Next streak milestone: ${goal} days`}
        >
          <Target className="w-3 h-3" /> Goal {goal}
        </span>
      </div>
      <p className="text-[11px] text-slate-500 mb-4">Track your progress day by day.</p>

      {/* Streak + score */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="pr-3 border-r border-white/[0.07]">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-1.5">
            Current streak
          </p>
          <p className="flex items-center gap-1.5 text-2xl font-bold text-white tracking-tight leading-none tabular-nums">
            <Flame className="w-5 h-5 text-orange-400 shrink-0" />
            {profile.stats.currentStreak}
          </p>
          <span className="inline-block mt-2 text-[10px] font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-md px-2 py-0.5 tabular-nums">
            Best {profile.stats.longestStreak}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-1.5">
            Consistency
          </p>
          <p className="flex items-center gap-1.5 text-2xl font-bold text-white tracking-tight leading-none tabular-nums">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            {stats.completionRate}
            <span className="text-sm text-slate-500 font-semibold">%</span>
          </p>
          <span className="inline-block mt-2 text-[10px] font-semibold text-slate-400 tabular-nums">
            {stats.solved} of {stats.total} solved
          </span>
        </div>
      </div>

      {/* Tracker header + view toggle */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4 className="text-xs font-bold text-white tracking-tight">Monthly tracker</h4>
        <div className="flex gap-0.5 p-0.5 rounded-lg bg-black/40 border border-white/[0.07]">
          {(['daily', 'weekly'] as const).map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                'px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition-colors',
                view === v ? 'bg-white/[0.12] text-white' : 'text-slate-500 hover:text-slate-300'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-[11px] font-semibold text-slate-300">
          {MONTHS[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            aria-label="Previous month"
            className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-white/[0.07] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 enabled:hover:text-white enabled:hover:bg-white/[0.07] transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      {view === 'daily' ? (
        <div className="grid grid-cols-10 gap-1">
          {days.map(({ day, state }) => (
            <span
              key={day}
              title={`${MONTHS[month]} ${day} — ${state === 'rest' ? 'no challenge' : state}`}
              className={cn('aspect-square rounded-[5px] border', CELL_STYLE[state])}
              // Rest days get a hatch so "nothing scheduled" never reads as a failure
              style={
                state === 'rest'
                  ? { backgroundImage: 'linear-gradient(135deg, transparent 44%, rgba(255,255,255,0.16) 44%, rgba(255,255,255,0.16) 56%, transparent 56%)' }
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {weeks.map(w => (
            <div key={w.week} className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 w-8 shrink-0">
                W{w.week}
              </span>
              <div className="flex-1 h-3 rounded-full bg-white/[0.05] overflow-hidden">
                <span
                  className="block h-full rounded-full bg-green-400/70"
                  style={{ width: `${Math.round(w.ratio * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 tabular-nums w-8 text-right shrink-0">
                {w.achieved}/{w.scheduled}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-4 pt-3.5 border-t border-white/[0.07]">
        <Legend swatch={<span className="w-3 h-3 rounded-[4px] bg-green-400/75 border border-green-400/40 shrink-0" />} label="Achieved" />
        <Legend swatch={<span className="w-3 h-3 rounded-[4px] bg-white/[0.05] border border-white/10 shrink-0" />} label="Missed" />
        <Legend
          swatch={
            <span
              className="w-3 h-3 rounded-[4px] border border-white/10 shrink-0"
              style={{ backgroundImage: 'linear-gradient(135deg, transparent 44%, rgba(255,255,255,0.16) 44%, rgba(255,255,255,0.16) 56%, transparent 56%)' }}
            />
          }
          label="No challenge"
        />
        <Legend swatch={<span className="w-3 h-3 rounded-[4px] bg-accent/25 border border-accent shrink-0" />} label="Today" />
      </div>
    </div>
  )
}
