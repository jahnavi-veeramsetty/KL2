import { useCountdown } from '../../hooks/useCountdown'
import { Calendar, Clock, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui'
import { ROUTES } from '../../constants/routes'
import type { Contest, Hackathon } from '../../types'
import { formatDateTime } from '../../lib/format'

interface CompeteHeroProps {
  featuredEvent: Contest | Hackathon
}

export function CompeteHero({ featuredEvent }: CompeteHeroProps) {
  const isHackathon = 'tagline' in featuredEvent
  const startTime = isHackathon ? (featuredEvent as Hackathon).startDate : (featuredEvent as Contest).startTime
  const { isExpired, days, hours, minutes, seconds } = useCountdown(startTime)
  const navigate = useNavigate()

  const handleActionClick = () => {
    if (isHackathon) {
      navigate(ROUTES.HACKATHON_DETAIL(featuredEvent.id))
    } else {
      navigate(ROUTES.CONTEST_DETAIL(featuredEvent.id))
    }
  }

  const isLive = featuredEvent.status === 'live' || featuredEvent.status === 'ongoing'

  const labelText = isHackathon ? (featuredEvent as Hackathon).mode.toUpperCase() : (featuredEvent as Contest).difficulty
  const description = isHackathon ? (featuredEvent as Hackathon).tagline : (featuredEvent as Contest).description
  const prize = isHackathon ? (featuredEvent as Hackathon).prizePool : (featuredEvent as Contest).prize
  const participants = isHackathon ? (featuredEvent as Hackathon).participantsCount : (featuredEvent as Contest).participants

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-primary border border-accent/20 p-8 md:p-12 mb-10">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Event info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            {isLive ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-xs font-bold text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                LIVE NOW
              </span>
            ) : (
              <span className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-bold text-accent">
                UPCOMING
              </span>
            )}
            <span className="text-xs text-muted">{labelText}</span>
            {isHackathon && (
              <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-md text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                Hackathon
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-tertiary">{featuredEvent.title}</h2>
          <p className="text-muted">{description}</p>

          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDateTime(startTime)}</span>
            {!isHackathon && (
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {Math.floor((featuredEvent as Contest).durationMins / 60)}h {(featuredEvent as Contest).durationMins % 60}m</span>
            )}
            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4" /> {prize}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex-shrink-0 text-center">
          {!isExpired ? (
            <div className="space-y-3">
              <p className="text-xs text-muted uppercase tracking-wider">{isLive ? 'Time Remaining' : 'Starts In'}</p>
              <div className="flex items-center gap-2">
                {days > 0 && (
                  <>
                    <CountUnit value={days} label="D" />
                    <span className="text-2xl text-muted font-bold">:</span>
                  </>
                )}
                <CountUnit value={hours} label="H" />
                <span className="text-2xl text-muted font-bold">:</span>
                <CountUnit value={minutes} label="M" />
                <span className="text-2xl text-muted font-bold">:</span>
                <CountUnit value={seconds} label="S" />
              </div>
              <Button size="lg" onClick={handleActionClick}>
                {isLive ? 'Enter' : 'Register Now'}
              </Button>
              <p className="text-xs text-muted">{participants.toLocaleString()} registered</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-2xl font-bold text-muted">Ended</p>
              <Button variant="secondary" onClick={handleActionClick}>View Results</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-xl bg-secondary/60 border border-white/10 flex items-center justify-center">
        <span className="text-2xl font-bold text-tertiary font-mono">{String(value).padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] text-muted mt-1">{label}</span>
    </div>
  )
}
