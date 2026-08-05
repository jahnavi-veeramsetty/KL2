import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { type EventKind, eventDayKey, eventsThisWeek, weekDays } from '../../lib/events'
import { cn } from '../../lib/cn'
import { ViewAllLink } from '../../ui/ViewAllLink'
import { useSettings } from '../../hooks/useSettings'

/**
 * The current week, from the real schedule.
 *
 * Previously fed by data/events.ts, whose five entries had invented `eventId`s
 * matching nothing in the app — every tile linked to /events/:id, a route that
 * did not exist. Now each tile points at the actual contest, hackathon or
 * masterclass detail page.
 */
const KIND_STYLE: Record<EventKind, string> = {
  contest: 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25',
  hackathon: 'bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25',
  masterclass: 'bg-pink-500/15 text-pink-300 border-pink-500/30 hover:bg-pink-500/25',
}

export function UpcomingEvents() {
  const { settings } = useSettings()
  const days = useMemo(() => weekDays(settings.weekStartsOn), [settings.weekStartsOn])
  const byDay = useMemo(() => eventsThisWeek(), [])
  const todayKey = eventDayKey(new Date())

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-strong tracking-tight">This week</h2>
        <ViewAllLink to={ROUTES.EVENTS} />
      </div>

      <div className="w-full overflow-x-auto no-scrollbar bg-panel/60 rounded-2xl border border-line shadow-xl backdrop-blur-sm">
        <div className="min-w-[760px] grid grid-cols-7 divide-x divide-white/5">
          {days.map(date => {
            // Built from local date parts — toISOString buckets by UTC and
            // slips a day for anyone east of it.
            const key = eventDayKey(date)
            const dayEvents = byDay.get(key) ?? []
            const isToday = key === todayKey

            return (
              <div
                key={key}
                className={cn(
                  'flex flex-col h-full min-h-[160px] p-3 transition-colors',
                  isToday ? 'bg-raised' : 'hover:bg-raised'
                )}
              >
                <div className="flex flex-col items-center mb-3">
                  <span className={cn(
                    'text-xs font-semibold uppercase tracking-wider mb-1',
                    isToday ? 'text-accent' : 'text-subtle'
                  )}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium tabular-nums',
                    isToday ? 'bg-accent text-on-accent' : 'text-body'
                  )}>
                    {date.getDate()}
                  </span>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  {dayEvents.map(event => (
                    <Link
                      key={event.id}
                      to={event.to}
                      className={cn(
                        'group flex flex-col p-2.5 rounded-xl border text-xs transition-colors',
                        KIND_STYLE[event.kind]
                      )}
                    >
                      <span className="font-semibold line-clamp-2 leading-snug group-hover:text-strong transition-colors">
                        {event.title}
                      </span>
                      <span className="flex items-center justify-between gap-1 text-[10px] mt-1.5 opacity-80 font-medium tabular-nums">
                        {event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        {event.status === 'live' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                        )}
                      </span>
                    </Link>
                  ))}

                  {dayEvents.length === 0 && (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xs text-faint/50 font-medium">&mdash;</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
