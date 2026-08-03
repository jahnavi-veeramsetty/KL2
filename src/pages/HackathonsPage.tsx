import { useMemo } from 'react'

import { CompeteHero } from '../components/compete/CompeteHero'
import { HackathonCard } from '../components/compete/HackathonCard'
import { CardGrid } from '../components/catalog/CardGrid'
import { hackathons } from '../data'

export default function HackathonsPage() {
  const featuredEvent =
    hackathons.find(h => h.status === 'ongoing') || hackathons.find(h => h.status === 'upcoming')

  const filteredHacks = useMemo(() => hackathons.filter(h => h.status !== 'past'), [])

  return (
    <>
      {featuredEvent && <CompeteHero featuredEvent={featuredEvent} />}

      <div className="mt-8">
        <CardGrid
          items={filteredHacks}
          renderCard={hackathon => <HackathonCard hackathon={hackathon} />}
          emptyTitle="No hackathons scheduled"
          density="compact"
        />
      </div>
    </>
  )
}
