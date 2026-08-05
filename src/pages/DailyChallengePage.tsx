import { Flame, Code2, BrainCircuit, ListTodo, Trophy, CheckCircle2, Clock } from 'lucide-react'
import { ChallengeBody } from '../components/daily/ChallengeBody'
import { MonthTracker } from '../components/progress/MonthTracker'
import { ChallengeHistory } from '../components/daily/ChallengeHistory'
import { DailyStats } from '../components/daily/DailyStats'
import { dailyChallenges } from '../data'
import { useCountdown } from '../hooks/useCountdown'
import { useDailyProgress } from '../hooks/useDailyProgress'
import { useProfile } from '../hooks/useProfile'
import { endOfToday, getTodayChallenge } from '../lib/daily'
import { cn } from '../lib/cn'

/**
 * Challenge and archive on the left, calendar and scores in a sticky rail.
 *
 * The archive lives in the left column rather than full width beneath, because
 * a ~300px challenge card beside a ~400px rail leaves dead space and there is
 * no way to style that away. Stretching the card only moved the hole inside it.
 * Giving the column more to hold is the only cure; the rail then ends early,
 * which is what rails are expected to do.
 *
 * The rail renders the same MonthTracker the dashboard uses, so the two pages
 * cannot disagree about what a month looks like.
 */
const TYPE_ICON = { Coding: Code2, Pattern: BrainCircuit, MCQ: ListTodo } as const

const DIFFICULTY_TONE = {
  Easy: 'text-green-400 bg-green-400/10 border-green-400/25',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/25',
} as const

export default function DailyChallengePage() {
  // getTodayChallenge builds the date from local parts. The page previously
  // used toISOString(), which is UTC — in IST that returns yesterday's date
  // until 05:30, so early risers were shown the wrong challenge.
  const challenge = getTodayChallenge(dailyChallenges) ?? dailyChallenges[dailyChallenges.length - 1]

  const { profile } = useProfile()
  const { isSolved, markComplete } = useDailyProgress()
  const { formatted } = useCountdown(endOfToday())
  const solved = isSolved(challenge)

  const Icon = TYPE_ICON[challenge.type]
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).format(new Date())

  return (
    <div className="space-y-6">
      {/* Meta bar — the two facts that frame the day, on one line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <span className="text-subtle font-medium">{todayLabel}</span>
        <span className="flex items-center gap-1.5 text-faint tabular-nums">
          <Clock className="w-3.5 h-3.5" />
          resets in {formatted}
        </span>
        <span className="flex items-center gap-1.5 font-bold text-orange-400 tabular-nums ml-auto">
          <Flame className="w-4 h-4 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)] light:drop-shadow-none" />
          {profile.stats.currentStreak} day streak
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <div className="min-w-0 space-y-6">
        {/* The challenge */}
        <section
          className={cn(
            'min-w-0 rounded-2xl border p-5 sm:p-7',
            solved
              ? 'border-green-500/25 spotlight-success'
              : 'border-line-strong spotlight-accent'
          )}
        >
          <span className={cn(
            'text-[10px] font-bold uppercase tracking-[0.14em]',
            solved ? 'text-green-400' : 'text-accent'
          )}>
            {solved ? 'Solved today' : "Today's challenge"}
          </span>

          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-strong leading-tight tracking-tight mt-3 mb-4">
            {challenge.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-raised border border-line-strong text-body">
              <Icon className="w-3.5 h-3.5" />
              {challenge.type}
            </span>
            <span className={cn('px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border', DIFFICULTY_TONE[challenge.difficulty])}>
              {challenge.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase tracking-wider bg-amber-400/10 px-2.5 py-1.5 rounded-lg border border-amber-400/20">
              <Trophy className="w-3.5 h-3.5" />
              +{challenge.xpReward} XP
            </span>
          </div>

          {solved && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-[13px] font-semibold mb-5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Back tomorrow to keep the streak going.
            </div>
          )}

          <ChallengeBody
            challenge={challenge}
            solved={solved}
            onSolve={() => markComplete(challenge.id)}
          />
        </section>

          <ChallengeHistory />
        </div>

        {/* Calendar + scores */}
        <aside className="w-full min-w-0 space-y-4 xl:sticky xl:top-24">
          <div className="rounded-2xl border border-line bg-raised/30 p-3.5">
            <MonthTracker />
          </div>
          <DailyStats />
        </aside>
      </div>
    </div>
  )
}
