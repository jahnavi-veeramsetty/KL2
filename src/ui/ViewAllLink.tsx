import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * The "View all →" affordance beside a dashboard section title.
 *
 * Shared rather than repeated: the two dashboard sections had drifted into
 * different colours and only one of them carried the chevron, which is exactly
 * what happens when a four-line link is pasted twice.
 *
 * Deliberately quiet — text-subtle, not accent. It sits beside a heading as
 * navigation furniture, and the dashboard already spends its cyan on the
 * things it wants you to click.
 */
export function ViewAllLink({ to, label = 'View all' }: { to: string; label?: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1 text-sm font-medium text-subtle hover:text-strong transition-colors"
    >
      {label}
      <ChevronRight className="w-4 h-4" aria-hidden />
    </Link>
  )
}
