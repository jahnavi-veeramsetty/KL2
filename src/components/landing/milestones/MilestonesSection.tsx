

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Original data array
const initialMilestones = [
  {
    id: 1,
    title: "10,000+ Placements",
    subtitle: "Across Top Tech Giants",
    description: "Our rigorous curriculum and proof-of-work approach have successfully bridged the gap for thousands of engineers, placing them in highly coveted roles across the globe.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-600/40"
  },
  {
    id: 2,
    title: "Global Hackathon",
    subtitle: "Winner of Web3 Summit '25",
    description: "KLM students dominated the international stage, taking home the grand prize with an innovative decentralized exchange built from scratch during our intense bootcamp phase.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-purple-600/40"
  },
  {
    id: 3,
    title: "50+ Masterclasses",
    subtitle: "Taught by Industry Veterans",
    description: "We've partnered with senior engineers from MAANG companies to deliver exclusive masterclasses, giving our network unparalleled insights into enterprise-scale architecture.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-emerald-600/40"
  }
];

export default function MilestonesSection() {
  // We track the array of milestones to allow them to swap order.
  // The milestone at index [0] is always the large featured card on the left.
  const [milestones, setMilestones] = useState(initialMilestones);

  // Function to move a clicked card to the featured position (index 0)
  const handleSwap = (clickedId: number) => {
    setMilestones(prev => {
      const clickedIndex = prev.findIndex(m => m.id === clickedId);
      if (clickedIndex === 0) return prev; // Already featured
      
      const newArray = [...prev];
      // Swap the featured card (index 0) with the clicked card
      const temp = newArray[0];
      newArray[0] = newArray[clickedIndex];
      newArray[clickedIndex] = temp;
      
      return newArray;
    });
  };

  return (
    <section className="relative z-10 w-full py-12 lg:py-16 bg-transparent flex flex-col justify-center min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Heading */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center text-center relative w-full">
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
              Milestones That Matter
            </h2>
            {/* Natural organic glow behind the text */}
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-[2px] bg-white blur-[2px] opacity-60" />
          </motion.div>
        </div>

        {/* 3D Swapping Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[750px] lg:h-[450px] w-full">
          {milestones.map((milestone, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                layout
                key={milestone.id}
                onClick={() => handleSwap(milestone.id)}
                className={`group relative overflow-hidden rounded-[2rem] cursor-pointer transition-shadow border border-white/10 shadow-2xl ${
                  isFeatured 
                    ? "lg:col-span-8 row-span-2 lg:row-span-2 bg-[#000511]" 
                    : "lg:col-span-4 row-span-1 lg:row-span-1 bg-white/5 hover:bg-white/10"
                }`}
                // Spring physics for the fluid swapping animation
                transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
              >
                {/* Image Setup (Only prominent on featured card) */}
                <div className="absolute inset-0 z-0 bg-[#000511]">
                  <motion.img 
                    layout="position"
                    src={milestone.image} 
                    alt={milestone.title}
                    className={`w-full h-full object-cover transition-[opacity,filter,transform] duration-700 ease-in-out ${
                      isFeatured ? "opacity-60 scale-100" : "opacity-20 scale-105 grayscale blur-[1px] group-hover:opacity-40 group-hover:grayscale-0"
                    }`}
                  />
                  {/* Gradients */}
                  {isFeatured && (
                    <div className={`absolute inset-0 bg-gradient-to-t ${milestone.color} to-transparent mix-blend-overlay opacity-80`} />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isFeatured ? 'from-[#000511] via-[#000511]/40' : 'from-[#000511] via-[#000511]/80'} to-transparent`} />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
                  
                  {/* Icon/Arrow indicating interactivity */}
                  <motion.div layout="position" className="absolute top-6 right-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isFeatured ? 'bg-white/10' : 'bg-brand-primary/20 border border-brand-primary/40 group-hover:bg-brand-primary/40 group-hover:scale-110'}`}>
                       <ArrowUpRight className={`w-5 h-5 ${isFeatured ? 'text-white' : 'text-brand-tertiary group-hover:text-white'}`} />
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="mt-auto max-w-2xl">
                    <h4 className={`text-brand-tertiary font-bold tracking-widest uppercase transition-all ${isFeatured ? 'text-sm mb-3' : 'text-[10px] mb-2'}`}>
                      {milestone.subtitle}
                    </h4>
                    
                    <motion.h3 
                      layout="position"
                      className={`font-black text-white leading-tight ${isFeatured ? 'text-3xl md:text-5xl mb-4' : 'text-xl md:text-2xl'}`}
                    >
                      {milestone.title}
                    </motion.h3>

                    {/* Expandable Paragraph only on Featured */}
                    <AnimatePresence>
                      {isFeatured && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium">
                            {milestone.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
