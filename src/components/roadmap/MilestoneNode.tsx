import { Link } from 'react-router-dom'
import { ArrowRight, Check, Zap } from 'lucide-react'
import type { MilestoneState, Requirement } from '../../data/roadmap'
import { isMet } from '../../data/roadmap'
import { cn } from '../../lib/cn'

/** Flat-top hexagon, matching the badge shape the marketing site uses. */
const HEX = '50,2 94,26 94,74 50,98 6,74 6,26'

function Hexagon({ milestone }: { milestone: MilestoneState }) {
  const { status, icon: Icon } = milestone
  const done = status === 'complete'
  const current = status === 'current'

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
      {current && (
        // The one node you can act on gets the only animation on the page.
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent/25 blur-xl motion-safe:animate-pulse"
        />
      )}

      <svg viewBox="0 0 100 100" className="relative w-full h-full" aria-hidden>
        <polygon
          points={HEX}
          className={cn(
            done && 'fill-accent/15 stroke-accent',
            current && 'fill-accent/10 stroke-accent',
            status === 'upcoming' && 'fill-raised stroke-line-strong'
          )}
          strokeWidth={done || current ? 3 : 2}
        />
      </svg>

      {/* Every stage shows its own icon. A padlock here said "you may not look
          at this", which was never true — the requirements below it were
          readable all along. */}
      <span className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={cn(
            'w-7 h-7 sm:w-8 sm:h-8',
            done ? 'text-easy' : current ? 'text-accent' : 'text-subtle'
          )}
          strokeWidth={1.8}
          aria-hidden
        />
      </span>

      {done && (
        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-easy border-2 border-page flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-page" strokeWidth={3} aria-hidden />
        </span>
      )}
    </div>
  )
}

function RequirementRow({ requirement }: { requirement: Requirement }) {
  const met = isMet(requirement)
  const pct = requirement.target <= 0 ? 100 : Math.min(100, (requirement.current / requirement.target) * 100)
  const suffix = requirement.unit === 'percent' ? '%' : ''

  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          'w-4 h-4 rounded-full border flex items-center justify-center shrink-0',
          met ? 'bg-easy border-easy' : 'border-line-strong'
        )}
        aria-hidden
      >
        {met && <Check className="w-2.5 h-2.5 text-page" strokeWidth={4} />}
      </span>

      <span className="flex-1 min-w-0">
        <span className={cn('block text-[13px] leading-tight', met ? 'text-body' : 'text-subtle')}>
          {requirement.label}
        </span>
        {/* Track is bg-line, not bg-raised — the upcoming panel is itself
            raised, and a raised track on a raised card is an invisible track. */}
        {!met && (
          <span className="mt-1.5 block h-1 w-full max-w-[220px] rounded-full bg-line overflow-hidden">
            <span className="block h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
          </span>
        )}
      </span>

      <span
        className={cn(
          'text-[11px] font-bold tabular-nums shrink-0',
          met ? 'text-easy' : 'text-faint'
        )}
      >
        {Math.min(requirement.current, requirement.target).toLocaleString()}{suffix}
        <span className="text-faint font-medium"> / {requirement.target.toLocaleString()}{suffix}</span>
      </span>
    </li>
  )
}

interface MilestoneNodeProps {
  milestone: MilestoneState
  /** Desktop only — even indexes sit left of the road, odd sit right. */
  side: 'left' | 'right'
}

export function MilestoneNode({ milestone, side }: MilestoneNodeProps) {
  const { status } = milestone
  const upcoming = status === 'upcoming'
  const alignEnd = side === 'right'

  return (
    <li
      className="relative grid lg:grid-cols-2 items-center gap-6 py-8 lg:py-0 lg:min-h-[19rem]"
      aria-current={status === 'current' ? 'step' : undefined}
    >
      {/* Content takes one half and the road weaves through the other. */}
      {alignEnd && <div className="hidden lg:block" aria-hidden />}

      <div
        className={cn(
          'flex items-center gap-4 sm:gap-6',
          alignEnd && 'lg:flex-row-reverse lg:text-right'
        )}
      >
        <Hexagon milestone={milestone} />

        <div className="min-w-0 flex-1">
          <div className={cn('flex items-center gap-2 mb-1', alignEnd && 'lg:justify-end')}>
            <span className={cn(
              'text-[10px] font-bold uppercase tracking-[0.16em]',
              upcoming ? 'text-faint' : 'text-accent'
            )}>
              Milestone {milestone.index + 1}
            </span>
            <span className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums',
              status === 'complete'
                ? 'bg-easy/12 text-easy'
                : upcoming ? 'bg-raised text-subtle' : 'bg-accent/12 text-accent'
            )}>
              <Zap className="w-2.5 h-2.5" strokeWidth={2.5} aria-hidden />
              {milestone.xp.toLocaleString()} XP
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight text-strong">
            {milestone.title}
          </h3>

          <p className="text-sm text-subtle mt-1 leading-relaxed">{milestone.tagline}</p>

          {/* The whole point of the rebuild: every node says what it wants and
              how close you are, including the ones still ahead. */}
          <div className={cn(
            'mt-4 rounded-2xl border p-4',
            status === 'complete' && 'milestone-panel-done',
            status === 'current' && 'milestone-panel-current',
            upcoming && 'milestone-panel-upcoming',
            alignEnd && 'lg:text-left'
          )}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-faint mb-3">
              {status === 'complete' ? 'Cleared' : 'To unlock'}
            </p>
            <ul className="space-y-3">
              {milestone.requirements.map(r => (
                <RequirementRow key={r.label} requirement={r} />
              ))}
            </ul>

            {status !== 'complete' && (
              <Link
                to={milestone.action.to}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:gap-2.5 transition-all"
              >
                {milestone.action.label}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
