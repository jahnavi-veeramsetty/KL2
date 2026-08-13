export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',

  COURSES: '/courses',
  COURSE_DETAIL: (courseId: string) => `/courses/${courseId}`,
  LMS_COURSE: (courseId: string) => `/lms/${courseId}`,
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
  /* Under /hackathons, not /compete. Hackathon and Coding Contest are siblings
     in the sidebar, but the detail page used to live at /compete/hackathons/:id
     — and NavLink treats any descendant path as active, so opening a hackathon
     lit up Coding Contest instead. A URL has to say where the thing lives. */
  HACKATHON_DETAIL: (hackathonId: string) => `/hackathons/${hackathonId}`,

  EVENTS: '/events',

  ARCADE: '/arcade',

  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const
