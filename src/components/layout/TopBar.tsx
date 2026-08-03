import { Link } from 'react-router-dom'
import logo from '../../assets/wlogohorizontal.webp'
import { useProfile } from '../../hooks/useProfile'
import { useSidebar } from '../../hooks/useSidebar'
import { ROUTES } from '../../constants/routes'
import { GlobalSearch } from './GlobalSearch'

export default function TopBar() {
  const { profile } = useProfile()
  const { setMobileOpen } = useSidebar()
  const xp = profile.stats.totalXP.toLocaleString()
  const streak = profile.stats.currentStreak

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-16 lg:h-14 flex items-center justify-between px-4 lg:px-6 gap-3 border-b border-white/[0.06] bg-neutral/90 backdrop-blur-md"
    >

      {/* Wordmark — always here now, so it never changes with the rail */}
      <Link
        to={ROUTES.DASHBOARD}
        className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        aria-label="Go to dashboard"
      >
        <img src={logo} alt="Knowvation Learnings" className="h-9 lg:h-9 w-auto object-contain" />
      </Link>

      {/* Search — desktop only, centred in the bar regardless of what flanks it.
          On mobile it stays on the Dashboard. */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full max-w-md xl:max-w-xl px-4">
        <GlobalSearch />
      </div>

      {/* Right — XP + Streak + Bell */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
        {/* XP */}
        <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-white">
          <svg className="w-[18px] h-[18px] text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{xp}</span>
        </div>

        {/* Streak */}
        <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-orange-400">
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clipRule="evenodd" />
          </svg>
          <span>{streak}</span>
        </div>

        {/* Notification Bell */}
        <button className="relative w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center rounded-full hover:bg-white/[0.07] text-slate-400 hover:text-white transition-colors" aria-label="Notifications">
          <svg className="w-6 h-6 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Red dot indicator */}
          <span className="absolute top-2 right-2 lg:top-1.5 lg:right-1.5 w-2.5 h-2.5 lg:w-2 lg:h-2 rounded-full bg-red-500 border-2 border-neutral" />
        </button>

        {/* Menu — mobile only. Sits on the right so the drawer slides out from
            the same edge the user tapped. */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.07] transition-colors"
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
