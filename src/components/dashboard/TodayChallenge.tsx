import { Link } from 'react-router-dom'
import { Code2, BrainCircuit, ListTodo, CheckCircle2, Zap } from 'lucide-react'
import { dailyChallenges } from '../../data'
import { ROUTES } from '../../constants/routes'
import { useCountdown } from '../../hooks/useCountdown'
import { getTodayChallenge, endOfToday } from '../../lib/daily'
import { cn } from '../../lib/cn'

/**
 * Today's challenge, at the top of the dashboard's work column.
 *
 * Replaces DailyQuizBanner, whose countdown started from a hardcoded
 * '06:45:13' and reset to 24h — it was never tied to real midnight or to the
 * challenge data. This reads the actual entry for today and counts down to the
 * real reset.
 */
const TYPE_ICON = {
  Coding: Code2,
  Pattern: BrainCircuit,
  MCQ: ListTodo,
} as const

const DIFFICULTY = {
  Easy: 'text-green-400 bg-green-400/10 border-green-400/25',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/25',
} as const

export function TodayChallenge() {
  const challenge = getTodayChallenge(dailyChallenges)
  const { formatted } = useCountdown(endOfToday())

  // No entry scheduled for today. Saying so beats rendering an empty panel.
  if (!challenge) {
    return (
      <div className="rounded-2xl border border-line bg-page px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-sm font-semibold text-strong">No challenge today</p>
        <p className="text-xs text-subtle mt-1">
          The next one unlocks in <span className="tabular-nums text-body">{formatted}</span>.
        </p>
      </div>
    )
  }

  const Icon = TYPE_ICON[challenge.type]
  const done = challenge.isCompleted

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border px-5 py-4 sm:px-6 sm:py-5',
        done
          ? 'border-green-500/25 spotlight-success'
          : 'border-accent/25 spotlight-accent'
      )}
    >
      {/* Ambient wash — decorative only */}
      <div
        aria-hidden="true"
        className={cn(
          // Hidden in light: a blurred colour orb is a light source, and there
          // is nothing for it to light on a white card.
          'pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full blur-3xl light:hidden',
          done ? 'bg-green-500/15' : 'bg-accent/20'
        )}
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em]">
            {done ? (
              <span className="flex items-center gap-1.5 text-green-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved today
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-accent">
                <Icon className="w-3.5 h-3.5" /> Today&rsquo;s challenge
              </span>
            )}
          </div>

          <h2 className="mt-1.5 text-lg sm:text-xl font-bold text-strong tracking-tight leading-snug line-clamp-2">
            {challenge.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={cn('text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md border', DIFFICULTY[challenge.difficulty])}>
              {challenge.difficulty}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md border border-violet-400/25 bg-violet-400/10 text-violet-300">
              <Zap className="w-3 h-3" /> +{challenge.xpReward} XP
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md border border-line-strong bg-raised text-body">
              {challenge.type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2 shrink-0">
          <Link
            to={ROUTES.DAILY_CHALLENGE}
            className={cn(
              'text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              done
                ? 'bg-raised text-strong border border-line-strong hover:bg-line-strong'
                : 'bg-accent text-on-accent hover:bg-accent/90 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
            )}
          >
            {done ? 'Review' : 'Solve now'}
          </Link>
          <span className="text-[11px] text-subtle tabular-nums">
            resets in <span className="text-body">{formatted}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
