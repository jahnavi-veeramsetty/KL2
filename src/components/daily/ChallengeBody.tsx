import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { DailyChallenge } from '../../types'
import { problems } from '../../data'
import { McqChallenge } from './McqChallenge'
import { unescapeNewlines } from '../../lib/daily'
import { ROUTES } from '../../constants/routes'

/**
 * The prompt and its action, for any challenge type.
 *
 * Shared by today's card and the expanded history rows so a challenge behaves
 * the same wherever you meet it — an MCQ you missed last Tuesday is still
 * answerable, which is the point of keeping an archive at all.
 */
interface ChallengeBodyProps {
  challenge: DailyChallenge
  solved: boolean
  onSolve: () => void
  /** Today's card can afford more room than a row that just expanded. */
  size?: 'sm' | 'md'
}

export function ChallengeBody({ challenge, solved, onSolve, size = 'md' }: ChallengeBodyProps) {
  const sm = size === 'sm'

  const linkedProblem = challenge.problemId
    ? problems.find(p => p.id === challenge.problemId || p.slug === challenge.problemId)
    : undefined

  const action = (() => {
    if (challenge.type === 'MCQ') {
      return <McqChallenge challenge={challenge} solved={solved} onSolve={onSolve} />
    }

    if (linkedProblem) {
      return (
        <Link
          to={ROUTES.PROBLEM(linkedProblem.slug)}
          className="group/btn inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-[#060b1a] font-bold text-sm hover:bg-accent/90 transition-colors"
        >
          {solved ? 'Open in editor' : 'Solve challenge'}
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      )
    }

    if (solved) return null

    // Pattern challenges have no problem in the set yet. Rather than a dead
    // "not available" panel, let people mark their own work — the streak is the
    // point, and it is their honesty either way.
    return (
      <button
        type="button"
        onClick={onSolve}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white font-bold text-sm hover:bg-white/[0.12] transition-colors"
      >
        <CheckCircle2 className="w-4 h-4" />
        Mark as solved
      </button>
    )
  })()

  return (
    <div className="space-y-4">
      {/* Pattern prompts are ASCII art and keep their whitespace; the rest read
          as prose. */}
      {challenge.type === 'Pattern' ? (
        <pre className={`${sm ? 'text-[11px] p-3' : 'text-[12px] p-4'} leading-relaxed text-slate-300 bg-black/30 border border-white/[0.07] rounded-xl overflow-x-auto whitespace-pre font-mono`}>
          {unescapeNewlines(challenge.description)}
        </pre>
      ) : (
        <p className={`${sm ? 'text-[13px]' : 'text-sm'} text-slate-300 leading-relaxed max-w-2xl`}>
          {challenge.description}
        </p>
      )}

      {action}
    </div>
  )
}
