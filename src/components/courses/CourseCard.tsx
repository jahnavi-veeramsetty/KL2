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
  return (
    <Link
      to={ROUTES.COURSE_DETAIL(course.id)}
      className={cn('block group focus-visible:outline-none h-full', className)}
    >
      <Card className="flex flex-col h-full overflow-hidden bg-[#0A0F1C]/80 border-white/5 hover:border-accent/40 hover:bg-[#0A0F1C] transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">
        
        {/* Thumbnail - Fixed aspect ratio for consistency */}
        <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0 bg-[#0f1523]">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          
          {/* Rating Badge Overlay */}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1 border border-white/10 z-10">
            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] font-bold text-white">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 p-4">
          {/* Top row: Category, Level, Tags */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-accent/90 uppercase tracking-wider">
                {course.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[10px] font-medium text-slate-400">
                {course.level}
              </span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap items-center justify-end gap-1.5 flex-shrink-0">
              {course.isBestseller && (
                <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                  Selling Fast
                </span>
              )}
              {course.isNew && (
                <span className="bg-accent/10 text-accent border border-accent/20 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors">
            {course.title}
          </h3>

          {/* Consolidated Meta Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 font-medium mb-3">
            <span className="text-slate-300">{course.instructor.name}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>{formatNumber(course.studentsEnrolled)}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{formatDuration(course.durationHours)}</span>
            </div>
          </div>

          {/* Progress or Spacer */}
          {course.progress !== undefined ? (
            <div className="space-y-1.5 mt-auto mb-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-medium">Your Progress</span>
                <span className="text-[10px] text-accent font-bold">{course.progress}%</span>
              </div>
              <ProgressBar value={course.progress} color="accent" />
            </div>
          ) : (
            <div className="mt-auto" />
          )}

          {/* Price & Action */}
          <div className="pt-3 border-t border-white/5 flex items-end justify-between gap-2">
            <div className="flex flex-col min-w-0">
              {/* Struck original + discount sit above, so the payable price
                  lands on the baseline beside the CTA. */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-slate-400 text-xs font-medium line-through">
                  ₹{Math.round(course.price / 0.9).toLocaleString('en-IN')}
                </span>
                <span className="text-emerald-400 text-[10px] font-bold bg-emerald-400/10 px-2 py-0.5 rounded leading-none">
                  10% OFF
                </span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight leading-none">
                ₹{course.price.toLocaleString('en-IN')}
              </span>
            </div>
            
            {/* A span, not a button — the whole card is already a link. */}
            <span className={cn(
              "text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg transition-all duration-300 shrink-0",
              course.progress !== undefined
                ? "bg-white/5 text-white group-hover:bg-white/10 border border-white/10"
                : "bg-accent text-[#060b1a] group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            )}>
              {course.progress !== undefined ? 'Continue' : 'Enroll'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
