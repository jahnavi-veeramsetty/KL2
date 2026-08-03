import { Link } from 'react-router-dom'
import type { Masterclass } from '../../types'
import { Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { DiscountLine } from '../catalog/DiscountLine'
import { formatDuration, formatRupees } from '../../lib/format'
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

            {/* One short tag on a phone; "Selling Fast" degrades to "Hot". */}
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
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-slate-400 font-medium mb-1.5 sm:mb-2">
            <span className="text-slate-300 truncate max-w-full">{course.instructor.name}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
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

          {/* Price & Action — inline on phones, stacked from sm up */}
          <div className="sm:hidden">
            <DiscountLine price={course.price} size="sm" className="mb-1" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-white font-bold text-base tracking-tight tabular-nums">
                {formatRupees(course.price)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg bg-accent text-[#060b1a] shrink-0">
                Enroll
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
            <span className="text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg transition-all duration-300 bg-accent text-[#060b1a] group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0">
              Enroll
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
