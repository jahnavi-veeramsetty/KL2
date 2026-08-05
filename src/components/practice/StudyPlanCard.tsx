import type { StudyPlan } from '../../types'
import { ProgressBar } from '../../ui'

interface StudyPlanCardProps {
  plan: StudyPlan
  onClick?: () => void
}

export function StudyPlanCard({ plan, onClick }: StudyPlanCardProps) {
  const pct = Math.round((plan.completedCount / plan.problemCount) * 100)
  return (
    <div onClick={onClick} className="cursor-pointer group block py-3 border-b border-line last:border-0 hover:bg-raised transition-colors -mx-5 px-5">
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-strong truncate">
            {plan.title}
          </span>
          <span className="text-xs font-semibold text-subtle flex-shrink-0">{pct}%</span>
        </div>
        <ProgressBar value={plan.completedCount} max={plan.problemCount} size="sm" />
        <span className="text-[11px] font-medium text-subtle">{plan.completedCount}/{plan.problemCount} problems</span>
      </div>
    </div>
  )
}
