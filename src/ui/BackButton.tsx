import { useLocation, useNavigate } from 'react-router-dom'

interface BackButtonProps {
  /** Where to go when there is no in-app history to return to. */
  fallbackTo: string
  label?: string
  className?: string
}

export function BackButton({ fallbackTo, label = 'Back', className = '' }: BackButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // React Router sets key to 'default' for the first entry of a session, i.e.
  // the page was opened directly. Going back then would leave the app, so fall
  // back to the parent listing instead.
  const canGoBack = location.key !== 'default'

  return (
    <button
      type="button"
      onClick={() => (canGoBack ? navigate(-1) : navigate(fallbackTo))}
      className={`group inline-flex items-center gap-1.5 -ml-1 px-2 py-1 rounded-lg text-sm text-muted hover:text-tertiary hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${className}`}
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
      {label}
    </button>
  )
}
