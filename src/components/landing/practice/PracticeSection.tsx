

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fullCode = `function solveChallenge(input) {\n  // Optimize for O(n) time complexity\n  const map = new Map();\n  for (let num of input) {\n    if (map.has(target - num)) {\n      return [map.get(target - num), num];\n    }\n    map.set(num, true);\n  }\n  return [];\n}\n\n// All test cases passed! ✨`;

export default function PracticeSection() {
  const [codeText, setCodeText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(fullCode.slice(0, i));
      i++;
      if (i > fullCode.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

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

  const formatCode = (code: string) => {
    return code
      .replace(/\b(function|const|let|for|if|return|new)\b/g, '<span class="text-pink-400">$&</span>')
      .replace(/\b(Map|has|get|set)\b/g, '<span class="text-blue-400">$&</span>')
      .replace(/(\/\/.*)/g, '<span class="text-green-400/70">$&</span>');
  };

  return (
    <section id="practice" className="relative z-10 w-full py-24 lg:py-32 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-tertiary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(70,110,255,0.2)] backdrop-blur-sm">
              Hands-On Learning
            </motion.div>
            
            <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Practice makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tertiary to-brand-primary drop-shadow-[0_0_15px_rgba(70,110,255,0.4)]">perfect.</span>
            </motion.h3>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-brand-neutral/70 leading-relaxed font-medium mb-8 max-w-lg">
              Don&apos;t just watch videos. Dive into our interactive coding environments and solve real-world engineering challenges. Build your muscle memory and conquer technical interviews.
            </motion.p>

            <motion.ul variants={containerVariants} className="flex flex-col gap-4 mb-8">
              {["Real-world engineering scenarios", "Instant automated feedback", "Performance and complexity analysis"].map((item, idx) => (
                <motion.li key={idx} variants={itemVariants} className="flex items-center gap-3 text-sm text-brand-neutral/80">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/40">
                    <svg className="w-3 h-3 text-brand-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.button variants={itemVariants} className="px-6 py-3 rounded-lg bg-brand-primary/10 text-brand-tertiary font-bold border border-brand-primary/30 hover:bg-brand-primary/20 transition-colors">
              Start Practicing
            </motion.button>
          </motion.div>

          {/* Right Editor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_50px_rgba(70,110,255,0.15)]"
          >
            {/* Editor Header */}
            <div className="flex items-center px-4 py-3 bg-[#171717] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-brand-neutral/40">twoSum.js</div>
            </div>
            {/* Editor Body */}
            <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto min-h-[300px]">
              <pre className="text-brand-neutral/80 whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: formatCode(codeText) }} />
                <span className="inline-block w-2 h-5 bg-white/50 animate-pulse align-middle ml-1" />
              </pre>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
