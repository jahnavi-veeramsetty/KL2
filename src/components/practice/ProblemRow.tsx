import { Link } from 'react-router-dom'
import { Bookmark, CheckCircle2, Circle, CircleDashed } from 'lucide-react'
import type { Problem } from '../../types'
import { Badge } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { cn } from '../../lib/cn'


interface ProblemRowProps {
  problem: Problem
  onBookmarkToggle: (id: string) => void
}

const difficultyColor = { Easy: 'easy', Medium: 'medium', Hard: 'hard' } as const

/* Glyphs (✓ ~ ○) rendered at three different optical weights and baselines,
   because they came from three unrelated parts of the font. lucide draws them
   on one grid at one stroke. */
const StatusIcon = ({ status }: { status: Problem['status'] }) => {
  if (status === 'solved') {
    return <CheckCircle2 className="w-4 h-4 text-easy mx-auto" strokeWidth={2} aria-label="Solved" />
  }
  if (status === 'attempted') {
    return <CircleDashed className="w-4 h-4 text-medium mx-auto" strokeWidth={2} aria-label="Attempted" />
  }
  return <Circle className="w-4 h-4 text-faint mx-auto" strokeWidth={1.8} aria-label="Not started" />
}

export function ProblemRow({ problem, onBookmarkToggle }: ProblemRowProps) {
  return (
    <tr className="group border-b border-line hover:bg-raised transition-colors">
      {/* Status */}
      <td className="px-4 py-3 w-10 text-center">
        <StatusIcon status={problem.status} />
      </td>

      {/* Number */}
      <td className="px-2 py-3 w-12 text-xs text-subtle">{problem.number}</td>

      {/* Title */}
      <td className="px-2 py-3">
        <Link
          to={ROUTES.PROBLEM(problem.slug)}
          className="text-sm font-medium text-strong group-hover:text-accent transition-colors hover:underline underline-offset-2"
        >
          {problem.title}
        </Link>
      </td>

      {/* Topics */}
      <td className="hidden md:table-cell px-2 py-3">
        <div className="flex flex-wrap gap-1">
          {problem.topics.slice(0, 2).map(t => (
            <Badge key={t} color="neutral" size="sm">{t}</Badge>
          ))}
          {problem.topics.length > 2 && (
            <span className="text-xs text-subtle">+{problem.topics.length - 2}</span>
          )}
        </div>
      </td>

      {/* Difficulty */}
      <td className="px-2 py-3 w-24">
        <Badge color={difficultyColor[problem.difficulty]} size="sm">
          {problem.difficulty}
        </Badge>
      </td>

      {/* Acceptance */}
      <td className="hidden lg:table-cell px-2 py-3 w-20 text-xs text-subtle">
        {problem.acceptanceRate.toFixed(1)}%
      </td>

      {/* Bookmark */}
      <td className="px-4 py-3 w-10 text-center">
        <button
          onClick={() => onBookmarkToggle(problem.id)}
          aria-label={problem.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          className={cn(
            'transition-colors',
            problem.isBookmarked ? 'text-accent' : 'text-faint hover:text-accent'
          )}
        >
          <Bookmark
            className="w-4 h-4 mx-auto"
            strokeWidth={1.8}
            fill={problem.isBookmarked ? 'currentColor' : 'none'}
            aria-hidden
          />
        </button>
      </td>
    </tr>
  )
}
