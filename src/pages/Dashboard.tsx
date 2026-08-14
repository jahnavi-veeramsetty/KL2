import { useState } from 'react'
import { PanelRightClose, PanelRightOpen } from 'lucide-react'
import { GlobalSearch } from '../components/layout/GlobalSearch'
import { DashboardGreeting } from '../components/dashboard/DashboardGreeting'
import { TodayChallenge } from '../components/dashboard/TodayChallenge'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ContinueLearning } from '../components/dashboard/ContinueLearning'
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents'
import { IDELinkBanner } from '../components/dashboard/IDELinkBanner'
import { ProductivityRail } from '../components/dashboard/ProductivityRail'
import { cn } from '../lib/cn'

export default function Dashboard() {
  useDocumentTitle('Dashboard')
  const [isRailOpen, setIsRailOpen] = useState(true)

  return (
    <div
      className={cn(
        "flex-1 min-h-0 grid items-stretch overflow-y-auto xl:overflow-hidden scroll-hover transition-all duration-300",
        isRailOpen ? "grid-cols-1 xl:grid-cols-[minmax(0,1fr)_22rem]" : "grid-cols-1"
      )}
    >
      <div className="min-w-0 space-y-6 px-6 md:px-10 xl:pr-7 pt-[5.5rem] lg:pt-20 pb-10 xl:pb-12 xl:h-full xl:overflow-y-auto no-scrollbar">
        <DashboardGreeting />

        {/* Desktop keeps search in the TopBar */}
        <div className="w-full lg:hidden">
          <GlobalSearch />
        </div>

        <TodayChallenge />
        <ContinueLearning />
        <UpcomingEvents />
        <IDELinkBanner />
      </div>

      {isRailOpen && (
        <aside
          className="hidden xl:block xl:pl-5 xl:pr-3.5 xl:pt-20 xl:pb-12 xl:border-l xl:border-line xl:bg-panel xl:h-full xl:overflow-y-auto scroll-hover"
          aria-label="Your activity"
        >
          <ProductivityRail />
        </aside>
      )}

      {/* Floating Toggle */}
      <button
        onClick={() => setIsRailOpen(!isRailOpen)}
        className={cn(
          "hidden xl:flex items-center justify-center fixed top-20 z-40 w-8 h-8 rounded-full border border-line bg-panel shadow-sm hover:bg-raised transition-all duration-300 text-subtle hover:text-strong",
          isRailOpen ? "right-[21rem]" : "right-6"
        )}
        title={isRailOpen ? "Collapse activity rail" : "Expand activity rail"}
      >
        {isRailOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
      </button>
    </div>
  )
}
