import { cn } from '../lib/cn'

/**
 * On/off switch.
 *
 * A button with aria-pressed rather than a checkbox: the control commits
 * immediately, and a checkbox promises a form and a Save button that are not
 * coming. The knob moves as well as recolouring, so the state survives a theme
 * where the accent is quiet and survives being read without colour at all.
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  /** Announced to screen readers; the visible label lives in the row beside it. */
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative shrink-0 w-11 h-6 rounded-full border transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-panel',
        disabled && 'opacity-40 cursor-not-allowed',
        checked ? 'bg-accent border-accent' : 'bg-line-strong border-line-strong',
      )}
    >
      {/* bg-panel, not white: the knob is a chip cut from the card surface, so
          it stays light on the light theme's teal and dark on the dark theme's
          cyan — the same relationship text-on-accent has with the fill. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-panel shadow-sm transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}
