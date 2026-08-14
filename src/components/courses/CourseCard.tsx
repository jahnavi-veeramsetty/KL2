import { Link } from 'react-router-dom'
import type { Course } from '../../types'
import { ProgressBar, Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { formatDuration, formatNumber } from '../../lib/format'
import { cn } from '../../lib/cn'

interface CourseCardProps {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: CourseCardProps) {
  const progress = course.progress
  const inProgress = progress !== undefined

  return (
    <Link
      to={ROUTES.COURSE_DETAIL(course.id)}
      className={cn('@container block group focus-visible:outline-none h-full', className)}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-[20px] bg-page border-line hover:border-accent/40 hover:bg-page transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">
        
        {/* Thumbnail */}
        <div className="on-dark relative w-full shrink-0 aspect-[16/10] overflow-hidden bg-panel">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="flex absolute top-3 left-3 flex-wrap gap-2 z-10">
            {course.isBestseller && (
              <span className="bg-[#ff9500] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded shadow-md flex items-center gap-1">
                🔥 Selling Fast
              </span>
            )}
            {course.isNew && (
              <span className="bg-[#00c7e6] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded shadow-md">
                New
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded px-2 py-1 flex items-center gap-1 z-10 shadow-md">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[11px] font-bold text-white">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 p-4">
          
          {/* Category & Level */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
              {course.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-line-strong shrink-0" />
            <span className="text-[11px] font-medium text-subtle">
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-strong font-bold text-[17px] leading-snug line-clamp-2 mb-1.5">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-subtle text-xs line-clamp-2 mb-3 flex-1">
            {course.shortDescription}
          </p>

          {/* Meta stats */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-subtle mb-3">
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>{formatNumber(course.studentsEnrolled)} students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{formatDuration(course.durationHours)}</span>
            </div>
          </div>

          <hr className="border-line mb-3" />

          {/* Footer Area */}
          {inProgress ? (
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-subtle font-medium">Your Progress</span>
                <span className="text-[11px] text-accent font-bold">{progress}%</span>
              </div>
              <ProgressBar value={progress!} color="accent" />
              <button className="w-full mt-3 bg-[#0d6b7c] hover:bg-[#0a5663] text-white rounded-lg py-2 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors">
                Continue learning <span className="text-base leading-none">→</span>
              </button>
            </div>
          ) : (
            <div className="mt-auto flex items-end justify-between gap-2">
              <div className="flex flex-col justify-center gap-1">
                <span className="text-strong font-bold text-[13px]">Full Access</span>
                <span className="text-subtle text-[10px]">Self-paced learning</span>
              </div>
              <button className="bg-[#0d6b7c] hover:bg-[#0a5663] text-white rounded-lg px-3 py-2 text-[13px] font-semibold flex items-center gap-2 transition-colors shrink-0">
                Enroll now <span className="text-base leading-none">→</span>
              </button>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}

