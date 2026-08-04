import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell, BellOff, Star, Trophy, Users, Video, BookOpen, Flame, Award, Check, X,
} from 'lucide-react'
import type { NotificationKind } from '../../types/notification'
import { formatAgo, useNotifications } from '../../hooks/useNotifications'
import { cn } from '../../lib/cn'

/**
 * The bell, plus the panel it should always have opened.
 *
 * Each kind gets its own icon and tint so the list is scannable without reading
 * — a contest result and a streak warning should not look identical.
 */
const KIND_STYLE: Record<NotificationKind, { icon: typeof Bell; tone: string }> = {
  daily: { icon: Star, tone: 'text-accent bg-accent/12 border-accent/25' },
  contest: { icon: Trophy, tone: 'text-amber-400 bg-amber-400/12 border-amber-400/25' },
  hackathon: { icon: Users, tone: 'text-violet-300 bg-violet-400/12 border-violet-400/25' },
  masterclass: { icon: Video, tone: 'text-pink-300 bg-pink-400/12 border-pink-400/25' },
  course: { icon: BookOpen, tone: 'text-sky-300 bg-sky-400/12 border-sky-400/25' },
  streak: { icon: Flame, tone: 'text-orange-400 bg-orange-400/12 border-orange-400/25' },
  achievement: { icon: Award, tone: 'text-green-400 bg-green-400/12 border-green-400/25' },
}

/** Anything inside the last day reads as "today"; the rest is history. */
const TODAY_MINUTES = 60 * 24

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { items, unreadCount, markRead, markAllRead } = useNotifications()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const today = items.filter(n => n.minutesAgo < TODAY_MINUTES)
  const earlier = items.filter(n => n.minutesAgo >= TODAY_MINUTES)

  const renderGroup = (label: string, group: typeof items) => {
    if (group.length === 0) return null

    return (
      <div>
        <p className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600 bg-white/[0.02]">
          {label}
        </p>
        {group.map(n => {
          const { icon: Icon, tone } = KIND_STYLE[n.kind]

          const body = (
            <>
              <span className={cn('w-8 h-8 shrink-0 rounded-lg border flex items-center justify-center', tone)}>
                <Icon className="w-4 h-4" />
              </span>

              <span className="flex-1 min-w-0">
                <span className="flex items-start gap-2">
                  <span className={cn('flex-1 text-[13px] leading-snug', n.isRead ? 'text-slate-400 font-medium' : 'text-white font-semibold')}>
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-600 tabular-nums shrink-0 mt-0.5">
                    {formatAgo(n.minutesAgo)}
                  </span>
                </span>
                <span className="block text-[11.5px] text-slate-500 leading-snug mt-1 line-clamp-2">
                  {n.body}
                </span>
              </span>

              {/* Unread marker sits last so the rows stay left-aligned when read */}
              {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />}
            </>
          )

          const className = cn(
            'w-full flex items-start gap-3 px-4 py-3 text-left border-b border-white/[0.04] last:border-b-0 transition-colors',
            n.isRead ? 'hover:bg-white/[0.03]' : 'bg-accent/[0.04] hover:bg-accent/[0.08]'
          )

          return n.to ? (
            <Link key={n.id} to={n.to} onClick={() => { markRead(n.id); setOpen(false) }} className={className}>
              {body}
            </Link>
          ) : (
            <button key={n.id} type="button" onClick={() => markRead(n.id)} className={className}>
              {body}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        aria-expanded={open}
        className={cn(
          'relative w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center rounded-full transition-colors',
          open ? 'bg-white/[0.12] text-white' : 'hover:bg-white/[0.07] text-slate-400 hover:text-white'
        )}
      >
        <Bell className="w-6 h-6 lg:w-5 lg:h-5" strokeWidth={1.8} />

        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-red-500 border-2 border-neutral flex items-center justify-center text-[9px] font-bold text-white tabular-nums">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className={cn(
            // Full-width sheet on phones, anchored dropdown from lg up — a
            // 380px panel does not fit a 360px screen.
            'fixed left-3 right-3 top-[68px] lg:absolute lg:left-auto lg:right-0 lg:top-[calc(100%+10px)] lg:w-[380px]',
            'z-[70] rounded-2xl border border-white/10 bg-[#0b1122] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden'
          )}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]">
            <h2 className="text-sm font-bold text-white tracking-tight">Notifications</h2>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold text-accent bg-accent/12 border border-accent/25 rounded-full px-2 py-0.5 tabular-nums">
                {unreadCount} new
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.07] transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close notifications"
                className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.07] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[min(70vh,26rem)] overflow-y-auto no-scrollbar">
            {items.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <BellOff className="w-6 h-6 text-slate-600 mx-auto mb-2.5" />
                <p className="text-xs text-slate-500">Nothing new. You are all caught up.</p>
              </div>
            ) : (
              <>
                {renderGroup('Today', today)}
                {renderGroup('Earlier', earlier)}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
