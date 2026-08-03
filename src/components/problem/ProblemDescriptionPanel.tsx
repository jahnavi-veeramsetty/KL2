import { useState } from 'react'
import type { Problem } from '../../types'
import { Badge, Accordion } from '../../ui'
import type { AccordionItem } from '../../ui'

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
    content: <p className="text-sm text-muted">{hint}</p>
  }))

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
      {/* Title + Difficulty */}
      <div className="space-y-2">
        <h1 className="text-lg font-bold text-tertiary">{problem.number}. {problem.title}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge color={difficultyColor[problem.difficulty]}>{problem.difficulty}</Badge>
          <div className="flex items-center gap-2 text-xs text-muted">
            <button
              onClick={() => { setLiked(v => !v); if (disliked) setDisliked(false) }}
              className={`flex items-center gap-1 hover:text-tertiary transition-colors ${liked ? 'text-accent' : ''}`}
            >
              👍 {problem.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => { setDisliked(v => !v); if (liked) setLiked(false) }}
              className={`flex items-center gap-1 hover:text-tertiary transition-colors ${disliked ? 'text-danger' : ''}`}
            >
              👎 {problem.dislikes + (disliked ? 1 : 0)}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-muted leading-relaxed whitespace-pre-line">{problem.description}</div>

      {/* Examples */}
      <div className="space-y-4">
        {problem.examples.map((ex, i) => (
          <div key={i} className="bg-editor-panel/60 border border-white/5 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Example {i + 1}</p>
            <div className="space-y-1 text-xs font-mono">
              <div><span className="text-muted">Input:</span> <span className="text-tertiary">{ex.input}</span></div>
              <div><span className="text-muted">Output:</span> <span className="text-tertiary">{ex.output}</span></div>
              {ex.explanation && (
                <div className="pt-1 text-muted/80 font-sans">{ex.explanation}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Constraints</p>
        <ul className="space-y-1">
          {problem.constraints.map((c, i) => (
            <li key={i} className="text-xs text-muted font-mono bg-editor-panel/40 px-2 py-1 rounded">
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Topics */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Topics</p>
        <div className="flex flex-wrap gap-1.5">
          {problem.topics.map(t => <Badge key={t} color="neutral" size="sm">{t}</Badge>)}
        </div>
      </div>

      {/* Companies */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Asked by</p>
        <div className="flex flex-wrap gap-1.5">
          {problem.companies.map(c => <Badge key={c} color="accent" size="sm">{c}</Badge>)}
        </div>
      </div>

      {/* Acceptance */}
      <div className="flex items-center gap-4 text-xs text-muted">
        <span>Acceptance: <strong className="text-tertiary">{problem.acceptanceRate.toFixed(1)}%</strong></span>
      </div>

      {/* Hints */}
      {problem.hints.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Hints</p>
          <Accordion items={hintItems} />
        </div>
      )}
    </div>
  )
}
