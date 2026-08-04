import { Link } from 'react-router-dom'
import { ChevronRight, Trophy } from 'lucide-react'
import type { Contest } from '../../types'
import { ROUTES } from '../../constants/routes'
import { formatDate } from '../../lib/format'
import { cn } from '../../lib/cn'

/**
 * A finished contest as a result, not a title.
 *
 * The old row showed the name and "Rank #N" and nothing else — no date, no
 * score, no way through to the standings, while `problems`, `yourScore` and
 * `leaderboard` all sat unused on the object.
 *
 * Rank colour is a podium convention rather than decoration: gold/silver/bronze
 * for the top three, accent for anything else placed, muted when you did not
 * take part.
 */
function rankTone(rank: number): string {
  if (rank === 1) return 'text-amber-400'
  if (rank === 2) return 'text-slate-300'
  if (rank === 3) return 'text-orange-400'
  return 'text-accent'
}

export function PastContestRow({ contest }: { contest: Contest }) {
  const competed = contest.yourRank !== undefined
  const solved = contest.problems?.filter(p => p.solved > 0).length
  const total = contest.problems?.length

  return (
    <Link
      to={ROUTES.CONTEST_DETAIL(contest.id)}
      className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/25 border border-white/[0.06] hover:border-accent/30 hover:bg-secondary/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {/* Placement */}
      <div className="w-14 shrink-0 text-center">
        {competed ? (
          <>
            <p className={cn('text-lg font-bold tracking-tight leading-none tabular-nums', rankTone(contest.yourRank!))}>
              #{contest.yourRank}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600 mt-1">Rank</p>
          </>
        ) : (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Not entered
          </p>
        )}
      </div>

      <div className="w-px self-stretch bg-white/[0.06]" />

      {/* Contest */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate group-hover:text-accent transition-colors">
          {contest.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1 text-[11px] text-slate-500">
          <span>{formatDate(contest.startTime)}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>{contest.difficulty}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="tabular-nums">{contest.participants.toLocaleString()} entered</span>
          {total !== undefined && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="tabular-nums">{solved}/{total} solved</span>
            </>
          )}
        </div>
      </div>

      {/* Score + prize */}
      <div className="shrink-0 text-right hidden sm:block">
        {contest.yourScore !== undefined && (
          <p className="text-sm font-bold text-white tabular-nums leading-none">
            {contest.yourScore}
            <span className="text-[10px] font-medium text-slate-500 ml-1">pts</span>
          </p>
        )}
        {contest.prize && (
          <p className="flex items-center justify-end gap-1 text-[11px] text-amber-400/80 font-semibold mt-1.5">
            <Trophy className="w-3 h-3" /> {contest.prize}
          </p>
        )}
      </div>

      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-accent transition-colors shrink-0" />
    </Link>
  )
}
