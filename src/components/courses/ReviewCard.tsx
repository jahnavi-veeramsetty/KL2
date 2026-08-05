import type { CourseReview } from '../../types'
import { Avatar, Rating, Card } from '../../ui'
import { formatDate } from '../../lib/format'

interface ReviewCardProps {
  review: CourseReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="p-5 border-line">
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={review.user} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-bold text-strong">{review.user}</span>
            <span className="text-xs text-subtle">{formatDate(review.date)}</span>
          </div>
          <Rating value={review.rating} size="sm" showValue={false} />
        </div>
      </div>
      <p className="text-sm text-body leading-relaxed">{review.text}</p>
    </Card>
  )
}
