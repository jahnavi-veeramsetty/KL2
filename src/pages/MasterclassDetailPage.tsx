import { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { Badge, Button, Accordion, Breadcrumbs } from '../ui'
import { InstructorCard } from '../components/courses/InstructorCard'
import { masterclasses } from '../data'
import { ROUTES } from '../constants/routes'
import { continueLearningItems } from '../data/continueLearning'
import { formatNumber } from '../lib/format'
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
    { id: 'refund', title: 'What is the refund policy?', content: <p className="text-sm text-muted">Full refund up to 24 hours before the session starts.</p> },
    { id: 'recording', title: 'Will this be recorded?', content: <p className="text-sm text-muted">Yes, all registered participants will receive lifetime access to the recording.</p> },
    { id: 'prereq', title: 'Are there any prerequisites?', content: <p className="text-sm text-muted">Please check the description for specific prerequisites. A basic understanding of the topic is usually helpful.</p> },
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

      {/* Main Content — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left: masterclass info and details */}
        <div className="lg:col-span-2 space-y-12">

          {/* Hero */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge color="accent">{masterclass.category}</Badge>
              <Badge color={difficultyColor}>{masterclass.level}</Badge>
              {masterclass.isBestseller && <Badge color="warning">Popular</Badge>}
              {masterclass.isNew && <Badge color="accent">New</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-tertiary leading-tight">{masterclass.title}</h1>
            <p className="text-muted text-lg leading-relaxed">{masterclass.shortDescription}</p>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted">{formatNumber(masterclass.studentsEnrolled)} registered</span>
            </div>

            {/* Instructor mini-row */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">Hosted by</span>
              <span className="text-sm text-accent font-medium">{masterclass.instructor.name}</span>
              <span className="text-xs text-muted">— {masterclass.instructor.title}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted">
              <span>📅 {masterclass.date}</span>
              <span>🌐 {masterclass.language}</span>
              <span>⏱ {masterclass.durationHours} Hours</span>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-4">About this Masterclass</h2>
            <p className="text-muted text-sm leading-relaxed">{masterclass.longDescription}</p>
          </section>

          {/* Session Agenda */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">Session Agenda</h2>
            <div className="bg-secondary/30 border border-white/8 rounded-2xl p-6 space-y-6">
              {masterclass.sessionAgenda.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <span className="text-accent font-mono text-sm w-24 flex-shrink-0">{item.time}</span>
                  <span className="text-muted text-sm">{item.topic}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">Key Takeaways</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-secondary/30 border border-white/8 rounded-2xl p-6">
              {masterclass.keyTakeaways.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* What You Get */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">What You Get</h2>
            <ul className="space-y-3 bg-secondary/30 border border-white/8 rounded-2xl p-6">
              {masterclass.whatYouGet.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted">
                  <span className="text-accent/60 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">Your Instructor</h2>
            <InstructorCard instructor={masterclass.instructor} />
          </section>



          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">FAQ</h2>
            <Accordion items={faqItems} allowMultiple />
          </section>
        </div>

        {/* Right: sticky register card */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 self-start">
          <div className="bg-secondary/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-[320px] lg:ml-auto">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={masterclass.thumbnail} alt={masterclass.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 space-y-5">
              <div>
                <div className="text-2xl font-bold text-tertiary mb-1">₹{masterclass.price.toLocaleString('en-IN')}</div>
                <div className="text-xs text-muted flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  Live Session • {masterclass.durationHours} Hours
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <span className="text-xs text-accent font-bold uppercase tracking-wider block mb-1">Session Date</span>
                <span className="text-sm text-tertiary font-medium">{masterclass.date}</span>
              </div>

              <div className="space-y-3">
                {isRegistered ? (
                  <Button className="w-full py-2" size="md" onClick={() => navigate(ROUTES.DASHBOARD)}>
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button className="w-full py-2" size="md" onClick={() => setShowRegisterModal(true)}>
                    Register Now
                  </Button>
                )}
                <Button variant="secondary" className="w-full py-2" size="md">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky Register CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-primary/90 backdrop-blur-md border-t border-white/10 p-4 z-40">
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
            className="bg-secondary border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-tertiary mb-2">Register for Masterclass</h3>
            <p className="text-muted text-sm mb-6">
              You're registering for <strong className="text-tertiary">{masterclass.title}</strong>. Payment gateway coming soon!
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
