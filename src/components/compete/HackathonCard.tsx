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

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isOngoing = hackathon.status === 'ongoing'
  const isPast = hackathon.status === 'past'

  return (
    <Link
      to={ROUTES.HACKATHON_DETAIL(hackathon.id)}
      className="block group focus-visible:outline-none h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden bg-[#0A0F1C]/80 border-white/5 hover:border-accent/40 hover:bg-[#0A0F1C] transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Banner — full-bleed, clipped by Card's radius */}
        <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0 bg-neutral/30">
          <img
            src={hackathon.banner}
            alt={hackathon.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Status + mode badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
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
        <div className="flex flex-col flex-1 p-4">
          {/* Theme tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {hackathon.theme.slice(0, 2).map(t => (
              <span key={t} className="text-[10px] font-bold text-accent/90 uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>

          {/* Title + tagline */}
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-1.5 group-hover:text-accent transition-colors">
            {hackathon.title}
          </h3>
          <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">{hackathon.tagline}</p>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] text-slate-400 font-medium mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
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
          <div className="pt-3 border-t border-white/5 flex items-end justify-between gap-2">
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
