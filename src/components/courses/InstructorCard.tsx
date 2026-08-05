import { BookOpen, Star, Users } from 'lucide-react'
import type { CourseInstructor } from '../../types'
import { Avatar, Card } from '../../ui'
import { formatNumber } from '../../lib/format'

interface InstructorCardProps {
  instructor: CourseInstructor
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <Avatar src={instructor.avatar} name={instructor.name} size="xl" />
        <div>
          <h3 className="text-strong font-bold text-lg">{instructor.name}</h3>
          <p className="text-subtle text-sm">{instructor.title}</p>
          <div className="flex items-center gap-4 flex-wrap mt-2 text-xs text-subtle font-medium">
            <span className="flex items-center gap-1.5 tabular-nums">
              <Star className="w-3.5 h-3.5 text-medium shrink-0" strokeWidth={2} fill="currentColor" aria-hidden />
              {instructor.stats.rating.toFixed(1)} rating
            </span>
            <span className="flex items-center gap-1.5 tabular-nums">
              <Users className="w-3.5 h-3.5 text-faint shrink-0" strokeWidth={1.8} aria-hidden />
              {formatNumber(instructor.stats.students)} students
            </span>
            <span className="flex items-center gap-1.5 tabular-nums">
              <BookOpen className="w-3.5 h-3.5 text-faint shrink-0" strokeWidth={1.8} aria-hidden />
              {instructor.stats.courses} courses
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-body leading-relaxed">{instructor.bio}</p>
    </Card>
  )
}
