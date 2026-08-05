import { Monitor, Moon, Sun } from 'lucide-react'
import type { ThemePreference } from '../../lib/theme'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/cn'

/**
 * The full three-way choice, which the top-bar button deliberately hides.
 *
 * "System" is the default and matters: someone whose laptop switches at sunset
 * expects the app to follow, and a two-state toggle would pin them to whichever
 * they last clicked.
 */
const OPTIONS: { value: ThemePreference; label: string; hint: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', hint: 'Always light', icon: Sun },
  { value: 'dark', label: 'Dark', hint: 'Always dark', icon: Moon },
  { value: 'system', label: 'System', hint: 'Match my device', icon: Monitor },
]

export function AppearanceSettings() {
  const { preference, setPreference } = useTheme()

  return (
    <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <legend className="sr-only">Theme</legend>
      {OPTIONS.map(({ value, label, hint, icon: Icon }) => {
        const selected = preference === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setPreference(value)}
            aria-pressed={selected}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              selected
                ? 'border-accent/50 bg-accent/10'
                : 'border-line bg-raised hover:border-line-strong'
            )}
          >
            <Icon
              className={cn('w-5 h-5 shrink-0', selected ? 'text-accent' : 'text-subtle')}
              strokeWidth={1.8}
            />
            <span className="min-w-0">
              <span className={cn('block text-sm font-semibold', selected ? 'text-strong' : 'text-body')}>
                {label}
              </span>
              <span className="block text-xs text-faint">{hint}</span>
            </span>
          </button>
        )
      })}
    </fieldset>
  )
}
