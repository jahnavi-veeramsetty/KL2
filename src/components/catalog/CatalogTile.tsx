import { Link } from 'react-router-dom'
import { ProgressBar } from '../../ui'
import { DiscountLine } from './DiscountLine'
import { formatDuration, formatRupees } from '../../lib/format'
import { cn } from '../../lib/cn'

/**
 * Fixed-width tile for use inside a Shelf. Unlike CourseCard it never goes
 * full-bleed — at 208px the 16:10 thumbnail is 130px, which keeps the artwork
 * legible while the shelves still stack.
 *
 * Carries the same information as the desktop card: level, the scheduled date
 * where there is one, and a price only where the caller still shows one. Only
 * genuinely secondary meta (instructor, enrolment count, marketing tags) is
 * dropped, because at 208px it would truncate rather than inform.
 */
interface CatalogTileProps {
  to: string
  thumbnail: string
  title: string
  category: string
  level?: string
  rating: number
  durationHours: number
  /** Omitted where the catalogue does not price its items — masterclasses. */
  price?: number
  /** Scheduled session date — masterclasses are live, so this is not optional information. */
  date?: string
  progress?: number
  ctaLabel?: string
}

export function CatalogTile({
  to,
  thumbnail,
  title,
  category,
  level,
  rating,
  durationHours,
  price,
  date,
  progress,
  ctaLabel,
}: CatalogTileProps) {
  const started = progress !== undefined
  const priced = price !== undefined
  const label = ctaLabel ?? (started ? 'Resume' : 'Enroll')

  return (
    <Link
      to={to}
      className="group block w-52 rounded-2xl overflow-hidden bg-page/80 border card-edge hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <div className="on-dark relative w-full aspect-[16/10] overflow-hidden bg-panel">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
      </div>

      <div className="p-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[9px] font-bold text-accent/90 uppercase tracking-[0.1em] truncate">
            {category}
          </span>
          {level && (
            <>
              <span className="w-1 h-1 rounded-full bg-line-strong shrink-0" />
              <span className="text-[9px] font-medium text-subtle shrink-0">{level}</span>
            </>
          )}
        </div>

        <h3 className="text-strong font-bold text-[13.5px] leading-snug line-clamp-2 mt-1 mb-1.5">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-[10px] text-subtle font-medium mb-1.5">
          <span>{formatDuration(durationHours)}</span>
          <span className="w-1 h-1 rounded-full bg-faint" />
          <span className="text-amber-400">★ {rating.toFixed(1)}</span>
        </div>

        {date && (
          <div className="flex items-center gap-1.5 text-[10px] text-accent font-medium mb-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span className="truncate">{date}</span>
          </div>
        )}

        {started && (
          <div className="mb-2">
            <ProgressBar value={progress} color="accent" />
          </div>
        )}

        {priced && <DiscountLine price={price} size="sm" className="mb-1" />}

        {/* Unpriced tiles give the CTA the full width, so it does not sit alone
            at the end of an otherwise empty row. */}
        <div className={cn('flex items-center gap-2', priced && 'justify-between')}>
          {priced && (
            <span className="text-strong font-bold text-[15px] tracking-tight tabular-nums">
              {formatRupees(price)}
            </span>
          )}
          {/* A span, not a button — the whole tile is already a link. */}
          <span className={cn(
            'text-[9.5px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-lg transition-colors',
            priced ? 'shrink-0' : 'flex-1 text-center',
            started
              ? 'bg-raised text-strong border border-line-strong group-hover:bg-line-strong'
              : 'bg-accent text-on-accent group-hover:bg-accent/90'
          )}>
            {label}
          </span>
        </div>
      </div>
    </Link>
  )
}
