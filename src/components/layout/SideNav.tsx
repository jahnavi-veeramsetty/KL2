import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PanelLeft } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { useProfile } from '../../hooks/useProfile'
import { useSidebar } from '../../hooks/useSidebar'
import { useMediaQuery, DESKTOP_QUERY } from '../../hooks/useMediaQuery'
import { Avatar } from '../../ui/Avatar'
import { cn } from '../../lib/cn'

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  courses: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  masterclass: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  hackathon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  contest: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  playground: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  practice: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  daily: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  arcade: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="6" width="20" height="14" rx="2" /><path d="M12 12h.01M7 12h.01M17 12h.01" />
      <path d="M10 15v-6M7 12h6" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  help: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  profile: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  fire: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clipRule="evenodd" />
    </svg>
  ),
}

// ── Nav structure ─────────────────────────────────────────────────────────────
const sections = [
  {
    label: 'LEARN',
    items: [
      { label: 'Courses', to: ROUTES.COURSES, icon: Icon.courses },
      { label: 'Masterclasses', to: ROUTES.MASTERCLASSES, icon: Icon.masterclass },
    ],
  },
  {
    label: 'COMPETE',
    items: [
      { label: 'Hackathon', to: ROUTES.HACKATHONS, icon: Icon.hackathon },
      { label: 'Coding Contest', to: ROUTES.COMPETE, icon: Icon.contest },
    ],
  },
  {
    label: 'PRACTICE',
    items: [
      { label: 'Problems', to: ROUTES.PRACTICE, icon: Icon.practice },
      { label: 'Playground', to: ROUTES.PLAYGROUND, icon: Icon.playground },
      { label: 'Daily Challenge', to: ROUTES.DAILY_CHALLENGE, icon: Icon.daily },
      { label: 'Arcade', to: ROUTES.ARCADE, icon: Icon.arcade },
    ],
  },
]

// Reachable from the mobile bottom bar, so the drawer omits them there and
// shows only what the tab bar cannot reach.
const BOTTOM_NAV_ROUTES: string[] = [
  ROUTES.DASHBOARD,
  ROUTES.COURSES,
  ROUTES.MASTERCLASSES,
  ROUTES.PRACTICE,
  ROUTES.DAILY_CHALLENGE,
]

// ── Tooltip for collapsed state ───────────────────────────────────────────────
function NavTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip flex">
      {children}
      <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover/tip:flex items-center">
        <div className="bg-[#1a1f35] border border-white/10 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
          {label}
        </div>
      </div>
    </div>
  )
}

