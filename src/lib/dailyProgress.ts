/**
 * Which daily challenges this browser has completed.
 *
 * `DailyChallenge.isCompleted` is a static field in src/data/daily.ts — the
 * same six solved and two missed for every visitor. Without somewhere to record
 * an actual answer, solving a challenge could not move the streak, so the page
 * would congratulate you and change nothing.
 *
 * This is localStorage, not a backend: it is per-browser and clears with site
 * data. Real history needs a server. It is enough to make the numbers respond.
 */
const KEY = 'daily:completed'

let cache: string[] | null = null
const listeners = new Set<() => void>()

function read(): string[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    // private mode, or somebody hand-edited the key into nonsense
    cache = []
  }
  return cache
}

/** Stable reference between writes — useSyncExternalStore requires it. */
export function getCompletedSnapshot(): string[] {
  return read()
}

export function subscribeToProgress(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

export function markChallengeComplete(id: string): void {
  const current = read()
  if (current.includes(id)) return

  cache = [...current, id]
  try {
    localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {
    // the session still reflects it; it just will not survive a reload
  }
  listeners.forEach(listener => listener())
}
