import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  type ResolvedTheme, type ThemePreference,
  applyTheme, readPreference, resolveTheme, writePreference,
} from '../lib/theme'
import { ThemeContext } from './theme-context'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference)
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolveTheme(readPreference()))

  // Paint the attribute before anything renders against it.
  useEffect(() => {
    const resolved = resolveTheme(preference)
    setTheme(resolved)
    applyTheme(resolved)
  }, [preference])

  // Only while following the system — an explicit choice should not be
  // overridden when the OS flips at sunset.
  useEffect(() => {
    if (preference !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      const resolved = resolveTheme('system')
      setTheme(resolved)
      applyTheme(resolved)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [preference])

  const setPreference = useCallback((next: ThemePreference) => {
    writePreference(next)
    setPreferenceState(next)
  }, [])

  const toggle = useCallback(() => {
    setPreference(resolveTheme(readPreference()) === 'dark' ? 'light' : 'dark')
  }, [setPreference])

  const value = useMemo(
    () => ({ preference, theme, setPreference, toggle }),
    [preference, theme, setPreference, toggle]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
