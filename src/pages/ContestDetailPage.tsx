import { useParams, Navigate } from 'react-router-dom'
import { Info, CheckCircle, CalendarDays } from 'lucide-react'
import { BackButton, Breadcrumbs } from '../ui'
import { ContestDetailHero } from '../components/compete/ContestDetailHero'
import { ContestRegistrationCard } from '../components/compete/ContestRegistrationCard'

import { LeaderboardPanel } from '../components/compete/LeaderboardPanel'
import { contests } from '../data'
import { ROUTES } from '../constants/routes'
import { formatDateTime } from '../lib/format'


export default function ContestDetailPage() {
  const { contestId } = useParams<{ contestId: string }>()
  const contest = contests.find(c => c.id === contestId || c.slug === contestId)
  if (!contest) return <Navigate to={ROUTES.COMPETE} replace />

  return (
    <>
      <BackButton fallbackTo={ROUTES.COMPETE} className="mb-2" />

      <Breadcrumbs
        className="mb-6"
        items={[
          { label: 'Coding Contest', to: ROUTES.COMPETE },
          { label: contest.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          <ContestDetailHero contest={contest} />

          {/* About */}
          <section className="bg-secondary/20 border border-white/5 p-6 md:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <Info className="text-blue-400 w-5 h-5" /> About Contest
            </h2>
            <p className="text-slate-300 leading-relaxed text-[15px]">{contest.description}</p>
          </section>

          {/* Rules / Requirements */}
          <section className="bg-secondary/20 border border-white/5 p-6 md:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <CheckCircle className="text-blue-400 w-5 h-5" /> Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contest.rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.07] transition-colors">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section className="bg-secondary/20 border border-white/5 p-6 md:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
              <CalendarDays className="text-blue-400 w-5 h-5" /> Contest Schedule
            </h2>
            
            <div className="relative border-l border-blue-900/30 ml-3 space-y-8 pb-4">
              {/* Event 1 */}
              <div className="relative pl-8">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Starts</span>
                  <span className="text-base font-semibold text-white">Registration Opens</span>
                  <span className="text-sm text-slate-400">Open for all eligible participants</span>
                </div>
              </div>
              
              {/* Event 2 */}
              <div className="relative pl-8">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{formatDateTime(contest.startTime)}</span>
                  <span className="text-base font-semibold text-white">Contest Begins</span>
                  <span className="text-sm text-slate-400">Problem statements will be revealed.</span>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative pl-8">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                    {formatDateTime(new Date(new Date(contest.startTime).getTime() + contest.durationMins * 60000).toISOString())}
                  </span>
                  <span className="text-base font-semibold text-white">Contest Ends</span>
                  <span className="text-sm text-slate-400">Submissions are closed.</span>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative pl-8">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
                    {formatDateTime(new Date(new Date(contest.startTime).getTime() + (contest.durationMins + 60) * 60000).toISOString())}
                  </span>
                  <span className="text-base font-semibold text-white">Results Announced</span>
                  <span className="text-sm text-slate-400">Final leaderboards and solutions published.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
          <ContestRegistrationCard contest={contest} />

          {contest.leaderboard && (
            <LeaderboardPanel
              entries={contest.leaderboard}
              yourRank={contest.yourRank}
              yourScore={contest.yourScore}
            />
          )}
        </div>
      </div>
    </>
  )
}
