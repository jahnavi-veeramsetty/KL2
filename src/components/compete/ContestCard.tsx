import type { Contest } from '../../types'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, Trophy, Ticket, CircleAlert, AlarmClock } from 'lucide-react'
import { Button, Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { useCountdown } from '../../hooks/useCountdown'
import { formatDateTime } from '../../lib/format'

interface ContestCardProps {
  contest: Contest
}

export function ContestCard({ contest }: ContestCardProps) {
  const { formatted, isExpired } = useCountdown(contest.startTime)
  const isLive = contest.status === 'live'
  const isPast = contest.status === 'past'

  return (
    <Link to={ROUTES.CONTEST_DETAIL(contest.id)} className="block group focus-visible:outline-none h-full">
      <Card className="p-5 flex flex-col gap-4 h-full group border-white/5 hover:border-accent/40 transition-all duration-300">
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 border border-green-500/40 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Live</span>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-bold text-white text-xl leading-snug pr-12">{contest.title}</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-white/[0.08] text-slate-300 text-xs font-semibold rounded-full border border-white/10">
            {contest.difficulty}
          </span>
          {contest.prize && (
            <span className="text-sm text-amber-400 font-bold tracking-wide flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> {contest.prize}
            </span>
          )}
          {contest.entryFee && contest.entryFee !== 'Free' && (
            <span className="text-sm text-blue-400 font-bold tracking-wide flex items-center gap-1.5 ml-auto">
              <Ticket className="w-4 h-4" /> {contest.entryFee}
            </span>
          )}
          {(!contest.entryFee || contest.entryFee === 'Free') && (
            <span className="text-sm text-green-400 font-bold tracking-wide flex items-center gap-1.5 ml-auto">
              <Ticket className="w-4 h-4" /> Free
            </span>
          )}
        </div>
      </div>

      <div className="text-sm text-slate-400 space-y-2 mt-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" /> 
          <span>{formatDateTime(contest.startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" /> 
          <span>{Math.floor(contest.durationMins / 60)}h {contest.durationMins % 60 > 0 ? `${contest.durationMins % 60}m` : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" /> 
          <span>{contest.participants.toLocaleString()} participants</span>
        </div>
      </div>

      {!isPast && !isExpired && (
        <div className="text-[15px] font-medium text-slate-300 mt-2 flex items-center gap-2">
          {isLive ? <CircleAlert className="w-4 h-4 text-red-500" /> : <AlarmClock className="w-4 h-4 text-slate-400" />}
          {isLive ? 'Ends in' : 'Starts in'} 
          <span className="text-cyan-400 font-bold tracking-wide ml-1">{formatted}</span>
        </div>
      )}

      {isPast && contest.yourRank && (
        <div className="text-sm bg-white/5 rounded-xl px-4 py-3 mt-2 border border-white/5">
          Your rank: <span className="text-cyan-400 font-bold">#{contest.yourRank}</span>
          {contest.yourScore && <span className="text-slate-400 ml-2">({contest.yourScore} pts)</span>}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        {!isPast && (
          <Button size="md" className="flex-1 font-bold text-[15px] rounded-xl py-2.5">
            {isLive ? 'Join Now' : (contest.entryFee && contest.entryFee !== 'Free' ? `Pay ${contest.entryFee}` : 'Register')}
          </Button>
        )}
        <Button variant="secondary" size="md" className={`font-semibold rounded-xl text-[15px] ${isPast ? 'flex-1' : 'px-6'}`}>
          Details
        </Button>
        </div>
      </Card>
    </Link>
  )
}
