import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 6) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const steps = [
    { 
      id: 1,
      title: "Post the role", 
      desc: "Say what you actually need. Skip the generic JD.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
      pos: { left: '50%', top: '0%' },
      anchor: 'bottom-full mb-4 left-1/2 -translate-x-1/2',
    },
    { 
      id: 2,
      title: "See your matches", 
      desc: "A curated pool built specifically for your role.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      pos: { left: '93.3%', top: '25%' },
      anchor: 'left-full ml-4 top-1/2 -translate-y-1/2',
    },
    { 
      id: 3,
      title: "Shortlist", 
      desc: "Review vetted profiles and pick who to talk to.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
      pos: { left: '93.3%', top: '75%' },
      anchor: 'left-full ml-4 top-1/2 -translate-y-1/2',
    },
    { 
      id: 4,
      title: "Interview", 
      desc: "Schedule and run technical interviews right here.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
      pos: { left: '50%', top: '100%' },
      anchor: 'top-full mt-4 left-1/2 -translate-x-1/2',
    },
    { 
      id: 5,
      title: "Score", 
      desc: "Capture standardized feedback as you go.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
      pos: { left: '6.7%', top: '75%' },
      anchor: 'right-full mr-4 top-1/2 -translate-y-1/2',
    },
    { 
      id: 6,
      title: "Onboard", 
      desc: "Send the offer and hire, all in the same thread.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>,
      pos: { left: '6.7%', top: '25%' },
      anchor: 'right-full mr-4 top-1/2 -translate-y-1/2',
    },
  ]

  // Coordinated container animation ensures points 01 -> 06 animate sequentially in exact order
  const dialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.28,
        delayChildren: 0.2,
      },
    },
  }

  const stepNodeVariants = {
    hidden: { opacity: 0, scale: 0.4, x: "-50%", y: "-50%" },
    visible: {
      opacity: 1,
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  }

  const currentStepData = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <div className="py-24 md:py-32 max-w-7xl mx-auto px-6 overflow-hidden">
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-12">
        
        {/* Left: Circular Layout Container */}
        <div 
          className="w-full lg:w-[60%] xl:w-[65%] relative min-h-[500px] md:min-h-[600px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Central Track & Sequentially Orchestrated Dial */}
          <motion.div 
            className="relative w-[320px] h-[320px] hidden md:block mt-8 flex-shrink-0"
            variants={dialVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            
            {/* The Central Track (SVG Circle) */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 320 320" fill="none">
                {/* Outer dashed track */}
                <circle cx="160" cy="160" r="160" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" strokeDasharray="6 6" />
                {/* Inner solid glow ring */}
                <circle cx="160" cy="160" r="110" stroke="rgba(34,211,238,0.1)" strokeWidth="1" />
              </svg>
            </div>

            {/* The Central Glowing Orb */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[180px] h-[180px] rounded-full flex flex-col items-center justify-center text-center z-0"
              initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
              whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/40 to-[#0A162B]/90 rounded-full border border-cyan-500/30 shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-md" />
              <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl" />
              <div className="relative z-10 flex flex-col items-center px-3">
                <span className="text-[10px] font-semibold text-cyan-400 mb-0.5 uppercase tracking-wider">
                  Step 0{activeStep} of 6
                </span>
                <h3 className="text-base font-bold text-white mb-1 leading-tight line-clamp-1">
                  {currentStepData.title}
                </h3>
                <div className="w-8 h-[1px] bg-cyan-500/50 my-1" />
                <p className="text-[8px] font-bold text-cyan-400/80 tracking-[0.2em] uppercase">All in one place</p>
              </div>
            </motion.div>

            {/* The Nodes and Cards (Animated in strict sequential order 01 -> 06) */}
            {steps.map((step) => {
              const isActive = step.id === activeStep;

              return (
                <motion.div
                  key={step.id}
                  variants={stepNodeVariants}
                  className="absolute z-20 flex items-center justify-center cursor-pointer"
                  style={{ 
                    left: step.pos.left, 
                    top: step.pos.top
                  }}
                  onClick={() => setActiveStep(step.id)}
                >
                  {/* Node Circle */}
                  <div 
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-20 transition-all duration-300 ${
                      isActive 
                        ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.8)] border border-cyan-300 scale-110' 
                        : 'bg-[#0F1A30] text-slate-300 border border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-400'
                    }`}
                  >
                    {isActive && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />}
                    0{step.id}
                  </div>

                  {/* Attached Card */}
                  <div className={`absolute ${step.anchor} w-52 group`}>
                    <div 
                      className={`backdrop-blur-xl rounded-2xl p-3 shadow-xl transition-all duration-300 flex items-start gap-3 border ${
                        isActive
                          ? 'bg-[#0F1A30]/95 border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.2)] ring-1 ring-cyan-500/20'
                          : 'bg-[#0B1528]/80 border-white/10 hover:bg-[#0F1A30]/90 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className={`flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        isActive ? 'text-cyan-300 scale-110' : 'text-cyan-400 group-hover:scale-110'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className={`text-sm font-bold transition-colors ${
                            isActive ? 'text-cyan-200' : 'text-slate-200 group-hover:text-white'
                          }`}>
                            {step.title}
                          </h4>
                        </div>
                        <p className={`text-[11px] leading-relaxed transition-colors ${
                          isActive ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Fallback Layout */}
          <motion.div 
            className="md:hidden flex flex-col gap-6 relative w-full"
            variants={dialVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500/50 via-cyan-500/10 to-transparent z-0" />
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              return (
                <motion.div 
                  key={step.id} 
                  variants={stepNodeVariants}
                  className="flex items-start gap-4 relative z-10 cursor-pointer"
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 ${
                    isActive 
                      ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)]' 
                      : 'bg-[#0F1A30] text-slate-300 border border-cyan-500/30'
                  }`}>
                    0{step.id}
                  </div>
                  <div className={`backdrop-blur-xl border rounded-2xl p-5 flex-1 shadow-lg transition-all duration-300 ${
                    isActive ? 'bg-[#0F1A30]/95 border-cyan-500/50 ring-1 ring-cyan-500/20' : 'bg-[#0B1528]/80 border-white/10'
                  }`}>
                    <div className="flex items-center gap-3 mb-2 text-cyan-400">
                      {step.icon}
                      <h4 className="text-base font-bold text-white">{step.title}</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right: Header Section */}
        <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col items-start text-left lg:pl-4 xl:pl-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">How it works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Six steps.<br className="hidden lg:block" /> One <span className="text-cyan-400">workspace.</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
            No portals, no spreadsheets, no scattered interview notes. The entire hiring lifecycle for your next engineer lives in one unified thread.
          </p>
        </div>

      </div>
    </div>
  )
}

