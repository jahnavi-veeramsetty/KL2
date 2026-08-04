import { useMemo, useSyncExternalStore } from 'react'
import type { DailyChallenge } from '../types'
import {
  getCompletedSnapshot,
  markChallengeComplete,
  subscribeToProgress,
} from '../lib/dailyProgress'

/**
 * Completion state that every surface reads from, so marking a challenge done
 * updates the hero, the stats, the calendar and the history at once.
 */
export function useDailyProgress() {
  const ids = useSyncExternalStore(subscribeToProgress, getCompletedSnapshot, getCompletedSnapshot)
  const completed = useMemo(() => new Set(ids), [ids])

  return {
    completed,
    markComplete: markChallengeComplete,
    /** Seeded data counts too — local progress is additive, never a reset. */
    isSolved: (challenge: DailyChallenge) => challenge.isCompleted || completed.has(challenge.id),
  }
}
