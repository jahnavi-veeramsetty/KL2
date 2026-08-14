import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import { ArrowRight, Rocket, Sparkles, Zap } from 'lucide-react'
import { Avatar, Breadcrumbs } from '../ui'
import { useProfile } from '../hooks/useProfile'
import { useSidebar } from '../hooks/useSidebar'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ROUTES } from '../constants/routes'
import { buildRoadmap, DEFAULT_PATH, ROADMAP_PATHS } from '../data/roadmap'
import { RoadmapSpine, RoadmapTrail } from '../components/roadmap/RoadmapTrail'
import { MilestoneNode } from '../components/roadmap/MilestoneNode'
import { cn } from '../lib/cn'

export default function RoadmapPage() {
  useDocumentTitle('Roadmap')
  const { profile } = useProfile()
  const [pathId, setPathId] = useState(DEFAULT_PATH)

  const roadmap = useMemo(() => buildRoadmap(pathId, profile), [pathId, profile])

  // The road needs the width — it weaves across the full column — so the rail
  // folds away while you are here. Forced rather than set, so the user's own
  // sidebar preference is untouched and comes back on the way out.
  const { setForcedCollapsed } = useSidebar()
  useEffect(() => {
    setForcedCollapsed(true)
    return () => setForcedCollapsed(false)
  }, [setForcedCollapsed])

  // Drives the draw. The end edge is 0.95 rather than something higher up the
  // viewport: at the very bottom of the page the trail's own bottom only ever
  // reaches ~0.9 of the viewport, so an earlier target is unreachable and the
  // walk would stop a little short of the last milestone however far you
  // scrolled. This way it completes just before the page runs out.
  const trailRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ['start 0.85', 'end 0.95'],
  })

  const walker = <Avatar name={profile.fullName} src={profile.avatarUrl} size="sm" />

  return (
    <>
      <Breadcrumbs
        backTo={ROUTES.PROFILE}
        className="mb-6"
        items={[{ label: 'Profile', to: ROUTES.PROFILE }, { label: 'Roadmap' }]}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
          <Rocket className="w-3.5 h-3.5" strokeWidth={2} aria-hidden />
          Roadmap to mastery
        </span>

        <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-strong tracking-tight leading-[1.1]">
          The Knowvation Path
        </h1>

        <p className="mt-4 text-[15px] text-subtle leading-relaxed">
          Level up from a curious learner to an industry elite. Five milestones, each one
          graded against what you have actually done — so you always know exactly what is
          left.
        </p>
      </header>

      {/* ── Path picker ────────────────────────────────────────────────────── */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {ROADMAP_PATHS.map(path => (
          <button
            key={path.id}
            type="button"
            onClick={() => setPathId(path.id)}
            aria-pressed={path.id === pathId}
            className={cn(
              'px-4 py-2 rounded-xl text-[13px] font-semibold border transition-colors',
              path.id === pathId
                ? 'bg-accent text-on-accent border-transparent'
                : 'bg-panel text-subtle border-line hover:text-strong hover:border-line-strong'
            )}
          >
            {path.title}
          </button>
        ))}
      </div>

      {/* ── Progress summary ───────────────────────────────────────────────── */}
      {/* Sized to its contents, not to the column. At max-w-3xl the three
          groups sat in the left half with a third of the card empty beside
          them, which read as a layout bug rather than as a summary. */}
      <section
        aria-label="Your progress"
        className="mt-6 mx-auto w-fit max-w-full rounded-2xl border border-line bg-panel px-5 py-4 sm:px-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
          <div className="shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-faint">
              Milestones cleared
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-strong tabular-nums leading-none">
                {roadmap.completed}
                <span className="text-subtle text-lg font-semibold"> / {roadmap.total}</span>
              </span>
              <span className="flex items-center gap-1.5" aria-hidden>
                {roadmap.milestones.map(m => (
                  <span
                    key={m.id}
                    className={cn(
                      'w-2 h-2 rounded-full',
                      m.status === 'complete' && 'bg-easy',
                      m.status === 'current' && 'bg-accent',
                      m.status === 'upcoming' && 'bg-line-strong'
                    )}
                  />
                ))}
              </span>
            </div>
          </div>

          <div className="hidden sm:block w-px self-stretch bg-line" aria-hidden />

          <div className="shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-faint">
              Path XP earned
            </p>
            <p className="flex items-center gap-1.5 text-2xl font-bold text-strong tabular-nums mt-2 leading-none">
              <Zap className="w-4 h-4 text-accent" strokeWidth={2.5} aria-hidden />
              {roadmap.xpEarned.toLocaleString()}
              <span className="text-subtle text-lg font-semibold">
                {' '}/ {roadmap.xpTotal.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="hidden sm:block w-px self-stretch bg-line" aria-hidden />

          {/* What to do next, not just where you are. */}
          <div className="min-w-0 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-faint">Up next</p>
            {roadmap.current ? (
              <Link
                to={roadmap.current.action.to}
                className="group mt-2 flex items-center gap-2 min-w-0"
              >
                <span className="text-sm font-bold text-strong truncate">
                  {roadmap.current.title}
                </span>
                <ArrowRight
                  className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-0.5 transition-transform"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </Link>
            ) : (
              <p className="flex items-center gap-2 text-sm font-bold text-easy mt-2">
                <Sparkles className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden />
                Path complete
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── The road ───────────────────────────────────────────────────────── */}
      <div ref={trailRef} className="relative mt-10 sm:mt-14 pb-8">
        <div className="hidden lg:block absolute inset-0">
          <RoadmapTrail
            count={roadmap.milestones.length}
            progress={scrollYProgress}
            avatar={walker}
          />
        </div>

        <RoadmapSpine progress={scrollYProgress} avatar={walker} />

        <ol className="relative">
          {roadmap.milestones.map(m => (
            <MilestoneNode
              key={m.id}
              milestone={m}
              side={m.index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </ol>
      </div>
    </>
  )
}
