import { Link } from 'react-router-dom'
import { Radio, CalendarDays, Clock, User } from 'lucide-react'
import type { Masterclass } from '../../types'
import { ROUTES } from '../../constants/routes'
import { useCountdown } from '../../hooks/useCountdown'
import { formatDuration, formatRupees } from '../../lib/format'
import { parseSessionStart, sessionState } from '../../lib/masterclass'
import { cn } from '../../lib/cn'

/**
 * What a student can join right now, or next.
 *
 * Masterclasses are live sessions and the page showed no sign of it — a grid of
 * cards with a date buried in each. Whether something is on *now* is the one
 * thing a schedule has to answer on sight.
 *
 * Artwork-led, like HackathonHero, so the two featured slots in the app read as
 * the same idea rather than two unrelated panels.
 */
export function LiveSessionBanner({ masterclass }: { masterclass: Masterclass }) {
  const state = sessionState(masterclass.date)
  const start = parseSessionStart(masterclass.date)
  const { formatted, days, hours, minutes } = useCountdown(start ?? new Date())

  const isLive = state === 'live'
  const isSoon = state === 'soon'

  // "August 15, 2026 • 10:00 AM IST" — split so the day and the clock time can
  // be weighted separately. On a live session the when is the whole point, so
  // it is promoted out of the grey meta row into its own panel.
  const [dayPart, timePart] = masterclass.date.split('•').map(part => part.trim())

  // "3d 04h" reads better than a ticking 76:12:44 when the session is days out;
  // the seconds only matter once it is close.
  const countdown = isLive
    ? 'In progress'
    : days > 0
      ? `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
      : formatted

  return (
    <section className="relative rounded-2xl overflow-hidden border border-white/10 mb-6 isolate">
      {/* Artwork */}
      <img
        src={masterclass.thumbnail}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 bg-gradient-to-r',
          isLive
            ? 'from-[#04140d] via-[#04140d]/93 to-[#04140d]/45'
            : 'from-[#050914] via-[#050914]/93 to-[#050914]/45'
        )}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {isLive ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/25 border border-green-500/50 text-[10px] font-bold text-green-400 uppercase tracking-[0.12em]">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Live now
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/40 text-[10px] font-bold text-accent uppercase tracking-[0.12em]">
                <Radio className="w-3 h-3" />
                {isSoon ? 'Starting soon' : 'Next session'}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-white/80 uppercase tracking-[0.12em]">
              {masterclass.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-white/80 uppercase tracking-[0.12em]">
              {masterclass.level}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-tight line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {masterclass.title}
          </h2>
          <p className="text-[13px] text-slate-300 mt-2 max-w-xl line-clamp-2">
            {masterclass.shortDescription}
          </p>

          {/* When it runs, given its own weight */}
          <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 px-3.5 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-accent shrink-0" />
              <span className="text-[13px] font-bold text-white tracking-tight">{dayPart}</span>
            </span>
            {timePart && (
              <>
                <span className="w-px h-4 bg-white/15" />
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-[13px] font-bold text-accent tracking-tight tabular-nums">{timePart}</span>
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(masterclass.durationHours)} session
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {masterclass.instructor.name}
            </span>
          </div>
        </div>

        <div className="shrink-0 lg:text-right">
          <p className={cn(
            'text-[10px] font-bold uppercase tracking-[0.14em] mb-1.5',
            isLive ? 'text-green-400' : isSoon ? 'text-amber-400' : 'text-white/55'
          )}>
            {isLive ? 'Happening now' : 'Starts in'}
          </p>
          <p className={cn(
            'text-xl sm:text-2xl font-bold tracking-tight tabular-nums leading-none',
            isLive ? 'text-green-400' : 'text-white'
          )}>
            {countdown}
          </p>

          <div className="flex items-center gap-3 mt-4 lg:justify-end">
            <span className="text-sm font-bold text-white tabular-nums">
              {formatRupees(masterclass.price)}
            </span>
            <Link
              to={ROUTES.MASTERCLASS_DETAIL(masterclass.id)}
              className={cn(
                'inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                isLive
                  ? 'bg-green-500 text-[#04140d] hover:bg-green-400 shadow-[0_0_22px_rgba(34,197,94,0.35)]'
                  : 'bg-accent text-[#060b1a] hover:bg-accent/90 shadow-[0_0_22px_rgba(34,211,238,0.28)]'
              )}
            >
              {isLive ? 'Join session' : 'Reserve seat'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
