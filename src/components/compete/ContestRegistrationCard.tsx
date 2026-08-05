import { Users } from 'lucide-react'
import { Button } from '../../ui'
import type { Contest } from '../../types'
import { useCountdown } from '../../hooks/useCountdown'
import { padTwo } from '../../lib/format'

interface ContestRegistrationCardProps {
  contest: Contest
}

/** One countdown digit pair. Raised, so the tile reads as a tile — it used to
    be bg-page on a bg-page card, which left four outlines and no surface. */
function Tile({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="w-full aspect-square max-w-[64px] bg-raised rounded-2xl border border-line-strong flex items-center justify-center text-2xl font-bold text-strong tabular-nums">
        {padTwo(value)}
      </span>
      <span className="text-[10px] font-bold text-faint uppercase tracking-wider">{unit}</span>
    </div>
  )
}

export function ContestRegistrationCard({ contest }: ContestRegistrationCardProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(contest.startTime)
  const isPast = contest.status === 'past'
  const isLive = contest.status === 'live'
  const showCountdown = !isPast && !isLive && !isExpired

  const paid = contest.entryFee && contest.entryFee !== 'Free'
  const label = isPast
    ? 'Contest ended'
    : isLive
      ? 'Join contest now'
      : paid
        ? `Pay ${contest.entryFee} & register`
        : 'Register free'

  return (
    <div className="bg-panel border border-line rounded-2xl p-5 sm:p-6">
      {showCountdown && (
        <>
          <p className="text-[10px] font-bold text-faint tracking-widest uppercase text-center mb-3">
            Starts in
          </p>
          {/* A grid, not a flex row with ":" separators — the colons pushed the
              tiles off-centre and had to be nudged up by a margin to look level. */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <Tile value={hours} unit="hrs" />
            <Tile value={minutes} unit="min" />
            <Tile value={seconds} unit="sec" />
          </div>
        </>
      )}

      {isLive && (
        <div className="flex items-center justify-center gap-2 mb-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden />
          <span className="text-xs font-bold text-green-400 uppercase tracking-wider">In progress</span>
        </div>
      )}

      <Button className="w-full py-3.5 text-base rounded-xl font-bold" disabled={isPast}>
        {label}
      </Button>

      {!isPast && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-subtle font-medium mt-4 tabular-nums">
          <Users className="w-3.5 h-3.5 text-faint shrink-0" strokeWidth={1.8} aria-hidden />
          {contest.participants.toLocaleString()} registered
        </p>
      )}
    </div>
  )
}
