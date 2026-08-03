import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarContext } from './sidebar-context'

const COLLAPSED_KEY = 'sidebar:collapsed'

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Read synchronously so the rail never renders expanded for a frame and then
  // snaps shut. The toggle lives beside the profile row in SideNav.
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(COLLAPSED_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, String(collapsed))
    } catch {
      // private mode / storage disabled — the preference just won't persist
    }
  }, [collapsed])

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
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}
