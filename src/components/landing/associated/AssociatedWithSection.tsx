

import { motion, type Variants } from "framer-motion";
import taskImg from "../../../assets/task.png";
import wehubImg from "../../../assets/wehub.png";
import govImg from "../../../assets/gov.png";

export default function AssociatedWithSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const associations = [
    { id: 1, name: "TASK", image: taskImg, color: "from-blue-500 to-cyan-400" },
    { id: 2, name: "WE HUB", image: wehubImg, color: "from-amber-400 to-orange-500" },
    { id: 3, name: "Government of Telangana", image: govImg, color: "from-emerald-400 to-teal-500" },
  ];

  return (
    <section id="associated-with-section" className="relative z-10 w-full pt-8 pb-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col items-center justify-center text-center relative w-full">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-tertiary text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(70,110,255,0.15)]"
          >
            Network
          </motion.div>

          {/* Glowing Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative inline-block"
          >
            <h2 
              className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-[#1E4ED8] bg-clip-text text-transparent pb-2"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Associated With
            </h2>
            <div 
              className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-white to-[#1E4ED8] rounded-full"
              aria-hidden="true"
            />
          </motion.div>

          {/* Clean, natural glowing line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-sm h-[1px] mt-4 bg-gradient-to-r from-transparent via-[#4F84FF] to-transparent relative"
          >
            {/* Subtle optical flare on the line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-[2px] bg-white blur-[2px] opacity-60" />
          </motion.div>
        </div>

        {/* 3 Premium Glass Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {associations.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative h-48 md:h-56 rounded-2xl border border-[#1e293b] bg-[#0f172a]/40 overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 hover:border-brand-primary/50 shadow-lg"
            >
              {/* White Inner Card */}
              <div className="w-full h-full bg-[#f8fafc] rounded-xl flex items-center justify-center p-6 md:p-8 transition-transform duration-500 group-hover:scale-[1.02]">
                 <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
