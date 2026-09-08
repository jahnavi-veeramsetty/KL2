import {
  CodeXml, BarChart2, Package, Settings,
  Server, Users, Zap, FileText,
} from 'lucide-react'

// ── Canvas (matches container's aspect ratio perfectly) ──────────────────────
const W  = 1000
const H  = 400
const CX = 500
const CY = 200

// [rx_horizontal, ry_vertical] for each ring
const RINGS: [number, number][] = [
  [95,  95 ], // 0 – planet (circle)
  [200, 120], // 1
  [320, 162], // 2
  [430, 188], // 3
]
const PR = 95

// Returns left/top as % of the canvas container
function pt(ring: number, deg: number) {
  const [rx, ry] = RINGS[ring]
  const r = (deg * Math.PI) / 180
  return {
    left: `${((CX + Math.cos(r) * rx) / W) * 100}%`,
    top:  `${((CY + Math.sin(r) * ry) / H) * 100}%`,
  }
}

const SKILLS = [
  { label: 'Software Engineering',    Icon: CodeXml,  ring: 1, angle: -90  },
  { label: 'Data & Analytics',        Icon: BarChart2, ring: 2, angle: -148 },
  { label: 'Product & Design',        Icon: Package,   ring: 2, angle: -32  },
  { label: 'Machine Learning',        Icon: Settings,  ring: 3, angle: 180  },
  { label: 'Infrastructure & DevOps', Icon: Server,    ring: 3, angle: 0    },
  { label: 'Research & Applied Sci.', Icon: Users,     ring: 2, angle: 148  },
  { label: 'Technical Leadership',    Icon: Zap,       ring: 2, angle: 32   },
  { label: 'Go-to-Market',            Icon: FileText,  ring: 1, angle: 90   },
]

// Small dots sitting on rings
const DOTS = [
  { ring: 0, angle: 40  }, { ring: 0, angle: -130 },
  { ring: 1, angle: 20  }, { ring: 1, angle: 165  },
  { ring: 2, angle: -60 }, { ring: 2, angle: 110  },
  { ring: 3, angle: -48 }, { ring: 3, angle: 64   },
]

export default function TalentPool() {
  return (
    <section className="w-full bg-[#000511] py-16">

      {/* ── Header ── */}
      <div className="text-center mb-10 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
          border border-cyan-500/20 bg-cyan-500/[0.06] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block
            shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          <span className="text-[11px] font-semibold tracking-[0.18em]
            text-slate-300 uppercase">Talent Pool</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold
          tracking-tight text-white leading-tight mb-4">
          Deeper talent.{' '}
          <span className="text-cyan-400">Broader possibilities.</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
          A single pool of candidates with real demonstrated skills
          across multiple disciplines.
        </p>
      </div>

      {/* ── Orbital diagram ── */}
      <div
        className="relative w-full max-w-[1100px] mx-auto"
        style={{ aspectRatio: `${W} / ${H}` }}
      >

        {/* SVG: rings + dots + planet */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <radialGradient id="tp-pg" cx="50%" cy="30%" r="75%">
              <stop offset="0%"   stopColor="#1e5aa8" />
              <stop offset="50%"  stopColor="#081a40" />
              <stop offset="100%" stopColor="#010810" />
            </radialGradient>
            <radialGradient id="tp-tg" cx="50%" cy="0%" r="80%">
              <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"   />
            </radialGradient>
            <radialGradient id="tp-bg" cx="50%" cy="100%" r="80%">
              <stop offset="0%"   stopColor="#1d4ed8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0"    />
            </radialGradient>
            <filter id="tp-sm" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="tp-md" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Elliptical rings */}
          {RINGS.map(([rx, ry], i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={rx} ry={ry}
              fill="none"
              stroke={i === 0 ? 'rgba(34,211,238,0.25)' : 'rgba(96,165,250,0.12)'}
              strokeWidth="1"
            />
          ))}

          {/* Glow dots on rings */}
          {DOTS.map((d, i) => {
            const [rx, ry] = RINGS[d.ring]
            const rad = (d.angle * Math.PI) / 180
            const x = CX + Math.cos(rad) * rx
            const y = CY + Math.sin(rad) * ry
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={6}
                  fill="#22d3ee" opacity={0.2} filter="url(#tp-sm)" />
                <circle cx={x} cy={y} r={2.5}
                  fill="#22d3ee" opacity={0.85} />
              </g>
            )
          })}

          {/* Planet ambient halo */}
          <circle cx={CX} cy={CY} r={PR + 40}
            fill="rgba(34,211,238,0.05)" filter="url(#tp-md)" />

          {/* Planet body */}
          <circle cx={CX} cy={CY} r={PR}
            fill="url(#tp-pg)"
            stroke="rgba(34,211,238,0.3)"
            strokeWidth="1.5" />

          {/* Top glow */}
          <ellipse cx={CX} cy={CY - PR * 0.45}
            rx={PR * 0.68} ry={PR * 0.5}
            fill="url(#tp-tg)" filter="url(#tp-sm)" />
          {/* Bottom glow */}
          <ellipse cx={CX} cy={CY + PR * 0.45}
            rx={PR * 0.68} ry={PR * 0.5}
            fill="url(#tp-bg)" filter="url(#tp-sm)" />

          {/* Top rim arc */}
          <path
            d={`M ${CX - PR * 0.75} ${CY - PR * 0.25}
                Q ${CX} ${CY - PR * 1.1}
                  ${CX + PR * 0.75} ${CY - PR * 0.25}`}
            fill="none"
            stroke="rgba(34,211,238,0.25)"
            strokeWidth="1.5"
          />
          {/* Divider */}
          <line x1={CX - 16} y1={CY + 24} x2={CX + 16} y2={CY + 24}
            stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </svg>

        {/* Planet label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-slate-400 text-xs sm:text-sm leading-none mb-1.5">Our</p>
            <p className="text-white text-base sm:text-xl md:text-2xl font-bold tracking-wide">
              Talent Pool
            </p>
          </div>
        </div>

        {/* Skill pills — static, positioned on the rings */}
        {SKILLS.map((s) => {
          const p = pt(s.ring, s.angle)
          return (
            <div
              key={s.label}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.left, top: p.top }}
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full
                border border-slate-700/60 bg-[#080f22]/90 backdrop-blur-sm
                whitespace-nowrap
                hover:border-cyan-500/40 hover:bg-[#0b1630]/90
                transition-colors duration-200 cursor-default
                shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
                <s.Icon className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
                <span className="text-[11px] sm:text-xs md:text-sm
                  font-medium text-slate-200">
                  {s.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
