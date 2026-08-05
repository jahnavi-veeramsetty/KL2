import { useParams, Navigate } from 'react-router-dom'
import {
  Bot, Link2, HeartPulse, Globe, Lightbulb,
  BookOpen, Wrench, IndianRupee, Smartphone, Accessibility, Sparkles,
  CalendarClock, Check, Gavel, HelpCircle, Info, Layers, MapPin, Trophy, Users, UsersRound,
} from 'lucide-react'
import { Badge, Button, Accordion, Breadcrumbs } from '../ui'
import { DetailPanel, DetailSection } from '../components/detail/DetailKit'
import { cn } from '../lib/cn'
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
    content: <p className="text-sm text-subtle">{f.answer}</p>
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
      <div className="on-dark relative rounded-3xl overflow-hidden mb-10">
        <img src={hack.banner} alt={hack.title} className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-page via-page/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge color={modeColors[hack.mode]}>{hack.mode.charAt(0).toUpperCase() + hack.mode.slice(1)}</Badge>
            {hack.theme.map(t => <Badge key={t} color="neutral">{t}</Badge>)}
          </div>
          <h1 className="text-3xl font-bold text-strong mb-1">{hack.title}</h1>
          <p className="text-subtle">{hack.tagline}</p>
        </div>
      </div>

      {/* Stats band. The four literal hexes here were bright dark-theme shades
          set via inline style, so they could not follow the theme and landed
          around 2:1 on white. An icon carries the distinction instead, and the
          figures are all text-strong — four differently-coloured numbers read
          as four unrelated things anyway. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: 'Prize pool', value: hack.prizePool, icon: Trophy },
          { label: 'Participants', value: hack.participantsCount.toLocaleString(), icon: Users },
          { label: 'Team size', value: `${hack.teamSize.min}–${hack.teamSize.max}`, icon: UsersRound },
          { label: 'Mode', value: hack.mode.charAt(0).toUpperCase() + hack.mode.slice(1), icon: MapPin },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-panel border border-line rounded-2xl p-4">
            <Icon className="w-4 h-4 text-accent mb-2" strokeWidth={1.8} aria-hidden />
            <div className="text-lg font-bold text-strong tracking-tight tabular-nums">{value}</div>
            <div className="text-[11px] uppercase tracking-wider text-faint mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <DetailSection icon={Info} title="About">
            <DetailPanel>
              <p className="text-[15px] text-body leading-relaxed">{hack.about}</p>
            </DetailPanel>
          </DetailSection>

          <DetailSection icon={Layers} title="Tracks">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hack.tracks.map(t => {
                const TrackIcon = TRACK_ICONS[t.icon] ?? Sparkles
                return (
                  <div key={t.title} className="bg-panel border border-line rounded-2xl p-4 flex gap-3">
                    <span className="w-9 h-9 rounded-xl bg-accent/12 flex items-center justify-center shrink-0">
                      <TrackIcon className="w-[18px] h-[18px] text-accent" strokeWidth={1.8} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-strong">{t.title}</p>
                      <p className="text-xs text-subtle mt-0.5 leading-relaxed">{t.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </DetailSection>

          <DetailSection icon={CalendarClock} title="Timeline">
            <DetailPanel>
              <ol className="relative border-l border-line-strong ml-2 space-y-6">
                {hack.timeline.map(phase => (
                  <li key={phase.phase} className="relative pl-6">
                    <span aria-hidden className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-accent">
                      {formatDate(phase.date)}
                    </span>
                    <span className="block text-sm font-semibold text-strong mt-0.5">{phase.phase}</span>
                    <span className="block text-xs text-subtle mt-0.5">{phase.description}</span>
                  </li>
                ))}
              </ol>
            </DetailPanel>
          </DetailSection>

          <DetailSection icon={Trophy} title="Prizes">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hack.prizes.map((prize, i) => (
                <div
                  key={prize.place}
                  className={cn(
                    'rounded-2xl p-4 border',
                    // Only first place gets the gold edge. Three identical cards
                    // with a gold label on each says nothing about placing.
                    i === 0 ? 'border-amber-400/40 bg-amber-400/[0.06]' : 'border-line bg-panel'
                  )}
                >
                  <p className={cn('text-xs font-bold uppercase tracking-wider', i === 0 ? 'text-amber-400' : 'text-faint')}>
                    {prize.place}
                  </p>
                  <p className="text-lg font-bold text-strong tracking-tight mt-1">{prize.amount}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {prize.perks.map(p => (
                      <li key={p} className="text-xs text-subtle flex items-start gap-1.5">
                        <Check className="w-3 h-3 mt-0.5 shrink-0 text-easy" strokeWidth={2.5} aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection icon={Gavel} title="Judges">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hack.judges.map(judge => (
                <div key={judge.name} className="bg-panel border border-line rounded-2xl p-4 text-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-raised border border-line-strong mx-auto mb-2.5">
                    <img src={judge.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-semibold text-strong truncate">{judge.name}</p>
                  <p className="text-[11px] text-subtle truncate">{judge.title}</p>
                  <p className="text-[11px] text-accent truncate mt-0.5">{judge.company}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection icon={HelpCircle} title="FAQ">
            <Accordion items={faqItems} allowMultiple />
          </DetailSection>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 self-start space-y-4">
          <div className="bg-panel border border-line rounded-2xl p-5 space-y-4">
            <dl className="space-y-2.5 text-sm">
              {[
                ['Registration closes', hack.registrationDeadline],
                ['Starts', hack.startDate],
                ['Ends', hack.endDate],
              ].map(([label, date]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-subtle">{label}</dt>
                  <dd className="text-strong font-medium tabular-nums">{formatDate(date)}</dd>
                </div>
              ))}
            </dl>
            <Button className="w-full" size="lg" disabled={hack.status === 'past'}>
              {hack.status === 'past' ? 'Ended' : 'Register now'}
            </Button>
          </div>

          {/* Sponsors */}
          <div className="bg-panel border border-line rounded-2xl p-5">
            <h3 className="text-sm font-bold text-strong mb-3">Sponsors</h3>
            <div className="flex flex-wrap gap-2">
              {hack.sponsors.map(s => (
                <div key={s.name} className="px-3 py-1.5 bg-raised border border-line rounded-lg text-xs text-subtle font-medium">
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-page/90 backdrop-blur-md border-t border-line-strong p-4 z-40">
        <Button className="w-full" size="lg" disabled={hack.status === 'past'}>
          {hack.status === 'past' ? 'Ended' : 'Register Now →'}
        </Button>
      </div>
    </>
  )
}
