import { Calendar, Clock, Ticket, Trophy, Users } from 'lucide-react'
import type { Contest } from '../../types'
import { Badge } from '../../ui'
import { formatDateTime } from '../../lib/format'
import { cn } from '../../lib/cn'

interface ContestDetailHeroProps {
  contest: Contest
}

/**
 * A contest has no artwork — unlike a course or a hackathon there is no banner
 * in the data — so the hero earns its weight from the spotlight surface the
 * Compete page already uses for a featured contest. Same device, so arriving
 * here still feels continuous with the card you clicked.
 *
 * What it no longer does: claim "FILLING FAST" on every contest regardless of
 * how full it is, print "Coding Contest" and "Competitive Programming" as two
 * separate pills that say the same thing, hardcode a team size of 1, or
 * substitute a paragraph about a "flagship weekly contest" when the real
 * description is missing. Those were four different ways of showing something
 * the data never said.
 */
export function ContestDetailHero({ contest }: ContestDetailHeroProps) {
  const isLive = contest.status === 'live'
  const isPast = contest.status === 'past'

  const hours = Math.floor(contest.durationMins / 60)
  const mins = contest.durationMins % 60

  const stats = [
    { icon: Calendar, label: 'Starts', value: formatDateTime(contest.startTime) },
    { icon: Clock, label: 'Duration', value: `${hours}h${mins > 0 ? ` ${mins}m` : ''}` },
    { icon: Users, label: 'Registered', value: contest.participants.toLocaleString() },
    { icon: Ticket, label: 'Entry', value: contest.entryFee || 'Free' },
  ]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border p-6 sm:p-8 mb-8',
        isLive ? 'border-green-500/30 spotlight-success' : 'border-accent/25 spotlight-accent'
      )}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {isLive && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-[10px] font-bold text-green-400 uppercase tracking-[0.14em]">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" aria-hidden />
            Live now
          </span>
        )}
        {isPast && (
          <span className="px-2.5 py-1 rounded-full bg-raised border border-line-strong text-[10px] font-bold text-subtle uppercase tracking-[0.14em]">
            Ended
          </span>
        )}
        {/* A division, not a difficulty ramp — "Div. 2" and "Educational" are
            categories, so this is one accent badge rather than a green/amber/red
            scale that would imply an ordering the values do not have. */}
        <Badge color="accent">{contest.difficulty}</Badge>
        {contest.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-raised border border-line text-[10px] font-semibold text-subtle uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-strong tracking-tight leading-tight">
        {contest.title}
      </h1>

      {contest.description && (
        <p className="mt-3 text-[15px] text-body leading-relaxed max-w-2xl">{contest.description}</p>
      )}

      {contest.prize && (
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-400">
          <Trophy className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden />
          {contest.prize}
        </p>
      )}

      {/* Four facts, one row. The icon tiles were blue-950 boxes with blue-400
          glyphs — invisible on a light page — and are accent tokens now. */}
      <dl className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-xl bg-accent/12 border border-accent/20 flex items-center justify-center shrink-0">
              <Icon className="w-[18px] h-[18px] text-accent" strokeWidth={1.8} aria-hidden />
            </span>
            <div className="min-w-0">
              <dt className="text-[10px] font-bold uppercase tracking-widest text-faint">{label}</dt>
              <dd className="text-sm font-bold text-strong truncate">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
