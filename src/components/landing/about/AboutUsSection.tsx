

import { motion } from "framer-motion";
import EcosystemHub from "./EcosystemHub";

export default function AboutUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };


  return (
    <section id="about-us-section" className="relative z-10 w-full flex flex-col justify-center overflow-x-hidden bg-transparent py-16 lg:py-20">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">

          {/* Left Column: Text Content (takes 6 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            className="flex flex-col items-start pointer-events-auto lg:col-span-6 z-20"
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-tertiary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(70,110,255,0.2)] backdrop-blur-sm">
              The Core Mission
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-6 tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Built by engineers, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tertiary to-brand-primary drop-shadow-[0_0_15px_rgba(70,110,255,0.4)] relative inline-block">
                for engineers.
                <motion.span 
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-brand-tertiary to-transparent origin-left blur-[1px]"
                />
              </span>
            </motion.h3>

            <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-brand-primary to-transparent mb-6" />

            <motion.p variants={itemVariants} className="text-base md:text-lg text-brand-neutral/70 leading-relaxed font-medium mb-8 max-w-lg">
              We are bridging the gap between learning and getting hired.
              At KLM, proof of work speaks louder than a traditional resume.
              Learn cutting-edge skills, compete with the best, and win career-defining opportunities.
            </motion.p>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-white font-bold tracking-wider hover:text-brand-tertiary transition-colors relative overflow-hidden pr-4"
            >
              <span className="uppercase text-xs md:text-sm relative z-10">Join the Network</span>
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-tertiary group-hover:translate-x-2 transition-all duration-300 relative z-10 bg-black/20 backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-brand-tertiary/20 to-transparent z-0" />
            </motion.button>
          </motion.div>

          {/* Right Column: Ecosystem Hub (takes 6 columns) */}
          <div className="relative w-full aspect-square max-h-[500px] max-w-[500px] mx-auto flex items-center justify-center lg:col-span-6 pointer-events-none lg:translate-x-4 mt-8 lg:mt-0">
            <EcosystemHub />
          </div>

        </div>
      </div>
    </section>
  );
}
