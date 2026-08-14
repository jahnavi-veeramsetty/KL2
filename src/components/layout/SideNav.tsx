import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PanelLeft, LayoutGrid, CalendarDays, BookOpen, MonitorPlay, Rocket, Swords,
  Puzzle, Terminal, Flame, Gamepad2, Settings, CircleHelp, LogOut, User, Signpost,
} from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { useProfile } from '../../hooks/useProfile'
import { useSidebar } from '../../hooks/useSidebar'
import { useMediaQuery, DESKTOP_QUERY } from '../../hooks/useMediaQuery'
import { Avatar } from '../../ui/Avatar'
import { cn } from '../../lib/cn'
import { signOut } from '../../lib/auth'

// ── Icons ─────────────────────────────────────────────────────────────────────
/**
 * One set, one source, one stroke weight.
 *
 * Four of these were saying the wrong thing:
 *  - Hackathon was "users", which means participants — and Users is already the
 *    entrant count on the hackathon cards.
 *  - Coding Contest was a trophy, but a trophy is the *prize* everywhere else
 *    in the app (contest cards, hackathon cards, the leaderboard). Swords say
 *    head-to-head and give the trophy back its single meaning.
 *  - Daily Challenge was a calendar-check sitting directly under Events' plain
 *    calendar. A flame matches what the page is actually about — the streak.
 *  - Masterclasses was a video rectangle, which reads as a recorded file. These
 *    are live sessions.
 */
const ICON_PROPS = { className: 'w-5 h-5', strokeWidth: 1.8 } as const

const Icon = {
  dashboard:   <LayoutGrid {...ICON_PROPS} />,
  events:      <CalendarDays {...ICON_PROPS} />,
  courses:     <BookOpen {...ICON_PROPS} />,
  masterclass: <MonitorPlay {...ICON_PROPS} />,
  hackathon:   <Rocket {...ICON_PROPS} />,
  contest:     <Swords {...ICON_PROPS} />,
  practice:    <Puzzle {...ICON_PROPS} />,
  playground:  <Terminal {...ICON_PROPS} />,
  daily:       <Flame {...ICON_PROPS} />,
  arcade:      <Gamepad2 {...ICON_PROPS} />,
  settings:    <Settings {...ICON_PROPS} />,
  help:        <CircleHelp {...ICON_PROPS} />,
  logout:      <LogOut className="w-4 h-4" strokeWidth={1.8} />,
  profile:     <User className="w-4 h-4" strokeWidth={1.8} />,
  roadmap:     <Signpost className="w-4 h-4" strokeWidth={1.8} />,
  /** Kept filled with its glow — it is a stat, not a nav glyph. */
  fire: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clipRule="evenodd" />
    </svg>
  ),
}

// ── Nav structure ─────────────────────────────────────────────────────────────
const TOP_LINKS = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: Icon.dashboard, desktopOnly: true },
  { label: 'Events', to: ROUTES.EVENTS, icon: Icon.events },
]

