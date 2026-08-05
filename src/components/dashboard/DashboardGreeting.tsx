import { useProfile } from '../../hooks/useProfile'
import { dailyChallenges } from '../../data'
import { getTodayChallenge } from '../../lib/daily'

/**
 * Greeting plus one motivating line.
 *
 * This sits above the work column rather than in the productivity rail on
 * purpose: "you are 2 days from a 2-week streak" is the most persuasive
 * sentence on the page, and the rail is for glancing at, not reading.
 */
function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

/** The nearest streak landmark worth chasing. */
function streakLine(streak: number, longest: number, solvedToday: boolean): string {
  const milestones = [7, 14, 30, 50, 100]
  const next = milestones.find(m => m > streak)

  if (streak === 0) {
    return solvedToday ? 'Streak started today — come back tomorrow to keep it.' : 'Solve today’s challenge to start a streak.'
  }
  if (next && next - streak <= 3) {
    const away = next - streak
    return `You are ${away} ${away === 1 ? 'day' : 'days'} from a ${next}-day streak.${solvedToday ? '' : ' Today’s challenge is still open.'}`
  }
  if (streak >= longest) {
    return `${streak} days — your longest run yet.${solvedToday ? '' : ' Keep it alive today.'}`
  }
  return `${streak}-day streak going.${solvedToday ? ' Back tomorrow.' : ' Today’s challenge is still open.'}`
}

export function DashboardGreeting() {
  const { profile } = useProfile()
  const today = getTodayChallenge(dailyChallenges)
  const firstName = profile.fullName.split(' ')[0]

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-strong tracking-tight">
        {greetingFor(new Date().getHours())}, {firstName}
      </h1>
      <p className="text-sm text-subtle mt-1">
        {streakLine(profile.stats.currentStreak, profile.stats.longestStreak, today?.isCompleted ?? false)}
      </p>
    </div>
  )
}
