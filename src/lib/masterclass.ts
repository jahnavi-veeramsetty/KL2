import type { Masterclass } from '../types'

/**
 * Masterclass sessions have no status field — only a display string like
 * "August 15, 2026 • 10:00 AM IST". Live/upcoming has to be derived from it,
 * which means parsing a string written for humans.
 *
 * The timezone suffix is dropped rather than honoured: without a real timestamp
 * on the type there is nothing to convert against, so the session is treated as
 * local. Fine while this is mock data; a real schedule needs an ISO field.
 */
const SESSION_MINUTES = 90
const SOON_HOURS = 48

export type SessionState = 'live' | 'soon' | 'upcoming' | 'past'

export function parseSessionStart(date: string): Date | null {
  const [datePart, timePart] = date.split('•').map(part => part.trim())
  if (!datePart) return null

  const time = (timePart ?? '').replace(/\s*[A-Z]{2,4}$/, '').trim()
  const parsed = new Date(`${datePart} ${time}`.trim())
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function sessionState(date: string, now = new Date()): SessionState {
  const start = parseSessionStart(date)
  if (!start) return 'upcoming'

  const end = new Date(start.getTime() + SESSION_MINUTES * 60_000)
  if (now >= start && now <= end) return 'live'
  if (now > end) return 'past'

  const hoursAway = (start.getTime() - now.getTime()) / 3_600_000
  return hoursAway <= SOON_HOURS ? 'soon' : 'upcoming'
}

/** Whatever a student could join right now, or next — live first, then soonest. */
export function nextSession(list: Masterclass[], now = new Date()): Masterclass | undefined {
  const live = list.find(m => sessionState(m.date, now) === 'live')
  if (live) return live

  return list
    .filter(m => {
      const start = parseSessionStart(m.date)
      return start !== null && start.getTime() > now.getTime()
    })
    .sort((a, b) => {
      const at = parseSessionStart(a.date)?.getTime() ?? Infinity
      const bt = parseSessionStart(b.date)?.getTime() ?? Infinity
      return at - bt
    })[0]
}
