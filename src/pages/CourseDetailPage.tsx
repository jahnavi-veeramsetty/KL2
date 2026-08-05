import { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import {
  Award, BookOpen, ClipboardList, Clock, Globe, GraduationCap,
  HelpCircle, Layers, ListChecks, Star, Target,
} from 'lucide-react'
import { Badge, Rating, Button, Accordion, Breadcrumbs } from '../ui'
import {
  CheckList, DetailHero, DetailSection, MetaItem, NumberedList, PurchasePanel,
} from '../components/detail/DetailKit'
import { DiscountLine } from '../components/catalog/DiscountLine'
import { CurriculumAccordion } from '../components/courses/CurriculumAccordion'
import { InstructorCard } from '../components/courses/InstructorCard'
import { ReviewSummary } from '../components/courses/ReviewSummary'
import { ReviewCard } from '../components/courses/ReviewCard'
import { CourseCard } from '../components/courses/CourseCard'
import { courses } from '../data'
import { ROUTES } from '../constants/routes'
import { continueLearningItems } from '../data/continueLearning'
import { formatDuration, formatNumber, formatRupees } from '../lib/format'
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
    { id: 'refund', title: 'What is the refund policy?', content: <p className="text-sm text-subtle">Full refund within 30 days of purchase if you are not satisfied.</p> },
    { id: 'access', title: 'How long do I have access?', content: <p className="text-sm text-subtle">Lifetime access including all future updates to the course content.</p> },
    { id: 'certificate', title: 'Do I get a certificate?', content: <p className="text-sm text-subtle">{course.certificate ? 'Yes! A certificate of completion is awarded when you finish all lessons.' : 'This course does not include a certificate.'}</p> },
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

      {/* The card you clicked was mostly artwork; opening on that same image is
          what makes this read as the course rather than a page about it. */}
      <DetailHero
        image={course.thumbnail}
        title={course.title}
        subtitle={course.shortDescription}
        eyebrow={
          <>
            <Badge color="accent">{course.category}</Badge>
            <Badge color={difficultyColor}>{course.level}</Badge>
            {course.isBestseller && <Badge color="warning">Bestseller</Badge>}
          </>
        }
        meta={
          <>
            <MetaItem icon={Globe}>{course.language}</MetaItem>
            <MetaItem icon={Clock}>{formatDuration(course.durationHours)}</MetaItem>
            <MetaItem icon={BookOpen}>{course.moduleCount} modules · {course.lessonCount} lessons</MetaItem>
            {course.certificate && <MetaItem icon={Award}>Certificate</MetaItem>}
          </>
        }
      >
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <Rating value={course.rating} size="md" />
          <span className="text-sm text-subtle">
            {formatNumber(course.ratingCount)} ratings · {formatNumber(course.studentsEnrolled)} students
          </span>
        </div>
        <p className="mt-3 text-sm text-subtle">
          Created by <span className="text-accent font-medium">{course.instructor.name}</span>
          <span className="text-faint"> — {course.instructor.title}</span>
        </p>
      </DetailHero>

      {/* Main Content — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left: course info and details */}
        <div className="lg:col-span-2">

          <DetailSection icon={Target} title="What you'll learn">
            <CheckList items={course.whatYouWillLearn} />
          </DetailSection>

          <DetailSection icon={ListChecks} title="Curriculum">
            <CurriculumAccordion modules={course.curriculum} />
          </DetailSection>

          <DetailSection icon={ClipboardList} title="Requirements">
            <NumberedList items={course.requirements} />
          </DetailSection>

          <DetailSection icon={GraduationCap} title="Your instructor">
            <InstructorCard instructor={course.instructor} />
          </DetailSection>

          <DetailSection icon={Star} title="Student reviews">
            <ReviewSummary rating={course.rating} ratingCount={course.ratingCount} reviews={course.reviews} />
            <div className="mt-6 space-y-4">
              {course.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </DetailSection>

          <DetailSection icon={HelpCircle} title="FAQ">
            <Accordion items={faqItems} allowMultiple />
          </DetailSection>

          {related.length > 0 && (
            <DetailSection icon={Layers} title="Related courses">
              <div className="flex gap-6 overflow-x-auto no-scrollbar pt-1 pb-3 -mx-1 px-1">
                {related.map(c => (
                  <div key={c.id} className="min-w-[280px] flex-shrink-0">
                    <CourseCard course={c} />
                  </div>
                ))}
              </div>
            </DetailSection>
          )}
        </div>

        {/* Right: sticky enroll card */}
        <div className="lg:col-span-1">
          <PurchasePanel>
            <div className="aspect-[16/9] overflow-hidden on-dark">
              <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-5 space-y-3">
              <div>
                <DiscountLine price={course.price} className="mb-1" />
                <div className="text-2xl font-bold text-strong tracking-tight tabular-nums">
                  {formatRupees(course.price)}
                </div>
              </div>
              {isEnrolled ? (
                <Button className="w-full py-2" size="md" onClick={() => navigate(ROUTES.DASHBOARD)}>
                  Go to course
                </Button>
              ) : (
                <Button className="w-full py-2" size="md" onClick={() => setShowRegisterModal(true)}>
                  Enroll now
                </Button>
              )}
              <Button variant="secondary" className="w-full py-2" size="md">
                Download brochure
              </Button>
            </div>
          </PurchasePanel>
        </div>
      </div>

      {/* Mobile sticky Register CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-page/90 backdrop-blur-md border-t border-line-strong p-4 z-40">
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
            className="bg-panel border border-line-strong rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-strong mb-2">Enroll in Course</h3>
            <p className="text-subtle text-sm mb-6">
              You're enrolling in <strong className="text-strong">{course.title}</strong>. Payment gateway coming soon!
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
