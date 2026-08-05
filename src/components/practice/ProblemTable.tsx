import { Bookmark } from 'lucide-react'
import type { Problem } from '../../types'
import { ProblemRow } from './ProblemRow'
import { EmptyState } from '../../ui'

interface ProblemTableProps {
  problems: Problem[]
  onBookmarkToggle: (id: string) => void
}

export function ProblemTable({ problems, onBookmarkToggle }: ProblemTableProps) {
  if (problems.length === 0) {
    return (
      <EmptyState
        title="No problems match your filters"
        description="Try adjusting your search or filters."
        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
      />
    )
  }

  return (
    <div className="rounded-xl border border-line overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-raised/50 border-b border-line">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-subtle w-10 text-center">Status</th>
            <th className="px-2 py-3 text-xs font-semibold text-subtle w-12">#</th>
            <th className="px-2 py-3 text-xs font-semibold text-subtle">Title</th>
            <th className="hidden md:table-cell px-2 py-3 text-xs font-semibold text-subtle">Topics</th>
            <th className="px-2 py-3 text-xs font-semibold text-subtle w-24">Difficulty</th>
            <th className="hidden lg:table-cell px-2 py-3 text-xs font-semibold text-subtle w-20">Acceptance</th>
            <th className="px-4 py-3 w-10">
              <span className="sr-only">Bookmarked</span>
              <Bookmark className="w-3.5 h-3.5 text-faint mx-auto" strokeWidth={1.8} aria-hidden />
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map(p => (
            <ProblemRow key={p.id} problem={p} onBookmarkToggle={onBookmarkToggle} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
