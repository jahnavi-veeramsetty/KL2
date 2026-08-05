import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { cn } from '../../lib/cn'

/**
 * Current rating, peak, and the run of contests that produced them.
 *
 * profile.ratings has always existed and was rendered nowhere in the app. A
 * contest page is where it belongs — without it the page is a listing of events
 * rather than a record of how you are doing at them.
 *
 * The chart is a hand-built SVG polyline rather than a chart library: six points
 * do not justify a dependency, and this way it inherits the theme directly.
 */
const CHART_W = 300
const CHART_H = 72

export function RatingCard() {
  const { profile } = useProfile()
  const history = profile.ratings

  if (history.length === 0) return null

  const latest = history[history.length - 1]
  const previous = history.length > 1 ? history[history.length - 2] : undefined
  const delta = previous ? latest.rating - previous.rating : 0
  const peak = history.reduce((best, p) => (p.rating > best.rating ? p : best), history[0])

  // Pad the domain so a flat run does not divide by zero or hug the edges.
  const values = history.map(p => p.rating)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(1, max - min)
  const pad = span * 0.15

  const points = history.map((p, i) => {
    const x = history.length === 1 ? CHART_W / 2 : (i / (history.length - 1)) * CHART_W
    const y = CHART_H - ((p.rating - min + pad) / (span + pad * 2)) * CHART_H
    return { ...p, x, y }
  })

  const line = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const area = `${line} ${CHART_W},${CHART_H} 0,${CHART_H}`
  const last = points[points.length - 1]

  const DeltaIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus
  const deltaTone = delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-subtle'

  return (
    <div className="rounded-2xl border border-line bg-raised/30 p-5">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h3 className="text-sm font-bold text-strong tracking-tight">Your rating</h3>
        <span className="text-[11px] text-faint tabular-nums">
          {history.length} contests
        </span>
      </div>

      <div className="flex items-end gap-4 mb-1">
        <p className="text-3xl font-bold text-strong tracking-tight leading-none tabular-nums">
          {latest.rating}
        </p>
        <span className={cn('flex items-center gap-1 text-xs font-bold tabular-nums pb-0.5', deltaTone)}>
          <DeltaIcon className="w-3.5 h-3.5" />
          {delta > 0 ? '+' : ''}{delta}
        </span>
      </div>
      <p className="text-[11px] text-faint">
        Peak <span className="text-body font-semibold tabular-nums">{peak.rating}</span>
        {' · '}
        Rank <span className="text-body font-semibold tabular-nums">#{profile.stats.globalRank.toLocaleString()}</span>
        {' · '}
        Top <span className="text-body font-semibold tabular-nums">{(100 - profile.stats.percentile).toFixed(1)}%</span>
      </p>

      {/* Progression */}
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full h-[72px] mt-4 overflow-visible"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Rating progression across ${history.length} contests, currently ${latest.rating}`}
      >
        <defs>
          <linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#ratingFill)" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Emphasise where you are now */}
        <circle cx={last.x} cy={last.y} r="3.5" fill="var(--color-accent)" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="flex items-center justify-between text-[10px] text-faint mt-2 gap-2">
        <span className="truncate">{history[0].contestName}</span>
        <span className="truncate text-right">{latest.contestName}</span>
      </div>

      <p className="text-[11px] text-faint mt-3 pt-3 border-t border-line">
        Last placement{' '}
        <span className="text-body font-semibold tabular-nums">#{latest.placement.toLocaleString()}</span>
      </p>
    </div>
  )
}
