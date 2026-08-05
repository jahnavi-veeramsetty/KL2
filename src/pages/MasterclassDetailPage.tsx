import { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import {
  CalendarClock, CalendarDays, Clock, Gift, Globe, GraduationCap,
  HelpCircle, Info, Target, Users,
} from 'lucide-react'
import { Badge, Button, Accordion, Breadcrumbs } from '../ui'
import {
  CheckList, DetailHero, DetailPanel, DetailSection, MetaItem, PurchasePanel,
} from '../components/detail/DetailKit'
import { InstructorCard } from '../components/courses/InstructorCard'
import { masterclasses } from '../data'
import { ROUTES } from '../constants/routes'
import { continueLearningItems } from '../data/continueLearning'
import { formatNumber, formatRupees } from '../lib/format'
import { DiscountLine } from '../components/catalog/DiscountLine'
import type { AccordionItem } from '../ui'

export default function MasterclassDetailPage() {
  const { masterclassId } = useParams<{ masterclassId: string }>()
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const navigate = useNavigate()

  const masterclass = masterclasses.find(m => m.id === masterclassId || m.slug === masterclassId)
  if (!masterclass) return <Navigate to={ROUTES.MASTERCLASSES} replace />

  // Optional: check if registered (using the same continueLearningItems mock for now)
  const isRegistered = continueLearningItems.some(item => item.courseId === masterclass.id)

  const difficultyColor = {
    Beginner: 'easy' as const,
    Intermediate: 'medium' as const,
    Advanced: 'hard' as const,
  }[masterclass.level]

  const faqItems: AccordionItem[] = [
    { id: 'refund', title: 'What is the refund policy?', content: <p className="text-sm text-subtle">Full refund up to 24 hours before the session starts.</p> },
    { id: 'recording', title: 'Will this be recorded?', content: <p className="text-sm text-subtle">Yes, all registered participants will receive lifetime access to the recording.</p> },
    { id: 'prereq', title: 'Are there any prerequisites?', content: <p className="text-sm text-subtle">Please check the description for specific prerequisites. A basic understanding of the topic is usually helpful.</p> },
  ]

  return (
    <>
      <Breadcrumbs
          backTo={ROUTES.MASTERCLASSES}
        className="mb-6"
        items={[
          { label: 'Masterclasses', to: ROUTES.MASTERCLASSES },
          { label: masterclass.title },
        ]}
      />

      <DetailHero
        image={masterclass.thumbnail}
        title={masterclass.title}
        subtitle={masterclass.shortDescription}
        eyebrow={
          <>
            <Badge color="accent">{masterclass.category}</Badge>
            <Badge color={difficultyColor}>{masterclass.level}</Badge>
            {masterclass.isBestseller && <Badge color="warning">Popular</Badge>}
            {masterclass.isNew && <Badge color="accent">New</Badge>}
          </>
        }
        meta={
          <>
            <MetaItem icon={CalendarDays}>{masterclass.date}</MetaItem>
            <MetaItem icon={Globe}>{masterclass.language}</MetaItem>
            <MetaItem icon={Clock}>{masterclass.durationHours} hours</MetaItem>
            <MetaItem icon={Users}>{formatNumber(masterclass.studentsEnrolled)} registered</MetaItem>
          </>
        }
      >
        <p className="mt-4 text-sm text-subtle">
          Hosted by <span className="text-accent font-medium">{masterclass.instructor.name}</span>
          <span className="text-faint"> — {masterclass.instructor.title}</span>
        </p>
      </DetailHero>

      {/* Main Content — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left: masterclass info and details */}
        <div className="lg:col-span-2">

          <DetailSection icon={Info} title="About this masterclass">
            <p className="text-sm text-body leading-relaxed">{masterclass.longDescription}</p>
          </DetailSection>

          <DetailSection icon={CalendarClock} title="Session agenda">
            {/* A timeline, not a list — the agenda's whole point is the order,
                and the rail makes that legible at a glance. */}
            <DetailPanel>
              <ol className="relative border-l border-line-strong ml-2 space-y-5">
                {masterclass.sessionAgenda.map(item => (
                  <li key={item.time} className="relative pl-6">
                    <span
                      aria-hidden
                      className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent"
                    />
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-accent tabular-nums">
                      {item.time}
                    </span>
                    <span className="block text-sm text-body mt-0.5">{item.topic}</span>
                  </li>
                ))}
              </ol>
            </DetailPanel>
          </DetailSection>

          <DetailSection icon={Target} title="Key takeaways">
            <CheckList items={masterclass.keyTakeaways} />
          </DetailSection>

          <DetailSection icon={Gift} title="What you get">
            <CheckList items={masterclass.whatYouGet} columns={1} />
          </DetailSection>

          <DetailSection icon={GraduationCap} title="Your instructor">
            <InstructorCard instructor={masterclass.instructor} />
          </DetailSection>

          <DetailSection icon={HelpCircle} title="FAQ">
            <Accordion items={faqItems} allowMultiple />
          </DetailSection>
        </div>

        {/* Right: sticky register card */}
        <div className="lg:col-span-1">
          <PurchasePanel>
            <div className="aspect-[16/9] overflow-hidden on-dark">
              <img src={masterclass.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-5 space-y-4">
              <div>
                <DiscountLine price={masterclass.price} className="mb-1" />
                <div className="text-2xl font-bold text-strong tracking-tight tabular-nums">
                  {formatRupees(masterclass.price)}
                </div>
              </div>

              <div className="rounded-xl border border-line bg-raised p-3">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-faint">
                  <CalendarDays className="w-3 h-3" strokeWidth={2} aria-hidden /> Session date
                </span>
                <span className="block text-sm text-strong font-semibold mt-1">{masterclass.date}</span>
                <span className="flex items-center gap-1.5 text-xs text-subtle mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-easy shrink-0" aria-hidden />
                  Live · {masterclass.durationHours} hours
                </span>
              </div>

              <div className="space-y-3">
                {isRegistered ? (
                  <Button className="w-full py-2" size="md" onClick={() => navigate(ROUTES.DASHBOARD)}>
                    Go to dashboard
                  </Button>
                ) : (
                  <Button className="w-full py-2" size="md" onClick={() => setShowRegisterModal(true)}>
                    Register now
                  </Button>
                )}
                <Button variant="secondary" className="w-full py-2" size="md">
                  Share
                </Button>
              </div>
            </div>
          </PurchasePanel>
        </div>
      </div>

      {/* Mobile sticky Register CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-page/90 backdrop-blur-md border-t border-line-strong p-4 z-40">
        {isRegistered ? (
          <Button className="w-full" size="lg" onClick={() => navigate(ROUTES.DASHBOARD)}>
            Go to Dashboard
          </Button>
        ) : (
          <Button className="w-full" size="lg" onClick={() => setShowRegisterModal(true)}>
            Register Now — ₹{masterclass.price.toLocaleString('en-IN')}
          </Button>
        )}
      </div>

      {/* Mock register modal */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRegisterModal(false)}
        >
          <div
            className="bg-panel border border-line-strong rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-strong mb-2">Register for Masterclass</h3>
            <p className="text-subtle text-sm mb-6">
              You're registering for <strong className="text-strong">{masterclass.title}</strong>. Payment gateway coming soon!
            </p>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setShowRegisterModal(false)}>
                Confirm
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => setShowRegisterModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
