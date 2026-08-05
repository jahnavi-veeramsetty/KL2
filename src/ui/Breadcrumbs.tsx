import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../lib/cn'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  /**
   * Renders a back chevron at the head of the trail. The value is where to go
   * when there is no in-app history to return to — usually the parent listing.
   *
   * Back and breadcrumbs answer different questions: the trail is *hierarchy*
   * (where this page sits), back is *history* (where you actually came from).
   * As two stacked rows they read as duplicates and cost a row of height, so
   * they share one row instead.
   */
  backTo?: string
}

export function Breadcrumbs({ items, className = '', backTo }: BreadcrumbsProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // React Router sets key to 'default' for the first entry of a session, i.e.
  // the page was opened directly. Going back then would leave the app, so fall
  // back to the parent listing instead.
  const canGoBack = location.key !== 'default'

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm min-w-0', className)}>
      {backTo && (
        <button
          type="button"
          onClick={() => (canGoBack ? navigate(-1) : navigate(backTo))}
          aria-label="Go back"
          className="group -ml-1 flex items-center gap-1.5 h-8 px-2 sm:px-0 sm:w-8 sm:justify-center shrink-0 rounded-lg text-subtle hover:text-strong hover:bg-raised transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {/* Labelled on phones, where it stands alone; once the trail is
              visible the word is redundant beside it. */}
          <span className="text-sm sm:hidden">Back</span>
        </button>
      )}

      {/* The trail drops out on phones when there is a chevron to replace it.
          Its last item is the current page's name, which the heading or hero
          directly below already says — on a narrow screen that is the same
          words twice. Without a chevron the trail stays, or nothing would
          render at all. */}
      <span className={cn('flex items-center gap-2 min-w-0', backTo && 'hidden sm:flex')}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <span key={idx} className="flex items-center gap-2 min-w-0">
              {idx > 0 && <span className="text-subtle shrink-0">/</span>}
              {!isLast && item.to ? (
                <Link to={item.to} className="text-subtle hover:text-accent transition-colors truncate">
                  {item.label}
                </Link>
              ) : (
                <span className={cn('truncate', isLast ? 'text-strong font-medium' : 'text-subtle')}>
                  {item.label}
                </span>
              )}
            </span>
          )
        })}
      </span>
    </nav>
  )
}
