

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

/* --- Brand-only color constants --- */
const C = {
  primary:   "#002B72",
  secondary: "#64748B",
  tertiary:  "#FFFDF0",
  neutral:   "#F8FAFC",
  bg:        "#000918",
};

/* -----------------------------------
   MASCOTS  (inline SVG, brand colors)
----------------------------------- */

/** Owl — wisdom & learning */
function OwlMascot() {
  return (
    <motion.svg
      width="84" height="90" viewBox="0 0 120 128"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Shadow under feet */}
      <ellipse cx="60" cy="124" rx="22" ry="4" fill={C.primary} opacity="0.25" />

      {/* Body */}
      <ellipse cx="60" cy="88" rx="28" ry="32" fill={C.tertiary} />

      {/* Body feather stripes */}
      <path d="M40 84 Q60 78 80 84" stroke={C.secondary} strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M38 93 Q60 86 82 93" stroke={C.secondary} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M40 102 Q60 95 80 102" stroke={C.secondary} strokeWidth="1.2" fill="none" opacity="0.3" />

      {/* Wings */}
      <ellipse cx="34" cy="91" rx="10" ry="20" transform="rotate(-15 34 91)" fill={C.secondary} opacity="0.6" />
      <ellipse cx="86" cy="91" rx="10" ry="20" transform="rotate(15 86 91)" fill={C.secondary} opacity="0.6" />

      {/* Head */}
      <circle cx="60" cy="52" r="26" fill={C.tertiary} />

      {/* Ear tufts */}
      <polygon points="40,30 36,14 48,26" fill={C.tertiary} />
      <polygon points="80,30 84,14 72,26" fill={C.tertiary} />
      <polygon points="40,30 37,18 46,26" fill={C.secondary} opacity="0.5" />
      <polygon points="80,30 83,18 74,26" fill={C.secondary} opacity="0.5" />

      {/* Graduation cap brim */}
      <rect x="38" y="28" width="44" height="6" rx="2" fill={C.primary} />
      {/* Cap top */}
      <rect x="50" y="18" width="20" height="12" rx="2" fill={C.primary} />
      {/* Tassel */}
      <line x1="82" y1="30" x2="87" y2="40" stroke={C.secondary} strokeWidth="2" strokeLinecap="round" />
      <circle cx="87" cy="42" r="3" fill={C.secondary} />

      {/* Eyes — left */}
      <circle cx="48" cy="53" r="12" fill={C.primary} />
      <circle cx="48" cy="53" r="7" fill={C.bg} />
      <circle cx="45" cy="50" r="3" fill={C.neutral} opacity="0.9" />

      {/* Eyes — right */}
      <circle cx="72" cy="53" r="12" fill={C.primary} />
      <circle cx="72" cy="53" r="7" fill={C.bg} />
      <circle cx="69" cy="50" r="3" fill={C.neutral} opacity="0.9" />

      {/* Beak */}
      <polygon points="60,59 54,67 66,67" fill={C.secondary} />

      {/* Feet */}
      <line x1="52" y1="118" x2="44" y2="124" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="118" x2="52" y2="124" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="118" x2="60" y2="124" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="118" x2="60" y2="124" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="118" x2="68" y2="124" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="118" x2="76" y2="124" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" />
    </motion.svg>
  );
}

