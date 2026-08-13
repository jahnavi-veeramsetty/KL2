import { NavLink, useLocation } from 'react-router-dom'
import { LayoutGrid, BookOpen, MonitorPlay, Puzzle, Flame } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { cn } from '../../lib/cn'

/**
 * Mobile-only tab bar. Puts the four most-visited destinations in thumb reach
 * so navigating no longer costs two taps (open drawer, then pick). Everything
 * else lives behind the TopBar menu button, which opens the SideNav drawer.
 *
 * Edge-to-edge with rounded top corners, so it reads as a sheet the content
 * scrolls beneath. Height is BOTTOM_NAV_H — keep the bottom padding in
 * AppLayout in step with it.
 */
const TABS = [
  { label: 'Home', to: ROUTES.DASHBOARD, icon: LayoutGrid },
  { label: 'Course Library', to: ROUTES.COURSES, icon: BookOpen },
  { label: 'Classes', to: ROUTES.MASTERCLASSES, icon: MonitorPlay },
  { label: 'Problems', to: ROUTES.PRACTICE, icon: Puzzle },
  { label: 'Daily', to: ROUTES.DAILY_CHALLENGE, icon: Flame },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  const tabClass = (active: boolean) =>
    cn(
      'relative flex flex-col items-center justify-center gap-1.5 h-full text-[11px] font-semibold tracking-tight transition-colors',
      active ? 'text-accent' : 'text-subtle hover:text-body'
    )

  return (
    <nav
      aria-label="Primary"
      className="theme-dark lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[72px] pb-[env(safe-area-inset-bottom)] grid grid-cols-5 items-stretch rounded-t-3xl overflow-hidden border-t border-line bg-panel/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.4)]"
    >
      {TABS.map(({ label, to, icon: Icon }) => {
        const active = pathname === to
        return (
          <NavLink key={to} to={to} className={tabClass(active)}>
            {active && (
              <span className="absolute top-0 w-8 h-[2px] rounded-b-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            )}
            <Icon className="w-[22px] h-[22px]" strokeWidth={1.8} />
            {label}
          </NavLink>
        )
      })}

    </nav>
  )
}
