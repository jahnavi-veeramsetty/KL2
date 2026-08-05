import type { Hackathon } from '../../types'
import { Link } from 'react-router-dom'
import { Trophy, Users, Calendar, Globe } from 'lucide-react'
import { Badge, Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { formatDate } from '../../lib/format'

interface HackathonCardProps {
  hackathon: Hackathon
}

const modeColors = {
  online: 'accent',
  offline: 'purple',
  hybrid: 'orange',
} as const

/**
 * Unlike CourseCard and MasterclassCard, this keeps the full-bleed vertical
 * layout at every breakpoint — a hackathon banner carries the event's identity
 * in a way a course thumbnail does not, so shrinking it to a side rail loses
 * the point of the card.
 *
 * Below `sm` the same layout is tightened rather than rearranged: the banner
 * drops from 16:10 to 21:9 (214px to 147px at phone width) and the paddings
 * step down. No content is dropped — the card goes from ~470px to ~380px with
 * every field still on it.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isOngoing = hackathon.status === 'ongoing'
  const isPast = hackathon.status === 'past'
  const dateLabel = isPast ? 'Held' : isOngoing ? 'Started' : 'Starts'

  return (
    <Link
      to={ROUTES.HACKATHON_DETAIL(hackathon.id)}
      className="block group focus-visible:outline-none h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden bg-page/80 border-line hover:border-accent/40 hover:bg-page transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Banner — shorter on phones, where full width makes 16:10 very tall */}
        <div className="on-dark relative w-full aspect-[21/9] sm:aspect-[16/10] overflow-hidden flex-shrink-0 bg-raised">
          <img
            src={hackathon.banner}
            alt={hackathon.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Status + mode badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5">
            {isOngoing && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 border border-green-500/40 rounded-full text-[9px] font-bold text-green-400 uppercase tracking-widest backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live
              </span>
            )}
            <Badge color={modeColors[hackathon.mode]} size="sm">
              {hackathon.mode.charAt(0).toUpperCase() + hackathon.mode.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 p-3 sm:p-4">
          {/* Theme tags */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
            {hackathon.theme.slice(0, 2).map(t => (
              <span key={t} className="text-[10px] font-bold text-accent/90 uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>

          {/* Title + tagline */}
          <h3 className="text-strong font-bold text-[15px] sm:text-base leading-snug line-clamp-2 mb-1 sm:mb-1.5">
            {hackathon.title}
          </h3>
          <p className="text-[11px] text-subtle line-clamp-2 mb-2 sm:mb-3">{hackathon.tagline}</p>

          {/* Meta. The date sits back in the grid but carries its own colour —
              indigo is unused elsewhere on the card (cyan is themes, amber the
              prize, green the Live badge), so it separates from the grey meta
              without a chip around it. */}
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] text-subtle font-medium mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold" title={`${dateLabel} ${formatDate(hackathon.startDate)}`}>
              <Calendar className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
              <span className="truncate">{formatDate(hackathon.startDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Team {hackathon.teamSize.min}–{hackathon.teamSize.max}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{hackathon.participantsCount.toLocaleString()} joined</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="mt-auto" />

          {/* Prize + action. A span, not a button — the whole card is already a link. */}
          <div className="pt-2.5 sm:pt-3 border-t border-line flex items-end justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-faint text-[10px] font-medium mb-0.5">Prize pool</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold text-lg sm:text-xl leading-none truncate">
                <Trophy className="w-4 h-4 shrink-0" />
                {hackathon.prizePool}
              </span>
            </div>

            <span
              className={
                isPast
                  ? 'text-xs font-bold uppercase tracking-wide px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-raised text-faint border border-line-strong shrink-0'
                  : 'text-xs font-bold uppercase tracking-wide px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-accent text-on-accent group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0'
              }
            >
              {isPast ? 'Ended' : isOngoing ? 'Join' : 'Register'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
