interface RatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md'
  showValue?: boolean
}

export function Rating({ value, max = 5, size = 'sm', showValue = true }: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(value)
    const partial = !filled && i < value
    return { filled, partial, index: i }
  })

  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map(({ filled, partial, index }) => (
          <svg key={index} className={starSize} viewBox="0 0 24 24" aria-hidden="true">
            {partial ? (
              <>
                <defs>
                  <linearGradient id={`star-grad-${index}`}>
                    <stop offset={`${(value % 1) * 100}%`} stopColor="#F59E0B" />
                    <stop offset={`${(value % 1) * 100}%`} stopColor="#374151" />
                  </linearGradient>
                </defs>
                <path fill={`url(#star-grad-${index})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </>
            ) : (
              <path
                fill={filled ? '#F59E0B' : '#374151'}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            )}
          </svg>
        ))}
      </div>
      {showValue && (
        <span className={`font-semibold text-amber-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}
