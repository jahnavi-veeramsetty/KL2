import { useState, useEffect } from 'react'

/**
 * Tracks a CSS media query. The initial value is read synchronously so the
 * first paint already matches the viewport (no desktop-layout flash on phones).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Matches Tailwind's `lg` breakpoint — the point where the sidebar is docked. */
export const DESKTOP_QUERY = '(min-width: 1024px)'
