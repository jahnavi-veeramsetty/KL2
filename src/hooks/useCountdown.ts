import { useState, useEffect } from 'react'
import { padTwo } from '../lib/format'

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
  formatted: string
}

function getTimeLeft(target: number): CountdownTime {
  const now = Date.now()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, formatted: '00:00:00' }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  const formatted = days > 0
    ? `${days}d ${padTwo(hours)}h ${padTwo(minutes)}m`
    : `${padTwo(hours)}:${padTwo(minutes)}:${padTwo(seconds)}`

  return { days, hours, minutes, seconds, isExpired: false, formatted }
}

export function useCountdown(targetDate: string | Date): CountdownTime {
  // Depend on the timestamp, not the Date object. Callers commonly build the
  // target inline (`new Date()` in render), which is a fresh reference every
  // render — keying the effect on it would re-run the effect, set state, and
  // loop forever.
  const targetTime = new Date(targetDate).getTime()

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => getTimeLeft(targetTime))

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetTime))
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  return timeLeft
}
