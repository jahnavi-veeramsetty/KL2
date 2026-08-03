import { Calendar, Clock, Target, Users, Ticket } from 'lucide-react'
import type { Contest } from '../../types'
import { formatDateTime } from '../../lib/format'


interface ContestDetailHeroProps {
  contest: Contest
}

export function ContestDetailHero({ contest }: ContestDetailHeroProps) {

  return (
    <div className="relative rounded-3xl overflow-hidden mb-10 bg-[#060b1a] border border-white/5 p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between">
        
        {/* Left Side */}
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-amber-900/40 text-amber-500 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-500/20">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              FILLING FAST
            </span>
            <span className="px-3 py-1 bg-blue-900/40 text-blue-400 rounded-full text-xs font-bold border border-blue-800/50">
              Coding Contest
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {contest.title}
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/20 text-blue-400 border border-blue-800/40 rounded-full text-sm font-semibold mb-8">
            <Target className="w-4 h-4" />
            Competitive Programming
          </div>
          
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-8">
            {contest.description || "Our flagship weekly contest with algorithmic problems ranging from easy to hard. All skill levels welcome."}
          </p>

          <div className="flex flex-wrap gap-8 items-center">
            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-950/50 border border-blue-900/30 flex items-center justify-center text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-0.5">Date</span>
                <span className="text-sm font-bold text-white">{formatDateTime(contest.startTime)}</span>
              </div>
            </div>
            
            {/* Duration */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-950/50 border border-blue-900/30 flex items-center justify-center text-blue-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-0.5">Duration</span>
                <span className="text-sm font-bold text-white">{Math.floor(contest.durationMins / 60)}h {contest.durationMins % 60 > 0 ? `${contest.durationMins % 60}m` : ''}</span>
              </div>
            </div>

            {/* Team Size */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-950/50 border border-blue-900/30 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-0.5">Team Size</span>
                <span className="text-sm font-bold text-white">1</span>
              </div>
            </div>

            {/* Entry Fee */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-950/50 border border-blue-900/30 flex items-center justify-center text-blue-400">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-0.5">Entry Fee</span>
                <span className="text-sm font-bold text-white">{contest.entryFee || 'Free'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
