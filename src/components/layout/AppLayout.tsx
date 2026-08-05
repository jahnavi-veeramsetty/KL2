import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from './SideNav'
import TopBar from './TopBar'
import BottomNav from './BottomNav'
import PageHeading from './PageHeading'
import { useSidebar } from '../../hooks/useSidebar'
import { useMediaQuery, DESKTOP_QUERY } from '../../hooks/useMediaQuery'

/**
 * Persistent app chrome. Rendered once as a layout route so SideNav and TopBar
 * stay mounted across navigations — only <Outlet /> swaps. The Suspense
 * boundary lives inside the chrome so lazy route chunks never blank the
 * sidebar or header.
 *
 * Variants:
 *  - default: standard scrolling page with a max-width main column
 *  - bare:    chrome only; the page controls its own width and background
 *  - fixed:   full-height, non-scrolling shell for split-pane pages
 */
type LayoutVariant = 'default' | 'bare' | 'fixed'

// Must match SideNav's width, or a dead strip shows between nav and content.
const NAV_WIDTH = { collapsed: 72, expanded: 240 }

function ContentFallback() {
  return (
    <div className="w-full flex items-center justify-center py-24" role="status" aria-label="Loading page">
      <div className="w-8 h-8 rounded-full border-2 border-line-strong border-t-white/60 animate-spin" />
    </div>
  )
}

export default function AppLayout({ variant = 'default' }: { variant?: LayoutVariant }) {
  const { collapsed } = useSidebar()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  // Below lg the nav is an off-canvas drawer, so the content must not be
  // inset at all — otherwise a phone loses 240px of an already narrow screen.
  const paddingLeft = isDesktop ? (collapsed ? NAV_WIDTH.collapsed : NAV_WIDTH.expanded) : 0

  if (variant === 'fixed') {
    return (
      <div
        className="h-[100dvh] w-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ paddingLeft }}
      >
        <SideNav />
        <BottomNav />
        <div className="flex flex-col h-[100dvh] w-full pb-[72px] lg:pb-0">
          <TopBar />
          <Suspense fallback={<ContentFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    )
  }

  if (variant === 'bare') {
    return (
      <div
        className="min-h-screen w-full bg-page transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ paddingLeft }}
      >
        <SideNav />
        <BottomNav />
        <div className="flex flex-col w-full">
          <TopBar />
          <div className="flex-1 pt-16 lg:pt-14 pb-24 lg:pb-0">
            <Suspense fallback={<ContentFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ paddingLeft }}
    >
      <SideNav />
      <BottomNav />
      <div className="flex flex-col min-h-screen w-full relative">
        <div className="flex flex-col flex-1 z-10 relative bg-page space-grid w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-line">
          <TopBar />
          <main className="flex-1 pt-16 lg:pt-14 pb-28 lg:pb-16 px-6 md:px-10 mx-auto w-full max-w-7xl">
            <div className="pt-6">
              <PageHeading />
              <Suspense fallback={<ContentFallback />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
