import type { Hackathon } from '../../types'
import { Link } from 'react-router-dom'
import { Trophy, Users, Calendar, Globe } from 'lucide-react'
import { Card } from '../../ui'
import { ROUTES } from '../../constants/routes'
import { formatDate } from '../../lib/format'
import { cn } from '../../lib/cn'

interface HackathonCardProps {
  hackathon: Hackathon
}

/**
 * Tinted glass rather than a solid fill — the translucent treatment suits the
 * banner artwork here in a way a flat block does not.
 *
 * What stopped it blending into the image is underneath, in BADGE_BASE: the
 * backdrop is blurred *and* darkened before the tint goes on, so the chip
 * always sits on a consistent dark ground whatever the banner is doing behind
 * it. The old version tinted the raw image, so a bright photo swallowed it.
 *
 * The label is the 300 shade rather than 100. Near-white text on a light wash
 * survives the darkened backdrop but arrives with the hue drained out of it,
 * which reads as pale; a third of the way down the ramp keeps the colour while
 * still clearing contrast against the ground beneath.
 */
const MODE_GLASS = {
  online: 'bg-cyan-500/35 border-cyan-400/70 text-cyan-300',
  offline: 'bg-purple-500/35 border-purple-400/70 text-purple-300',
  hybrid: 'bg-orange-500/35 border-orange-400/70 text-orange-300',
} as const

const BADGE_BASE =
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ' +
  'uppercase tracking-widest backdrop-blur-md backdrop-brightness-[0.4] ' +
  'shadow-[0_2px_10px_rgba(0,0,0,0.45)]'

/**
 * Unlike CourseCard and MasterclassCard, this keeps the full-bleed vertical
 * layout at every breakpoint — a hackathon banner carries the event's identity
 * in a way a course thumbnail does not, so shrinking it to a side rail loses
 * the point of the card.
 *
 * Below `sm` the same layout is tightened rather than rearranged: the banner
 * drops from 16:10 to 21:9 (214px to 147px at phone width) and the paddings
 * step down. No content is dropped — the card goes from ~470px to ~380px with
 * every field still on it.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isOngoing = hackathon.status === 'ongoing'
  const isPast = hackathon.status === 'past'
  const dateLabel = isPast ? 'Held' : isOngoing ? 'Started' : 'Starts'

  return (
    <Link
      to={ROUTES.HACKATHON_DETAIL(hackathon.id)}
      className="@container block group focus-visible:outline-none h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden bg-page/80 border-line hover:border-accent/40 hover:bg-page transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-accent/5">

        {/* Banner — shorter on phones, where full width makes 16:10 very tall */}
        <div className="on-dark relative w-full aspect-[21/9] sm:aspect-[16/10] overflow-hidden flex-shrink-0 bg-raised">
          <img
            src={hackathon.banner}
            alt={hackathon.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Status + mode badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10">
            {isOngoing && (
              <span className={cn(BADGE_BASE, 'bg-green-500/35 border-green-400/70 text-green-300')}>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" aria-hidden />
                Live
              </span>
            )}
            <span className={cn(BADGE_BASE, MODE_GLASS[hackathon.mode])}>
              {hackathon.mode.charAt(0).toUpperCase() + hackathon.mode.slice(1)}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 p-3 sm:p-4">
          {/* Theme tags, in the same shape CourseCard and MasterclassCard use
              for category · level — accent lead, dot, muted second. They were
              two equal-weight accent words with no separator here, which read
              as a different kind of label on an otherwise matching card. */}
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2 min-w-0">
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider truncate">
              {hackathon.theme[0]}
            </span>
            {hackathon.theme[1] && (
              <>
                <span className="w-1 h-1 rounded-full bg-line-strong shrink-0" aria-hidden />
                <span className="text-[11px] font-medium text-subtle truncate">
                  {hackathon.theme[1]}
                </span>
              </>
            )}
          </div>

          {/* Title + tagline */}
          <h3 className="text-strong font-bold text-[15px] sm:text-base leading-snug line-clamp-2 mb-1 sm:mb-1.5">
            {hackathon.title}
          </h3>
          <p className="text-[11px] text-subtle line-clamp-2 mb-2 sm:mb-3">{hackathon.tagline}</p>

          {/* Meta. The date sits back in the grid but carries its own colour —
              indigo is unused elsewhere on the card (cyan is themes, amber the
              prize, green the Live badge), so it separates from the grey meta
              without a chip around it. */}
          {/* Wrapping row, not a fixed 2-column grid — a half-width column at
              the four-up card size clipped "Aug 29, 2026" to "Aug 29, 20…". */}
          <div className="flex flex-wrap gap-y-1.5 gap-x-3 text-[11px] text-subtle font-medium mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold" title={`${dateLabel} ${formatDate(hackathon.startDate)}`}>
              <Calendar className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
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

          {/* Prize + action. A span, not a button — the whole card is already a
              link. The figure is sized in `cqw`: at a flat 20px a six-figure
              prize pool no longer fitted beside the CTA once the grid went
              four-up, and `truncate` was quietly cutting "₹1,00,000" to
              "₹1,00,". */}
          <div className="pt-2.5 sm:pt-3 border-t border-line flex items-end justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-faint text-[10px] font-medium mb-0.5">Prize pool</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold text-[clamp(0.8125rem,6.5cqw,1.25rem)] leading-none min-w-0">
                <Trophy className="w-4 h-4 shrink-0" />
                <span className="truncate">{hackathon.prizePool}</span>
              </span>
            </div>

            <span
              className={
                isPast
                  ? 'text-[11px] @min-[19rem]:text-xs font-bold uppercase tracking-wide px-3 @min-[19rem]:px-5 py-2 @min-[19rem]:py-2.5 rounded-lg bg-raised text-faint border border-line-strong shrink-0'
                  : 'text-[11px] @min-[19rem]:text-xs font-bold uppercase tracking-wide px-3 @min-[19rem]:px-5 py-2 @min-[19rem]:py-2.5 rounded-lg bg-accent text-on-accent group-hover:bg-accent/90 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0'
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
