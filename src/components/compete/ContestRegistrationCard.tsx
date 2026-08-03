import { Button } from '../../ui'
import type { Contest } from '../../types'
import { useCountdown } from '../../hooks/useCountdown'
import { padTwo } from '../../lib/format'

interface ContestRegistrationCardProps {
  contest: Contest
}

export function ContestRegistrationCard({ contest }: ContestRegistrationCardProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(contest.startTime)
  const isPast = contest.status === 'past'

  return (
    <div className="bg-[#060b1a] border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col items-center">
      {!isPast && !isExpired && (
        <div className="w-full flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Starts In</span>
          <div className="flex items-center justify-center gap-2 mb-6 w-full">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#0a1128] rounded-2xl border border-white/5 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {padTwo(hours)}
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase">H</span>
            </div>
            <span className="text-2xl font-bold text-slate-600 mb-6">:</span>
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#0a1128] rounded-2xl border border-white/5 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {padTwo(minutes)}
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-600 mb-6">:</span>
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#0a1128] rounded-2xl border border-white/5 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {padTwo(seconds)}
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase">S</span>
            </div>
          </div>
        </div>
      )}

      <Button 
        className={`w-full py-4 text-lg rounded-xl font-bold ${isPast ? '' : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.3)]'}`}
        disabled={isPast}
      >
        {isPast ? 'Contest Ended' : contest.status === 'live' ? 'Join Contest Now' : (contest.entryFee && contest.entryFee !== 'Free' ? `Pay ${contest.entryFee} & Register` : 'Register for Free')}
      </Button>
      {!isPast && (
        <p className="text-center text-xs text-slate-400 font-medium mt-4">
          {contest.participants.toLocaleString()} registered
        </p>
      )}
    </div>
  )
}
