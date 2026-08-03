

import { motion } from "framer-motion";

const TUTORIALS = [
  {
    id: 1,
    title: "Understanding React Server Components",
    category: "React",
    time: "5 min read",
  },
  {
    id: 2,
    title: "Dockerizing a Node.js Application",
    category: "DevOps",
    time: "8 min read",
  },
  {
    id: 3,
    title: "Mastering CSS Grid Layouts",
    category: "CSS",
    time: "6 min read",
  },
  {
    id: 4,
    title: "Building a REST API with Go",
    category: "Backend",
    time: "10 min read",
  }
];

export default function TutorialSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section id="tutorials" className="relative z-10 w-full py-24 lg:py-32 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            className="max-w-xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-tertiary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(70,110,255,0.2)] backdrop-blur-sm">
              Quick Guides
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Bite-sized <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tertiary to-brand-primary drop-shadow-[0_0_15px_rgba(70,110,255,0.4)]">Tutorials</span>
            </h3>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand-tertiary hover:text-white transition-colors flex items-center gap-2"
          >
            View all tutorials
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>

        {/* Tutorials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TUTORIALS.map((tutorial) => (
            <motion.div
              key={tutorial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 p-5 flex flex-col cursor-pointer transition-all duration-300 overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="w-8 h-8 rounded bg-brand-primary/20 flex items-center justify-center text-brand-tertiary border border-brand-primary/20">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-neutral/50">
                  {tutorial.category}
                </span>
              </div>
              
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-brand-tertiary transition-colors relative z-10" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {tutorial.title}
              </h4>
              
              <div className="mt-auto pt-4 relative z-10">
                <span className="text-xs text-brand-neutral/40 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tutorial.time}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
