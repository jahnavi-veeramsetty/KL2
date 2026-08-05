import { Trophy } from 'lucide-react'
import { Avatar } from '../../ui'
import { currentUser } from '../../data'
import type { LeaderboardEntry } from '../../types'
import { cn } from '../../lib/cn'

/** Gold, silver, bronze — as text tones, so they survive the light theme. */
const PODIUM = ['text-amber-400', 'text-subtle', 'text-orange-400']

interface LeaderboardPanelProps {
  entries: LeaderboardEntry[]
  yourRank?: number
  yourScore?: number
}

export function LeaderboardPanel({ entries, yourRank, yourScore }: LeaderboardPanelProps) {
  return (
    <div className="bg-panel border border-line rounded-2xl p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-strong mb-4">
        <Trophy className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={2} aria-hidden />
        Leaderboard
      </h3>

      {yourRank && (
        <div className="mb-4 p-3 bg-accent/10 border border-accent/25 rounded-xl flex items-center gap-3">
          <Avatar name={currentUser.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-strong truncate">{currentUser.username}</p>
            <p className="text-xs text-subtle tabular-nums">Rating {currentUser.rating}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-accent tabular-nums">#{yourRank}</p>
            {yourScore && <p className="text-xs text-subtle tabular-nums">{yourScore} pts</p>}
          </div>
        </div>
      )}

      <ol className="space-y-0.5">
        {entries.slice(0, 5).map(entry => (
          <li key={entry.rank} className="flex items-center gap-3 py-2 border-b border-line last:border-0">
            {/* Rank as a number in a podium colour, not a medal emoji — the
                three medals rendered at a different size than the "#4" beside
                them, so the column never lined up. */}
            <span
              className={cn(
                'w-6 text-center text-xs font-bold tabular-nums shrink-0',
                PODIUM[entry.rank - 1] ?? 'text-faint'
              )}
            >
              {entry.rank}
            </span>
            <Avatar name={entry.username} size="xs" />
            <span className="flex-1 min-w-0 text-xs text-strong font-medium truncate">{entry.username}</span>
            <span className="text-xs text-subtle tabular-nums shrink-0">{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
