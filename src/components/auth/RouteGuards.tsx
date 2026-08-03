import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { isAuthenticated } from '../../lib/auth'

/**
 * Gate for the signed-in app. Renders no markup of its own — the matched child
 * route comes through <Outlet />, so an existing route group can be wrapped
 * without touching any of the routes inside it.
 */
export function RequireAuth() {
  const location = useLocation()

  if (!isAuthenticated()) {
    // `from` lets the login page send them on to what they actually asked for.
    // `replace` keeps the guarded URL out of history, so pressing Back after
    // the bounce doesn't land them straight back on it.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}

/** The inverse: /login and /signup are pointless once a session exists. */
export function RedirectIfAuthed() {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
