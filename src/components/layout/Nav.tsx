

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/wlogohorizontal.webp";
import { ROUTES } from "../../constants/routes";
import { isAuthenticated as readAuth } from "../../lib/auth";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface NavLink {
  label: string;
  to: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Courses", to: "/#courses" },
  { label: "Tutorials", to: "/#tutorials" },
  { label: "Practice", to: "/#practice" },
  { label: "Community", to: "/#community" },
];

/* ─────────────────────────────────────────────
   KLM Logo Mark
───────────────────────────────────────────── */
function KLMLogo() {
  return (
    <Link
      to="/"
      aria-label="KLM — Go to homepage"
      className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 rounded-lg md:translate-y-2"
    >
      <img src={logo} alt="Knowvation Learnings Logo" className="h-8 md:h-10 w-auto object-contain" />
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Desktop Nav Link
───────────────────────────────────────────── */
function NavLinkItem({ label, to }: NavLink) {
  return (
    <Link
      to={to}
      className="group relative px-5 py-2 rounded-full font-medium text-sm text-brand-neutral/80 hover:text-white transition-all duration-500 overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60"
    >
      {/* Glossy top edge reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Liquid hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="relative z-10 tracking-wide">{label}</span>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Hamburger Icon
───────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between" aria-hidden="true">
      <span
        className={`block h-0.5 w-full bg-brand-neutral rounded transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`}
      />
      <span
        className={`block h-0.5 w-full bg-brand-neutral rounded transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
      />
      <span
        className={`block h-0.5 w-full bg-brand-neutral rounded transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Nav Component (landing page)
───────────────────────────────────────────── */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(readAuth());
  }, []);

  // Scroll listener — intensify glass on scroll and hide/show on scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide if scrolling down past 80px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape closes it, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!mobileOpen) return

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false) }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Left: Logo */}
          <div className="flex items-center">
            <KLMLogo />
          </div>

          {/* Center: Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-3"
          >
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.to} {...link} />
            ))}
          </nav>

          {/* Right: Sign In + Mobile hamburger */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to={ROUTES.DASHBOARD}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-250 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                id="nav-signin-btn"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-brand-tertiary border border-brand-tertiary/25 bg-brand-tertiary/5 backdrop-blur-sm hover:bg-brand-tertiary/12 hover:border-brand-tertiary/45 hover:scale-[1.03] hover:-translate-y-px active:scale-100 transition-all duration-250 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 shadow-sm hover:shadow-brand-tertiary/10"
              >
                Sign In
              </Link>
            )}

            {/* Hamburger — mobile only */}
            <button
              id="nav-mobile-menu-toggle"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

      </div>

      {/* Scrim */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer. Slides from the right, matching the signed-in app's SideNav —
          the same gesture should reveal the menu before and after signing in. */}
      <aside
        id="mobile-nav-menu"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed top-0 right-0 h-[100dvh] w-[300px] max-w-[82vw] flex flex-col
          bg-[#000918]/97 backdrop-blur-xl border-l border-white/10
          shadow-[-16px_0_48px_rgba(0,0,0,0.6)]
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${mobileOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        <div className="flex items-center justify-between gap-3 h-20 px-5 border-b border-white/10 shrink-0">
          <img src={logo} alt="Knowvation Learnings" className="h-8 w-auto object-contain" />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-brand-neutral/70 hover:text-white hover:bg-white/8 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3.5 rounded-xl text-base font-medium text-brand-neutral/80 hover:text-white hover:bg-white/6 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* The reason most people open this menu, so it gets the weight —
            pinned to the bottom, full width, and the only filled control here. */}
        <div className="mt-auto p-4 border-t border-white/10 space-y-3">
          {isAuthenticated ? (
            <Link
              to={ROUTES.DASHBOARD}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/10 border border-white/20 text-sm font-bold text-white hover:bg-white/15 transition-colors"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-tertiary text-[#000918] text-sm font-bold tracking-wide shadow-[0_0_24px_rgba(199,217,255,0.28)] hover:brightness-110 transition-all"
              >
                Sign in
              </Link>
              <p className="text-center text-xs text-brand-neutral/50">
                New here?{" "}
                <Link
                  to={ROUTES.SIGNUP}
                  onClick={() => setMobileOpen(false)}
                  className="text-white font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </>
          )}
        </div>
      </aside>
    </header>
  );
}
