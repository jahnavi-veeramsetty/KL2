import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'

function ContentFallback() {
  return (
    <div className="w-full flex items-center justify-center py-20" role="status" aria-label="Loading page">
      <div className="w-8 h-8 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
    </div>
  )
}

/**
 * Standalone layout for the LMS viewer.
 * It strictly omits SideNav and BottomNav, and hides the search bar in TopBar.
 */
export default function LMSLayout() {
  return (
    <div className="min-h-[100dvh] w-full bg-page space-grid flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <TopBar hideSearch={true} />
      <main className="flex-1 pt-20 lg:pt-16 pb-16 px-4 sm:px-6 md:px-10 mx-auto w-full max-w-[1400px]">
        <Suspense fallback={<ContentFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
