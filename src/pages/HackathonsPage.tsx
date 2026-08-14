import { useMemo } from 'react'

import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { HackathonHero } from '../components/compete/HackathonHero'
import { HackathonCard } from '../components/compete/HackathonCard'
import { CardGrid } from '../components/catalog/CardGrid'
import { SectionHead } from '../components/catalog/SectionHead'
import { hackathons } from '../data'

export default function HackathonsPage() {
  useDocumentTitle('Hackathons')

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
