import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { upcomingEvents } from '../../data/events'
import { cn } from '../../lib/cn'
import type { EventItem } from '../../types'

const getDaysInCurrentWeek = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Assuming Monday is the first day of the week
  const day = today.getDay()
  const diffToMonday = today.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  
  const monday = new Date(today.setDate(diffToMonday))
  
  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(monday)
    nextDate.setDate(monday.getDate() + i)
    weekDays.push(nextDate)
  }
  return weekDays
}

const colorStyles = {
  teal: 'bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30',
  green: 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30',
}

export function UpcomingEvents() {
  const weekDays = useMemo(() => getDaysInCurrentWeek(), [])
  
  // Group events by date string "YYYY-MM-DD"
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>()
    upcomingEvents.forEach(event => {
      const dateKey = new Date(event.isoDate).toISOString().split('T')[0]
      if (!map.has(dateKey)) {
        map.set(dateKey, [])
      }
      map.get(dateKey)!.push(event)
    })
    return map
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Upcoming Events</h2>
        <Link 
          to="/events" 
          className="text-sm font-medium text-accent hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="w-full overflow-x-auto no-scrollbar bg-[#111827]/60 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
        <div className="min-w-[800px] grid grid-cols-7 divide-x divide-white/5">
          {weekDays.map((date, i) => {
            const dateKey = date.toISOString().split('T')[0]
            const dayEvents = eventsByDate.get(dateKey) || []
            const isToday = new Date().toISOString().split('T')[0] === dateKey
            
            return (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col h-full min-h-[160px] p-3 transition-colors",
                  isToday ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
              >
                {/* Day Header */}
                <div className="flex flex-col items-center mb-3">
                  <span className={cn(
                    "text-xs font-semibold uppercase tracking-wider mb-1",
                    isToday ? "text-accent" : "text-slate-400"
                  )}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                    isToday ? "bg-accent text-[#060b1a]" : "text-slate-300"
                  )}>
                    {date.getDate()}
                  </span>
                </div>

                {/* Events */}
                <div className="flex flex-col gap-2 flex-1">
                  {dayEvents.map(event => (
                    <Link
                      key={event.id}
                      to={`/events/${event.eventId}`}
                      className={cn(
                        "flex flex-col p-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer group",
                        colorStyles[event.color]
                      )}
                    >
                      <span className="font-semibold line-clamp-2 leading-snug group-hover:text-white transition-colors">
                        {event.title}
                      </span>
                      <span className="text-[10px] mt-1.5 opacity-80 font-medium flex items-center justify-between">
                        {event.date.replace(/,.*$/, '')}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"><polyline points="9 18 15 12 9 6" /></svg>
                      </span>
                    </Link>
                  ))}
                  
                  {dayEvents.length === 0 && (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xs text-slate-500/50 font-medium">No events</span>
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
