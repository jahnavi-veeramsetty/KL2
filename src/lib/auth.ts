/**
 * Client-side session flag.
 *
 * This is a *routing* concern, not a security boundary — the value lives in
 * localStorage, so anyone can flip it from DevTools. It exists to keep the app
 * behaving sensibly (no signed-out dashboard, no login form for signed-in
 * users), not to protect anything. Real access control has to come from the
 * API rejecting unauthorized requests once there is a backend.
 *
 * Every read/write goes through here so the storage key is defined once.
 */
const AUTH_KEY = 'isAuthenticated'

export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true'
  } catch {
    // private mode / storage disabled — treat as signed out
    return false
  }
}

export function signIn(): void {
  try {
    localStorage.setItem(AUTH_KEY, 'true')
  } catch {
    // the session just won't survive a reload
  }
}

export function signOut(): void {
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch {
    // nothing to clean up
  }
}
