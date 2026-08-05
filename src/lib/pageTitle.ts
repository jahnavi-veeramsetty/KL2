import { ROUTES } from '../constants/routes'

/**
 * Static routes → page titles.
 *
 * An exact hit here also means the route is a top-level page rather than a
 * detail view, which is what PageHeading uses to decide whether to render a
 * heading — detail pages show their name in <Breadcrumbs> and their own hero
 * instead.
 */
export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]:       'Dashboard',
  [ROUTES.COURSES]:         'Courses',
  [ROUTES.MASTERCLASSES]:   'Masterclasses',
  [ROUTES.PRACTICE]:        'Problems',
  [ROUTES.PLAYGROUND]:      'Playground',
  [ROUTES.DAILY_CHALLENGE]: 'Daily Challenge',
  [ROUTES.COMPETE]:         'Coding Contest',
  [ROUTES.HACKATHONS]:      'Hackathons',
  [ROUTES.EVENTS]:          'Events',
  [ROUTES.ARCADE]:          'Arcade',
  [ROUTES.PROFILE]:         'My Profile',
  [ROUTES.SETTINGS]:        'Settings',
}
