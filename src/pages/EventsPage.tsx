import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Trophy, Users, Video, CalendarDays } from 'lucide-react'
import {
  type CalendarEvent, type EventKind,
  EVENT_KIND_LABEL, calendarEvents, eventDayKey,
} from '../lib/events'
import { cn } from '../lib/cn'

/**
 * A calendar, not a list.
 *
 * Month to survey, Week to plan, Day to act — and stepping backwards is how you
 * reach past events, so they need no separate toggle. Everything derives from
 * contests, hackathons and masterclasses, so every entry links somewhere that
 * exists.
 */
type View = 'month' | 'week' | 'day'

const VIEWS: View[] = ['month', 'week', 'day']
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const KIND_STYLE: Record<EventKind, { icon: typeof Trophy; chip: string; tone: string; dot: string }> = {
  contest: {
    icon: Trophy,
    chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25',
    tone: 'text-amber-400 bg-amber-400/12 border-amber-400/25',
    dot: 'bg-amber-400',
  },
  hackathon: {
    icon: Users,
    chip: 'bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25',
    tone: 'text-violet-300 bg-violet-400/12 border-violet-400/25',
    dot: 'bg-violet-400',
  },
  masterclass: {
    icon: Video,
    chip: 'bg-pink-500/15 text-pink-300 border-pink-500/30 hover:bg-pink-500/25',
    tone: 'text-pink-300 bg-pink-400/12 border-pink-400/25',
    dot: 'bg-pink-400',
  },
}

const FILTERS: (EventKind | 'all')[] = ['all', 'contest', 'hackathon', 'masterclass']

