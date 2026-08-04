import { useCallback, useMemo, useState } from 'react'
import { notifications } from '../data/notifications'

const KEY = 'notifications:read'

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

function persist(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // private mode — the session still reflects it, it just will not survive
  }
}

/**
 * Read state for the notification panel.
 *
 * Kept in localStorage rather than component state so the unread dot does not
 * come back every time the page reloads — a badge that always says "3" stops
 * meaning anything within a day.
 */
export function useNotifications() {
  const [read, setRead] = useState<Set<string>>(() => new Set(readIds()))

  const items = useMemo(
    () => notifications.map(n => ({ ...n, isRead: read.has(n.id) })),
    [read]
  )

  const unreadCount = useMemo(() => items.filter(n => !n.isRead).length, [items])

  const markRead = useCallback((id: string) => {
    setRead(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev).add(id)
      persist([...next])
      return next
    })
  }, [])

  const markAllRead = useCallback(() => {
    const all = notifications.map(n => n.id)
    persist(all)
    setRead(new Set(all))
  }, [])

  return { items, unreadCount, markRead, markAllRead }
}

/** "just now" / "12m" / "3h" / "2d" — compact enough for a 380px panel. */
export function formatAgo(minutes: number): string {
  if (minutes < 2) return 'just now'
  if (minutes < 60) return `${minutes}m`
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h`
  return `${Math.floor(minutes / (60 * 24))}d`
}
