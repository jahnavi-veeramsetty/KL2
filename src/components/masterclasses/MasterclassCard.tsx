import { Link } from 'react-router-dom'
import type { Masterclass } from '../../types'
import { Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { formatDuration } from '../../lib/format'
import { cn } from '../../lib/cn'

interface MasterclassCardProps {
  course: Masterclass
  className?: string
}

/**
 * Mirrors CourseCard: horizontal row below `sm`, full-bleed banner from `sm` up.
 * See CourseCard for why.
 */
export function MasterclassCard({ course, className }: MasterclassCardProps) {
  return (
    <Link
      to={ROUTES.MASTERCLASS_DETAIL(course.id)}
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

          {/* Solid brand fills rather than a dark scrim — they read as labels
              on the artwork instead of another translucent panel. Shown at every
              size now, so the content column carries no duplicate. */}
          <div className="flex absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex-wrap gap-1 sm:gap-1.5 z-10">
            {course.isBestseller && (
              <span className="bg-amber-500 text-strong text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="hidden sm:inline">Selling Fast</span>
                <span className="sm:hidden">Hot</span>
              </span>
            )}
            {course.isNew && (
              <span className="bg-accent-strong text-strong text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                New
              </span>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 min-w-0 sm:p-4">
          {/* Category · level, at the same weight CourseCard and HackathonCard
              use — this was a size and opacity off from both. */}
          <div className="flex items-center gap-2 mb-1 sm:mb-2 min-w-0">
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider truncate">
              {course.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-line-strong shrink-0" aria-hidden />
            <span className="text-[11px] font-medium text-subtle shrink-0">
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-strong font-bold text-sm @min-[17rem]:text-[15px] @min-[20rem]:text-base leading-snug line-clamp-2 mb-1.5 sm:mb-2">
            {course.title}
          </h3>

          {/* Consolidated Meta Row */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-subtle font-medium mb-1.5 sm:mb-2">
            <span className="text-body truncate max-w-full">{course.instructor.name}</span>
            <span className="w-1 h-1 rounded-full bg-faint shrink-0" />
            <div className="flex items-center gap-1 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <span>{formatDuration(course.durationHours)}</span>
            </div>
          </div>

          {/* Scheduled date */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-accent font-medium mb-2 sm:mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span className="truncate">{course.date}</span>
          </div>

          {/* Spacer */}
          <div className="mt-auto" />

          {/* Action. With no price to sit beside, the CTA takes the full width
              rather than floating in a half-empty row — and it says Register,
              because a masterclass is a seat at a live session, not a purchase.
              A span, not a button: the whole card is already a link. */}
          <div className="pt-2 sm:pt-3 sm:border-t sm:border-line">
            <span className="block w-full text-center text-[10px] @min-[17rem]:text-[11px] @min-[20rem]:text-xs font-bold uppercase tracking-wide px-3 py-2 @min-[20rem]:py-2.5 rounded-lg transition-colors duration-300 bg-accent text-on-accent group-hover:bg-accent/90">
              Register
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
