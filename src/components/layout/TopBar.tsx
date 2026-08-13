import { Link } from 'react-router-dom'
import logo from '../../assets/wlogohorizontal.webp'
import { useProfile } from '../../hooks/useProfile'
import { useSidebar } from '../../hooks/useSidebar'
import { ROUTES } from '../../constants/routes'
import { GlobalSearch } from './GlobalSearch'
import { NotificationBell } from './NotificationBell'
import { ThemeToggle } from './ThemeToggle'

export default function TopBar({ 
  hideSearch = false, 
  centerContent 
}: { 
  hideSearch?: boolean, 
  centerContent?: React.ReactNode 
}) {
  const { profile } = useProfile()
  const { setMobileOpen } = useSidebar()
  const xp = profile.stats.totalXP.toLocaleString()
  const streak = profile.stats.currentStreak

  return (
    <div
      className="theme-dark fixed top-0 left-0 right-0 z-50 h-16 lg:h-14 flex items-center justify-between px-4 lg:px-6 gap-3 border-b border-line bg-panel/90 backdrop-blur-md"
    >

      {/* Wordmark — always here now, so it never changes with the rail */}
      <Link
        to={ROUTES.DASHBOARD}
        className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        aria-label="Go to dashboard"
      >
        <img src={logo} alt="Knowvation Learnings" className="h-9 lg:h-9 w-auto object-contain" />
      </Link>

      {/* Center Slot — Search or custom content like Breadcrumbs */}
      {!hideSearch && !centerContent && (
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full max-w-md xl:max-w-xl px-4">
          <GlobalSearch />
        </div>
      )}
      {centerContent && (
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 text-center">
          {centerContent}
        </div>
      )}

      {/* Right — XP + Streak + Bell */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
        {/* XP */}
        <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-strong">
          <svg className="w-[18px] h-[18px] text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{xp}</span>
        </div>

        {/* Streak */}
        <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-orange-400">
          <svg className="w-[18px] h-[18px] text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clipRule="evenodd" />
          </svg>
          <span>{streak}</span>
        </div>

        <ThemeToggle />
        <NotificationBell />

        {/* Menu — mobile only. Sits on the right so the drawer slides out from
            the same edge the user tapped. */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-body hover:text-strong hover:bg-raised transition-colors"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