/** Lion — strength & competition */
function LionMascot() {
  return (
    <motion.svg
      width="84" height="90" viewBox="0 0 120 128"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Shadow */}
      <ellipse cx="60" cy="124" rx="22" ry="4" fill={C.primary} opacity="0.25" />

      {/* Mane — outer ring */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 60 + 30 * Math.cos(rad);
        const cy = 54 + 30 * Math.sin(rad);
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="9" ry="13"
            transform={`rotate(${deg}, ${cx}, ${cy})`}
            fill={C.secondary}
            opacity="0.75"
          />
        );
      })}

      {/* Face */}
      <circle cx="60" cy="54" r="28" fill={C.tertiary} />

      {/* Ears */}
      <circle cx="36" cy="28" r="10" fill={C.tertiary} />
      <circle cx="84" cy="28" r="10" fill={C.tertiary} />
      <circle cx="36" cy="28" r="5" fill={C.secondary} opacity="0.5" />
      <circle cx="84" cy="28" r="5" fill={C.secondary} opacity="0.5" />

      {/* Eyes */}
      <circle cx="48" cy="50" r="9" fill={C.primary} />
      <circle cx="72" cy="50" r="9" fill={C.primary} />
      <circle cx="48" cy="50" r="5" fill={C.bg} />
      <circle cx="72" cy="50" r="5" fill={C.bg} />
      <circle cx="46" cy="48" r="2.5" fill={C.neutral} opacity="0.9" />
      <circle cx="70" cy="48" r="2.5" fill={C.neutral} opacity="0.9" />

      {/* Nose */}
      <path d="M55 60 Q60 57 65 60 L63 65 Q60 67 57 65 Z" fill={C.primary} />

      {/* Mouth + whiskers */}
      <path d="M57 65 Q60 70 63 65" stroke={C.primary} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="32" y1="60" x2="50" y2="64" stroke={C.secondary} strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="66" x2="50" y2="67" stroke={C.secondary} strokeWidth="1" opacity="0.5" />
      <line x1="88" y1="60" x2="70" y2="64" stroke={C.secondary} strokeWidth="1" opacity="0.5" />
      <line x1="88" y1="66" x2="70" y2="67" stroke={C.secondary} strokeWidth="1" opacity="0.5" />

      {/* Trophy cup body */}
      <path d="M44 88 Q44 110 60 114 Q76 110 76 88 Z" fill={C.secondary} />
      <rect x="44" y="86" width="32" height="6" rx="2" fill={C.primary} />
      {/* Trophy handles */}
      <path d="M44 90 Q36 90 36 100 Q36 108 44 108" stroke={C.primary} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M76 90 Q84 90 84 100 Q84 108 76 108" stroke={C.primary} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Trophy stem + base */}
      <rect x="57" y="114" width="6" height="8" fill={C.primary} />
      <rect x="49" y="120" width="22" height="4" rx="2" fill={C.primary} />
      {/* Trophy star */}
      <text x="60" y="104" textAnchor="middle" fontSize="14" fill={C.tertiary} fontFamily="serif">?</text>
    </motion.svg>
  );
}

/** Rocket — launch & winning */
function RocketMascot() {
  return (
    <motion.svg
      width="84" height="90" viewBox="0 0 120 128"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Stars in bg */}
      <circle cx="14" cy="18" r="2"   fill={C.tertiary} opacity="0.5" />
      <circle cx="102" cy="22" r="1.5" fill={C.tertiary} opacity="0.4" />
      <circle cx="108" cy="55" r="2"   fill={C.tertiary} opacity="0.35" />
      <circle cx="10"  cy="72" r="1.5" fill={C.tertiary} opacity="0.4" />
      <circle cx="18"  cy="48" r="1"   fill={C.tertiary} opacity="0.3" />
      <circle cx="96"  cy="80" r="1"   fill={C.tertiary} opacity="0.3" />

      {/* Flame outer */}
      <ellipse cx="48" cy="108" rx="8"  ry="14" fill={C.secondary} opacity="0.6" />
      <ellipse cx="72" cy="108" rx="8"  ry="14" fill={C.secondary} opacity="0.6" />
      {/* Flame inner */}
      <ellipse cx="48" cy="106" rx="5" ry="10" fill={C.tertiary} opacity="0.8" />
      <ellipse cx="72" cy="106" rx="5" ry="10" fill={C.tertiary} opacity="0.8" />
      <ellipse cx="60" cy="102" rx="6" ry="12" fill={C.neutral} />

      {/* Fins */}
      <polygon points="40,86 28,108 40,100" fill={C.secondary} opacity="0.85" />
      <polygon points="80,86 92,108 80,100" fill={C.secondary} opacity="0.85" />

      {/* Rocket body */}
      <rect x="38" y="42" width="44" height="60" rx="22" fill={C.primary} />

      {/* Rocket nose */}
      <path d="M38 60 Q60 4 82 60 Z" fill={C.secondary} />
      <path d="M44 58 Q60 18 76 58 Z" fill={C.primary} opacity="0.4" />

      {/* Porthole rim */}
      <circle cx="60" cy="68" r="14" fill={C.secondary} opacity="0.35" />
      <circle cx="60" cy="68" r="11" fill={C.primary} opacity="0.7" />

      {/* Face in porthole */}
      <circle cx="56" cy="65" r="2" fill={C.tertiary} />
      <circle cx="64" cy="65" r="2" fill={C.tertiary} />
      {/* smile */}
      <path d="M55 70 Q60 75 65 70" stroke={C.tertiary} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Body details */}
      <line x1="48" y1="84" x2="72" y2="84" stroke={C.secondary} strokeWidth="1" opacity="0.4" />
      <line x1="46" y1="90" x2="74" y2="90" stroke={C.secondary} strokeWidth="1" opacity="0.3" />
    </motion.svg>
  );
}

