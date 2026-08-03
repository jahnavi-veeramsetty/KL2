import { DISCOUNT_PERCENT, listPrice, formatRupees } from '../../lib/format'
import { cn } from '../../lib/cn'

/**
 * Struck list price plus the discount chip, sitting above the payable price so
 * that lands on the baseline beside the CTA.
 *
 * Shared by the desktop cards, the mobile rows and the shelf tiles — this used
 * to be copy-pasted per breakpoint, which is how the chip went missing from the
 * compact layouts in the first place.
 */
export function DiscountLine({
  price,
  size = 'md',
  className,
}: {
  price: number
  size?: 'sm' | 'md'
  className?: string
}) {
  const sm = size === 'sm'

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className={cn('text-slate-400 font-medium line-through', sm ? 'text-[10px]' : 'text-xs')}>
        {formatRupees(listPrice(price))}
      </span>
      <span
        className={cn(
          'text-emerald-400 font-bold bg-emerald-400/10 rounded leading-none whitespace-nowrap',
          sm ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'
        )}
      >
        {DISCOUNT_PERCENT}% OFF
      </span>
    </div>
  )
}
