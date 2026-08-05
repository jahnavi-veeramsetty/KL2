import { GlobalSearch } from '../components/layout/GlobalSearch'
import { DashboardGreeting } from '../components/dashboard/DashboardGreeting'
import { TodayChallenge } from '../components/dashboard/TodayChallenge'
import { ContinueLearning } from '../components/dashboard/ContinueLearning'
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents'
import { IDELinkBanner } from '../components/dashboard/IDELinkBanner'
import { ProductivityRail } from '../components/dashboard/ProductivityRail'

/**
 * Work column + activity rail. The window itself never scrolls at any width.
 *
 * Rendered under AppLayout's `fixed` variant — a 100dvh shell with
 * overflow-hidden, TopBar fixed on top and no max-width column. That gives
 * three things at once: no page scrollbar, content that slides *under* the
 * translucent TopBar (each pane's top edge is at y=0, with the bar's height
 * padded back inside), and a rail that reaches the right edge of the viewport
 * the way the sidebar reaches the left.
 *
 * Which element owns the scrollbar changes with width, and only one ever does:
 *   below xl — rail hidden; one column, the grid owns the scroll
 *   xl and up — two columns; the grid is locked and each pane scrolls itself
 */
export default function DashboardPage() {
  return (
    <div
      className="
        flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_22rem] items-stretch
        overflow-y-auto xl:overflow-hidden scroll-hover
      "
    >
      {/* Work column. Top padding = TopBar height + breathing room, so content
          starts clear of the bar but scrolls up underneath it.

          space-y rather than flex+gap on purpose: this element is both the
          scroll container and a fixed height at xl, and flex children default
          to shrink:1 — they compress to fit instead of overflowing into a
          scroll, which collapsed TodayChallenge to a single line. */}
      <div className="min-w-0 space-y-6 px-6 md:px-10 xl:pr-7 pt-[5.5rem] lg:pt-20 pb-10 xl:pb-12 xl:h-full xl:overflow-y-auto scroll-hover">
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

      {/* Activity rail — flush right, bordered like the sidebar is on the left.
          Hidden below xl for now: stacked under the work column it was a long
          scroll past content the phone user did not ask for. */}
      <aside
        className="hidden xl:block xl:pl-5 xl:pr-3.5 xl:pt-20 xl:pb-12 xl:border-l xl:border-line xl:bg-panel xl:h-full xl:overflow-y-auto scroll-hover"
        aria-label="Your activity"
      >
        <ProductivityRail />
      </aside>
    </div>
  )
}
