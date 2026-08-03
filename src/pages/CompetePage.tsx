import { useMemo } from 'react'
import { ContestCard } from '../components/compete/ContestCard'
import { LeaderboardPanel } from '../components/compete/LeaderboardPanel'
import { contests } from '../data'
export default function CompetePage() {
  const activeContests = useMemo(() =>
    contests.filter(c => c.status === 'live' || c.status === 'upcoming'),
    []
  )


  const pastContests = contests.filter(c => c.status === 'past')


  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Left Content */}
        <div className="flex-1 w-full min-w-0">

          <div className="space-y-8 mt-4">
              <div className="pt-4">
                <h3 className="text-xl font-bold text-tertiary mb-4">Live & Upcoming Contests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeContests.map(c => <ContestCard key={c.id} contest={c} />)}
                </div>
              </div>

              {pastContests.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-tertiary mb-4">Past Contest Results</h3>
                  <div className="space-y-3">
                    {pastContests.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-4 bg-secondary/30 border border-white/8 rounded-xl text-sm">
                        <span className="text-tertiary font-medium">{c.title}</span>
                        {c.yourRank && <span className="text-accent font-bold">Rank #{c.yourRank}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Right Sidebar Leaderboard */}
        <div className="w-full lg:w-[350px] lg:sticky lg:top-24 h-fit flex-shrink-0">
          <h2 className="text-xl font-bold text-tertiary mb-4">Global Leaderboard</h2>
          {pastContests.length > 0 && pastContests[0].leaderboard && (
            <LeaderboardPanel
              entries={pastContests[0].leaderboard!}
              yourRank={pastContests[0].yourRank}
              yourScore={pastContests[0].yourScore}
            />
          )}
        </div>
      </div>
    </>
  )
}
