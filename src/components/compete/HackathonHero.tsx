import { Link } from 'react-router-dom'
import { Users, Trophy, CalendarDays, MapPin } from 'lucide-react'
import type { Hackathon } from '../../types'
import { ROUTES } from '../../constants/routes'
import { useCountdown } from '../../hooks/useCountdown'
import { formatDate } from '../../lib/format'
import { cn } from '../../lib/cn'

/**
 * The featured hackathon, led by its own artwork.
 *
 * The previous hero rendered a generic cyan gradient and never touched
 * `banner`, so every event looked identical — a banner with no banner in it.
 * It also counted down to `startDate` while `registrationDeadline` sat unused,
 * which is the wrong number: "starts in 15 days" reads as relaxed when entries
 * actually close in 10.
 */
interface HackathonHeroProps {
  hackathon: Hackathon
}

/** Whichever deadline is actually next — that is the one worth counting to. */
function nextDeadline(hackathon: Hackathon) {
  const now = Date.now()
  const registration = new Date(hackathon.registrationDeadline).getTime()

  if (hackathon.status === 'ongoing') {
    return { target: hackathon.endDate, label: 'Submissions close in' }
  }
  if (hackathon.status === 'upcoming' && registration > now) {
    return { target: hackathon.registrationDeadline, label: 'Registration closes in' }
  }
  return { target: hackathon.startDate, label: 'Starts in' }
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="w-11 sm:w-12 py-2 rounded-xl bg-black/45 border border-line-strong backdrop-blur-sm text-center text-lg sm:text-xl font-bold text-strong tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/50 mt-1.5">{label}</span>
    </div>
  )
}

export function HackathonHero({ hackathon }: HackathonHeroProps) {
  const isLive = hackathon.status === 'ongoing'
  const { target, label } = nextDeadline(hackathon)
  const { days, hours, minutes, seconds, isExpired } = useCountdown(target)

  // Under three days the countdown stops being information and starts being a
  // prompt, so it changes colour rather than just ticking down.
  const urgent = !isExpired && days < 3

  return (
    <section className="on-dark relative rounded-3xl overflow-hidden border border-line-strong mb-8 isolate">
      {/* Artwork */}
      <img
        src={hackathon.banner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Scrims: one across for the copy, one up from the base for the meta row.
          Two directions rather than one flat overlay, so the artwork still
          reads on the right where nothing sits on top of it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050914] via-[#050914]/92 to-[#050914]/45" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />

      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-end gap-7 lg:gap-10">
        <div className="min-w-0 flex-1">
          {/* Status + mode */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            {isLive ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/45 text-[10px] font-bold text-green-400 uppercase tracking-[0.12em]">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Live now
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-accent/15 border border-accent/40 text-[10px] font-bold text-accent uppercase tracking-[0.12em]">
                Featured
              </span>
            )}
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-line-strong border border-line-strong text-[10px] font-bold text-white/80 uppercase tracking-[0.12em]">
              <MapPin className="w-3 h-3" />
              {hackathon.mode}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-strong leading-[1.08] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {hackathon.title}
          </h2>
          <p className="text-sm sm:text-base text-body mt-2.5 max-w-xl">{hackathon.tagline}</p>

          {/* Themes — on the type today and shown nowhere */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {hackathon.theme.map(t => (
              <span
                key={t}
                className="px-2 py-1 rounded-md bg-raised border border-line-strong text-[10px] font-bold text-body uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Facts */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs font-medium text-body">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Trophy className="w-4 h-4" />
              {hackathon.prizePool}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-subtle" />
              {hackathon.participantsCount.toLocaleString()} registered
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-subtle" />
              {formatDate(hackathon.startDate)}
            </span>
            <span className="text-subtle">
              Teams of {hackathon.teamSize.min}&ndash;{hackathon.teamSize.max}
            </span>
          </div>

          {hackathon.sponsors.length > 0 && (
            <p className="mt-4 text-[10px] text-faint">
              <span className="uppercase tracking-[0.12em] font-bold">Sponsored by</span>{' '}
              <span className="text-subtle">
                {hackathon.sponsors.slice(0, 3).map(s => s.name).join(' · ')}
              </span>
            </p>
          )}
        </div>

        {/* Countdown + CTA */}
        <div className="shrink-0 lg:text-right">
          <p className={cn(
            'text-[10px] font-bold uppercase tracking-[0.14em] mb-2.5',
            urgent ? 'text-red-400' : 'text-white/55'
          )}>
            {isExpired ? 'Closed' : label}
          </p>

          {!isExpired && (
            <div className="flex items-center gap-1.5 sm:gap-2 lg:justify-end">
              {days > 0 && <Unit value={days} label="days" />}
              <Unit value={hours} label="hrs" />
              <Unit value={minutes} label="min" />
              <Unit value={seconds} label="sec" />
            </div>
          )}

          <Link
            to={ROUTES.HACKATHON_DETAIL(hackathon.id)}
            className={cn(
              'mt-5 inline-flex items-center justify-center px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              isLive
                ? 'bg-green-500 text-[#04140d] hover:bg-green-400 shadow-[0_0_24px_rgba(34,197,94,0.35)]'
                : 'bg-accent text-on-accent hover:bg-accent/90 shadow-[0_0_24px_rgba(34,211,238,0.3)]'
            )}
          >
            {isLive ? 'Enter hackathon' : isExpired ? 'View details' : 'Register now'}
          </Link>
        </div>
      </div>
    </section>
  )
}
