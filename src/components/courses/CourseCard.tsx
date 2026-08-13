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
      className={cn('@container block group focus-visible:outline-none h-full', className)}
    >
      <Card className="flex flex-row sm:flex-col h-full overflow-hidden gap-3 sm:gap-0 p-3 sm:p-0 rounded-2xl sm:rounded-[20px] bg-page/80 border-line hover:border-accent/40 hover:bg-page transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Thumbnail — left rail on phones, full-bleed banner from sm up */}
        <div className="on-dark relative w-[108px] shrink-0 self-stretch rounded-xl overflow-hidden bg-panel sm:w-full sm:self-auto sm:rounded-none sm:aspect-[16/10]">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Solid brand fills rather than a dark scrim — they read as labels
              on the artwork instead of another translucent panel. Shown at every
              size now, so the content column carries no duplicate. */}
          <div className="flex absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex-wrap gap-1 sm:gap-1.5 z-10">
            {course.isBestseller && (
              <span className="bg-amber-500 text-strong text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="hidden sm:inline">Selling Fast</span>
                <span className="sm:hidden">Hot</span>
              </span>
            )}
            {course.isNew && (
              <span className="bg-accent-strong text-strong text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                New
              </span>
            )}
          </div>

          {/* Rating badge — no room over a 108px thumb, so on phones the rating
              moves into the meta row instead. */}
          <div className="hidden sm:flex absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1 items-center gap-1 border border-line-strong z-10">
            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] font-bold text-strong">{course.rating.toFixed(1)}</span>
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
              <span className="w-1 h-1 rounded-full bg-line-strong shrink-0" />
              <span className="text-[10px] font-medium text-subtle shrink-0">
                {course.level}
              </span>
            </div>

          </div>

          {/* Title */}
          <h3 className="text-strong font-bold text-sm @min-[17rem]:text-[15px] @min-[20rem]:text-base leading-snug line-clamp-2 mb-1.5 sm:mb-2">
            {course.title}
          </h3>

          {/* Consolidated Meta Row */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-subtle font-medium mb-2 sm:mb-3">
            <span className="text-body truncate max-w-full">{course.instructor.name}</span>
            <span className="w-1 h-1 rounded-full bg-faint shrink-0" />

            {/* Enrolment count is the first thing to go when space is tight */}
            <div className="hidden sm:flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>{formatNumber(course.studentsEnrolled)}</span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-faint" />

            <div className="flex items-center gap-1 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{formatDuration(course.durationHours)}</span>
            </div>

            {/* Phone-only rating, replacing the badge dropped from the thumb */}
            <span className="sm:hidden w-1 h-1 rounded-full bg-faint shrink-0" />
            <span className="sm:hidden text-amber-400 shrink-0">★ {course.rating.toFixed(1)}</span>
          </div>

          {/* Progress or Spacer */}
          {progress !== undefined ? (
            <div className="space-y-1.5 mt-auto mb-2 sm:mb-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-faint font-medium">Your Progress</span>
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
            {!inProgress && (
              <>
                <DiscountLine price={course.price} size="sm" className="mb-1" />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-strong font-bold text-base tracking-tight tabular-nums">
                    {formatRupees(course.price)}
                  </span>
                  <span className="bg-accent text-on-accent text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shrink-0">
                    Enroll
                  </span>
                </div>
              </>
            )}
            {inProgress && (
              <div className="flex items-center justify-end">
                <span className="bg-raised text-strong border border-line-strong text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shrink-0">
                  Continue
                </span>
              </div>
            )}
          </div>

          <div className="hidden sm:flex pt-3 border-t border-line items-end justify-between gap-2">
            {!inProgress ? (
              <>
                <div className="flex flex-col min-w-0">
                  <DiscountLine price={course.price} size="sm" className="mb-1 @min-[20rem]:hidden" />
                  <DiscountLine price={course.price} className="mb-1 hidden @min-[20rem]:flex" />
                  <span className="text-strong font-bold text-base @min-[17rem]:text-lg @min-[20rem]:text-xl tracking-tight leading-none tabular-nums">
                    {formatRupees(course.price)}
                  </span>
                </div>
                <span className="bg-accent text-on-accent group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] text-[10px] @min-[17rem]:text-[11px] @min-[20rem]:text-xs font-bold uppercase tracking-wide px-3 py-2 @min-[17rem]:px-4 @min-[20rem]:px-5 @min-[20rem]:py-2.5 rounded-lg transition-all duration-300 shrink-0">
                  Enroll
                </span>
              </>
            ) : (
              <div className="flex w-full justify-end">
                <span className="bg-raised text-strong group-hover:bg-line-strong border border-line-strong text-[10px] @min-[17rem]:text-[11px] @min-[20rem]:text-xs font-bold uppercase tracking-wide px-3 py-2 @min-[17rem]:px-4 @min-[20rem]:px-5 @min-[20rem]:py-2.5 rounded-lg transition-all duration-300 shrink-0">
                  Continue
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
