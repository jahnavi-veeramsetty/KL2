import { useMemo, useState } from 'react'
import { Code2, BrainCircuit, ListTodo, Check, ChevronDown } from 'lucide-react'
import type { DailyChallenge, DailyChallengeType } from '../../types'
import { dailyChallenges } from '../../data'
import { useDailyProgress } from '../../hooks/useDailyProgress'
import { toISODate } from '../../lib/daily'
import { ChallengeBody } from './ChallengeBody'
import { cn } from '../../lib/cn'

/**
 * Everything before today, and every row opens.
 *
 * Rows used to link out only when the challenge had a `problemId`, so MCQ and
 * Pattern entries had no chevron and went nowhere — three of eight rows looked
 * broken next to the rest. Expanding in place gives every row the same
 * affordance and makes a missed MCQ answerable months later, which is the
 * reason to keep an archive.
 */
const TYPE_ICON: Record<DailyChallengeType, typeof Code2> = {
  Coding: Code2,
  Pattern: BrainCircuit,
  MCQ: ListTodo,
}

const DIFFICULTY_TONE = {
  Easy: 'text-green-400 border-green-400/25 bg-green-400/10',
  Medium: 'text-amber-400 border-amber-400/25 bg-amber-400/10',
  Hard: 'text-red-400 border-red-400/25 bg-red-400/10',
} as const

const FILTERS: (DailyChallengeType | 'All')[] = ['All', 'Coding', 'Pattern', 'MCQ']

/** Parsed from parts — new Date('2026-08-01') is UTC and can land a day early. */
function formatDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function HistoryRow({
  challenge, solved, open, onToggle, onSolve,
}: {
  challenge: DailyChallenge
  solved: boolean
  open: boolean
  onToggle: () => void
  onSolve: () => void
}) {
  const Icon = TYPE_ICON[challenge.type]

  return (
    <div className={cn(
      'rounded-xl border transition-colors',
      open ? 'border-accent/30 bg-secondary/35' : 'border-white/[0.06] bg-secondary/20 hover:border-white/15'
    )}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-xl"
      >
        <span className="w-11 shrink-0 text-[11px] font-bold text-slate-400 tabular-nums">
          {formatDay(challenge.date)}
        </span>

        <span className={cn(
          'w-8 h-8 shrink-0 rounded-lg border flex items-center justify-center',
          solved ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-white/10 bg-white/[0.03] text-slate-500'
        )}>
          <Icon className="w-4 h-4" />
        </span>

        <span className="flex-1 min-w-0">
          <span className="block text-[13px] font-semibold text-white truncate">{challenge.title}</span>
          <span className="flex items-center gap-2 mt-1">
            <span className={cn('text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border', DIFFICULTY_TONE[challenge.difficulty])}>
              {challenge.difficulty}
            </span>
            <span className="text-[10px] text-slate-500 truncate">
              {challenge.type} &middot; +{challenge.xpReward} XP
            </span>
          </span>
        </span>

        {solved ? (
          <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-green-400">
            <Check className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Solved</span>
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-slate-600 hidden sm:inline">
            Missed
          </span>
        )}

        <ChevronDown className={cn(
          'w-4 h-4 shrink-0 text-slate-500 transition-transform',
          open && 'rotate-180 text-accent'
        )} />
      </button>

      {open && (
        <div className="px-3 pb-4 pt-1 border-t border-white/[0.06] mt-1">
          <div className="pt-3">
            <ChallengeBody challenge={challenge} solved={solved} onSolve={onSolve} size="sm" />
          </div>
        </div>
      )}
    </div>
  )
}

export function ChallengeHistory() {
  const [type, setType] = useState<DailyChallengeType | 'All'>('All')
  const [openId, setOpenId] = useState<string | null>(null)
  const { isSolved, markComplete } = useDailyProgress()
  const today = toISODate(new Date())

  const past = useMemo(
    () =>
      dailyChallenges
        .filter(c => c.date < today)
        .filter(c => type === 'All' || c.type === type)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [type, today]
  )

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white tracking-tight mb-2.5">Past challenges</h2>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setType(f)}
              aria-pressed={type === f}
              className={cn(
                'px-3 py-1 rounded-full text-[11px] font-semibold border transition-colors',
                type === f
                  ? 'bg-accent/15 text-accent border-accent/40'
                  : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white hover:border-white/25'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {past.length === 0 ? (
        <p className="text-xs text-slate-500 py-6 text-center rounded-xl border border-white/[0.06] bg-secondary/15">
          Nothing here yet.
        </p>
      ) : (
        <div className="space-y-2">
          {past.map(c => (
            <HistoryRow
              key={c.id}
              challenge={c}
              solved={isSolved(c)}
              open={openId === c.id}
              onToggle={() => setOpenId(openId === c.id ? null : c.id)}
              onSolve={() => markComplete(c.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
