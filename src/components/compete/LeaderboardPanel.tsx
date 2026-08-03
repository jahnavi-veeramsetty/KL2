import { Avatar } from '../../ui'
import { currentUser } from '../../data'
import type { LeaderboardEntry } from '../../types'

interface LeaderboardPanelProps {
  entries: LeaderboardEntry[]
  yourRank?: number
  yourScore?: number
}

export function LeaderboardPanel({ entries, yourRank, yourScore }: LeaderboardPanelProps) {
  return (
    <div className="bg-secondary/40 border border-white/8 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-tertiary mb-4">🏆 Leaderboard</h3>

      {yourRank && (
        <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-3">
          <Avatar name={currentUser.name} size="sm" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-tertiary">{currentUser.username}</p>
            <p className="text-xs text-muted">Rating: {currentUser.rating}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-accent">#{yourRank}</p>
            {yourScore && <p className="text-xs text-muted">{yourScore} pts</p>}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {entries.slice(0, 5).map(entry => (
          <div key={entry.rank} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <span className={`w-6 text-center text-xs font-bold ${
              entry.rank === 1 ? 'text-amber-400' :
              entry.rank === 2 ? 'text-gray-300' :
              entry.rank === 3 ? 'text-amber-700' : 'text-muted'
            }`}>
              {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : `#${entry.rank}`}
            </span>
            <Avatar name={entry.username} size="xs" />
            <span className="flex-1 text-xs text-tertiary font-medium">{entry.username}</span>
            <span className="text-xs text-muted">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
