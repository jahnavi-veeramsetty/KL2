import { useState } from 'react'
import { useMediaQuery, SM_QUERY } from '../../hooks/useMediaQuery'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Avatar } from '../../ui'
import { ROUTES } from '../../constants/routes'
import type { LeaderboardScope } from '../../types/leaderboard'
import { YOUR_PLAYER_ID } from '../../data/leaderboard'
import {
  SCOPES, districtStandings, filterLabel, institutionStandings,
  playersIn, rivalsAround, scopeTab, standingIn,
} from '../../lib/leaderboard'
import { cn } from '../../lib/cn'

/**
 * Sidebar standings.
 *
 * Global and State rank students. District and College rank the *places* — the
 * question those tabs raise is "how does my district compare", not "who are the
 * top five people in it". Students are one click further in, on the full board.
 *
 * Defaults to College because that one default is most of the value: #4,231 out
 * of everyone is a number nobody feels; #2 at your college is one people
 * screenshot.
 */
const RANK_TONE = ['text-amber-400', 'text-slate-300', 'text-orange-400']

export function ScopedStandings() {
  const [scope, setScope] = useState<LeaderboardScope>('college')

  // Five rows is right beside a contest list; stacked under one on a phone it
  // is a scroll. Three still shows the shape of the board.
  const isCompact = !useMediaQuery(SM_QUERY)
  const rows = isCompact ? 3 : 5

  const isGroupBoard = scope === 'district' || scope === 'college'
  const groups = isGroupBoard
    ? (scope === 'district' ? districtStandings() : institutionStandings()).slice(0, rows)
    : []
  const yourGroup = isGroupBoard
    ? (scope === 'district' ? districtStandings() : institutionStandings()).find(g => g.isYours)
    : undefined

  const students = isGroupBoard ? [] : playersIn({ kind: scope }).slice(0, rows)
  const standing = standingIn(scope)
  const leader = isGroupBoard ? undefined : rivalsAround({ kind: scope }, 'all', 1).find(r => r.gap > 0)

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-secondary/30 p-5">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 className="text-sm font-bold text-white tracking-tight">Standings</h2>
        <span className="text-[11px] text-slate-500 truncate max-w-[55%] text-right">
          {isGroupBoard ? 'by average score' : filterLabel({ kind: scope })}
        </span>
      </div>

      {/* Scope switch */}
      <div className="flex gap-0.5 p-0.5 rounded-xl bg-black/40 border border-white/[0.07] mb-3.5">
        {SCOPES.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            aria-pressed={scope === s}
            className={cn(
              'flex-1 py-1.5 rounded-lg text-[10.5px] font-bold transition-colors',
              scope === s ? 'bg-white/[0.12] text-white' : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {scopeTab(s)}
          </button>
        ))}
      </div>

      {/* Where you sit — your rank among students, or your place's rank */}
      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-accent/[0.09] border border-accent/25 mb-3">
        <span className="text-sm font-bold text-accent tabular-nums w-8 text-center shrink-0">
          #{isGroupBoard ? (yourGroup?.rank ?? '—') : standing.rank}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-white truncate">
            {isGroupBoard ? (yourGroup?.name ?? 'Yours') : 'You'}
          </p>
          <p className="text-[10px] text-slate-500 tabular-nums truncate">
            {isGroupBoard
              ? `avg ${yourGroup?.averageScore.toLocaleString() ?? 0} · ${yourGroup?.competing ?? 0} competing`
              : `top ${standing.topPercent}% of ${standing.total.toLocaleString()}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {isGroupBoard
          ? groups.map(g => (
              <div
                key={g.id}
                className="flex items-center gap-2.5 py-2 border-b border-white/[0.05] last:border-b-0"
              >
                <span className={cn('w-5 text-right text-[11px] font-bold tabular-nums', RANK_TONE[g.rank - 1] ?? 'text-slate-600')}>
                  {g.rank}
                </span>
                <span className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[9px] font-bold text-accent shrink-0">
                  {g.short}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-[12px] font-semibold truncate', g.isYours ? 'text-accent' : 'text-white')}>
                    {g.name}
                  </p>
                  <p className="text-[9.5px] text-slate-500 truncate">{g.competing} competing</p>
                </div>
                <span className="text-[11px] font-bold text-slate-300 tabular-nums shrink-0">
                  {g.averageScore.toLocaleString()}
                </span>
              </div>
            ))
          : students.map((player, i) => {
              const you = player.id === YOUR_PLAYER_ID
              return (
                <div key={player.id} className="flex items-center gap-2.5 py-2 border-b border-white/[0.05] last:border-b-0">
                  <span className={cn('w-5 text-right text-[11px] font-bold tabular-nums', RANK_TONE[i] ?? 'text-slate-600')}>
                    {i + 1}
                  </span>
                  <Avatar name={player.username} size="sm" src={player.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-[12px] font-semibold truncate', you ? 'text-accent' : 'text-white')}>
                      {player.username}
                    </p>
                    <p className="text-[9.5px] text-slate-500 truncate">
                      {player.branch} &middot; year {player.year}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 tabular-nums shrink-0">
                    {player.score.toLocaleString()}
                  </span>
                </div>
              )
            })}
      </div>

      {/* One actionable line — a ranking says where you are, this says what moves it */}
      {leader && (
        <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-white/[0.06]">
          <span className="tabular-nums text-white font-semibold">{leader.gap.toLocaleString()}</span>
          {' '}points behind{' '}
          <span className="text-white font-semibold">{leader.player.username}</span>.
        </p>
      )}

      <Link
        to={ROUTES.LEADERBOARD}
        className="flex items-center justify-center gap-1.5 mt-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[11px] font-bold uppercase tracking-wide text-slate-300 hover:bg-white/[0.09] hover:text-white transition-colors"
      >
        Full leaderboard <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}