const sections = [
  {
    label: 'LEARN',
    items: [
      { label: 'Course Library', to: ROUTES.COURSES, icon: Icon.courses },
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
        <div className="bg-raised border border-line-strong text-strong text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
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
    signOut()
    // replace: without it, Back returns to the signed-in page they just left
    navigate(ROUTES.HOME, { replace: true })
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
        "theme-dark fixed right-0 lg:right-auto lg:left-0 z-[60] flex flex-col bg-panel border-l lg:border-l-0 lg:border-r border-line select-none",
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
        <div className="flex items-center justify-between gap-3 h-16 px-4 border-b border-line flex-shrink-0">
          {/* Profile, at the very top beside the close button */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar name={profile.fullName} size="md" src={profile.avatarUrl} />
            <div className="flex flex-col items-start overflow-hidden flex-1">
              <span className="text-[17px] font-semibold text-strong truncate max-w-full leading-tight">{profile.fullName}</span>
              <span className="text-sm text-faint truncate max-w-full">@{profile.username}</span>
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
            className="flex items-center justify-center w-9 h-9 rounded-lg text-subtle hover:text-strong hover:bg-raised transition-colors flex-shrink-0"
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
        {/* Above the sections: whole-app destinations that belong to no
            group. Dashboard is desktop-only — the bottom bar's Home tab covers
            it on mobile — while Events has no tab and is needed on both. */}
        <div className="px-3 flex flex-col gap-0.5">
          {TOP_LINKS.filter(link => isDesktop || !link.desktopOnly).map(link =>
            isCollapsed ? (
              <NavTooltip key={link.to} label={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 mx-auto ${
                      isActive
                        ? 'bg-accent/15 text-accent shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                        : 'text-subtle hover:text-strong hover:bg-raised'
                    }`
                  }
                >
                  {link.icon}
                </NavLink>
              </NavTooltip>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 rounded-xl font-medium transition-all duration-200 ${
                    isDesktop ? 'py-2 text-sm' : 'py-3.5 text-base'
                  } ${
                    isActive
                      ? 'bg-accent/15 text-accent shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                      : 'text-subtle hover:text-strong hover:bg-raised'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            )
          )}
        </div>

        {/* Divider */}
        {isDesktop && <div className="mx-3 my-1 border-t border-line" />}

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
                  className={cn("font-semibold tracking-widest text-faint px-3 mb-0.5 mt-1 uppercase", isDesktop ? "text-[10px]" : "text-xs mb-1 mt-2")}
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            {isCollapsed && <div className="my-1 border-t border-line" />}

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
                          : 'text-subtle hover:text-strong hover:bg-raised'
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
                          : 'text-subtle hover:text-strong hover:bg-raised'
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
            <p className="font-semibold tracking-widest text-faint px-3 mb-1 mt-2 uppercase text-xs">
              Account
            </p>
            <div className="flex flex-col gap-0.5">
              <NavLink
                to={ROUTES.PROFILE}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive ? 'bg-accent/15 text-accent' : 'text-subtle hover:text-strong hover:bg-raised'
                  }`
                }
              >
                <span className="w-5 flex items-center justify-center">{Icon.profile}</span>
                Profile
              </NavLink>
              <NavLink
                to={ROUTES.ROADMAP}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive ? 'bg-accent/15 text-accent' : 'text-subtle hover:text-strong hover:bg-raised'
                  }`
                }
              >
                <span className="w-5 flex items-center justify-center">{Icon.roadmap}</span>
                Roadmap
              </NavLink>
              <NavLink
                to={ROUTES.SETTINGS}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive ? 'bg-accent/15 text-accent' : 'text-subtle hover:text-strong hover:bg-raised'
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
      <div className="flex-shrink-0 p-2 border-t border-line" ref={profileRef}>
        {/* Side by side while there is room; once the rail is at 72px the
            toggle stacks above the avatar instead — it must never be the thing
            that gets squeezed out, or collapsing becomes a one-way door. */}
        <div className={cn('flex gap-1', isCollapsed ? 'flex-col-reverse items-center' : 'items-center')}>
        {/* Profile button */}
        <div className={cn('relative', isCollapsed ? 'w-full' : 'flex-1 min-w-0')}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            className={`w-full flex items-center rounded-xl p-2 transition-all duration-200 hover:bg-raised ${isCollapsed ? 'justify-center' : 'gap-3'}`}
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
                  <span className="text-sm font-medium text-strong truncate max-w-full">{profile.fullName}</span>
                  <span className="text-xs text-faint truncate max-w-full">@{profile.username}</span>
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
                className={`absolute ${isDesktop ? 'bottom-full mb-2' : 'top-full mt-2'} ${isCollapsed ? 'left-full ml-2 bottom-0' : 'left-0 right-0'} bg-panel border border-line-strong rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50 min-w-[180px]`}
              >
                <div className="py-1">
                  <NavLink
                    to={ROUTES.PROFILE}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-body hover:bg-raised hover:text-strong transition-colors"
                  >
                    {Icon.profile} My Profile
                  </NavLink>
                  <NavLink
                    to={ROUTES.ROADMAP}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-body hover:bg-raised hover:text-strong transition-colors"
                  >
                    {Icon.roadmap} Roadmap
                  </NavLink>
                  <NavLink
                    to={ROUTES.SETTINGS}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-body hover:bg-raised hover:text-strong transition-colors"
                  >
                    {Icon.settings} Settings
                  </NavLink>
                  <a
                    href="#"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-body hover:bg-raised hover:text-strong transition-colors"
                  >
                    {Icon.help} Help
                  </a>
                </div>
                <div className="border-t border-line py-1">
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
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-faint hover:text-strong hover:bg-raised transition-colors"
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
