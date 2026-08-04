import { useMemo } from 'react'

import { HackathonHero } from '../components/compete/HackathonHero'
import { HackathonCard } from '../components/compete/HackathonCard'
import { CardGrid } from '../components/catalog/CardGrid'
import { hackathons } from '../data'

function SectionHead({ title, count, tone, pulse }: { title: string; count: number; tone: string; pulse?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />}
      <h3 className={`text-xs font-bold uppercase tracking-[0.12em] ${tone}`}>{title}</h3>
      <span className="text-[11px] font-semibold text-slate-600 tabular-nums">{count}</span>
      <span className="flex-1 h-px bg-white/[0.06]" />
    </div>
  )
}

export default function HackathonsPage() {
  const featuredEvent =
    hackathons.find(h => h.status === 'ongoing') || hackathons.find(h => h.status === 'upcoming')

  const live = useMemo(() => hackathons.filter(h => h.status === 'ongoing'), [])
  const upcoming = useMemo(() => hackathons.filter(h => h.status === 'upcoming'), [])

  return (
    <>
      {featuredEvent && <HackathonHero hackathon={featuredEvent} />}

      <div className="mt-8 space-y-8">
        {live.length > 0 && (
          <section>
            <SectionHead title="Live now" count={live.length} tone="text-green-400" pulse />
            <CardGrid
              items={live}
              renderCard={hackathon => <HackathonCard hackathon={hackathon} />}
              emptyTitle="Nothing live"
              density="compact"
            />
          </section>
        )}

        <section>
          <SectionHead title="Open for registration" count={upcoming.length} tone="text-accent" />
          <CardGrid
            items={upcoming}
            renderCard={hackathon => <HackathonCard hackathon={hackathon} />}
            emptyTitle="No hackathons scheduled"
            density="compact"
          />
        </section>
      </div>
    </>
  )
}
