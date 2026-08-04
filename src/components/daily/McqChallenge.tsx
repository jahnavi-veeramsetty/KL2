import { useState } from 'react'
import { Check, X } from 'lucide-react'
import type { DailyChallenge } from '../../types'
import { cn } from '../../lib/cn'

/**
 * Answering an MCQ in place.
 *
 * `options` and `correctOptionIndex` have always been on DailyChallenge and
 * were rendered nowhere. An MCQ has no `problemId`, so the page fell through to
 * a disabled "not available in the editor yet" panel — the challenge existed in
 * the data and could not be attempted.
 *
 * A wrong answer is not locked out: this is practice, not an exam, and the day
 * only counts once the right option is picked.
 */
interface McqChallengeProps {
  challenge: DailyChallenge
  solved: boolean
  onSolve: () => void
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function McqChallenge({ challenge, solved, onSolve }: McqChallengeProps) {
  const [picked, setPicked] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  const options = challenge.options ?? []
  const answer = challenge.correctOptionIndex
  if (options.length === 0 || answer === undefined) return null

  const isRight = picked === answer
  const revealed = solved || (checked && isRight)

  const submit = () => {
    if (picked === null) return
    setChecked(true)
    if (picked === answer) onSolve()
  }

  return (
    <div className="space-y-2.5">
      {options.map((option, i) => {
        const isAnswer = i === answer
        const isPicked = picked === i
        // Only the picked option turns red — the others stay neutral so a wrong
        // guess does not reveal the answer by elimination.
        const wrong = checked && isPicked && !isRight

        return (
          <button
            key={option}
            type="button"
            onClick={() => { if (!revealed) { setPicked(i); setChecked(false) } }}
            disabled={revealed}
            aria-pressed={isPicked}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors',
              revealed && isAnswer && 'border-green-500/45 bg-green-500/[0.1]',
              wrong && 'border-red-500/45 bg-red-500/[0.08]',
              !revealed && !wrong && isPicked && 'border-accent/50 bg-accent/[0.08]',
              !revealed && !wrong && !isPicked && 'border-white/10 bg-white/[0.03] hover:border-white/25',
              revealed && !isAnswer && 'border-white/[0.07] bg-white/[0.02] opacity-60'
            )}
          >
            <span className={cn(
              'w-7 h-7 shrink-0 rounded-lg border flex items-center justify-center text-[11px] font-bold',
              revealed && isAnswer
                ? 'border-green-500/50 bg-green-500/20 text-green-300'
                : wrong
                  ? 'border-red-500/50 bg-red-500/20 text-red-300'
                  : isPicked
                    ? 'border-accent/50 bg-accent/15 text-accent'
                    : 'border-white/12 text-slate-500'
            )}>
              {revealed && isAnswer ? <Check className="w-3.5 h-3.5" /> : wrong ? <X className="w-3.5 h-3.5" /> : LETTERS[i]}
            </span>

            <span className={cn(
              'text-sm font-medium',
              revealed && isAnswer ? 'text-green-200' : wrong ? 'text-red-200' : 'text-slate-200'
            )}>
              {option}
            </span>
          </button>
        )
      })}

      {!revealed && (
        <div className="flex items-center gap-3 pt-1.5">
          <button
            type="button"
            onClick={submit}
            disabled={picked === null}
            className="px-6 py-2.5 rounded-xl bg-accent text-[#060b1a] text-xs font-bold uppercase tracking-wide transition-colors hover:bg-accent/90 disabled:opacity-35 disabled:cursor-not-allowed"
          >
            Check answer
          </button>
          {checked && !isRight && (
            <span className="text-xs font-semibold text-red-400">Not quite — try another.</span>
          )}
        </div>
      )}
    </div>
  )
}
