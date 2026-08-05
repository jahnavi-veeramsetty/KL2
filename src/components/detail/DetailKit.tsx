import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * The shared vocabulary for every "clicked a card, landed on the thing" page —
 * courses, masterclasses, contests, hackathons.
 *
 * They had drifted into four different pages: two opened with a bare heading
 * after you clicked a card that was mostly artwork, one hardcoded blue where
 * the rest of the app uses the accent token, and three used emoji as icons in
 * an app that otherwise runs entirely on lucide. Everything below is the same
 * card language the catalog uses, so arriving somewhere feels like arriving
 * rather than like leaving.
 */

/**
 * Full-bleed banner carrying the artwork from the card you just clicked.
 *
 * The image is the continuity: it is the one thing you were looking at a moment
 * ago, so the page opens by confirming you got where you meant to go. on-dark
 * because a photo is a photo in either theme — the scrim under the text is what
 * makes the title readable over an image nobody vetted.
 */
export function DetailHero({
  image,
  eyebrow,
  title,
  subtitle,
  meta,
  children,
}: {
  image?: string
  eyebrow?: ReactNode
  title: string
  subtitle?: string
  /** Icon + label pairs. Use <MetaItem>. */
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="on-dark relative overflow-hidden rounded-3xl border border-line mb-10">
      {image ? (
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-panel" />
      )}

      {/* Two scrims, not one: the vertical lift keeps the lower half readable,
          the horizontal one protects the left edge where the text starts. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/75 to-[#050914]/35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/40 to-transparent" />

      <div className="relative p-6 sm:p-8 lg:p-10 min-h-[240px] sm:min-h-[280px] flex flex-col justify-end">
        {eyebrow && <div className="flex items-center gap-2 flex-wrap mb-3">{eyebrow}</div>}

        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-strong tracking-tight leading-[1.12] max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2.5 text-sm sm:text-[15px] text-body leading-relaxed max-w-2xl">{subtitle}</p>
        )}

        {meta && (
          <div className="mt-5 flex items-center gap-x-5 gap-y-2 flex-wrap text-xs text-subtle">{meta}</div>
        )}

        {children}
      </div>
    </section>
  )
}

/** One icon + label pair in a hero or card meta row. Replaces the emoji. */
export function MetaItem({ icon: Icon, children }: { icon: React.ElementType; children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 shrink-0 text-faint" strokeWidth={1.8} aria-hidden />
      {children}
    </span>
  )
}

/**
 * A titled block. Sections were `text-2xl font-bold` here and `text-xl` with an
 * icon there; this settles it at the app's heading size with the icon always in
 * the accent, so the four pages scan as one product.
 */
export function DetailSection({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon?: React.ElementType
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('mb-10 last:mb-0', className)}>
      <h2 className="flex items-center gap-2 text-xl font-bold text-strong tracking-tight mb-4">
        {Icon && <Icon className="w-[18px] h-[18px] text-accent shrink-0" strokeWidth={1.8} aria-hidden />}
        {title}
      </h2>
      {children}
    </section>
  )
}

/** The panel most detail sections sit in. */
export function DetailPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-panel border border-line rounded-2xl p-5 sm:p-6', className)}>{children}</div>
  )
}

/** "What you'll learn" / "Key takeaways" — a real check glyph, not a ✓ or a ✦. */
export function CheckList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <DetailPanel>
      <ul className={cn('grid gap-x-6 gap-y-3', columns === 2 && 'sm:grid-cols-2')}>
        {items.map(item => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-easy" strokeWidth={2.5} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </DetailPanel>
  )
}

/** Ordered requirements or rules, numbered because the order is real. */
export function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div key={item} className="flex items-start gap-3 p-4 bg-panel border border-line rounded-2xl">
          <span className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 text-xs font-bold tabular-nums mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-body leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  )
}

/** The sticky buy / register rail. */
export function PurchasePanel({ children }: { children: ReactNode }) {
  return (
    <div className="lg:sticky lg:top-20 self-start">
      <div className="bg-panel border border-line rounded-2xl overflow-hidden shadow-lg max-w-[340px] lg:ml-auto">
        {children}
      </div>
    </div>
  )
}
