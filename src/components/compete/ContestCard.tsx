import type { Contest } from '../../types'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, Trophy } from 'lucide-react'
import { Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { useCountdown } from '../../hooks/useCountdown'
import { formatDateTime } from '../../lib/format'
import { cn } from '../../lib/cn'

interface ContestCardProps {
  contest: Contest
}

/**
 * The countdown is the reason this card exists, so it gets a panel of its own
 * rather than being one line among the meta. Everything else compresses into a
 * single row beneath it.
 *
 * CTAs are spans, not Buttons — the whole card is already a Link, and a button
 * inside an anchor is invalid HTML that traps keyboard users.
 */
export function ContestCard({ contest }: ContestCardProps) {
  const isLive = contest.status === 'live'
  const isPast = contest.status === 'past'

  // Live contests count down to the end, upcoming ones to the start.
  const endTime = new Date(new Date(contest.startTime).getTime() + contest.durationMins * 60_000)
  const { formatted, isExpired } = useCountdown(isLive ? endTime : contest.startTime)

  const hours = Math.floor(contest.durationMins / 60)
  const mins = contest.durationMins % 60
  const isFree = !contest.entryFee || contest.entryFee === 'Free'

  return (
    <Link
      to={ROUTES.CONTEST_DETAIL(contest.id)}
      className="block group h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-[20px]"
    >
      <Card
        className={cn(
          'flex flex-col h-full p-4 sm:p-5 bg-page/80 border-line shadow-none transition-all duration-300',
          isLive
            ? 'border-green-500/25 hover:border-green-500/50'
            : 'hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5'
        )}
      >
        {/* Status + division + fee */}
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
          {isLive && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/35 text-[9px] font-bold text-green-400 uppercase tracking-[0.12em]">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live
            </span>
          )}
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-subtle px-2 py-0.5 rounded-full bg-raised border border-line-strong">
            {contest.difficulty}
          </span>
          {/* The entry fee is a price, not a footnote — it was set at 10px in a
              row of 9px chips, so it read as one more label. Sized against the
              prize on the footer row instead. */}
          <span
            className={cn(
              'ml-auto text-sm font-bold tracking-tight tabular-nums leading-none',
              isFree ? 'text-green-400' : 'text-strong'
            )}
          >
            {isFree ? 'FREE' : contest.entryFee}
          </span>
        </div>

        {/* Title */}
        {/* No hover recolour — the card's own border and shadow already answer
            the pointer, and tinting the title cyan on top of that reads as the
            heading changing meaning. */}
        <h3 className="font-bold text-strong text-base sm:text-lg leading-snug line-clamp-2">
          {contest.title}
        </h3>

        {/* Countdown, or your result once it is over */}
        {!isPast && !isExpired ? (
          <div
            className={cn(
              'mt-3 sm:mt-4 rounded-xl border px-3.5 py-2.5 sm:px-4 sm:py-3',
              isLive ? 'border-green-500/20 bg-green-500/[0.07]' : 'border-accent/20 bg-accent/[0.06]'
            )}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-faint">
              {isLive ? 'Ends in' : 'Starts in'}
            </p>
            <p
              className={cn(
                'text-lg sm:text-xl font-bold tracking-tight tabular-nums leading-none mt-1',
                isLive ? 'text-green-400' : 'text-accent'
              )}
            >
              {formatted}
            </p>
          </div>
        ) : isPast && contest.yourRank ? (
          <div className="mt-3 sm:mt-4 rounded-xl border border-line bg-raised px-3.5 py-2.5 sm:px-4 sm:py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-faint">Your result</p>
            <p className="text-lg sm:text-xl font-bold text-accent tracking-tight tabular-nums leading-none mt-1">
              #{contest.yourRank}
              {contest.yourScore !== undefined && (
                <span className="text-xs font-semibold text-subtle ml-2">{contest.yourScore} pts</span>
              )}
            </p>
          </div>
        ) : null}

        {/* Meta — one wrapping row instead of three stacked lines */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 sm:mt-4 text-[11px] text-subtle font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-faint shrink-0" />
            {formatDateTime(contest.startTime)}
          </span>
          <span className="w-1 h-1 rounded-full bg-faint" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-faint shrink-0" />
            {hours}h{mins > 0 ? ` ${mins}m` : ''}
          </span>
          <span className="w-1 h-1 rounded-full bg-faint" />
          <span className="flex items-center gap-1.5 tabular-nums">
            <Users className="w-3.5 h-3.5 text-faint shrink-0" />
            {contest.participants.toLocaleString()}
          </span>
        </div>

        <div className="mt-auto" />

        {/* Prize + action */}
        <div className="flex items-center justify-between gap-3 pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-line">
          {contest.prize ? (
            <span className="flex items-center gap-1.5 text-amber-400 font-bold text-sm tracking-tight truncate">
              <Trophy className="w-4 h-4 shrink-0" /> {contest.prize}
            </span>
          ) : (
            <span className="text-xs text-faint">No prize pool</span>
          )}

          <span
            className={cn(
              'text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-lg shrink-0 transition-colors',
              isPast
                ? 'bg-raised text-subtle border border-line-strong'
                : isLive
                  ? 'bg-green-500 text-[#04140d] group-hover:bg-green-400'
                  : 'bg-accent text-on-accent group-hover:bg-accent/90'
            )}
          >
            {isPast ? 'Standings' : isLive ? 'Join now' : isFree ? 'Register' : `Pay ${contest.entryFee}`}
          </span>
        </div>
      </Card>
    </Link>
  )
}
