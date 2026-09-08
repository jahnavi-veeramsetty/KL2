import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import communityImg from "../../../assets/community.jpg";

const testimonials = [
  { name: "Priya", text: "I loved how interactive the sessions were! ✨" },
  { name: "Rahul", text: "Found my dream study group here." },
  { name: "Sneha", text: "Landed an internship through a mentor! 🚀" },
  { name: "Arjun", text: "The best coding community. 💻" },
  { name: "Ananya", text: "Masterclasses are top notch." },
  { name: "Karthik", text: "So glad I joined!" },
  { name: "Pooja", text: "Building real projects with friends! 🛠️" },
  { name: "Ravi", text: "Such a supportive environment ❤️" },
  { name: "Neha", text: "Got my first freelance gig!" },
  { name: "Vikram", text: "The mock interviews helped so much." }
];

// Pre-calculate positions so they are stable across renders
const bubblePositions = testimonials.map(() => {
  // Try to push them away from the absolute center so they don't cover the main text
  let top = Math.random() * 80 + 10;
  let left = Math.random() * 80 + 10;

  // If too close to center (40-60%), push out
  if (top > 35 && top < 65 && left > 30 && left < 70) {
    if (Math.random() > 0.5) top = top > 50 ? top + 30 : top - 30;
    else left = left > 50 ? left + 35 : left - 35;
  }

  // Keep in bounds
  top = Math.max(10, Math.min(85, top));
  left = Math.max(5, Math.min(80, left));

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
});

export default function CommunitySection() {
  const [activeBubbles, setActiveBubbles] = useState<number[]>([]);

  useEffect(() => {
    // Start with a couple bubbles
    setActiveBubbles([0, 1, 2]);

    const interval = setInterval(() => {
      setActiveBubbles(current => {
        let next = [...current];

        // Remove a random bubble if we have more than 3
        if (next.length > 3) {
          const removeIdx = Math.floor(Math.random() * next.length);
          next.splice(removeIdx, 1);
        }

        // Add a random bubble if we don't have too many
        if (next.length < 6) {
          const available = testimonials.map((_, i) => i).filter(i => !next.includes(i));
          if (available.length > 0) {
            const addIdx = available[Math.floor(Math.random() * available.length)];
            next.push(addIdx);
          }
        }

        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[65vh] md:max-h-[700px] md:min-h-[550px] overflow-hidden flex items-center justify-center bg-[#000511]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={communityImg}
          alt="Community"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000511] via-[#000511]/20 to-[#000511] pointer-events-none" />
      </div>

      {/* Center Text */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pointer-events-none">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-white/40" />
          <span className="text-xs md:text-sm text-white/90 font-bold tracking-[0.2em] uppercase shadow-black drop-shadow-md">The Community</span>
          <div className="h-[1px] w-12 bg-white/40" />
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight drop-shadow-xl shadow-black">
          Life happens <br />
          <span className="italic font-serif text-brand-tertiary">together.</span>
        </h2>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {activeBubbles.map(idx => {
            const bubble = bubblePositions[idx];
            const testimonial = testimonials[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute px-5 py-3 max-w-[280px] shadow-2xl bg-[#EBEBE8] rounded-[24px] rounded-bl-none"
                style={{
                  top: bubble.top,
                  left: bubble.left,
                }}
              >
                <div className="text-[12px] font-bold text-gray-500 mb-1">
                  {testimonial.name}
                </div>
                <p className="text-[15px] font-medium text-gray-900 leading-[1.4] tracking-tight">
                  {testimonial.text}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
