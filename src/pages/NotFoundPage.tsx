import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { StatusPage } from '../components/system/StatusPage'
import { ROUTES } from '../constants/routes'
import { isAuthenticated } from '../lib/auth'

/**
 * Replaces a silent `<Navigate to="/" />` on the catch-all route.
 *
 * That redirect moved people without explaining anything — and for a signed-in
 * user "/" redirects again to the dashboard, so a mistyped URL landed them on a
 * page they never asked for with no clue why.
 */
export default function NotFoundPage() {
  const signedIn = isAuthenticated()

  return (
    <StatusPage
      code="404"
      icon={<Compass className="w-6 h-6" />}
      title="We can't find that page"
      description="The link may be out of date, or the address might have a typo in it."
      actions={
        <>
          <Link
            to={signedIn ? ROUTES.DASHBOARD : ROUTES.HOME}
            className="px-6 py-3 rounded-xl bg-accent text-on-accent text-xs font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {signedIn ? 'Back to dashboard' : 'Back to home'}
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl bg-raised border border-line-strong text-xs font-bold uppercase tracking-wide text-body hover:bg-line-strong hover:text-strong transition-colors"
          >
            Go back
          </button>
        </>
      }
    />
  )
}
