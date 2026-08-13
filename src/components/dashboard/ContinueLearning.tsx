import { continueLearningItems } from '../../data/continueLearning'

import { EnrolledCourseCard } from '../courses/EnrolledCourseCard'

export function ContinueLearning() {
  if (continueLearningItems.length === 0) return null

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-strong tracking-tight">My Courses</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {continueLearningItems.slice(0, 3).map((item) => (
          <EnrolledCourseCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
