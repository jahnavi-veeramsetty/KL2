import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { dailyChallenges } from '../../data'
import { useDailyProgress } from '../../hooks/useDailyProgress'
import { buildDailyIndex, toISODate } from '../../lib/daily'
import { cn } from '../../lib/cn'

/**
 * The month-at-a-glance tracker, shared by the dashboard's LearningConsistency
 * panel and the daily challenge page.
 *
 * One component rather than two that resemble each other — the dashboard and
 * the daily page were drifting apart (7-column calendar in one, 10-column strip
 * in the other) and only one of them could be right.
 *
 * Ten columns rather than a weekday calendar on purpose: this is a consistency
 * strip, not a date picker, so it reads as one continuous run of days.
 *
 * Height is fixed twice over. Slots always run to 31 and weeks always to 5 with
 * the surplus rendered invisible, so a 28-day month is as tall as a 31-day one;
 * and both views sit in one 108px box, so the daily/weekly toggle does not jump
 * the card either.
 */
type DayState = 'achieved' | 'missed' | 'rest' | 'today' | 'future'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const MAX_DAYS = 31
const MAX_WEEKS = 5

/* day-missed and day-rest are theme-aware; see index.css. A scheduled day you
   let go carries the negative hue, a day with nothing on it is hatched and
   unfilled, so the two never come down to a half-step of grey. */
const CELL_STYLE: Record<DayState, string> = {
  achieved: 'bg-green-400/75 border-green-400/40',
  missed: 'day-missed',
  rest: 'day-rest border-line-strong bg-transparent',
  today: 'bg-accent/25 border-accent ring-1 ring-accent/50',
  future: 'border-line bg-raised',
}

const TEXT_STYLE: Record<DayState, string> = {
  achieved: 'text-emerald-950',
  missed: '',
  rest: 'text-faint',
  today: 'text-strong',
  future: 'text-faint/45',
}

export function MonthTracker({ className }: { className?: string }) {
  const { completed } = useDailyProgress()
  const [cursor, setCursor] = useState(() => new Date())
  const [view, setView] = useState<'daily' | 'weekly'>('daily')

  const index = buildDailyIndex(dailyChallenges, completed)

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

    return { day: i + 1, state }
  })

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

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4 className="text-xs font-bold text-strong tracking-tight">Monthly tracker</h4>
        <div className="flex gap-0.5 p-0.5 rounded-lg switch-track border border-line">
          {(['daily', 'weekly'] as const).map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                'px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition-colors',
                view === v ? 'switch-thumb' : 'text-faint hover:text-body'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-[11px] font-semibold text-body">
          {MONTHS[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            aria-label="Previous month"
            className="w-6 h-6 flex items-center justify-center rounded-md text-subtle hover:text-strong hover:bg-raised transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className="w-6 h-6 flex items-center justify-center rounded-md text-subtle enabled:hover:text-strong enabled:hover:bg-raised transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fixed box: four rows of days and five week bars are different natural
          heights, so the toggle would jump the card without it. */}
      <div className="h-[108px]">
      {view === 'daily' ? (
        <div className="grid grid-cols-10 grid-rows-4 gap-1 h-full">
          {Array.from({ length: MAX_DAYS }, (_, i) => {
            const cell = days[i]
            // Invisible filler past the end of the month, so every month is four
            // rows tall and the card never changes height.
            if (!cell) return <span key={`pad-${i}`} aria-hidden="true" />

            return (
              <span
                key={cell.day}
                title={`${MONTHS[month]} ${cell.day} — ${cell.state === 'rest' ? 'no challenge' : cell.state}`}
                className={cn(
                  'rounded-[5px] border flex items-center justify-center text-[9px] font-bold tabular-nums leading-none',
                  CELL_STYLE[cell.state],
                  TEXT_STYLE[cell.state]
                )}
              >
                {cell.day}
              </span>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          {Array.from({ length: MAX_WEEKS }, (_, i) => {
            const w = weeks[i]
            if (!w) return <span key={`padw-${i}`} className="h-4" aria-hidden="true" />

            return (
              <div key={w.week} className="flex items-center gap-2 h-4">
                <span className="text-[9px] font-bold uppercase tracking-wider text-faint w-8 shrink-0">
                  W{w.week}
                </span>
                <div className="flex-1 h-3 rounded-full bg-raised overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-green-400/70"
                    style={{ width: `${Math.round(w.ratio * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-faint tabular-nums w-8 text-right shrink-0">
                  {w.achieved}/{w.scheduled}
                </span>
              </div>
            )
          })}
        </div>
      )}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-4 pt-3.5 border-t border-line">
        <span className="flex items-center gap-1.5 min-w-0">
          <span className="w-3 h-3 rounded-[4px] bg-green-400/75 border border-green-400/40 shrink-0" />
          <span className="text-[10px] text-faint truncate">Achieved</span>
        </span>
        <span className="flex items-center gap-1.5 min-w-0">
          <span className="w-3 h-3 rounded-[4px] border day-missed shrink-0" />
          <span className="text-[10px] text-faint truncate">Missed</span>
        </span>
        <span className="flex items-center gap-1.5 min-w-0">
          <span className="w-3 h-3 rounded-[4px] border border-line-strong day-rest shrink-0" />
          <span className="text-[10px] text-faint truncate">No challenge</span>
        </span>
        <span className="flex items-center gap-1.5 min-w-0">
          <span className="w-3 h-3 rounded-[4px] bg-accent/25 border border-accent shrink-0" />
          <span className="text-[10px] text-faint truncate">Today</span>
        </span>
      </div>
    </div>
  )
}
