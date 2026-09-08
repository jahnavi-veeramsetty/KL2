import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../ui/Button'
import { Avatar } from '../../ui/Avatar'
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

const candidates = [
  {
    id: 0,
    name: "Elena R.",
    role: "Senior Backend Engineer",
    shortRole: "Backend",
    experience: "8+ yrs exp",
    score: "98.4%",
    status: "Available Now",
    bio: "Expert in distributed systems and high-throughput microservices. Proven track record of scaling infrastructure and migrating monoliths to decoupled architectures.",
    skills: ["Go", "PostgreSQL", "Kubernetes"]
  },
  {
    id: 1,
    name: "David M.",
    role: "Lead Data Engineer",
    shortRole: "Data Eng",
    experience: "7+ yrs exp",
    score: "99.1%",
    status: "Available Now",
    bio: "Specializes in data pipelines and warehousing. Strong background in AWS, Snowflake, and building real-time streaming architectures at scale.",
    skills: ["Python", "Spark", "AWS"]
  },
  {
    id: 2,
    name: "Sarah J.",
    role: "Staff Frontend Engineer",
    shortRole: "Frontend",
    experience: "6+ yrs exp",
    score: "97.8%",
    status: "Available Now",
    bio: "React and performance optimization expert. Loves building complex UIs, creating robust design systems, and ensuring web accessibility.",
    skills: ["React", "TypeScript", "Tailwind"]
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % candidates.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-4.25rem)] lg:h-[calc(100vh-4.25rem)] flex items-center justify-center py-6 lg:py-0 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full my-auto">

        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl lg:w-1/2 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5 flex">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:border-cyan-400/40 transition-colors cursor-pointer group">
              <span className="flex items-center justify-center px-1.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                New
              </span>
              <span className="text-xs sm:text-sm font-medium text-cyan-50 group-hover:text-white transition-colors">
                Introducing Knowvation Select for Enterprise
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* Headline - balanced, elegant, screen-fitting */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight mb-3 sm:mb-4 leading-[1.15] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400"
          >
            Build your engineering team with confidence.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-slate-300/90 mb-5 sm:mb-6 leading-relaxed max-w-lg"
          >
            Vetted technical talent, proven through hands-on evaluation. Hire faster without compromising quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto h-11 px-7 text-sm sm:text-base font-semibold shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_-2px_rgba(34,211,238,0.6)] transition-all"
            >
              Login
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="w-full sm:w-auto h-11 px-6 text-sm sm:text-base font-medium bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-sm"
            >
              Browse qualified talent
            </Button>
          </motion.div>

          {/* Live Trust Metrics Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-6 pt-5 border-t border-slate-800/60 w-full flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium">100% Vetted Talent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>48h Match Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zero-Risk Trial</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Dynamic Interactive Talent Cards */}
        <motion.div
          className="lg:w-1/2 relative flex flex-col justify-center items-center h-[360px] sm:h-[400px] w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glowing Background Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none z-0" />

          {/* Dynamic Switcher Pill Bar */}
          <div className="relative z-20 mb-4 flex items-center gap-1.5 p-1 rounded-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-md shadow-lg">
            {candidates.map((cand, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={cand.id}
                  onClick={() => setActiveIndex(i)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span>{cand.shortRole}</span>
                </button>
              );
            })}
          </div>

          {/* Card Stack Container */}
          <div className="relative w-full max-w-[390px] h-[230px] z-10">
            <AnimatePresence>
              {candidates.map((candidate, i) => {
                const relPos = (i - activeIndex + candidates.length) % candidates.length;
                const isFront = relPos === 0;

                let y = 0, x = 0, rotate = -1.5, scale = 1, zIndex = 20, opacity = 1;

                if (relPos === 1) {
                  y = -32;
                  x = 24;
                  rotate = 4.5;
                  scale = 0.92;
                  zIndex = 10;
                  opacity = 0.65;
                } else if (relPos === 2) {
                  y = 32;
                  x = -20;
                  rotate = -3.5;
                  scale = 0.88;
                  zIndex = 5;
                  opacity = 0.45;
                }

                return (
                  <motion.div
                    key={candidate.id}
                    onClick={() => setActiveIndex(i)}
                    className={`absolute inset-0 rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer transition-colors duration-500 ${
                      isFront
                        ? 'bg-[#0B1528]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_50px_-10px_rgba(34,211,238,0.2)] ring-1 ring-cyan-500/10'
                        : 'bg-[#0B1528]/50 backdrop-blur-xl border border-white/10 hover:border-cyan-500/20 shadow-xl'
                    }`}
                    initial={false}
                    animate={{ y, x, rotate, scale, zIndex, opacity }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ zIndex }}
                  >
                    {/* Inner light reflection */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none transition-opacity duration-500 ${isFront ? 'opacity-20' : 'opacity-0'}`} />

                    <div className="relative z-10 flex items-start gap-3.5">
                      <div className="relative flex-shrink-0">
                        {isFront && (
                          <motion.div
                            layoutId={`glow-${candidate.id}`}
                            className="absolute inset-0 bg-cyan-400/30 rounded-full blur-lg"
                          />
                        )}
                        <Avatar
                          name={candidate.name}
                          size="lg"
                          className={`relative border-2 transition-all duration-500 ${
                            isFront ? 'border-cyan-400/40' : 'border-transparent opacity-50'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <div className="flex items-center gap-1.5">
                            <h3 className={`font-semibold tracking-tight transition-colors duration-500 ${isFront ? 'text-white text-lg' : 'text-slate-300 text-base'}`}>
                              {candidate.name}
                            </h3>
                            <CheckCircle2 className={`w-4 h-4 transition-all duration-500 ${isFront ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-600'}`} />
                          </div>
                          {isFront && (
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                              <Sparkles className="w-3 h-3" />
                              <span>{candidate.score}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <p className={`font-medium text-xs sm:text-sm transition-colors duration-500 ${isFront ? 'text-cyan-400' : 'text-slate-400'}`}>
                            {candidate.role}
                          </p>
                          <span className="text-slate-600 text-xs">•</span>
                          <span className="text-slate-400 text-xs">{candidate.experience}</span>
                        </div>

                        <p className={`leading-relaxed line-clamp-2 text-xs transition-colors duration-500 ${isFront ? 'text-slate-300/90' : 'text-slate-500'}`}>
                          {candidate.bio}
                        </p>
                      </div>
                    </div>

                    <div className={`relative z-10 flex items-center justify-between gap-2 mt-3 pt-3 border-t transition-colors duration-500 ${isFront ? 'border-white/10' : 'border-white/5'}`}>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.map(skill => (
                          <span
                            key={skill}
                            className={`rounded-full px-2.5 py-0.5 font-medium transition-all duration-500 ${
                              isFront
                                ? 'bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px]'
                                : 'bg-white/5 border border-transparent text-slate-500 text-[10px]'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {isFront && (
                        <span className="text-[11px] font-medium text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1">
                          View profile &rarr;
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Dynamic Progress indicator dots */}
          <div className="relative z-20 mt-4 flex items-center gap-2">
            {candidates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View candidate ${idx + 1}`}
                className="group p-1"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                      : 'w-1.5 bg-slate-700 group-hover:bg-slate-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
