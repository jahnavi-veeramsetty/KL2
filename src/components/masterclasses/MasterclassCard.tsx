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

export function MasterclassCard({ course, className }: MasterclassCardProps) {
  return (
    <Link
      to={ROUTES.MASTERCLASS_DETAIL(course.id)}
      className={cn('block group focus-visible:outline-none h-full', className)}
    >
      <Card className="flex flex-col h-full overflow-hidden bg-[#0A0F1C]/80 border-white/5 hover:border-accent/40 hover:bg-[#0A0F1C] transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Thumbnail — full-bleed banner above the details at every breakpoint */}
        <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0 bg-[#0f1523]">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
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
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 font-medium mb-2">
            <span className="text-slate-300">{course.instructor.name}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <span>{formatDuration(course.durationHours)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-[11px] text-accent font-medium mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>{course.date}</span>
          </div>

          {/* Spacer */}
          <div className="mt-auto" />

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
            <span className="text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg transition-all duration-300 bg-accent text-[#060b1a] group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0">
              Enroll
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
