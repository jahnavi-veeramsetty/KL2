
import { ProgressRing, Chip } from '../../ui'
import { StudyPlanCard } from './StudyPlanCard'
import { studyPlans } from '../../data'
import { currentUser } from '../../data'





interface ProblemSidebarProps {
  showBookmarked: boolean
  onBookmarkToggle: () => void
}

export function ProblemSidebar({
  showBookmarked,
  onBookmarkToggle
}: ProblemSidebarProps) {
  const { solved, totalProblems } = currentUser
  const totalSolved = solved.easy + solved.medium + solved.hard
  const totalAll = totalProblems.easy + totalProblems.medium + totalProblems.hard

  // Problem of the Day (first todo)
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <aside className="flex flex-col gap-6 w-full">
      {/* Progress Widget */}
      <div className="bg-secondary/40 border border-white/8 rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">My Progress</h3>
        <div className="flex items-center gap-4">
          <ProgressRing
            value={totalSolved}
            max={totalAll}
            size={80}
            strokeWidth={6}
            color="#22D3EE"
            label={String(totalSolved)}
            sublabel="Solved"
          />
          <div className="flex-1 space-y-2">
            {([['Easy', solved.easy, totalProblems.easy, '#22C55E'], ['Medium', solved.medium, totalProblems.medium, '#F59E0B'], ['Hard', solved.hard, totalProblems.hard, '#EF4444']] as const).map(([label, val, tot, color]) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span style={{ color }}>{label}</span>
                <span className="text-muted">{val}<span className="text-muted/40">/{tot}</span></span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-orange-500 text-sm">🔥</span>
              <span className="text-xs text-orange-400 font-semibold">{currentUser.streak}-day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem of the Day */}
      <div className="bg-gradient-to-br from-accent/10 to-cyan-800/10 border border-accent/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🎯</span>
          <h3 className="text-xs font-semibold text-accent uppercase tracking-wider">Problem of the Day</h3>
          <span className="ml-auto text-xs text-muted">{today}</span>
        </div>
        <p className="text-sm font-semibold text-tertiary">Climbing Stairs</p>
        <span className="inline-block mt-1 text-xs text-easy">Easy</span>
      </div>

      {/* Study Plans */}
      <div className="bg-secondary/40 border border-white/8 rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Study Plans</h3>
        <div className="space-y-1">
          {studyPlans.map(plan => (
            <StudyPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>


      {/* Bookmarks */}
      <Chip selected={showBookmarked} onClick={onBookmarkToggle} className="w-full justify-center gap-2">
        <span>🔖</span> Bookmarked
      </Chip>
    </aside>
  )
}
