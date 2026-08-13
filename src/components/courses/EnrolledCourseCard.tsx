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
      <Card className="flex flex-row sm:flex-col h-full overflow-hidden gap-3 sm:gap-0 p-3 sm:p-0 rounded-2xl sm:rounded-[20px] bg-page/80 border-line hover:border-accent/40 hover:bg-page transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">
        
        {/* Thumbnail */}
        <div className="on-dark relative w-[108px] shrink-0 self-stretch rounded-xl overflow-hidden bg-panel sm:w-full sm:self-auto sm:rounded-none sm:aspect-[16/10]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 min-w-0 sm:p-4">
          {/* Title */}
          <h3 className="text-strong font-bold text-sm @min-[17rem]:text-[15px] @min-[20rem]:text-base leading-snug line-clamp-2 mb-2 sm:mb-3">
            {item.title}
          </h3>

          {/* Time Remaining */}
          {item.timeRemaining && (
            <div className="flex items-center text-[11px] sm:text-xs text-subtle font-medium mb-3">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.timeRemaining}
            </div>
          )}

          {/* Progress */}
          <div className="space-y-1.5 mt-auto mb-1 sm:mb-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-faint font-medium">Your Progress</span>
              <span className="text-[10px] text-accent font-bold">{item.progress}%</span>
            </div>
            <ProgressBar value={item.progress} color="accent" />
          </div>

        </div>
      </Card>
    </Link>
  )
}
