import { DailyQuizBanner } from '../components/dashboard/DailyQuizBanner'
import { GlobalSearch } from '../components/layout/GlobalSearch'
import { ContinueLearning } from '../components/dashboard/ContinueLearning'
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents'
import { IDELinkBanner } from '../components/dashboard/IDELinkBanner'

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <DailyQuizBanner />
      {/* Desktop has it in the TopBar */}
      <div className="w-full lg:hidden">
        <GlobalSearch />
      </div>
      <ContinueLearning />
      <UpcomingEvents />
      <IDELinkBanner />
    </div>
  )
}
