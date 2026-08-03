import { Link } from 'react-router-dom'
import type { Course } from '../../types'
import { ProgressBar, Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { DiscountLine } from '../catalog/DiscountLine'
import { formatDuration, formatNumber, formatRupees } from '../../lib/format'
import { cn } from '../../lib/cn'

interface CourseCardProps {
  course: Course
  className?: string
}

/**
 * Two layouts, one markup tree, switching at `sm` — the same breakpoint where
 * CardGrid goes to two columns.
 *
 * Below sm: a horizontal row with a 108px thumbnail on the left. Full-width the
 * 16:10 banner alone was 214px, which put the card at ~400px and fitted 1.7 on
 * a phone. The row form is ~150px, so the list can actually be scanned. The
 * hero image still gets its moment on the detail page.
 *
 * From sm up: unchanged — full-bleed banner above stacked details.
 */
export function CourseCard({ course, className }: CourseCardProps) {
  // Alias so the `!== undefined` check below narrows it for ProgressBar.
  const progress = course.progress
  const inProgress = progress !== undefined

  return (
    <Link
      to={ROUTES.COURSE_DETAIL(course.id)}
      className={cn('block group focus-visible:outline-none h-full', className)}
    >
      <Card className="flex flex-row sm:flex-col h-full overflow-hidden gap-3 sm:gap-0 p-3 sm:p-0 rounded-2xl sm:rounded-[20px] bg-[#0A0F1C]/80 border-white/5 hover:border-accent/40 hover:bg-[#0A0F1C] transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Thumbnail — left rail on phones, full-bleed banner from sm up */}
        <div className="relative w-[108px] shrink-0 self-stretch rounded-xl overflow-hidden bg-[#0f1523] sm:w-full sm:self-auto sm:rounded-none sm:aspect-[16/10]">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Rating badge — no room over a 108px thumb, so on phones the rating
              moves into the meta row instead. */}
          <div className="hidden sm:flex absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1 items-center gap-1 border border-white/10 z-10">
            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] font-bold text-white">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 min-w-0 sm:p-4">
          {/* Top row: Category, Level, Tags */}
          <div className="flex items-center justify-between gap-3 sm:gap-4 mb-1 sm:mb-2">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className="text-[10px] font-bold text-accent/90 uppercase tracking-wider truncate">
                {course.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
              <span className="text-[10px] font-medium text-slate-400 shrink-0">
                {course.level}
              </span>
            </div>

            {/* One short tag on a phone — "Selling Fast" alone would eat the
                198px content column, so it degrades to "Hot". */}
            {(course.isNew || course.isBestseller) && (
              <span className={cn(
                'sm:hidden text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded shrink-0 border',
                course.isNew
                  ? 'bg-accent/10 text-accent border-accent/20'
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              )}>
                {course.isNew ? 'New' : 'Hot'}
              </span>
            )}

            <div className="hidden sm:flex flex-wrap items-center justify-end gap-1.5 flex-shrink-0">
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
          <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-accent transition-colors">
            {course.title}
          </h3>

          {/* Consolidated Meta Row */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-slate-400 font-medium mb-2 sm:mb-3">
            <span className="text-slate-300 truncate max-w-full">{course.instructor.name}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />

            {/* Enrolment count is the first thing to go when space is tight */}
            <div className="hidden sm:flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>{formatNumber(course.studentsEnrolled)}</span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />

            <div className="flex items-center gap-1 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{formatDuration(course.durationHours)}</span>
            </div>

            {/* Phone-only rating, replacing the badge dropped from the thumb */}
            <span className="sm:hidden w-1 h-1 rounded-full bg-slate-600 shrink-0" />
            <span className="sm:hidden text-amber-400 shrink-0">★ {course.rating.toFixed(1)}</span>
          </div>

          {/* Progress or Spacer */}
          {progress !== undefined ? (
            <div className="space-y-1.5 mt-auto mb-2 sm:mb-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-medium">Your Progress</span>
                <span className="text-[10px] text-accent font-bold">{progress}%</span>
              </div>
              <ProgressBar value={progress} color="accent" />
            </div>
          ) : (
            <div className="mt-auto" />
          )}

          {/* Price & Action — phones put the struck price inline beside the
              payable one; there is no room for the stacked treatment. */}
          <div className="sm:hidden">
            <DiscountLine price={course.price} size="sm" className="mb-1" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-white font-bold text-base tracking-tight tabular-nums">
                {formatRupees(course.price)}
              </span>
              <span className={cn(
                'text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shrink-0',
                inProgress
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'bg-accent text-[#060b1a]'
              )}>
                {inProgress ? 'Continue' : 'Enroll'}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex pt-3 border-t border-white/5 items-end justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <DiscountLine price={course.price} className="mb-1" />
              <span className="text-white font-bold text-xl tracking-tight leading-none tabular-nums">
                {formatRupees(course.price)}
              </span>
            </div>

            {/* A span, not a button — the whole card is already a link. */}
            <span className={cn(
              'text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg transition-all duration-300 shrink-0',
              inProgress
                ? 'bg-white/5 text-white group-hover:bg-white/10 border border-white/10'
                : 'bg-accent text-[#060b1a] group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            )}>
              {inProgress ? 'Continue' : 'Enroll'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
