/**
 * Theme preference, stored per browser.
 *
 * Three states, not two: "system" is the default and follows the OS, while
 * "light"/"dark" are an explicit override. A two-state toggle silently pins
 * everyone to whatever they clicked once, even after they change their OS.
 */
export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const KEY = 'theme'

export function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(KEY)
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function writePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(KEY, preference)
  } catch {
    // private mode — the session still reflects it
  }
}

export function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? systemTheme() : preference
}

/**
 * Writes the attribute the CSS keys off. Also sets color-scheme so native
 * widgets — scrollbars, date pickers, form controls — match; without it a light
 * page gets dark scrollbars and vice versa.
 */
export function applyTheme(theme: ResolvedTheme): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
}
