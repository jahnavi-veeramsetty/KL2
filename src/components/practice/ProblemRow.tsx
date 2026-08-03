import { Link } from 'react-router-dom'
import type { Problem } from '../../types'
import { Badge } from '../../ui'
import { ROUTES } from '../../constants/routes'


interface ProblemRowProps {
  problem: Problem
  onBookmarkToggle: (id: string) => void
}

const difficultyColor = { Easy: 'easy', Medium: 'medium', Hard: 'hard' } as const

const StatusIcon = ({ status }: { status: Problem['status'] }) => {
  if (status === 'solved') return <span className="text-easy text-sm" title="Solved">✓</span>
  if (status === 'attempted') return <span className="text-medium text-sm" title="Attempted">~</span>
  return <span className="text-muted text-sm" title="Todo">○</span>
}

export function ProblemRow({ problem, onBookmarkToggle }: ProblemRowProps) {
  return (
    <tr className="group border-b border-white/5 hover:bg-white/3 transition-colors">
      {/* Status */}
      <td className="px-4 py-3 w-10 text-center">
        <StatusIcon status={problem.status} />
      </td>

      {/* Number */}
      <td className="px-2 py-3 w-12 text-xs text-muted">{problem.number}</td>

      {/* Title */}
      <td className="px-2 py-3">
        <Link
          to={ROUTES.PROBLEM(problem.slug)}
          className="text-sm font-medium text-tertiary group-hover:text-accent transition-colors hover:underline underline-offset-2"
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
            <span className="text-xs text-muted">+{problem.topics.length - 2}</span>
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
      <td className="hidden lg:table-cell px-2 py-3 w-20 text-xs text-muted">
        {problem.acceptanceRate.toFixed(1)}%
      </td>

      {/* Bookmark */}
      <td className="px-4 py-3 w-10 text-center">
        <button
          onClick={() => onBookmarkToggle(problem.id)}
          aria-label={problem.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          className="text-muted hover:text-accent transition-colors"
        >
          {problem.isBookmarked ? '🔖' : '○'}
        </button>
      </td>
    </tr>
  )
}
