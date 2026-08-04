import type { DailyChallenge } from '../types'

/** Local YYYY-MM-DD. `toISOString()` would shift the date across UTC midnight. */
export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const d = `${date.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** The instant the current challenge expires — used for the reset countdown. */
export function endOfToday(): Date {
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return end
}

export function getTodayChallenge(challenges: DailyChallenge[]): DailyChallenge | undefined {
  const today = toISODate(new Date())
  return challenges.find(c => c.date === today)
}

export interface DailyStats {
  total: number
  solved: number
  missed: number
  xpEarned: number
  completionRate: number
}

/**
 * Derived from the challenge list itself rather than stored anywhere.
 *
 * `completed` carries this browser's own answers on top of the seeded
 * `isCompleted` flags, so solving something actually moves these numbers.
 */
export function getDailyStats(challenges: DailyChallenge[], completed?: Set<string>): DailyStats {
  const today = toISODate(new Date())
  const isSolved = (c: DailyChallenge) => c.isCompleted || completed?.has(c.id) === true

  // Today is not missed yet — it is still in play, so it does not count against
  // the completion rate until the day is over.
  const past = challenges.filter(c => c.date <= today)
  const solved = past.filter(isSolved)
  const missed = past.filter(c => !isSolved(c) && c.date < today)

  return {
    total: past.length,
    solved: solved.length,
    missed: missed.length,
    xpEarned: solved.reduce((sum, c) => sum + c.xpReward, 0),
    completionRate: past.length === 0 ? 0 : Math.round((solved.length / past.length) * 100),
  }
}

/** Map of YYYY-MM-DD to completion, for colouring calendar cells. */
export function buildDailyIndex(
  challenges: DailyChallenge[],
  completed?: Set<string>
): Map<string, boolean> {
  return new Map(challenges.map(c => [c.date, c.isCompleted || completed?.has(c.id) === true]))
}

/**
 * Data quirk: descriptions in src/data/daily.ts escape their line breaks, so
 * the runtime string holds a literal backslash followed by 'n' rather than a
 * newline. Pattern challenges are ASCII art and unreadable without this.
 *
 * String.raw avoids a double-escaped regex, which is easy to get wrong and
 * silently becomes a real-newline match instead of the intended literal.
 */
const ESCAPED_NEWLINE = String.raw`\n`

export function unescapeNewlines(text: string): string {
  return text.split(ESCAPED_NEWLINE).join('\n')
}
