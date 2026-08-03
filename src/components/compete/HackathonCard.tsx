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
 * Mirrors CourseCard: horizontal row below `sm`, full-bleed banner from `sm` up.
 * See CourseCard for why.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isOngoing = hackathon.status === 'ongoing'
  const isPast = hackathon.status === 'past'
  const modeLabel = hackathon.mode.charAt(0).toUpperCase() + hackathon.mode.slice(1)

  return (
    <Link
      to={ROUTES.HACKATHON_DETAIL(hackathon.id)}
      className="block group focus-visible:outline-none h-full"
    >
      <Card className="flex flex-row sm:flex-col h-full overflow-hidden gap-3 sm:gap-0 p-3 sm:p-0 rounded-2xl sm:rounded-[20px] bg-[#0A0F1C]/80 border-white/5 hover:border-accent/40 hover:bg-[#0A0F1C] transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Banner — left rail on phones, full-bleed from sm up */}
        <div className="relative w-[108px] shrink-0 self-stretch rounded-xl overflow-hidden bg-neutral/30 sm:w-full sm:self-auto sm:rounded-none sm:aspect-[16/10]">
          <img
            src={hackathon.banner}
            alt={hackathon.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Status + mode badges — two pills will not fit over a 108px thumb,
              so on phones they move inline below the title. */}
          <div className="hidden sm:flex absolute top-3 left-3 flex-wrap gap-1.5">
            {isOngoing && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 border border-green-500/40 rounded-full text-[9px] font-bold text-green-400 uppercase tracking-widest backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live
              </span>
            )}
            <Badge color={modeColors[hackathon.mode]} size="sm">
              {modeLabel}
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 min-w-0 sm:p-4">
          {/* Theme tags — one is enough on a phone */}
          <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2 min-w-0">
            {hackathon.theme.slice(0, 2).map((t, i) => (
              <span
                key={t}
                className={`text-[10px] font-bold text-accent/90 uppercase tracking-wider truncate ${i > 0 ? 'hidden sm:inline' : ''}`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title + tagline */}
          <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-1.5 group-hover:text-accent transition-colors">
            {hackathon.title}
          </h3>
          <p className="hidden sm:block text-[11px] text-slate-400 line-clamp-2 mb-3">{hackathon.tagline}</p>

          {/* Phone-only status row, replacing the badges dropped from the banner */}
          <div className="flex sm:hidden items-center gap-2 mb-2">
            {isOngoing && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 uppercase tracking-widest shrink-0">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live
              </span>
            )}
            <span className="text-[10px] font-medium text-slate-400 shrink-0">{modeLabel}</span>
          </div>

          {/* Meta — wraps on phones, two columns from sm up */}
          <div className="flex flex-wrap sm:grid sm:grid-cols-2 gap-y-1.5 gap-x-2 text-[10px] sm:text-[11px] text-slate-400 font-medium mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">{formatDate(hackathon.startDate)}</span>
            </div>
            {/* Team size is the first thing to go when space is tight */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Team {hackathon.teamSize.min}–{hackathon.teamSize.max}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">{hackathon.participantsCount.toLocaleString()} joined</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="mt-auto" />

          {/* Prize + action. A span, not a button — the whole card is already a link. */}
          <div className="flex sm:hidden items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold text-base leading-none truncate">
              <Trophy className="w-3.5 h-3.5 shrink-0" />
              {hackathon.prizePool}
            </span>
            <span
              className={
                isPast
                  ? 'text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg bg-white/5 text-slate-500 border border-white/10 shrink-0'
                  : 'text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg bg-accent text-[#060b1a] shrink-0'
              }
            >
              {isPast ? 'Ended' : isOngoing ? 'Join' : 'Register'}
            </span>
          </div>

          <div className="hidden sm:flex pt-3 border-t border-white/5 items-end justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-slate-500 text-[10px] font-medium mb-0.5">Prize pool</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold text-xl leading-none truncate">
                <Trophy className="w-4 h-4 shrink-0" />
                {hackathon.prizePool}
              </span>
            </div>

            <span
              className={
                isPast
                  ? 'text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg bg-white/5 text-slate-500 border border-white/10 shrink-0'
                  : 'text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg bg-accent text-[#060b1a] group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0'
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
