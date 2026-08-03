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
          <h3 className="text-white font-bold text-lg">{instructor.name}</h3>
          <p className="text-slate-400 text-sm">{instructor.title}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
            <span>⭐ {instructor.stats.rating.toFixed(1)} rating</span>
            <span>👨‍🎓 {formatNumber(instructor.stats.students)} students</span>
            <span>📚 {instructor.stats.courses} courses</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{instructor.bio}</p>
    </Card>
  )
}