/* --- Step data --- */
const visionSteps = [
  {
    id: "01",
    title: "Learn",
    tagline: "Build the foundation",
    accent: C.primary,
    accentMid: "rgba(0,43,114,0.35)",
    accentLow: "rgba(0,43,114,0.10)",
    Mascot: OwlMascot,
    points: [
      { label: "Masterclasses",       detail: "Live sessions with MAANG engineers" },
      { label: "Placement Trainings", detail: "Resume, DSA & system design sprints" },
      { label: "Practice & Feedback", detail: "Peer reviews & mock interviews" },
    ],
  },
  {
    id: "02",
    title: "Compete",
    tagline: "Prove your skills",
    accent: C.secondary,
    accentMid: "rgba(100,116,139,0.35)",
    accentLow: "rgba(100,116,139,0.10)",
    Mascot: LionMascot,
    points: [
      { label: "Hackathons",          detail: "Build real products under pressure" },
      { label: "Coding Contests",     detail: "Rated rounds with public leaderboards" },
      { label: "Leaderboard Ranking", detail: "Earn visibility among top companies" },
    ],
  },
  {
    id: "03",
    title: "Win",
    tagline: "Land your dream role",
    accent: C.tertiary,
    accentMid: "rgba(255,253,240,0.18)",
    accentLow: "rgba(255,253,240,0.07)",
    Mascot: RocketMascot,
    points: [
      { label: "Job Opportunities",        detail: "Curated listings from hiring partners" },
      { label: "Hiring Drives",            detail: "Exclusive referrals & fast-track pipelines" },
      { label: "Recruiter Magnet Profile", detail: "Stand-out portfolio built by KLM" },
    ],
  },
];

