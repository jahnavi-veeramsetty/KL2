import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import telanganaMap from "../../../assets/telangana.png";

const DISTRICTS = [
  { id: "hyderabad", name: "Hyderabad", x: 45, y: 55 },
  { id: "warangal", name: "Warangal", x: 62, y: 45 },
  { id: "karimnagar", name: "Karimnagar", x: 55, y: 32 },
  { id: "nizamabad", name: "Nizamabad", x: 35, y: 30 },
  { id: "khammam", name: "Khammam", x: 72, y: 60 },
  { id: "nalgonda", name: "Nalgonda", x: 58, y: 64 },
  { id: "mahbubnagar", name: "Mahbubnagar", x: 38, y: 72 },
  { id: "adilabad", name: "Adilabad", x: 48, y: 26 },
];

export default function CollegeCollaborationsSection() {
  return (
    <section className="relative z-10 w-full py-16 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="inline-flex px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-tertiary text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(70,110,255,0.15)] self-start">
              Regional Reach
            </div>
            
            <h2 
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Expanding Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tertiary to-brand-primary drop-shadow-[0_0_15px_rgba(70,110,255,0.4)]">Telangana</span>
            </h2>
            
            <p className="text-brand-neutral/70 text-base md:text-lg mb-10 leading-relaxed">
              We are partnering with top engineering colleges across the state to bring world-class, industry-grade curriculum directly to students.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Stat 1 */}
              <div className="bg-[#020817]/60 border border-brand-primary/20 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(70,110,255,0.05)] relative overflow-hidden group hover:border-brand-primary/40 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-tertiary mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-4xl font-black text-white mb-1 tracking-tight">50<span className="text-brand-tertiary">+</span></div>
                <div className="text-xs text-brand-neutral/60 font-bold uppercase tracking-wider">Partner Colleges</div>
              </div>

              {/* Stat 2 */}
              <div className="bg-[#020817]/60 border border-brand-primary/20 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(70,110,255,0.05)] relative overflow-hidden group hover:border-brand-primary/40 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-tertiary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="w-12 h-12 rounded-xl bg-brand-tertiary/10 border border-brand-tertiary/30 flex items-center justify-center text-brand-tertiary mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-4xl font-black text-white mb-1 tracking-tight">10k<span className="text-brand-tertiary">+</span></div>
                <div className="text-xs text-brand-neutral/60 font-bold uppercase tracking-wider">Students Reached</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Map Image with Overlays */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full relative flex items-center justify-center"
          >
            {/* Glowing backdrop for the map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative w-full max-w-[400px]">
              <img 
                src={telanganaMap} 
                alt="Telangana Map" 
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(70,110,255,0.4)] opacity-90"
              />
              
              {/* District Overlays */}
              {DISTRICTS.map((district, idx) => (
                <div
                  key={district.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  style={{ left: `${district.x}%`, top: `${district.y}%` }}
                >
                  {/* Pulse Effect */}
                  <motion.div 
                    className="absolute inset-[-6px] rounded-full bg-brand-tertiary/40"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  />
                  
                  {/* Dot */}
                  <div className="relative w-2 h-2 rounded-full bg-brand-tertiary shadow-[0_0_10px_#466eff] border border-white" />
                  
                  {/* Label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black/80 backdrop-blur-sm border border-brand-primary/30 text-[9px] font-bold tracking-widest uppercase whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                    {district.name}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
