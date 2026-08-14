import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarContext } from './sidebar-context'

const COLLAPSED_KEY = 'sidebar:collapsed'

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Read synchronously so the rail never renders expanded for a frame and then
  // snaps shut. The toggle lives beside the profile row in SideNav.
  const [preference, setPreference] = useState<boolean>(() => {
    try {
      return localStorage.getItem(COLLAPSED_KEY) === 'true'
    } catch {
      return false
    }
  })

  // A page may fold the rail away for its own layout without that becoming the
  // user's setting. Only the preference is ever written back.
  const [forced, setForced] = useState(false)
  const collapsed = forced || preference

  const collapsedRef = useRef(collapsed)
  collapsedRef.current = collapsed

  // Reads the *effective* value, so toggling while a page holds the rail shut
  // opens it rather than appearing to do nothing.
  const setCollapsed = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof value === 'function' ? value(collapsedRef.current) : value
    setForced(false)
    setPreference(next)
  }, [])

  const setForcedCollapsed = useCallback((value: boolean) => setForced(value), [])

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, String(preference))
    } catch {
      // private mode / storage disabled — the preference just won't persist
    }
  }, [preference])

  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  // Navigating always dismisses the mobile drawer, otherwise it covers the
  // page the user just asked for.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent the page behind the drawer from scrolling while it is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, setForcedCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}
