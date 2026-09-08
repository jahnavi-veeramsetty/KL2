import React from 'react'
import { motion } from 'framer-motion'

export default function WhySelect() {
  return (
    <div className="py-24 md:py-32 max-w-7xl mx-auto px-6 overflow-hidden border-t border-slate-800/30">
      
      {/* Header Section */}
      <div className="mb-16 md:mb-20">
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1528] border border-[#1E293B] mb-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="text-[10px] font-bold text-slate-300 tracking-[0.15em] uppercase">Relevance</span>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight mb-6 text-white max-w-3xl leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Built for precision,<br /> <span className="text-cyan-400">not volume.</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-slate-400 leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Stop sifting through endless profiles. Post a role and get relevant, vetted candidates — not an entire database.
        </motion.p>
      </div>

      {/* Comparison Section */}
      <div className="relative flex flex-col md:flex-row items-stretch gap-8 md:gap-0 mb-16">
        
        {/* VS Divider (Center) */}
        <div className="hidden md:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex-col items-center justify-center z-20">
          <div className="w-[1px] h-full bg-[#1E293B]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#000511] border border-[#1E293B] flex items-center justify-center text-xs font-bold text-slate-300 z-10 shadow-xl">
            VS
          </div>
        </div>

        {/* Left Card: Other Platforms */}
        <motion.div 
          className="flex-1 md:pr-10 lg:pr-14 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#080D18] rounded-[24px] p-6 lg:p-10 border border-[#1E293B] h-full relative overflow-hidden flex flex-col shadow-lg">
            <h3 className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-10 relative z-10">
              Other Platforms
            </h3>
            
            <div className="flex-1 flex w-full relative z-10 h-[220px]">
              
              {/* Text & Lines */}
              <div className="w-[40%] flex flex-col justify-between py-6">
                {[
                  ['Massive', 'databases'],
                  ['Manual', 'filtering'],
                  ['Time', 'consuming']
                ].map((lines, i) => (
                  <div key={i} className="flex items-center w-full">
                    <div className="text-[12px] font-medium text-slate-500 leading-snug w-20">
                      {lines[0]}<br/>{lines[1]}
                    </div>
                    <div className="flex-1 h-[1px] bg-slate-800 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Stacked Cards */}
              <div className="w-[60%] relative pl-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute rounded-xl bg-[#0F172A] border border-white/5"
                    style={{
                      width: '100%',
                      maxWidth: '250px',
                      height: '130px',
                      top: `${10 + i * 10}px`,
                      right: `${(4 - i) * 12}px`,
                      opacity: 0.2 + (0.15 * i),
                      zIndex: i
                    }}
                  />
                ))}
                {/* Foreground Card */}
                <div 
                  className="absolute rounded-xl bg-[#182132] border border-white/10 p-5 shadow-2xl z-10"
                  style={{
                    width: '100%',
                    maxWidth: '250px',
                    height: '130px',
                    top: '50px',
                    right: '0px',
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#334155]/30 flex flex-col items-center justify-end overflow-hidden pt-2">
                      <div className="w-4 h-4 rounded-full bg-[#64748B] mb-1"></div>
                      <div className="w-7 h-5 rounded-t-full bg-[#64748B]"></div>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="h-2 w-20 bg-[#475569] rounded-full"></div>
                      <div className="h-1.5 w-28 bg-[#334155] rounded-full"></div>
                      <div className="h-1 w-16 bg-[#1E293B] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'Backend', '8+ yrs', '...'].map((tag, i) => (
                      <div key={i} className="px-3 py-1 rounded-full bg-[#0F172A] text-[9px] font-medium text-[#94A3B8]">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Card: Select */}
        <motion.div 
          className="flex-1 md:pl-10 lg:pl-14 relative mt-8 md:mt-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-[#06182C] to-[#0A101C] rounded-[24px] p-6 lg:p-10 border border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.1)] h-full relative overflow-hidden flex flex-col z-10">
            
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-10 relative z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 19h6l3-6 3 6h6L12 2z" fill="#22d3ee" />
              </svg>
              <h3 className="text-[13px] font-bold text-white tracking-[0.3em] uppercase mt-0.5">
                Select
              </h3>
            </div>
            
            <div className="flex-1 flex w-full relative z-10 h-[220px]">
              
              {/* Text & Lines */}
              <div className="w-[40%] flex flex-col justify-between py-6">
                {[
                  ['Role-specific', 'matching'],
                  ['Vetted for', 'real skills'],
                  ['Ready to', 'move forward']
                ].map((lines, i) => (
                  <div key={i} className="flex items-center w-full">
                    <div className="text-[12px] font-medium text-[#CBD5E1] leading-snug w-24">
                      {lines[0]}<br/>{lines[1]}
                    </div>
                    <div className="flex-1 h-[1px] bg-cyan-500/30 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Stacked Cards */}
              <div className="w-[60%] relative pl-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute rounded-xl border border-cyan-500/20 bg-[#0F1C36]/80 backdrop-blur-sm"
                    style={{
                      width: '100%',
                      maxWidth: '250px',
                      height: '130px',
                      top: `${10 + i * 12}px`,
                      right: `${(3 - i) * 12}px`,
                      opacity: 0.3 + (0.2 * i),
                      zIndex: i
                    }}
                  />
                ))}
                {/* Foreground Card */}
                <div 
                  className="absolute rounded-xl border border-cyan-500/40 bg-gradient-to-br from-[#122440] to-[#0A1224] p-5 shadow-[0_20px_40px_-15px_rgba(34,211,238,0.3)] z-10"
                  style={{
                    width: '100%',
                    maxWidth: '250px',
                    height: '130px',
                    top: '46px',
                    right: '0px',
                  }}
                >
                  <div className="absolute top-4 right-4 w-[22px] h-[22px] rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A1224" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#164E63]/40 flex flex-col items-center justify-end overflow-hidden pt-2 border border-cyan-500/30">
                      <div className="w-4 h-4 rounded-full bg-[#A5F3FC] mb-1"></div>
                      <div className="w-7 h-5 rounded-t-full bg-[#A5F3FC]"></div>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="h-2 w-20 bg-[#67E8F9] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]"></div>
                      <div className="h-1.5 w-28 bg-[#155E75] rounded-full"></div>
                      <div className="h-1 w-16 bg-[#083344] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'AWS', 'System Design'].map((tag, i) => (
                      <div key={i} className="px-3 py-1 rounded-full bg-[#0F172A] border border-[#1E293B] text-[9px] font-semibold text-[#CBD5E1]">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer Stats Row */}
      <motion.div 
        className="pt-10 border-t border-[#1E293B] flex items-center justify-between overflow-x-auto no-scrollbar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between w-full min-w-[700px]">
          {[
            { text: "Save time", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> },
            { text: "Higher quality", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> },
            { text: "Faster hiring", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
            { text: "Stronger teams", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> }
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center justify-center gap-3">
                <div className="text-slate-400">
                  {item.icon}
                </div>
                <span className="text-[13px] font-semibold text-[#CBD5E1]">{item.text}</span>
              </div>
              {i < 3 && <div className="w-[1px] h-6 bg-[#1E293B]"></div>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
