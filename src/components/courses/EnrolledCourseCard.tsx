import { Link } from 'react-router-dom'
import type { ContinueLearningItem } from '../../types'
import { ProgressBar, Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { cn } from '../../lib/cn'

interface EnrolledCourseCardProps {
  item: ContinueLearningItem
  className?: string
}

export function EnrolledCourseCard({ item, className }: EnrolledCourseCardProps) {
  return (
    <Link
      to={ROUTES.LMS_COURSE(item.courseId)}
      className={cn('@container block group focus-visible:outline-none h-full', className)}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-[20px] bg-page border-line hover:border-accent/40 hover:bg-page transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">
        
        {/* Thumbnail */}
        <div className="on-dark relative w-full shrink-0 aspect-[16/10] overflow-hidden bg-panel">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 p-4">
          {/* Title, sized in `cqw` against the card's own width rather than in
              fixed px. These sit three-up in a column that loses ~160px the
              moment the dashboard's activity rail opens, and a flat 17px broke
              every longer title onto a second line at exactly that width. */}
          <h3 className="text-strong font-bold text-[clamp(0.875rem,6.4cqw,1.0625rem)] leading-snug line-clamp-2 mb-4 flex-1">
            {item.title}
          </h3>

          {/* Progress and Button */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-subtle font-medium">Your Progress</span>
              <span className="text-[11px] text-accent font-bold">{item.progress}%</span>
            </div>
            <ProgressBar value={item.progress} color="accent" />
            <button className="w-full mt-3 bg-[#0d6b7c] hover:bg-[#0a5663] text-white rounded-lg py-2 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors">
              Continue learning <span className="text-base leading-none">→</span>
            </button>
          </div>

        </div>
      </Card>
    </Link>
  )
}