/* --- Single pillar card --- */
function PillarCard({ step, index }: { step: (typeof visionSteps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const { Mascot } = step;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 min-w-0 group"
    >
      <motion.div
        whileHover={{ y: -7, scale: 1.018 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative h-full rounded-[2rem] overflow-hidden"
        style={{
          background: "linear-gradient(170deg, rgba(6,14,35,0.97) 0%, rgba(2,6,18,1) 100%)",
          border: `1px solid ${step.accentMid}`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 64px rgba(0,0,0,0.55)`,
        }}
      >
        {/* Left accent stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: `linear-gradient(to bottom, ${step.accent}, transparent)` }}
        />

        {/* Top glow wash */}
        <div
          className="absolute top-0 left-0 right-0 h-56 transition-opacity duration-500 opacity-60 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse at 50% -10%, ${step.accentMid}, transparent 70%)` }}
        />

        {/* Giant watermark number */}
        <div
          className="absolute right-3 bottom-4 leading-none select-none pointer-events-none font-black"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "9rem",
            color: step.accent,
            opacity: 0.05,
          }}
        >
          {step.id}
        </div>

        {/* -- Content -- */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-5 pb-5">

          {/* Mascot pedestal glow */}
          <div
            className="relative mb-1 p-3 rounded-[1.5rem] transition-all duration-500"
            style={{
              background: step.accentLow,
              border: `1px solid ${step.accentMid}`,
              boxShadow: `0 0 30px ${step.accentLow}`,
            }}
          >
            <Mascot />
          </div>

          {/* Step label */}
          <p
            className="text-[9px] font-bold uppercase tracking-[0.28em] mt-3 mb-0.5"
            style={{ color: step.accent, opacity: 0.85 }}
          >
            Step {step.id}
          </p>

          {/* Title */}
          <h3
            className="text-3xl font-black leading-none tracking-tight mb-1"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              color: step.id === "03" ? C.tertiary : C.neutral,
            }}
          >
            {step.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs mb-4" style={{ color: `${C.neutral}50` }}>
            {step.tagline}
          </p>

          {/* Divider */}
          <div
            className="w-10 h-px mb-4"
            style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
          />

          {/* Points */}
          <ul className="w-full space-y-2.5 text-left">
            {step.points.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.09, duration: 0.35 }}
                className="flex gap-2.5 items-start"
              >
                <svg width="15" height="15" viewBox="0 0 17 17" fill="none" className="shrink-0 mt-[2px]">
                  <circle cx="8.5" cy="8.5" r="7.5" stroke={step.accent} strokeWidth="1.2" opacity="0.5" />
                  <path d="M5.5 8.5l2.5 2.5 4-4" stroke={step.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: C.neutral }}>{pt.label}</p>
                  <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: `${C.neutral}40` }}>{pt.detail}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --- Connector --- */
function Connector({ fromAccent, toAccent }: { fromAccent: string; toAccent: string }) {
  return (
    <div className="hidden lg:flex items-center self-start mt-[8.5rem] shrink-0 w-8 relative">
      <div
        className="w-full h-px"
        style={{ background: `linear-gradient(90deg, ${fromAccent}50, ${toAccent}50)` }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full top-1/2 -translate-y-1/2"
        style={{
          left: 0,
          background: `radial-gradient(circle, ${C.neutral}, ${fromAccent})`,
          boxShadow: `0 0 8px ${fromAccent}`,
        }}
        animate={{ x: [0, 28] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
    </div>
  );
}

/* --- Section --- */
export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yTitle  = useTransform(scrollYProgress, [0, 0.25], [32, 0]);
  const opTitle = useTransform(scrollYProgress, [0, 0.16], [0, 1]);

  return (
    <section
      id="vision-section"
      ref={containerRef}
      className="relative w-full z-10 bg-transparent h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(0,43,114,0.07), transparent)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(255,253,240,0.06), transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(100,116,139,0.06), transparent)" }}
        />
      </div>

      {/* Section heading */}
      <motion.div
        style={{ y: yTitle, opacity: opTitle }}
        className="text-center mb-6 relative z-20 px-4"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-semibold uppercase tracking-[0.45em] mb-3"
          style={{ color: C.secondary }}
        >
          Your Journey
        </motion.p>

        <div className="relative inline-block">
          <h2
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none pb-1"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              background: `linear-gradient(135deg, ${C.neutral} 0%, ${C.tertiary} 55%, ${C.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Path
          </h2>
          <div
            className="absolute inset-0 blur-[60px] opacity-15 pointer-events-none"
            style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }}
          />
        </div>

        {/* Blue-to-gold underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-3 h-[2px] w-40 rounded-full origin-center"
          style={{ background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.secondary}, ${C.tertiary}, transparent)` }}
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-sm max-w-sm mx-auto leading-relaxed"
          style={{ color: `${C.neutral}45` }}
        >
          Three stages. One transformation. From first lesson to first offer.
        </motion.p>
      </motion.div>

      {/* Pillar cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
          {visionSteps.map((step, i) => (
            <div key={step.id} className="flex lg:flex-row items-stretch flex-1 min-w-0">
              <PillarCard step={step} index={i} />
              {i < visionSteps.length - 1 && (
                <Connector fromAccent={visionSteps[i].accent} toAccent={visionSteps[i + 1].accent} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
