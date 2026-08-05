import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/cn'

/**
 * One button, because that is what people reach for.
 *
 * The three-way preference (light / dark / system) lives in Settings; here a
 * click just flips to the other one. Showing the icon of the theme you would
 * get — a sun while dark — is the convention people already read.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'relative w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center rounded-full',
        'text-subtle hover:text-strong hover:bg-raised transition-colors',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" strokeWidth={1.8} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={1.8} />
      )}
    </button>
  )
}
