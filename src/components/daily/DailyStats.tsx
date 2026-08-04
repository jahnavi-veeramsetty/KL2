import { Flame, Target, CheckCircle2, Zap } from 'lucide-react'
import { dailyChallenges } from '../../data'
import { useProfile } from '../../hooks/useProfile'
import { useDailyProgress } from '../../hooks/useDailyProgress'
import { getDailyStats } from '../../lib/daily'
import { cn } from '../../lib/cn'

/**
 * One card of label/value rows rather than four tiles.
 *
 * As a 2x2 of boxes this ran ~170px for four numbers nobody reads twice — most
 * of that was padding and borders. Rows put the same figures in about 140px and
 * let the eye run down a single column of values.
 */
export function DailyStats() {
  const { profile } = useProfile()
  const { completed } = useDailyProgress()
  const stats = getDailyStats(dailyChallenges, completed)

  const rows = [
    { icon: Flame, label: 'Streak', value: `${profile.stats.currentStreak}`, sub: `best ${profile.stats.longestStreak}`, tone: 'text-orange-400' },
    { icon: Target, label: 'Consistency', value: `${stats.completionRate}%`, sub: `${stats.missed} missed`, tone: 'text-amber-400' },
    { icon: CheckCircle2, label: 'Solved', value: `${stats.solved}`, sub: `of ${stats.total}`, tone: 'text-green-400' },
    { icon: Zap, label: 'XP earned', value: stats.xpEarned.toLocaleString(), sub: 'dailies', tone: 'text-violet-300' },
  ]

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-secondary/30 p-3.5">
      <h2 className="text-sm font-bold text-white tracking-tight mb-2.5">Your progress</h2>

      <div className="flex flex-col">
        {rows.map(({ icon: Icon, label, value, sub, tone }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 py-2 border-b border-white/[0.05] last:border-b-0"
          >
            <Icon className={cn('w-3.5 h-3.5 shrink-0', tone)} />
            <span className="text-[11.5px] text-slate-400 font-medium">{label}</span>
            <span className="ml-auto text-[10px] text-slate-600 tabular-nums">{sub}</span>
            <span className="text-[13px] font-bold text-white tabular-nums w-14 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
