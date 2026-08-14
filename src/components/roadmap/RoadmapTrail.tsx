import { useCallback, useEffect, useId, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion'

/** One milestone row, in viewBox units. Rows are equal height, so a node's
    centre lands at 100i + 50 and the curve's extremes line up with them. */
const ROW = 100
/** How far the road swings off centre. Wide enough to read as a road, narrow
    enough that it never runs under the cards on either side. */
const SWING = 22

interface RoadmapTrailProps {
  /** How many milestones the trail has to weave past. */
  count: number
  /** 0–1 of the trail scrolled through, from the page's useScroll. */
  progress: MotionValue<number>
  /** The walker — the signed-in user's avatar. */
  avatar: ReactNode
}

/**
 * The serpentine, drawn by scrolling.
 *
 * The avatar leads and the road follows: one `getPointAtLength` call fixes the
 * walker, and the clip is cut to exactly that point's y. Driving the two
 * separately is what made the line outrun the avatar — a clip advances by
 * *height* while `getPointAtLength` advances by *arc length*, and on a curve
 * those are different journeys. Down the steep runs the road gained height
 * fast and shot ahead; through the flat swoops it stalled. Deriving one from
 * the other means they cannot drift, whatever shape the road takes.
 *
 * Everything below the scroll subscription writes straight to the DOM. React
 * state here would re-render five milestone cards on every scroll frame, which
 * is exactly the kind of thing that turns a nice effect into a janky one.
 *
 * The reveal is a clip rectangle rather than the usual stroke-dash trick. Dash
 * offsets do not survive `vector-effect: non-scaling-stroke` — that moves dash
 * lengths into screen units while `pathLength` normalises user units, and the
 * two disagree, so "progress" renders as disconnected segments scattered down
 * the whole road. A clip has no such conflict, and it is exact here because
 * the path only ever descends.
 */
export function RoadmapTrail({ count, progress, avatar }: RoadmapTrailProps) {
  const reduceMotion = useReducedMotion()
  const uid = useId()
  const gradientId = `trail-gradient-${uid}`
  const clipId = `trail-clip-${uid}`

  const pathRef = useRef<SVGPathElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const walkerRef = useRef<HTMLDivElement>(null)

  const height = ROW * count

  const d = useMemo(() => {
    if (count < 1) return ''
    // The road bulges into the half the milestone's card is *not* using —
    // even milestones sit left, so the road leans right past them.
    const x = (i: number) => (i % 2 === 0 ? 50 + SWING : 50 - SWING)

    let path = `M ${x(0)} 0 L ${x(0)} ${ROW / 2}`
    for (let i = 1; i < count; i++) {
      const prevY = ROW * (i - 1) + ROW / 2
      const y = ROW * i + ROW / 2
      path += ` C ${x(i - 1)} ${prevY + ROW / 2}, ${x(i)} ${y - ROW / 2}, ${x(i)} ${y}`
    }
    return path
  }, [count])

  const draw = useCallback((scrolled: number) => {
    const t = Math.max(0, Math.min(scrolled, 1))

    const path = pathRef.current
    const walker = walkerRef.current
    if (!path || !walker) return

    const point = path.getPointAtLength(path.getTotalLength() * t)

    // The road is cut to the walker's own y, so the head of the line is always
    // under their feet.
    rectRef.current?.setAttribute('height', String(point.y))

    // preserveAspectRatio="none" maps the viewBox linearly onto the box, so
    // viewBox coordinates convert to percentages with no measuring.
    walker.style.left = `${point.x}%`
    walker.style.top = `${(point.y / height) * 100}%`
    walker.style.opacity = '1'
  }, [height])

  useMotionValueEvent(progress, 'change', draw)

  // Land in the right place on mount — reloading half way down the page should
  // not start the walk from the top — and skip the walk entirely when the user
  // has asked for less motion.
  useEffect(() => {
    draw(reduceMotion ? 1 : progress.get())
  }, [draw, progress, reduceMotion])

  return (
    <div className="relative w-full h-full">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Stops come from CSS variables so the road darkens for the light
              theme instead of glowing pastel on white. */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--road-0)' }} />
            <stop offset="35%" style={{ stopColor: 'var(--road-1)' }} />
            <stop offset="70%" style={{ stopColor: 'var(--road-2)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--road-3)' }} />
          </linearGradient>

          <clipPath id={clipId}>
            <rect ref={rectRef} x="0" y="0" width="100" height="0" />
          </clipPath>
        </defs>

        {/* Road not yet walked. The dashes are deliberately in screen units —
            non-scaling-stroke keeps them the same size whatever the container
            does, which is what you want from a dotted guide. */}
        <path
          ref={pathRef}
          d={d}
          stroke="var(--color-line-strong)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="2 8"
          vectorEffect="non-scaling-stroke"
        />

        {/* Road walked */}
        <path
          d={d}
          stroke={`url(#${gradientId})`}
          strokeWidth={5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          clipPath={`url(#${clipId})`}
        />
      </svg>

      <Walker ref={walkerRef} label="You are here">{avatar}</Walker>
    </div>
  )
}

/** The avatar riding the head of the road. */
function Walker({
  ref,
  children,
  label,
}: {
  ref: RefObject<HTMLDivElement | null>
  children: ReactNode
  label: string
}) {
  return (
    <div
      ref={ref}
      title={label}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      style={{ left: '50%', top: '0%' }}
    >
      <span aria-hidden className="absolute -inset-2 rounded-full bg-accent/25 blur-md" />
      <span className="relative block rounded-full ring-2 ring-accent ring-offset-2 ring-offset-page">
        {children}
      </span>
      <span className="sr-only">{label}</span>
    </div>
  )
}

interface RoadmapSpineProps {
  progress: MotionValue<number>
  avatar: ReactNode
}

/**
 * The phone version. A serpentine squeezed into 360px is a squiggle, not a
 * road, so small screens get a straight spine — but the same walk down it.
 */
export function RoadmapSpine({ progress, avatar }: RoadmapSpineProps) {
  const reduceMotion = useReducedMotion()
  const fillRef = useRef<HTMLDivElement>(null)
  const walkerRef = useRef<HTMLDivElement>(null)

  const draw = useCallback((scrolled: number) => {
    const t = Math.max(0, Math.min(scrolled, 1))
    // Straight line, so height and position are the same number by definition.
    if (fillRef.current) fillRef.current.style.height = `${t * 100}%`
    if (walkerRef.current) {
      walkerRef.current.style.top = `${t * 100}%`
      walkerRef.current.style.opacity = '1'
    }
  }, [])

  useMotionValueEvent(progress, 'change', draw)

  useEffect(() => {
    draw(reduceMotion ? 1 : progress.get())
  }, [draw, progress, reduceMotion])

  return (
    <div className="lg:hidden absolute left-[39px] sm:left-[47px] top-0 bottom-0 w-0.5">
      <div className="absolute inset-0 rounded-full bg-line-strong" aria-hidden />
      <div ref={fillRef} className="absolute inset-x-0 top-0 h-0 rounded-full bg-accent" aria-hidden />
      <Walker ref={walkerRef} label="You are here">{avatar}</Walker>
    </div>
  )
}
