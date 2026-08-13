import { Suspense, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'

function ContentFallback() {
  return (
    <div className="w-full flex items-center justify-center py-20" role="status" aria-label="Loading">
      <div className="w-8 h-8 rounded-full border-4 border-line-strong border-t-accent animate-spin" />
    </div>
  )
}

export default function ModuleViewerLayout({ breadcrumbs }: { breadcrumbs?: ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-page flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <TopBar hideSearch={true} centerContent={breadcrumbs} />
      
      {/* 
        This is a full-width container because the sidebar and main content
        will handle their own sizing and layout.
      */}
      <main className="flex-1 pt-16 lg:pt-14 w-full flex">
        <Suspense fallback={<ContentFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
