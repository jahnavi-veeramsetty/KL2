import { createContext } from 'react'

export interface SidebarContextType {
  /** Desktop only: the nav is docked but narrowed to icons. */
  collapsed: boolean
  setCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void
  /** Mobile only: the nav is an off-canvas drawer. */
  mobileOpen: boolean
  setMobileOpen: (v: boolean | ((prev: boolean) => boolean)) => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)
