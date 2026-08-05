import type { Contest, Hackathon, Masterclass } from '../types'
import { contests, hackathons, masterclasses } from '../data'
import { ROUTES } from '../constants/routes'
import { parseSessionStart, sessionState } from './masterclass'
import { formatDuration } from './format'

/**
 * One schedule across contests, hackathons and masterclasses.
 *
 * There used to be a separate `data/events.ts` with five hand-written entries
 * whose `eventId`s — 'weekly-contest-364', 'web3-global-hack' — matched nothing
 * in any other file. The dashboard linked to /events and /events/:id, and both
 * were dead routes pointing at invented ids.
 *
 * Deriving from the three real sources means every event on the calendar has a
 * detail page that actually exists, and new content appears here automatically.
 */
export type EventKind = 'contest' | 'hackathon' | 'masterclass'
export type EventStatus = 'live' | 'upcoming' | 'past'

export interface CalendarEvent {
  id: string
  kind: EventKind
  title: string
  start: Date
  status: EventStatus
  /** Detail route — guaranteed to resolve, unlike the old invented ids. */
  to: string
  /** One line of kind-specific context: duration, prize, instructor. */
  meta: string
}

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  contest: 'Contest',
  hackathon: 'Hackathon',
  masterclass: 'Masterclass',
}

function fromContest(contest: Contest): CalendarEvent {
  const hours = Math.floor(contest.durationMins / 60)
  const mins = contest.durationMins % 60

  return {
    id: `contest-${contest.id}`,
    kind: 'contest',
    title: contest.title,
    start: new Date(contest.startTime),
    status: contest.status === 'live' ? 'live' : contest.status,
    to: ROUTES.CONTEST_DETAIL(contest.id),
    meta: `${contest.difficulty} · ${hours}h${mins > 0 ? ` ${mins}m` : ''}`,
  }
}

function fromHackathon(hackathon: Hackathon): CalendarEvent {
  return {
    id: `hackathon-${hackathon.id}`,
    kind: 'hackathon',
    title: hackathon.title,
    start: new Date(hackathon.startDate),
    // Hackathons say 'ongoing' where everything else says 'live'.
    status: hackathon.status === 'ongoing' ? 'live' : hackathon.status,
    to: ROUTES.HACKATHON_DETAIL(hackathon.id),
    meta: `${hackathon.prizePool} · teams of ${hackathon.teamSize.min}–${hackathon.teamSize.max}`,
  }
}

function fromMasterclass(masterclass: Masterclass): CalendarEvent | null {
  const start = parseSessionStart(masterclass.date)
  if (!start) return null

  const state = sessionState(masterclass.date)

  return {
    id: `masterclass-${masterclass.id}`,
    kind: 'masterclass',
    title: masterclass.title,
    start,
    // 'soon' is still upcoming as far as a calendar is concerned.
    status: state === 'live' ? 'live' : state === 'past' ? 'past' : 'upcoming',
    to: ROUTES.MASTERCLASS_DETAIL(masterclass.id),
    meta: `${formatDuration(masterclass.durationHours)} · ${masterclass.instructor.name}`,
  }
}

/** Everything, soonest first. */
export function calendarEvents(): CalendarEvent[] {
  return [
    ...contests.map(fromContest),
    ...hackathons.map(fromHackathon),
    ...masterclasses.map(fromMasterclass).filter((e): e is CalendarEvent => e !== null),
  ].sort((a, b) => a.start.getTime() - b.start.getTime())
}

/** Local YYYY-MM-DD — toISOString would bucket by UTC and slip a day in IST. */
export function eventDayKey(date: Date): string {
  const y = date.getFullYear()
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const d = `${date.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Events falling inside the seven days starting Monday of the current week. */
export function eventsThisWeek(): Map<string, CalendarEvent[]> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weekday = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - weekday + (weekday === 0 ? -6 : 1))

  const end = new Date(monday)
  end.setDate(monday.getDate() + 7)

  const byDay = new Map<string, CalendarEvent[]>()
  for (const event of calendarEvents()) {
    if (event.start < monday || event.start >= end) continue
    const key = eventDayKey(event.start)
    const bucket = byDay.get(key)
    if (bucket) bucket.push(event)
    else byDay.set(key, [event])
  }

  return byDay
}

export function weekDays(startsOn: 'sunday' | 'monday' = 'monday'): Date[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // getDay() is Sunday-indexed. Rewinding by that alone gives a Sunday week;
  // for a Monday week, Sunday has to reach back six days rather than none.
  const weekday = today.getDay()
  const offset = startsOn === 'sunday' ? weekday : weekday === 0 ? 6 : weekday - 1

  const first = new Date(today)
  first.setDate(today.getDate() - offset)

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(first)
    day.setDate(first.getDate() + i)
    return day
  })
}
