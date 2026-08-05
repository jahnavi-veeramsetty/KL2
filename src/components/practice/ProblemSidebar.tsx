import { Bookmark, Flame, Target } from 'lucide-react'
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
      <div className="bg-raised/40 border border-line rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-4">My Progress</h3>
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
                <span className="text-subtle">{val}<span className="text-subtle/40">/{tot}</span></span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 pt-1">
              <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" strokeWidth={2} fill="currentColor" aria-hidden />
              <span className="text-xs text-orange-400 font-semibold tabular-nums">
                {currentUser.streak}-day streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem of the Day */}
      <div className="bg-gradient-to-br from-accent/10 to-cyan-800/10 light:bg-none light:bg-accent/[0.07] border border-accent/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-accent shrink-0" strokeWidth={2} aria-hidden />
          <h3 className="text-xs font-semibold text-accent uppercase tracking-wider">Problem of the day</h3>
          <span className="ml-auto text-xs text-subtle">{today}</span>
        </div>
        <p className="text-sm font-semibold text-strong">Climbing Stairs</p>
        <span className="inline-block mt-1 text-xs text-easy">Easy</span>
      </div>

      {/* Study Plans */}
      <div className="bg-raised/40 border border-line rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">Study Plans</h3>
        <div className="space-y-1">
          {studyPlans.map(plan => (
            <StudyPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>


      {/* Bookmarks */}
      <Chip selected={showBookmarked} onClick={onBookmarkToggle} className="w-full justify-center gap-2">
        <Bookmark
          className="w-3.5 h-3.5"
          strokeWidth={1.8}
          fill={showBookmarked ? 'currentColor' : 'none'}
          aria-hidden
        />
        Bookmarked
      </Chip>
    </aside>
  )
}
