import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useProfile } from '../../hooks/useProfile'
import { problems } from '../../data'

export function IDELinkBanner() {
  const { profile } = useProfile()

  const totalSolved =
    (profile?.solveStats?.easy?.solved || 0) +
    (profile?.solveStats?.medium?.solved || 0) +
    (profile?.solveStats?.hard?.solved || 0)

  // Open the editor on the next unsolved problem. Falls back to the problem
  // list only if there is nothing to open.
  const nextProblem = problems.find(p => p.status !== 'solved') ?? problems[0]

  return (
    <Link
      to={nextProblem ? ROUTES.PROBLEM(nextProblem.slug) : ROUTES.PRACTICE}
      className="group block w-full bg-page hover:bg-panel border border-line rounded-2xl p-4 transition-all duration-300 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        
        <div className="flex flex-col flex-1">
          <h3 className="text-base font-bold text-strong tracking-tight mb-0.5">Open the IDE</h3>
          <p className="text-xs text-subtle">
            {nextProblem
              ? `Jump straight into "${nextProblem.title}" — ${totalSolved} problems solved so far`
              : `Browse the problem set — ${totalSolved} problems solved so far`}
          </p>
        </div>
        
        <div className="text-faint group-hover:text-strong transition-colors flex-shrink-0 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
      
      {/* Subtle hover glow effect */}
      <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  )
}
