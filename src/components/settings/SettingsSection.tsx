import type { ReactNode } from 'react'
import { Toggle } from '../../ui'
import { cn } from '../../lib/cn'

/**
 * The shell every settings panel is built from — a titled group with an
 * optional line of context under it.
 *
 * Shared because a settings page lives or dies on rhythm: the moment two
 * sections space their headings differently the page reads as three pages
 * stapled together.
 */
export function SettingsSection({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('mb-10 last:mb-0', className)}>
      <h3 className="text-sm font-bold text-strong tracking-tight">{title}</h3>
      {description && <p className="text-[13px] text-subtle mt-1 max-w-prose">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

/**
 * One labelled row. The control sits right, the explanation sits under the
 * label — a setting whose consequence is not written down gets left at its
 * default forever, because nobody flips a switch they cannot predict.
 */
export function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5 border-b border-line last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-strong">{label}</p>
        {description && <p className="text-[13px] text-subtle mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0 pt-0.5">{children}</div>
    </div>
  )
}

/** The common case: a row whose control is a switch. */
export function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}) {
  return (
    <SettingRow label={label} description={description}>
      <Toggle checked={checked} onChange={onChange} label={label} disabled={disabled} />
    </SettingRow>
  )
}

/**
 * A small segmented choice — two or three options that fit inline. Anything
 * longer belongs in a select; a nine-item segmented control is a scroll.
 */
export function ChoiceRow<T extends string>({
  label,
  description,
  value,
  options,
  onChange,
}: {
  label: string
  description?: string
  value: T
  options: { value: T; label: string }[]
  onChange: (next: T) => void
}) {
  return (
    <SettingRow label={label} description={description}>
      <div className="flex gap-0.5 p-0.5 rounded-lg switch-track border border-line">
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={cn(
              'px-3 py-1 rounded-md text-[11px] font-bold transition-colors',
              value === option.value ? 'switch-thumb' : 'text-faint hover:text-body',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </SettingRow>
  )
}
