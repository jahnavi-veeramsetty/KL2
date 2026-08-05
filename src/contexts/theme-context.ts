import { createContext } from 'react'
import type { ResolvedTheme, ThemePreference } from '../lib/theme'

export interface ThemeContextValue {
  /** What the user chose: light, dark, or follow the system. */
  preference: ThemePreference
  /** What that resolves to right now. */
  theme: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  /** Flips between light and dark, leaving "system" behind. */
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
