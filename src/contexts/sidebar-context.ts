import { createContext } from 'react'

export interface SidebarContextType {
  /** Desktop only: the nav is docked but narrowed to icons. */
  collapsed: boolean
  /** Sets the user's stored preference, and clears any page-level force. */
  setCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void
  /**
   * Collapses the rail for as long as a page asks for it, without touching the
   * stored preference. A page that needs the width — the roadmap, whose trail
   * weaves across the whole column — folds the rail away while it is open and
   * gives it back on the way out. Persisting that would quietly rewrite a
   * setting the user never chose, and a reload on such a page would make the
   * rewrite permanent.
   */
  setForcedCollapsed: (v: boolean) => void
  /** Mobile only: the nav is an off-canvas drawer. */
  mobileOpen: boolean
  setMobileOpen: (v: boolean | ((prev: boolean) => boolean)) => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)
