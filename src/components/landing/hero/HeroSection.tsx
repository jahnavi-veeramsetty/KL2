import HeroLeftContent from "./HeroLeftContent";
import HeroSignupForm from "./HeroSignupForm";

/* ─────────────────────────────────────────────
   HeroSection.tsx
   Two-column hero layout composing the left
   content block and right signup form card.
   Positioned above the StarfieldBackground (z-10).

   Phones get min-h + justify-start + no clipping. With h-[100dvh],
   justify-center and overflow-hidden, content taller than the viewport — which
   the stacked column plus the signup form always is on a phone — overflows
   equally in BOTH directions and gets cut at the top and bottom. That is why
   "Ignite." lost its top edge and the form ran off the bottom.

   pt-24 (96px) clears the landing nav, which is h-16 sitting under its own
   pt-4 — 80px in total.
───────────────────────────────────────────── */

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero — Get started with KLM"
      className={`relative z-10 flex flex-col
        min-h-[100dvh] md:h-[100dvh]
        pt-24 md:pt-[72px] pb-12 md:pb-0
        justify-start md:justify-center
        md:overflow-hidden ${className}`}
    >
      {/* Container padding */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-0 md:py-6">
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
        className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000918]/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
