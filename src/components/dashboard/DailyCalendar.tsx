import { useState } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { dailyChallenges } from '../../data';
import { buildDailyIndex, toISODate } from '../../lib/daily';
import { useDailyProgress } from '../../hooks/useDailyProgress';

/**
 * A day cell has four states, not two. A bare red dot on every past day
 * contradicted the streak shown beside it, because most days simply have no
 * challenge scheduled — that is not the same as one being missed.
 */
export default function DailyCalendar() {
  const { completed } = useDailyProgress();
  const dailyIndex = buildDailyIndex(dailyChallenges, completed);
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Next midnight for countdown
  const nextMidnight = new Date();
  nextMidnight.setHours(23, 59, 59, 999);
  const { formatted: timeLeft } = useCountdown(nextMidnight);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (nextMonthDate <= thisMonth) setCurrentDate(nextMonthDate);
  };

  const isCurrentMonth = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <div className="bg-raised/40 backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full font-sans border border-line-strong">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-medium text-gray-200">Day {today.getDate()}</h2>
          <span className="text-xs text-gray-500">{timeLeft} left</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="text-gray-400 hover:text-strong cursor-pointer" aria-label="Previous month">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="relative flex items-center justify-center w-10 h-10">
            <svg className="absolute w-full h-full text-blue-900/40 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l0 10 10 5 10-5 0-10L12 2z" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            </svg>
            <div className="z-10 flex flex-col items-center justify-center leading-none">
              <span className="text-[10px] font-bold text-gray-300">{monthNames[currentDate.getMonth()]}</span>
            </div>
          </div>
          <button
            onClick={nextMonth}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className={`text-gray-400 ${isCurrentMonth ? 'opacity-50 cursor-not-allowed' : 'hover:text-strong cursor-pointer'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-4">
        {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-4 text-sm text-center">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isToday = thisDate.getTime() === today.getTime();
          const isPast = thisDate < today;
          const isFuture = thisDate > today;

          // undefined = no challenge ran that day, which is neither solved nor missed
          const solved = dailyIndex.get(toISODate(thisDate));
          const marker =
            isPast && solved === true
              ? { className: 'bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.8)]', label: 'solved' }
              : isPast && solved === false
                ? { className: 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]', label: 'missed' }
                : null;

          return (
            <div
              key={day}
              className="flex flex-col items-center justify-start h-8"
              title={marker ? `${day}: ${marker.label}` : undefined}
            >
              {isToday ? (
                <svg className="w-6 h-6 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] light:drop-shadow-none mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <>
                  <span className={isFuture ? 'text-gray-600' : 'text-gray-300'}>{day}</span>
                  {marker && <div className={`w-1 h-1 rounded-full mt-1 ${marker.className}`} />}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
