import { useParams, Navigate } from 'react-router-dom'
import {
  Bot, Link2, HeartPulse, Globe, Lightbulb,
  BookOpen, Wrench, IndianRupee, Smartphone, Accessibility, Sparkles,
} from 'lucide-react'
import { Badge, Button, Accordion, Breadcrumbs } from '../ui'
import { hackathons } from '../data'
import { ROUTES } from '../constants/routes'
import { formatDate } from '../lib/format'
import type { AccordionItem } from '../ui'

const modeColors = { online: 'accent', offline: 'purple', hybrid: 'orange' } as const

/** Track `icon` values in the data are lucide icon names. */
const TRACK_ICONS: Record<string, typeof Bot> = {
  Bot, Link2, HeartPulse, Globe, Lightbulb,
  BookOpen, Wrench, IndianRupee, Smartphone, Accessibility,
}

export default function HackathonDetailPage() {
  const { hackathonId } = useParams<{ hackathonId: string }>()
  const hack = hackathons.find(h => h.id === hackathonId || h.slug === hackathonId)
  if (!hack) return <Navigate to={ROUTES.COMPETE} replace />

  const faqItems: AccordionItem[] = hack.faq.map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: <p className="text-sm text-muted">{f.answer}</p>
  }))

  return (
    <>
      <Breadcrumbs
          backTo={ROUTES.HACKATHONS}
        className="mb-6"
        items={[
          { label: 'Hackathons', to: ROUTES.HACKATHONS },
          { label: hack.title },
        ]}
      />

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-10">
        <img src={hack.banner} alt={hack.title} className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge color={modeColors[hack.mode]}>{hack.mode.charAt(0).toUpperCase() + hack.mode.slice(1)}</Badge>
            {hack.theme.map(t => <Badge key={t} color="neutral">{t}</Badge>)}
          </div>
          <h1 className="text-3xl font-bold text-tertiary mb-1">{hack.title}</h1>
          <p className="text-muted">{hack.tagline}</p>
        </div>
      </div>

      {/* Stats band */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Prize Pool', value: hack.prizePool, color: '#F59E0B' },
          { label: 'Participants', value: hack.participantsCount.toLocaleString(), color: '#22D3EE' },
          { label: 'Team Size', value: `${hack.teamSize.min}–${hack.teamSize.max}`, color: '#A78BFA' },
          { label: 'Mode', value: hack.mode.charAt(0).toUpperCase() + hack.mode.slice(1), color: '#34D399' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-secondary/40 border border-white/8 rounded-xl p-4 text-center">
            <div className="text-xl font-bold" style={{ color }}>{value}</div>
            <div className="text-xs text-muted mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* About */}
          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">About</h2>
            <p className="text-muted leading-relaxed">{hack.about}</p>
          </section>

          {/* Tracks */}
          <section>
            <h2 className="text-xl font-bold text-tertiary mb-4">Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hack.tracks.map(t => (
                <div key={t.title} className="bg-secondary/30 border border-white/8 rounded-xl p-4 flex gap-3">
                  {(() => {
                    const TrackIcon = TRACK_ICONS[t.icon] ?? Sparkles
                    return <TrackIcon className="w-6 h-6 text-accent shrink-0" />
                  })()}
                  <div>
                    <p className="text-sm font-semibold text-tertiary">{t.title}</p>
                    <p className="text-xs text-muted mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-xl font-bold text-tertiary mb-4">Timeline</h2>
            <div className="space-y-3">
              {hack.timeline.map((phase, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-accent mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-sm font-semibold text-tertiary">{phase.phase}</p>
                    <p className="text-xs text-muted">{formatDate(phase.date)} · {phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prizes */}
          <section>
            <h2 className="text-xl font-bold text-tertiary mb-4">Prizes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hack.prizes.map(prize => (
                <div key={prize.place} className="bg-secondary/30 border border-white/8 rounded-xl p-4">
                  <p className="text-sm font-bold text-amber-400">{prize.place}</p>
                  <p className="text-lg font-bold text-tertiary">{prize.amount}</p>
                  <ul className="mt-2 space-y-1">
                    {prize.perks.map(p => (
                      <li key={p} className="text-xs text-muted flex items-center gap-1.5"><span className="text-accent">+</span>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Judges */}
          <section>
            <h2 className="text-xl font-bold text-tertiary mb-4">Judges</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {hack.judges.map(judge => (
                <div key={judge.name} className="text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary/50 border border-white/10 mx-auto mb-2">
                    <img src={judge.avatar} alt={judge.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-semibold text-tertiary">{judge.name}</p>
                  <p className="text-xs text-muted">{judge.title}</p>
                  <p className="text-xs text-accent">{judge.company}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-tertiary mb-4">FAQ</h2>
            <Accordion items={faqItems} allowMultiple />
          </section>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 self-start space-y-4">
          <div className="bg-secondary/50 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="space-y-2 text-sm text-muted">
              <div className="flex justify-between">
                <span>Registration Deadline</span>
                <span className="text-tertiary font-medium">{formatDate(hack.registrationDeadline)}</span>
              </div>
              <div className="flex justify-between">
                <span>Start Date</span>
                <span className="text-tertiary font-medium">{formatDate(hack.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>End Date</span>
                <span className="text-tertiary font-medium">{formatDate(hack.endDate)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" disabled={hack.status === 'past'}>
              {hack.status === 'past' ? 'Ended' : 'Register Now'}
            </Button>
          </div>

          {/* Sponsors */}
          <div className="bg-secondary/40 border border-white/8 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-tertiary mb-3">Sponsors</h3>
            <div className="flex flex-wrap gap-2">
              {hack.sponsors.map(s => (
                <div key={s.name} className="px-3 py-1.5 bg-white/5 border border-white/8 rounded-lg text-xs text-muted font-medium">
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-primary/90 backdrop-blur-md border-t border-white/10 p-4 z-40">
        <Button className="w-full" size="lg" disabled={hack.status === 'past'}>
          {hack.status === 'past' ? 'Ended' : 'Register Now →'}
        </Button>
      </div>
    </>
  )
}
