import type { CourseReview } from '../../types'
import { Rating } from '../../ui'

interface ReviewSummaryProps {
  rating: number
  ratingCount: number
  reviews: CourseReview[]
}

export function ReviewSummary({ rating, ratingCount, reviews }: ReviewSummaryProps) {
  // Count by star
  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Math.round(r.rating) === star).length,
    pct: reviews.length > 0
      ? (reviews.filter(r => Math.round(r.rating) === star).length / reviews.length) * 100
      : 0
  }))

  return (
    <div className="bg-secondary/30 border border-white/8 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
      {/* Big rating */}
      <div className="text-center flex-shrink-0">
        <div className="text-5xl font-bold text-tertiary">{rating.toFixed(1)}</div>
        <Rating value={rating} size="md" showValue={false} />
        <p className="text-xs text-muted mt-1">{ratingCount.toLocaleString()} ratings</p>
      </div>
      {/* Breakdown bars */}
      <div className="flex-1 w-full space-y-2">
        {breakdown.map(({ star, pct }) => (
          <div key={star} className="flex items-center gap-2 text-xs text-muted">
            <span className="w-4 text-right">{star}</span>
            <span className="text-amber-400">★</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-8 text-right">{Math.round(pct)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
