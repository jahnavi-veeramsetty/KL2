import { Link } from 'react-router-dom'
import { Clock, Users, Trophy, Ticket, Radio } from 'lucide-react'
import type { Contest } from '../../types'
import { ROUTES } from '../../constants/routes'
import { useCountdown } from '../../hooks/useCountdown'
import { formatDateTime } from '../../lib/format'
import { cn } from '../../lib/cn'

/**
 * Feature slot for the contest that matters right now — the live one, or the
 * next to open. The page previously opened straight into a grid heading even
 * while a contest was running, which buried the one thing a competitor came for.
 *
 * The countdown flips meaning with status: time until it starts, or time left
 * to compete once it has. Both are derived from startTime + durationMins, which
 * were already on the type and never rendered together.
 */
export function ContestHero({ contest }: { contest: Contest }) {
  const isLive = contest.status === 'live'

  // Live contests count down to the end; upcoming ones to the start.
  const endTime = new Date(new Date(contest.startTime).getTime() + contest.durationMins * 60_000)
  const { formatted, isExpired } = useCountdown(isLive ? endTime : contest.startTime)

  const hours = Math.floor(contest.durationMins / 60)
  const mins = contest.durationMins % 60
  const isFree = !contest.entryFee || contest.entryFee === 'Free'

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 sm:p-7',
        isLive
          ? 'border-green-500/30 bg-gradient-to-br from-[#0a2018] via-[#0b1a24] to-[#050e18]'
          : 'border-accent/25 bg-gradient-to-br from-[#0d2a4d] via-[#102f4f] to-[#0a1e3d]'
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full blur-3xl',
          isLive ? 'bg-green-500/15' : 'bg-accent/20'
        )}
      />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {isLive ? (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-[10px] font-bold text-green-400 uppercase tracking-[0.14em]">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live now
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-bold text-accent uppercase tracking-[0.14em]">
                <Radio className="w-3 h-3" /> Next up
              </span>
            )}
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.07] border border-white/10">
              {contest.difficulty}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {contest.title}
          </h2>
          <p className="text-sm text-slate-400 mt-1.5 line-clamp-2 max-w-2xl">{contest.description}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {hours}h{mins > 0 ? ` ${mins}m` : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {contest.participants.toLocaleString()} registered
            </span>
            {contest.prize && (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Trophy className="w-3.5 h-3.5" /> {contest.prize}
              </span>
            )}
            <span className={cn('flex items-center gap-1.5 font-bold', isFree ? 'text-green-400' : 'text-blue-400')}>
              <Ticket className="w-3.5 h-3.5" /> {isFree ? 'Free entry' : contest.entryFee}
            </span>
          </div>
        </div>

        {/* Countdown + CTA */}
        <div className="shrink-0 lg:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-1.5">
            {isExpired ? (isLive ? 'Finishing up' : 'Starting now') : isLive ? 'Ends in' : 'Starts in'}
          </p>
          <p
            className={cn(
              'text-2xl sm:text-3xl font-bold tracking-tight tabular-nums leading-none',
              isLive ? 'text-green-400' : 'text-accent'
            )}
          >
            {formatted}
          </p>
          <p className="text-[11px] text-slate-500 mt-1.5">{formatDateTime(contest.startTime)}</p>

          <Link
            to={ROUTES.CONTEST_DETAIL(contest.id)}
            className={cn(
              'inline-block mt-4 text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              isLive
                ? 'bg-green-500 text-[#04140d] hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'bg-accent text-[#060b1a] hover:bg-accent/90 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
            )}
          >
            {isLive ? 'Enter contest' : isFree ? 'Register' : `Pay ${contest.entryFee}`}
          </Link>
        </div>
      </div>
    </section>
  )
}
