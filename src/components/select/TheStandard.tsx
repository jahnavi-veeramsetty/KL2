import { motion } from 'framer-motion'
import { BookOpen, BarChart2, CodeXml, MessageSquare, Users } from 'lucide-react'

const steps = [
  { num: 1, Icon: BookOpen,      title: 'Core fundamentals',         desc: 'Assess your knowledge on essential concepts.' },
  { num: 2, Icon: BarChart2,     title: 'Real-world problem solving', desc: 'Work on practical, applied tasks.' },
  { num: 3, Icon: CodeXml,       title: 'Advanced technical skills',  desc: 'Evaluate depth in tools, systems and engineering.' },
  { num: 4, Icon: MessageSquare, title: 'Clear communication',        desc: 'Explain your approach and decisions.' },
  { num: 5, Icon: Users,         title: 'Select readiness',           desc: 'Be considered for the Select hiring pool.' },
]




export default function TheStandard() {
  return (
    <div className="py-24 md:py-32 max-w-7xl mx-auto px-6 overflow-hidden">

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12 xl:gap-20">

        {/* ── LEFT: text + steps ── */}
        <div className="w-full lg:w-[45%] flex-shrink-0">

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
              Qualification
            </span>
            <div className="w-10 h-px bg-slate-700" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A fair process.<br />
            <span className="text-cyan-400">Built for the right people.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-slate-400 text-base leading-relaxed mb-12 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Join a community of builders. Clear a focused, industry-aligned
            evaluation to be considered for the Select hiring pool.
          </motion.p>

          {/* Steps */}
          <div className="relative flex flex-col gap-7">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-[52px] bottom-12 w-px
              bg-gradient-to-b from-cyan-500/30 via-slate-700/30 to-transparent" />

            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                className="flex items-start gap-5 group"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                {/* Step number */}
                <div className="flex-shrink-0 z-10 w-8 h-8 rounded-full
                  border border-slate-700 bg-[#080D18]
                  group-hover:border-cyan-500/50 group-hover:bg-[#0a1628]
                  flex items-center justify-center
                  text-xs font-semibold text-slate-500 group-hover:text-cyan-400
                  transition-all duration-200">
                  {s.num}
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 w-9 h-9 rounded-lg
                  border border-slate-800 bg-[#080D18]
                  group-hover:border-cyan-500/30
                  flex items-center justify-center
                  transition-colors duration-200">
                  <s.Icon className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Text */}
                <div className="pt-0.5 min-w-0">
                  <p className="text-sm font-semibold text-slate-100 mb-0.5">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer line */}
          <div className="flex items-center gap-3 mt-10">
            <div className="w-6 h-px bg-slate-700" />
            <span className="text-[10px] tracking-[0.22em] text-slate-600 uppercase font-medium">
              Skills create opportunities
            </span>
          </div>
        </div>

        {/* ── RIGHT: 3D stacked cards on platform ── */}
        <div className="w-full lg:flex-1 flex items-center justify-center py-8">
          <motion.div
            className="relative"
            style={{ width: 480, height: 460 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* ── SVG: orbit ellipse + connection lines + dots ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 480 460"
              fill="none"
            >
              {/* Dashed orbit ellipse around the whole card stack */}
              <ellipse cx="240" cy="220" rx="210" ry="170"
                stroke="rgba(96,165,250,0.15)"
                strokeWidth="1"
                strokeDasharray="4 6" />

              {/* Small dots on the orbit */}
              {([
                [240, 50], [440, 165], [430, 290],
                [145, 45], [40,  165], [50,  290],
              ] as [number,number][]).map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={5}
                    fill="rgba(34,211,238,0.12)" />
                  <circle cx={x} cy={y} r={2.5}
                    fill="rgba(34,211,238,0.7)" />
                </g>
              ))}

              {/* Lines from floating pills to card edge */}
              <line x1="148" y1="72"  x2="210" y2="148" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="358" y1="68"  x2="278" y2="148" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="58"  y1="198" x2="170" y2="208" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="402" y1="198" x2="310" y2="208" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="402" y1="340" x2="298" y2="268" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="3 5"/>

              {/* Mid-line dots */}
              {([
                [179, 110],[211,147],
                [318, 108],[278,147],
                [108, 198],[170,207],
                [380, 198],[311,207],
                [360, 300],[300,268],
              ] as [number,number][]).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={2} fill="rgba(34,211,238,0.45)" />
              ))}

              {/* Platform base ellipses */}
              <ellipse cx="240" cy="392" rx="130" ry="14"
                stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="4 5" />
              <ellipse cx="240" cy="404" rx="100" ry="10"
                stroke="rgba(34,211,238,0.1)" strokeWidth="1" strokeDasharray="4 5" />
            </svg>

            {/* ── Ambient glow behind card ── */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 260, height: 260,
                top: 80, left: 110,
                background: 'radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* ── Platform / pedestal layers ── */}
            {[
              { w: 220, h: 22, bottom: 52, opacity: 0.25, blur: 8 },
              { w: 180, h: 16, bottom: 38, opacity: 0.35, blur: 5 },
              { w: 140, h: 12, bottom: 28, opacity: 0.45, blur: 3 },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width: p.w, height: p.h,
                  bottom: p.bottom,
                  background: `rgba(34,211,238,${p.opacity})`,
                  filter: `blur(${p.blur}px)`,
                }}
              />
            ))}
            {/* Pedestal solid steps */}
            {[
              { w: 200, h: 10, bottom: 44, bg: 'from-[#0d2040] to-[#071428]' },
              { w: 160, h: 8,  bottom: 36, bg: 'from-[#102548] to-[#081832]' },
              { w: 120, h: 7,  bottom: 29, bg: 'from-[#122b52] to-[#091c38]' },
            ].map((s, i) => (
              <div
                key={i}
                className={`absolute left-1/2 -translate-x-1/2 rounded-sm bg-gradient-to-b ${s.bg} border-t border-cyan-500/10`}
                style={{ width: s.w, height: s.h, bottom: s.bottom }}
              />
            ))}

            {/* ── Stacked background cards (depth effect) ── */}
            {[
              { offset: 18, rotate: -16, scale: 0.88, opacity: 0.35 },
              { offset: 9,  rotate: -11, scale: 0.93, opacity: 0.55 },
              { offset: 3,  rotate: -6,  scale: 0.97, opacity: 0.75 },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute rounded-2xl border border-slate-600/30
                  bg-gradient-to-br from-[#0d1e3a] to-[#060f20]"
                style={{
                  width: 210, height: 265,
                  top: 80 + c.offset,
                  left: 135 + c.offset * 0.5,
                  transform: `perspective(700px) rotateY(${c.rotate}deg) rotateX(4deg) scale(${c.scale})`,
                  opacity: c.opacity,
                  transformOrigin: 'center center',
                }}
              />
            ))}

            {/* ── Main card ── */}
            <div
              className="absolute rounded-2xl overflow-hidden
                bg-gradient-to-br from-[#0f2244] via-[#091a38] to-[#050f22]
                border border-slate-600/50
                shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(34,211,238,0.06),inset_0_1px_0_rgba(255,255,255,0.04)]"
              style={{
                width: 210, height: 265,
                top: 80, left: 135,
                transform: 'perspective(700px) rotateY(-8deg) rotateX(4deg)',
                transformOrigin: 'center center',
              }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-cyan-400/10 to-transparent" />

              <div className="relative h-full flex flex-col items-center justify-center gap-5 px-6 text-center">
                {/* Icon: overlapping squares */}
                <div className="w-14 h-14 rounded-2xl border border-cyan-500/30
                  bg-gradient-to-br from-cyan-500/15 to-blue-600/10
                  flex items-center justify-center
                  shadow-[0_0_28px_rgba(34,211,238,0.18)]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
                    <rect x="2" y="2" width="20" height="20" rx="4"
                      stroke="rgba(34,211,238,0.5)" strokeWidth="1.5"
                      fill="rgba(34,211,238,0.08)" />
                    <rect x="14" y="14" width="20" height="20" rx="4"
                      stroke="rgba(34,211,238,0.9)" strokeWidth="1.5"
                      fill="rgba(34,211,238,0.13)" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-[17px] font-bold text-white mb-1.5 leading-tight">
                    Select Qualified
                  </h3>
                  <p className="text-[10px] font-bold tracking-[0.16em] text-cyan-400 uppercase mb-5">
                    AI/ML Engineer
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    You've demonstrated real skill.<br />
                    You're in the Select pool.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Floating label pills ── */}
            {[
              { text: 'Real Problems',         Icon: BarChart2,     style: { top: 55,  left: 18  } },
              { text: 'Deep Skills',           Icon: CodeXml,       style: { top: 50,  right: 14 } },
              { text: 'Core Knowledge',        Icon: BookOpen,      style: { top: 185, left: 2   } },
              { text: 'Clear Thinking',        Icon: MessageSquare, style: { top: 182, right: 6  } },
              { text: 'Greater Opportunities', Icon: Users,         style: { bottom: 90, right: 6 } },
            ].map((l, i) => (
              <div
                key={i}
                className="absolute z-30 flex items-center gap-2 px-3 py-2
                  rounded-xl border border-slate-700/60
                  bg-[#0a1525]/90 backdrop-blur-sm
                  shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                style={l.style}
              >
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20
                  flex items-center justify-center flex-shrink-0">
                  <l.Icon className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.1em]
                  text-slate-300 uppercase whitespace-nowrap leading-tight">
                  {l.text}
                </span>
              </div>
            ))}

          </motion.div>
        </div>

      </div>
    </div>
  )
}
