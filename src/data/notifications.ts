import type { AppNotification } from '../types/notification'
import { ROUTES } from '../constants/routes'

/**
 * Seed notifications, written against the app's real content so the panel is
 * not obviously filler — every one of these points at something that exists.
 */
export const notifications: AppNotification[] = [
  {
    id: 'n-1',
    kind: 'daily',
    title: "Today's challenge is live",
    body: 'Median of Two Sorted Arrays · Hard · +100 XP',
    minutesAgo: 22,
    to: ROUTES.DAILY_CHALLENGE,
  },
  {
    id: 'n-2',
    kind: 'hackathon',
    title: 'HackGenX 3.0 is running now',
    body: 'Submissions close soon — 1,240 builders already joined.',
    minutesAgo: 95,
    to: ROUTES.HACKATHONS,
  },
  {
    id: 'n-3',
    kind: 'streak',
    title: '2 days from a 2-week streak',
    body: "You're on 12 days. Solve today's challenge to keep it alive.",
    minutesAgo: 240,
    to: ROUTES.DAILY_CHALLENGE,
  },
  {
    id: 'n-4',
    kind: 'hackathon',
    title: 'BuildWave 2025 registration closes in 3 days',
    body: '₹10,00,000 prize pool · teams of 2–4.',
    minutesAgo: 400,
    to: ROUTES.HACKATHONS,
  },
  {
    id: 'n-5',
    kind: 'contest',
    title: 'You placed #42 in Weekly Contest 41',
    body: 'Rating +5. Your best finish yet.',
    minutesAgo: 1_500,
    to: ROUTES.COMPETE,
  },
  {
    id: 'n-6',
    kind: 'masterclass',
    title: 'Advanced React Patterns — 29 August',
    body: 'Seats are open for the live session with Rahul Verma.',
    minutesAgo: 2_100,
    to: ROUTES.MASTERCLASSES,
  },
  {
    id: 'n-7',
    kind: 'achievement',
    title: 'Badge unlocked — Problem Setter',
    body: 'You solved 25 medium problems.',
    minutesAgo: 3_400,
    to: ROUTES.PROFILE,
  },
  {
    id: 'n-8',
    kind: 'course',
    title: 'New in Data — Data Analytics',
    body: '35 hours · beginner friendly · certificate included.',
    minutesAgo: 5_800,
    to: ROUTES.COURSES,
  },
]