function startOfWeek(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const weekday = d.getDay()
  d.setDate(d.getDate() - weekday + (weekday === 0 ? -6 : 1))
  return d
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function timeOf(event: CalendarEvent): string {
  return event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

/** Compact chip for month cells and week columns. */
function EventChip({ event }: { event: CalendarEvent }) {
  return (
    <Link
      to={event.to}
      title={`${event.title} — ${timeOf(event)}`}
      className={cn(
        'group block px-2 py-1.5 rounded-lg border text-[10.5px] leading-tight transition-colors',
        KIND_STYLE[event.kind].chip
      )}
    >
      <span className="block font-semibold truncate group-hover:text-strong transition-colors">
        {event.title}
      </span>
      <span className="flex items-center justify-between gap-1 mt-0.5 opacity-80 tabular-nums">
        {timeOf(event)}
        {event.status === 'live' && (
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
        )}
      </span>
    </Link>
  )
}

/** Full row for the day agenda. */
function EventRow({ event }: { event: CalendarEvent }) {
  const { icon: Icon, tone } = KIND_STYLE[event.kind]

  return (
    <Link
      to={event.to}
      className={cn(
        'group flex items-center gap-3.5 p-3.5 rounded-xl border transition-colors',
        event.status === 'live'
          ? 'border-green-500/30 bg-green-500/[0.06] hover:border-green-500/50'
          : 'border-line bg-raised/25 hover:border-accent/30',
        event.status === 'past' && 'opacity-55'
      )}
    >
      <span className="w-16 shrink-0 text-[12px] font-bold text-body tabular-nums">
        {timeOf(event)}
      </span>
      <span className={cn('w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center', tone)}>
        <Icon className="w-4 h-4" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-semibold text-strong truncate group-hover:text-accent transition-colors">
            {event.title}
          </span>
          {event.status === 'live' && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-[9px] font-bold text-green-400 uppercase tracking-widest shrink-0">
              <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" /> Live
            </span>
          )}
        </span>
        <span className="block text-[11px] text-faint truncate mt-1">
          {EVENT_KIND_LABEL[event.kind]} &middot; {event.meta}
        </span>
      </span>
    </Link>
  )
}

export default function EventsPage() {
  const [view, setView] = useState<View>('month')
  const [cursor, setCursor] = useState(() => new Date())
  const [kind, setKind] = useState<EventKind | 'all'>('all')

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayKey = eventDayKey(today)

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of calendarEvents()) {
      if (kind !== 'all' && event.kind !== kind) continue
      const key = eventDayKey(event.start)
      const bucket = map.get(key)
      if (bucket) bucket.push(event)
      else map.set(key, [event])
    }
    return map
  }, [kind])

  // Always six rows, so stepping between months never resizes the grid and
  // shifts the cell under the cursor.
  const monthCells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
    const gridStart = startOfWeek(first)
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i))
  }, [cursor])

  const weekCells = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(cursor), i)),
    [cursor]
  )

  const step = (direction: 1 | -1) => {
    const next = new Date(cursor)
    if (view === 'month') next.setMonth(next.getMonth() + direction)
    else next.setDate(next.getDate() + direction * (view === 'week' ? 7 : 1))
    setCursor(next)
  }

  const periodLabel =
    view === 'month'
      ? cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : view === 'week'
        ? `${startOfWeek(cursor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${addDays(startOfWeek(cursor), 6).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : cursor.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const dayEvents = byDay.get(eventDayKey(cursor)) ?? []

  return (
    <div className="space-y-5">
      {/* Today sits ahead of the arrows, not between them — it is a jump, not a
          step, and reads as the origin the arrows move away from. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <button
          type="button"
          onClick={() => setCursor(new Date())}
          className="px-3.5 py-1.5 rounded-lg border border-line-strong bg-raised text-xs font-bold text-body hover:bg-line-strong hover:text-strong transition-colors"
        >
          Today
        </button>

        {/* The period sits between the arrows — they step it, so it belongs
            between the things that move it. */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous ${view}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-subtle hover:text-strong hover:bg-raised transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h2 className="min-w-[9.5rem] text-center text-sm font-bold text-strong tracking-tight">
            {periodLabel}
          </h2>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label={`Next ${view}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-subtle hover:text-strong hover:bg-raised transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-0.5 p-0.5 rounded-xl switch-track border border-line ml-auto">
          {VIEWS.map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors',
                view === v ? 'switch-thumb' : 'text-faint hover:text-body'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setKind(f)}
            aria-pressed={kind === f}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors capitalize',
              kind === f
                ? 'bg-accent/15 text-accent border-accent/40'
                : 'bg-raised text-subtle border-line-strong hover:text-strong hover:border-line-strong'
            )}
          >
            {f !== 'all' && <span className={cn('w-1.5 h-1.5 rounded-full', KIND_STYLE[f].dot)} />}
            {f === 'all' ? 'All' : `${EVENT_KIND_LABEL[f]}s`}
          </button>
        ))}
      </div>

      {view === 'month' && (
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[720px] rounded-2xl border border-line bg-raised/20 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-line">
              {WEEKDAYS.map(d => (
                <span key={d} className="py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-faint">
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {monthCells.map(date => {
                const key = eventDayKey(date)
                const events = byDay.get(key) ?? []
                const isToday = key === todayKey
                const outside = date.getMonth() !== cursor.getMonth()

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { setCursor(date); setView('day') }}
                    className={cn(
                      'text-left min-h-[104px] p-2 border-b border-r border-line transition-colors',
                      // bg-page, not a literal black wash: "not this month" means
                      // recessed relative to the grid, which is a different colour
                      // in each theme.
                      outside ? 'bg-page' : 'hover:bg-raised',
                      isToday && 'bg-accent/[0.06]'
                    )}
                  >
                    <span className={cn(
                      'inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold tabular-nums mb-1.5',
                      isToday ? 'bg-accent text-on-accent' : outside ? 'text-faint/45' : 'text-body'
                    )}>
                      {date.getDate()}
                    </span>

                    <span className="flex flex-col gap-1">
                      {events.slice(0, 2).map(e => <EventChip key={e.id} event={e} />)}
                      {events.length > 2 && (
                        <span className="text-[10px] text-faint font-semibold pl-1">
                          +{events.length - 2} more
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {view === 'week' && (
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[760px] grid grid-cols-7 gap-2">
            {weekCells.map(date => {
              const key = eventDayKey(date)
              const events = byDay.get(key) ?? []
              const isToday = key === todayKey

              return (
                <div
                  key={key}
                  className={cn(
                    'rounded-xl border p-2.5 min-h-[300px]',
                    isToday ? 'border-accent/35 bg-accent/[0.05]' : 'border-line bg-raised/20'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => { setCursor(date); setView('day') }}
                    className="w-full flex flex-col items-center mb-2.5 group"
                  >
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-wider',
                      isToday ? 'text-accent' : 'text-faint'
                    )}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className={cn(
                      'flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold tabular-nums mt-1 transition-colors',
                      isToday ? 'bg-accent text-on-accent' : 'text-body group-hover:bg-raised'
                    )}>
                      {date.getDate()}
                    </span>
                  </button>

                  <div className="flex flex-col gap-1.5">
                    {events.map(e => <EventChip key={e.id} event={e} />)}
                    {events.length === 0 && (
                      <span className="text-[11px] text-faint text-center pt-3">&mdash;</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div>
          {dayEvents.length === 0 ? (
            <div className="rounded-2xl border border-line bg-raised/15 py-14 text-center">
              <CalendarDays className="w-7 h-7 text-faint mx-auto mb-3" />
              <p className="text-sm text-subtle font-semibold">Nothing scheduled</p>
              <p className="text-xs text-faint mt-1.5">Use the arrows to look at another day.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {dayEvents.map(e => <EventRow key={e.id} event={e} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
