import { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { Badge, Rating, Button, Accordion, Breadcrumbs } from '../ui'
import { CurriculumAccordion } from '../components/courses/CurriculumAccordion'
import { InstructorCard } from '../components/courses/InstructorCard'
import { ReviewSummary } from '../components/courses/ReviewSummary'
import { ReviewCard } from '../components/courses/ReviewCard'
import { CourseCard } from '../components/courses/CourseCard'
import { courses } from '../data'
import { ROUTES } from '../constants/routes'
import { continueLearningItems } from '../data/continueLearning'
import { formatDuration, formatNumber } from '../lib/format'
import type { AccordionItem } from '../ui'

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const navigate = useNavigate()

  const course = courses.find(c => c.id === courseId || c.slug === courseId)
  if (!course) return <Navigate to={ROUTES.COURSES} replace />

  const isEnrolled = continueLearningItems.some(item => item.courseId === course.id)

  const related = courses.filter(c => c.id !== course.id && c.category === course.category).slice(0, 4)

  const difficultyColor = {
    Beginner: 'easy' as const,
    Intermediate: 'medium' as const,
    Advanced: 'hard' as const,
  }[course.level]

  const faqItems: AccordionItem[] = [
    { id: 'refund', title: 'What is the refund policy?', content: <p className="text-sm text-muted">Full refund within 30 days of purchase if you are not satisfied.</p> },
    { id: 'access', title: 'How long do I have access?', content: <p className="text-sm text-muted">Lifetime access including all future updates to the course content.</p> },
    { id: 'certificate', title: 'Do I get a certificate?', content: <p className="text-sm text-muted">{course.certificate ? 'Yes! A certificate of completion is awarded when you finish all lessons.' : 'This course does not include a certificate.'}</p> },
  ]

  return (
    <>
      <Breadcrumbs
          backTo={ROUTES.COURSES}
        className="mb-6"
        items={[
          { label: 'Courses', to: ROUTES.COURSES },
          { label: course.title },
        ]}
      />

      {/* Main Content — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left: course info and details */}
        <div className="lg:col-span-2 space-y-12">

          {/* Hero */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge color="accent">{course.category}</Badge>
              <Badge color={difficultyColor}>{course.level}</Badge>
              {course.isBestseller && <Badge color="warning">Bestseller</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-tertiary leading-tight">{course.title}</h1>
            <p className="text-muted text-lg leading-relaxed">{course.shortDescription}</p>

            <div className="flex items-center gap-3 flex-wrap">
              <Rating value={course.rating} size="md" />
              <span className="text-sm text-muted">({formatNumber(course.ratingCount)} ratings)</span>
              <span className="text-sm text-muted">· {formatNumber(course.studentsEnrolled)} students</span>
            </div>

            {/* Instructor mini-row */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">Created by</span>
              <span className="text-sm text-accent font-medium">{course.instructor.name}</span>
              <span className="text-xs text-muted">— {course.instructor.title}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted">
              <span>🌐 {course.language}</span>
              <span>⏱ {formatDuration(course.durationHours)}</span>
              <span>📚 {course.moduleCount} modules · {course.lessonCount} lessons</span>
              {course.certificate && <span>🏆 Certificate</span>}
            </div>
          </div>

          {/* What you'll learn */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-secondary/30 border border-white/8 rounded-2xl p-6">
              {course.whatYouWillLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">Curriculum</h2>
            <CurriculumAccordion modules={course.curriculum} />
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-4">Requirements</h2>
            <ul className="space-y-2">
              {course.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-muted/60 mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">Your Instructor</h2>
            <InstructorCard instructor={course.instructor} />
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">Student Reviews</h2>
            <ReviewSummary rating={course.rating} ratingCount={course.ratingCount} reviews={course.reviews} />
            <div className="mt-6 space-y-4">
              {course.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-tertiary mb-6">FAQ</h2>
            <Accordion items={faqItems} allowMultiple />
          </section>

          {/* Related courses */}
          {related.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-tertiary mb-6">Related Courses</h2>
              <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                {related.map(c => (
                  <div key={c.id} className="min-w-[280px] flex-shrink-0">
                    <CourseCard course={c} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: sticky enroll card */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 self-start">
          <div className="bg-secondary/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-[320px] lg:ml-auto">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 space-y-3">
              <div className="text-2xl font-bold text-tertiary">₹{course.price.toLocaleString('en-IN')}</div>
              {isEnrolled ? (
                <Button className="w-full py-2" size="md" onClick={() => navigate(ROUTES.DASHBOARD)}>
                  Go to Course
                </Button>
              ) : (
                <Button className="w-full py-2" size="md" onClick={() => setShowRegisterModal(true)}>
                  Register Now
                </Button>
              )}
              <Button variant="secondary" className="w-full py-2" size="md">
                Download brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky Register CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-primary/90 backdrop-blur-md border-t border-white/10 p-4 z-40">
        {isEnrolled ? (
          <Button className="w-full" size="lg" onClick={() => navigate(ROUTES.DASHBOARD)}>
            Go to Course
          </Button>
        ) : (
          <Button className="w-full" size="lg" onClick={() => setShowRegisterModal(true)}>
            Register Now — ₹{course.price.toLocaleString('en-IN')}
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
            <h3 className="text-xl font-bold text-tertiary mb-2">Enroll in Course</h3>
            <p className="text-muted text-sm mb-6">
              You're enrolling in <strong className="text-tertiary">{course.title}</strong>. Payment gateway coming soon!
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