// ── SideNav ───────────────────────────────────────────────────────────────────
export default function SideNav() {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useProfile()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate(ROUTES.HOME)
  }

  // Desktop: docked, width follows the collapse toggle. Must match AppLayout's
  // paddingLeft and TopBar's left offset, or a dead strip of page background
  // shows between the sidebar and the content.
  // Mobile: an off-canvas drawer. The icon-rail layout only makes sense when
  // the nav is docked, so ignore the stored `collapsed` preference there and
  // always render the drawer expanded with labels.
  const isCollapsed = isDesktop ? collapsed : false
  // Desktop docks at 240; the mobile drawer is wider so labels can breathe.
  const w = isCollapsed ? 72 : isDesktop ? 240 : 300

  const visibleSections = isDesktop
    ? sections
    : sections
        .map(s => ({ ...s, items: s.items.filter(i => !BOTTOM_NAV_ROUTES.includes(i.to)) }))
        .filter(s => s.items.length > 0)

  return (
    <>
      {/* Scrim — mobile only, closes the drawer on tap */}
      {mobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/60 z-[55] lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

    <motion.aside
      animate={{ width: w }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed right-0 lg:right-auto lg:left-0 z-[60] flex flex-col bg-neutral border-l lg:border-l-0 lg:border-r border-white/[0.06] select-none",
        // mobile: a full-height drawer over everything, TopBar included
        // desktop: docked beneath the 56px bar
        "top-0 lg:top-14 h-screen lg:h-[calc(100vh-3.5rem)]",
        isCollapsed ? "overflow-visible" : "overflow-hidden",
        // Slide off-canvas when closed on mobile; always docked from lg up.
        "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0",
        // cap the drawer so the scrim behind it stays tappable on small phones
        "max-w-[82vw] lg:max-w-none",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ minWidth: isDesktop ? w : undefined }}
    >
      {/* ── Header: mobile only — profile + close. On desktop the rail has no
             header; its toggle lives in the TopBar. ── */}
      {!isDesktop && (
        <div className="flex items-center justify-between gap-3 h-20 px-4 border-b border-white/[0.06] flex-shrink-0">
          {/* Profile, at the very top beside the close button */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar name={profile.fullName} size="md" src={profile.avatarUrl} />
            <div className="flex flex-col items-start overflow-hidden flex-1">
              <span className="text-[17px] font-semibold text-white truncate max-w-full leading-tight">{profile.fullName}</span>
              <span className="text-sm text-slate-500 truncate max-w-full">@{profile.username}</span>
            </div>
          </div>

          {/* Streak — the TopBar shows it on desktop only, so it lives here on mobile */}
          <div
            className="flex items-center gap-1.5 text-orange-400 font-semibold text-[15px] flex-shrink-0 tabular-nums"
            title={`${profile.stats.currentStreak} day streak`}
          >
            {Icon.fire}
            <span>{profile.stats.currentStreak}</span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors flex-shrink-0"
            aria-label="Close navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Scrollable content ── */}
      <div className={cn(
        "flex-1 py-2 flex flex-col gap-0.5 no-scrollbar",
        isCollapsed ? "overflow-visible" : "overflow-hidden",
        isDesktop ? "" : "order-2"
      )}>
        {/* Dashboard — desktop only; the bottom bar's Home tab covers it on mobile */}
        {isDesktop && <div className="px-3">
          {isCollapsed ? (
            <NavTooltip label="Dashboard">
              <NavLink
                to={ROUTES.DASHBOARD}
                className={({ isActive }) =>
                  `flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 mx-auto ${
                    isActive
                      ? 'bg-accent/15 text-accent shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                  }`
                }
              >
                {Icon.dashboard}
              </NavLink>
            </NavTooltip>
          ) : (
            <NavLink
              to={ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/15 text-accent shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                }`
              }
            >
              {Icon.dashboard}
              <span>Dashboard</span>
            </NavLink>
          )}
        </div>}

        {/* Divider */}
        {isDesktop && <div className="mx-3 my-1 border-t border-white/[0.06]" />}

        {/* Sections */}
        {visibleSections.map(section => (
          <div key={section.label} className="px-3">
            {/* Section label */}
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.p
                  key={section.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn("font-semibold tracking-widest text-slate-500 px-3 mb-0.5 mt-1 uppercase", isDesktop ? "text-[10px]" : "text-xs mb-1 mt-2")}
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            {isCollapsed && <div className="my-1 border-t border-white/[0.04]" />}

            {/* Items */}
            <div className="flex flex-col gap-0.5">
              {section.items.map(item => {
                const isActive = location.pathname === item.to.split('?')[0]
                return isCollapsed ? (
                  <NavTooltip key={item.to} label={item.label}>
                    <NavLink
                      to={item.to}
                      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 mx-auto ${
                        isActive
                          ? 'bg-accent/15 text-accent shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                      }`}
                    >
                      {item.icon}
                    </NavLink>
                  </NavTooltip>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive: active }) =>
                      `flex items-center gap-3 px-3 rounded-xl font-medium ${isDesktop ? 'py-2 text-sm' : 'py-3.5 text-base'}  transition-all duration-200 ${
                        active
                          ? 'bg-accent/15 text-accent shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                      }`
                    }
                  >
                    {item.icon}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    </AnimatePresence>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}

        {/* Account — mobile only. These used to hide inside the profile
            dropdown; in the drawer they are one tap instead of two. */}
        {!isDesktop && (
          <div className="px-3">
            <p className="font-semibold tracking-widest text-slate-500 px-3 mb-1 mt-2 uppercase text-xs">
              Account
            </p>
            <div className="flex flex-col gap-0.5">
              <NavLink
                to={ROUTES.PROFILE}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive ? 'bg-accent/15 text-accent' : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                  }`
                }
              >
                <span className="w-5 flex items-center justify-center">{Icon.profile}</span>
                Profile
              </NavLink>
              <NavLink
                to={ROUTES.SETTINGS}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive ? 'bg-accent/15 text-accent' : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                  }`
                }
              >
                <span className="w-5 flex items-center justify-center">{Icon.settings}</span>
                Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors"
              >
                <span className="w-5 flex items-center justify-center">{Icon.logout}</span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom: Profile + collapse toggle ── */}
      {isDesktop && (
      <div className="flex-shrink-0 p-2 border-t border-white/[0.06]" ref={profileRef}>
        {/* Side by side while there is room; once the rail is at 72px the
            toggle stacks above the avatar instead — it must never be the thing
            that gets squeezed out, or collapsing becomes a one-way door. */}
        <div className={cn('flex gap-1', isCollapsed ? 'flex-col-reverse items-center' : 'items-center')}>
        {/* Profile button */}
        <div className={cn('relative', isCollapsed ? 'w-full' : 'flex-1 min-w-0')}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            className={`w-full flex items-center rounded-xl p-2 transition-all duration-200 hover:bg-white/[0.07] ${isCollapsed ? 'justify-center' : 'gap-3'}`}
            aria-label="Profile menu"
          >
            <Avatar name={profile.fullName} size="sm" src={profile.avatarUrl} />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  key="profile-info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col items-start overflow-hidden flex-1"
                >
                  <span className="text-sm font-medium text-white truncate max-w-full">{profile.fullName}</span>
                  <span className="text-xs text-slate-500 truncate max-w-full">@{profile.username}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className={`absolute ${isDesktop ? 'bottom-full mb-2' : 'top-full mt-2'} ${isCollapsed ? 'left-full ml-2 bottom-0' : 'left-0 right-0'} bg-[#0e1529] border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50 min-w-[180px]`}
              >
                <div className="py-1">
                  <NavLink
                    to={ROUTES.PROFILE}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    {Icon.profile} My Profile
                  </NavLink>
                  <NavLink
                    to={ROUTES.SETTINGS}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    {Icon.settings} Settings
                  </NavLink>
                  <a
                    href="#"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    {Icon.help} Help
                  </a>
                </div>
                <div className="border-t border-white/[0.06] py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors"
                  >
                    {Icon.logout} Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

          {/* Collapse toggle */}
          <button
            type="button"
            onClick={() => {
              setProfileOpen(false)
              setCollapsed(c => !c)
            }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.07] transition-colors"
          >
            <PanelLeft className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>
      )}
    </motion.aside>
    </>
  )
}
