import { useParams, Navigate } from 'react-router-dom'
import { Info, CheckCircle, CalendarDays, Code2 } from 'lucide-react'
import { Breadcrumbs } from '../ui'
import { DetailPanel, DetailSection, NumberedList } from '../components/detail/DetailKit'
import { cn } from '../lib/cn'
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

  const startedAt = new Date(contest.startTime).getTime()
  const endsAt = new Date(startedAt + contest.durationMins * 60000).toISOString()
  const resultsAt = new Date(startedAt + (contest.durationMins + 60) * 60000).toISOString()

  const schedule = [
    {
      when: 'Open now',
      label: 'Registration opens',
      detail: 'Open to all eligible participants.',
      dot: 'bg-accent',
      tone: 'text-accent',
    },
    {
      when: formatDateTime(contest.startTime),
      label: 'Contest begins',
      detail: 'Problem statements are revealed.',
      dot: 'bg-warning',
      tone: 'text-warning',
    },
    {
      when: formatDateTime(endsAt),
      label: 'Contest ends',
      detail: 'Submissions close.',
      dot: 'bg-danger',
      tone: 'text-danger',
    },
    {
      when: formatDateTime(resultsAt),
      label: 'Results announced',
      detail: 'Final leaderboard and editorial solutions published.',
      dot: 'bg-success',
      tone: 'text-success',
    },
  ]

  return (
    <>
      <Breadcrumbs
          backTo={ROUTES.COMPETE}
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

          <DetailSection icon={Info} title="About this contest">
            <DetailPanel>
              <p className="text-[15px] text-body leading-relaxed">{contest.description}</p>
            </DetailPanel>
          </DetailSection>

          {/* contest.problems has been in the data all along and was never
              rendered — the one section a competitive programmer actually opens
              a contest page to read. Hidden for upcoming contests, since the
              statements are not revealed until it starts. */}
          {contest.problems && contest.problems.length > 0 && contest.status !== 'upcoming' && (
            <DetailSection icon={Code2} title="Problems">
              <DetailPanel className="p-0 overflow-hidden">
                <ul className="divide-y divide-line">
                  {contest.problems.map((problem, i) => (
                    <li
                      key={problem.id}
                      className="flex items-center gap-3 px-4 sm:px-5 py-3.5"
                    >
                      <span className="w-6 h-6 rounded-lg bg-raised border border-line flex items-center justify-center shrink-0 text-[11px] font-bold text-faint tabular-nums">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 min-w-0 text-sm font-medium text-strong truncate">
                        {problem.title}
                      </span>
                      <span className="shrink-0 text-xs text-subtle tabular-nums hidden sm:block">
                        {problem.solved.toLocaleString()} solved
                      </span>
                      <span className="shrink-0 text-xs font-bold text-accent tabular-nums w-14 text-right">
                        {problem.points} pts
                      </span>
                    </li>
                  ))}
                </ul>
              </DetailPanel>
            </DetailSection>
          )}

          <DetailSection icon={CheckCircle} title="Requirements">
            <NumberedList items={contest.rules} />
          </DetailSection>

          <DetailSection icon={CalendarDays} title="Schedule">
            <DetailPanel>
              {/* The dot colours are the stage, not decoration: accent for what
                  is open, warning for the start, danger for the close, success
                  for results. Tokens, so they hold in both themes — these were
                  literal blues with a glow that only worked on near-black. */}
              <ol className="relative border-l border-line-strong ml-2 space-y-7">
                {schedule.map(event => (
                  <li key={event.label} className="relative pl-6">
                    <span
                      aria-hidden
                      className={cn('absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full', event.dot)}
                    />
                    <span className={cn('block text-[11px] font-bold uppercase tracking-wider', event.tone)}>
                      {event.when}
                    </span>
                    <span className="block text-[15px] font-semibold text-strong mt-0.5">{event.label}</span>
                    <span className="block text-sm text-subtle mt-0.5">{event.detail}</span>
                  </li>
                ))}
              </ol>
            </DetailPanel>
          </DetailSection>
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
