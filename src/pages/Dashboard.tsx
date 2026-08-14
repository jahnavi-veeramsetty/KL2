import { useState } from 'react'
import { motion } from 'framer-motion'
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

/** 22rem, as a number so framer-motion can interpolate it. */
const RAIL_WIDTH = 352
/** The sidebar's collapse curve, so both rails move the same way. */
const RAIL_TRANSITION = { duration: 0.28, ease: [0.4, 0, 0.2, 1] } as const

export default function Dashboard() {
  useDocumentTitle('Dashboard')
  const [isRailOpen, setIsRailOpen] = useState(true)

  return (
    // The second track is `auto`, not a swapped-in `22rem` — a grid whose
    // template changes track *count* has nothing to interpolate between, which
    // is why closing the rail used to snap. Sizing the track to the aside
    // instead lets framer-motion animate the aside's width and the column
    // follows it, the same way SideNav animates its own width.
    <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] items-stretch overflow-y-auto xl:overflow-hidden scroll-hover">
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

      {/* Stays mounted and clips itself, so the contents slide out rather than
          vanishing. The border and background live on the inner pane, which is
          held at full width — otherwise the rail would reflow its own text
          while closing, and a 1px border would be left behind at width 0. */}
      <motion.aside
        aria-label="Your activity"
        aria-hidden={!isRailOpen}
        initial={false}
        animate={{ width: isRailOpen ? RAIL_WIDTH : 0 }}
        transition={RAIL_TRANSITION}
        className="hidden xl:block h-full overflow-hidden"
      >
        <div className="w-[22rem] h-full overflow-y-auto scroll-hover pl-5 pr-3.5 pt-20 pb-12 border-l border-line bg-panel">
          <ProductivityRail />
        </div>
      </motion.aside>

      {/* Floating toggle — same duration and curve as the rail, so the button
          rides the rail's edge instead of racing it. */}
      <button
        onClick={() => setIsRailOpen(o => !o)}
        aria-expanded={isRailOpen}
        aria-label={isRailOpen ? 'Collapse activity rail' : 'Expand activity rail'}
        className={cn(
          "hidden xl:flex items-center justify-center fixed top-20 z-40 w-8 h-8 rounded-full border border-line bg-panel shadow-sm hover:bg-raised text-subtle hover:text-strong",
          "transition-[right,color,background-color] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          isRailOpen ? "right-[21rem]" : "right-6"
        )}
        title={isRailOpen ? "Collapse activity rail" : "Expand activity rail"}
      >
        {isRailOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
      </button>
    </div>
  )
}
