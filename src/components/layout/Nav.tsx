

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/wlogohorizontal.webp";

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
      className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 rounded-lg translate-y-1.5 md:translate-y-2"
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
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
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
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-250 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                id="nav-signin-btn"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-brand-tertiary border border-brand-tertiary/25 bg-brand-tertiary/5 backdrop-blur-sm hover:bg-brand-tertiary/12 hover:border-brand-tertiary/45 hover:scale-[1.03] hover:-translate-y-px active:scale-100 transition-all duration-250 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 shadow-sm hover:shadow-brand-tertiary/10"
              >
                Sign In
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 opacity-70"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}

            {/* Hamburger — mobile only */}
            <button
              id="nav-mobile-menu-toggle"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          id="mobile-nav-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${mobileOpen ? "max-h-72 opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-brand-neutral/75 hover:text-brand-neutral hover:bg-white/6 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-tertiary hover:bg-brand-tertiary/8 transition-all duration-200"
                >
                  Dashboard →
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-tertiary hover:bg-brand-tertiary/8 transition-all duration-200"
                >
                  Sign In →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
