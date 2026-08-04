import { Flame, Zap, Target } from 'lucide-react'
import { dailyChallenges } from '../../data'
import { useProfile } from '../../hooks/useProfile'
import { useDailyProgress } from '../../hooks/useDailyProgress'
import { getDailyStats } from '../../lib/daily'
import { MonthTracker } from '../progress/MonthTracker'

/**
 * Streak and consistency score, above the shared MonthTracker.
 *
 * The tracker itself lives in components/progress so the daily challenge page
 * renders the same one — two calendars that merely resembled each other were
 * already drifting.
 */

/** The next streak worth chasing — stands in for a goal the user cannot set yet. */
const MILESTONES = [7, 14, 30, 50, 100, 180, 365]
function nextMilestone(streak: number): number {
  return MILESTONES.find(m => m > streak) ?? streak + 100
}

export function LearningConsistency() {
  const { profile } = useProfile()

  // Local answers count here too, so solving on the daily page moves this.
  const { completed } = useDailyProgress()
  const stats = getDailyStats(dailyChallenges, completed)

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

      <MonthTracker />
    </div>
  )
}
