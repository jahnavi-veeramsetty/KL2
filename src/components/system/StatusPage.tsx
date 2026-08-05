import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Shared shell for the pages that appear when something has gone wrong —
 * not found, crashed, offline.
 *
 * One shell rather than three layouts, because these are the screens nobody
 * designs twice and they end up looking like a different product otherwise.
 */
interface StatusPageProps {
  /** Large muted glyph behind the heading — "404", "500", an icon. */
  code?: string
  icon?: ReactNode
  title: string
  description: string
  /** Buttons, links — whatever gets the person moving again. */
  actions?: ReactNode
  /** Optional detail, e.g. the error message. Rendered small and muted. */
  detail?: ReactNode
  tone?: 'neutral' | 'danger'
}

export function StatusPage({
  code, icon, title, description, actions, detail, tone = 'neutral',
}: StatusPageProps) {
  return (
    <main className="min-h-[100dvh] w-full bg-page flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        {code && (
          <p
            aria-hidden="true"
            className={cn(
              'font-black tracking-tighter leading-none select-none',
              'text-[92px] sm:text-[120px]',
              tone === 'danger'
                ? 'text-red-500/15'
                : 'text-strong/[0.07]'
            )}
          >
            {code}
          </p>
        )}

        {icon && (
          <div className={cn('flex justify-center', code ? '-mt-10 mb-5' : 'mb-5')}>
            <span className={cn(
              'w-14 h-14 rounded-2xl border flex items-center justify-center',
              tone === 'danger'
                ? 'border-red-500/30 bg-red-500/10 text-red-400'
                : 'border-line-strong bg-raised text-subtle'
            )}>
              {icon}
            </span>
          </div>
        )}

        <h1 className="text-xl sm:text-2xl font-bold text-strong tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-sm text-subtle mt-3 leading-relaxed">{description}</p>

        {actions && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">{actions}</div>
        )}

        {detail && (
          <div className="mt-8 pt-5 border-t border-line text-left">{detail}</div>
        )}
      </div>
    </main>
  )
}

/** Filled action — the one thing we want them to do. */
export function StatusAction({ children, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className="px-6 py-3 rounded-xl bg-accent text-on-accent text-xs font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {children}
    </button>
  )
}
