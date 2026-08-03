

import { motion } from "framer-motion";

const COURSES = [
  {
    id: 1,
    title: "Advanced Full-Stack Engineering",
    description: "Master modern web development from backend architecture to scalable frontends. Learn Next.js, Node.js, and system design.",
    level: "Advanced",
    duration: "12 Weeks",
    tag: "Most Popular",
  },
  {
    id: 2,
    title: "Cloud Infrastructure & DevOps",
    description: "Deploy and scale applications with Kubernetes, Docker, and AWS. Build CI/CD pipelines for high-availability systems.",
    level: "Intermediate",
    duration: "8 Weeks",
    tag: "New",
  },
  {
    id: 3,
    title: "System Design for Scale",
    description: "Architect systems that handle millions of users. Deep dive into distributed systems, caching, and database scaling.",
    level: "Advanced",
    duration: "10 Weeks",
    tag: "Premium",
  }
];

export default function CourseSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="courses" className="relative z-10 w-full py-24 lg:py-32 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-tertiary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(70,110,255,0.2)] backdrop-blur-sm">
            Curriculum
          </motion.div>
          <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Industry-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tertiary to-brand-primary drop-shadow-[0_0_15px_rgba(70,110,255,0.4)]">Courses</span>
          </motion.h3>
          <motion.p variants={itemVariants} className="text-brand-neutral/70 max-w-2xl mx-auto text-base md:text-lg">
            Curated programs designed by industry veterans to take you from a junior developer to a senior engineer.
          </motion.p>
        </motion.div>

        {/* Course Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {COURSES.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group rounded-2xl bg-[#030e21] border border-white/10 p-6 flex flex-col h-full overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-brand-primary/20 text-brand-tertiary border border-brand-primary/30">
                  {course.tag}
                </span>
                <span className="text-xs text-brand-neutral/50 font-medium">
                  {course.duration}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-3 relative z-10" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {course.title}
              </h4>
              <p className="text-sm text-brand-neutral/60 mb-8 flex-grow relative z-10">
                {course.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
                <span className="text-xs font-semibold text-brand-neutral/80">
                  {course.level}
                </span>
                <button className="text-sm font-bold text-brand-tertiary group-hover:text-white transition-colors flex items-center gap-2">
                  View Syllabus
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
