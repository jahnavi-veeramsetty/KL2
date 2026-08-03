import HeroLeftContent from "./HeroLeftContent";
import HeroSignupForm from "./HeroSignupForm";

/* ─────────────────────────────────────────────
   HeroSection.tsx
   Two-column hero layout composing the left
   content block and right signup form card.
   Positioned above the StarfieldBackground (z-10).
───────────────────────────────────────────── */

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero — Get started with KLM"
      className={`relative z-10 h-[100dvh] pt-[64px] md:pt-[72px] overflow-hidden flex flex-col justify-center ${className}`}
    >
      {/* Container padding */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── Left column ── */}
          <HeroLeftContent />

          {/* ── Right column ── */}
          <div className="relative opacity-0-init animate-fade-slide-up delay-300">
            {/* Removed the dimmer mask to keep the background completely transparent */}
            {/* Decorative star-glint accents */}
            <div
              className="absolute -top-3 -right-3 w-6 h-6 opacity-50 pointer-events-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
                  fill="url(#star-glint-grad)"
                />
                <defs>
                  <linearGradient id="star-glint-grad" x1="3" y1="2" x2="21" y2="20">
                    <stop stopColor="#FFFDF0" />
                    <stop offset="1" stopColor="#C7D9FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div
              className="absolute -bottom-2 -left-4 w-4 h-4 opacity-30 pointer-events-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
                  fill="#FFFDF0"
                />
              </svg>
            </div>

            <HeroSignupForm />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000918]/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
