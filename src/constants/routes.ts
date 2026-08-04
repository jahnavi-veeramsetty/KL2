export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',

  COURSES: '/courses',
  COURSE_DETAIL: (courseId: string) => `/courses/${courseId}`,
  MASTERCLASSES: '/masterclasses',
  MASTERCLASS_DETAIL: (masterclassId: string) => `/masterclasses/${masterclassId}`,

  PRACTICE: '/practice',
  PROBLEM: (problemId: string) => `/practice/${problemId}`,
  PLAYGROUND: '/playground',
  DAILY_CHALLENGE: '/daily-challenge',

  COMPETE: '/compete',
  LEADERBOARD: '/compete/leaderboard',
  HACKATHONS: '/hackathons',
  CONTEST_DETAIL: (contestId: string) => `/compete/contests/${contestId}`,
  HACKATHON_DETAIL: (hackathonId: string) => `/compete/hackathons/${hackathonId}`,

  ARCADE: '/arcade',

  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const
