import { useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import type { Problem } from '../../types'
import { Badge, Accordion } from '../../ui'
import type { AccordionItem } from '../../ui'
import { cn } from '../../lib/cn'

interface ProblemDescriptionPanelProps {
  problem: Problem
}

export function ProblemDescriptionPanel({ problem }: ProblemDescriptionPanelProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const difficultyColor = { Easy: 'easy', Medium: 'medium', Hard: 'hard' } as const

  const hintItems: AccordionItem[] = problem.hints.map((hint, i) => ({
    id: `hint-${i}`,
    title: `Hint ${i + 1}`,
    content: <p className="text-sm text-subtle">{hint}</p>
  }))

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
      {/* Title + Difficulty */}
      <div className="space-y-2">
        <h1 className="text-lg font-bold text-strong">{problem.number}. {problem.title}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge color={difficultyColor[problem.difficulty]}>{problem.difficulty}</Badge>
          {/* lucide, and the icon fills when it is your vote — the emoji gave no
              pressed state at all, so you could not tell what you had clicked. */}
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              aria-pressed={liked}
              aria-label="Helpful"
              onClick={() => { setLiked(v => !v); if (disliked) setDisliked(false) }}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-lg tabular-nums transition-colors',
                liked ? 'text-accent bg-accent/10' : 'text-subtle hover:text-strong hover:bg-raised'
              )}
            >
              <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.8} fill={liked ? 'currentColor' : 'none'} aria-hidden />
              {problem.likes + (liked ? 1 : 0)}
            </button>
            <button
              type="button"
              aria-pressed={disliked}
              aria-label="Not helpful"
              onClick={() => { setDisliked(v => !v); if (liked) setLiked(false) }}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-lg tabular-nums transition-colors',
                disliked ? 'text-danger bg-danger/10' : 'text-subtle hover:text-strong hover:bg-raised'
              )}
            >
              <ThumbsDown className="w-3.5 h-3.5" strokeWidth={1.8} fill={disliked ? 'currentColor' : 'none'} aria-hidden />
              {problem.dislikes + (disliked ? 1 : 0)}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-subtle leading-relaxed whitespace-pre-line">{problem.description}</div>

      {/* Examples */}
      <div className="space-y-4">
        {problem.examples.map((ex, i) => (
          <div key={i} className="bg-editor-panel/60 border border-line rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-subtle uppercase tracking-wider">Example {i + 1}</p>
            <div className="space-y-1 text-xs font-mono">
              <div><span className="text-subtle">Input:</span> <span className="text-strong">{ex.input}</span></div>
              <div><span className="text-subtle">Output:</span> <span className="text-strong">{ex.output}</span></div>
              {ex.explanation && (
                <div className="pt-1 text-subtle/80 font-sans">{ex.explanation}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div>
        <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-2">Constraints</p>
        <ul className="space-y-1">
          {problem.constraints.map((c, i) => (
            <li key={i} className="text-xs text-subtle font-mono bg-editor-panel/40 px-2 py-1 rounded">
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Topics */}
      <div>
        <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-2">Topics</p>
        <div className="flex flex-wrap gap-1.5">
          {problem.topics.map(t => <Badge key={t} color="neutral" size="sm">{t}</Badge>)}
        </div>
      </div>

      {/* Companies */}
      <div>
        <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-2">Asked by</p>
        <div className="flex flex-wrap gap-1.5">
          {problem.companies.map(c => <Badge key={c} color="accent" size="sm">{c}</Badge>)}
        </div>
      </div>

      {/* Acceptance */}
      <div className="flex items-center gap-4 text-xs text-subtle">
        <span>Acceptance: <strong className="text-strong">{problem.acceptanceRate.toFixed(1)}%</strong></span>
      </div>

      {/* Hints */}
      {problem.hints.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-2">Hints</p>
          <Accordion items={hintItems} />
        </div>
      )}
    </div>
  )
}
