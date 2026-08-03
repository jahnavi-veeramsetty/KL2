/* ─────────────────────────────────────────────
   HeroLeftContent.tsx
   Left column of the hero: headline, sub-copy,
   social proof row and optional secondary CTA.
───────────────────────────────────────────── */

interface HeroLeftContentProps {
  className?: string;
}

/* Stat badge */
function StatBadge({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className="text-2xl font-bold text-brand-neutral leading-tight"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {value}
      </span>
      <span className="text-xs text-brand-secondary font-medium mt-0.5">{label}</span>
    </div>
  );
}

export default function HeroLeftContent({ className = "" }: HeroLeftContentProps) {
  return (
    <div className={`flex flex-col gap-4 sm:gap-5 ${className}`}>
      {/* ── Trust badge ── */}
      <div className="opacity-0-init animate-fade-slide-up delay-100">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide text-brand-tertiary/90 border border-brand-tertiary/20 bg-brand-tertiary/6 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-tertiary opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-tertiary" />
          </span>
          Trusted by 50,000+ learners worldwide
        </span>
      </div>

      {/* ── Main headline ── */}
      <div className="opacity-0-init animate-fade-slide-up delay-200">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-brand-neutral"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <span className="block">Ignite.</span>
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-brand-tertiary via-[#C7D9FF] to-brand-tertiary bg-clip-text text-transparent">
              Innovate.
            </span>
            {/* Glow behind gradient text */}
            <span
              className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-brand-tertiary to-[#C7D9FF] rounded-full"
              aria-hidden="true"
            />
          </span>
          <span className="block">Implement.</span>
        </h1>
      </div>

      {/* ── Supporting copy ── */}
      <div className="flex flex-col gap-3 opacity-0-init animate-fade-slide-up delay-300">
        <p className="text-sm sm:text-base text-brand-secondary leading-relaxed max-w-lg">
          Train with real-world scenarios used by modern technology teams.
        </p>
      </div>

      {/* ── Social proof stats ── */}
      <div className="opacity-0-init animate-fade-slide-up delay-400">
        <div className="flex items-center gap-5 py-3 px-4 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm w-fit scale-90 sm:scale-100 origin-left">
          <StatBadge value="4.9★" label="Average rating" />
          <div className="w-px h-8 bg-white/10" role="separator" />
          <StatBadge value="200+" label="Expert courses" />
          <div className="w-px h-8 bg-white/10 hidden sm:block" role="separator" />
          <StatBadge value="98%" label="Completion rate" className="hidden sm:flex" />
        </div>
      </div>

      {/* ── Secondary CTA ── */}
      <div className="opacity-0-init animate-fade-slide-up delay-500 flex items-center gap-4">
        <a
          href="/courses"
          id="hero-browse-courses-cta"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-neutral/80 hover:text-brand-neutral transition-colors duration-250"
        >
          <span>Browse courses</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-250"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        {/* Avatars hint */}
        <div className="flex items-center gap-2" aria-label="Recent learners">
          <div className="flex -space-x-2" aria-hidden="true">
            {["#4F6BED", "#7B55E0", "#E05599"].map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#000918] flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: color }}
              >
                {["JK", "AR", "MS"][i]}
              </div>
            ))}
          </div>
          <span className="text-xs text-brand-secondary">+2,400 joined this month</span>
        </div>
      </div>
    </div>
  );
}
