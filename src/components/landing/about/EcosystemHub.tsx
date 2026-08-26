

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Brain, Trophy, BookOpen, Rocket } from "lucide-react";
import { useState } from "react";
import noviImg from "../../../assets/novi.png";

// The Nodes
const nodes = [
  { id: "partners", icon: Briefcase, label: "Hiring Partners", stat: "300+", x: 300, y: 60, delay: 0 },
  { id: "mentors", icon: Brain, label: "Mentors", stat: "", x: 120, y: 160, delay: 0.2 },
  { id: "masterclasses", icon: BookOpen, label: "Masterclasses", stat: "50+", x: 480, y: 160, delay: 0.4 },
  { id: "competitions", icon: Trophy, label: "Competitions", stat: "", x: 120, y: 440, delay: 0.6 },
  { id: "projects", icon: Rocket, label: "Projects", stat: "", x: 480, y: 440, delay: 0.8 },
  { id: "students", icon: GraduationCap, label: "Students", stat: "250K+", x: 300, y: 540, delay: 1.0 },
];

// Connection lines
const lines = [
  { source: "students", target: "projects", path: "M 300 540 L 480 440" },
  { source: "projects", target: "core", path: "M 480 440 L 300 300" },
  { source: "core", target: "partners", path: "M 300 300 L 300 60" },
  { source: "students", target: "competitions", path: "M 300 540 L 120 440" },
  { source: "competitions", target: "core", path: "M 120 440 L 300 300" },
  { source: "core", target: "masterclasses", path: "M 300 300 L 480 160" },
  { source: "core", target: "mentors", path: "M 300 300 L 120 160" },
];

export default function EcosystemHub() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Check if a line should be highlighted based on hover storytelling
  const isLineActive = (source: string, target: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === "students") {
      // Story: Students -> Projects -> Core -> Partners
      return (
        (source === "students" && target === "projects") ||
        (source === "projects" && target === "core") ||
        (source === "core" && target === "partners")
      );
    }
    return source === hoveredNode || target === hoveredNode;
  };

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto pointer-events-auto">
      {/* SVG Connections & Data Packets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 600 600">
        <defs>
          <mask id="core-mask">
            <rect width="600" height="600" fill="white" />
            <circle cx="300" cy="300" r="60" fill="black" />
            {nodes.map(n => (
              <circle key={n.id} cx={n.x} cy={n.y} r="28" fill="black" />
            ))}
          </mask>
        </defs>

        <g mask="url(#core-mask)">
          {/* Base faint grid / stars */}
          <circle cx="300" cy="300" r="280" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" strokeDasharray="4 4" />

          {lines.map((line, i) => {
            const active = isLineActive(line.source, line.target);
            const dim = hoveredNode !== null && !active;

            return (
              <g key={i}>
                {/* Static Line */}
                <path
                  d={line.path}
                  stroke={active ? "rgba(96, 165, 250, 0.5)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={active ? 2 : 1.5}
                  fill="none"
                  className="transition-all duration-300"
                  style={{ opacity: dim ? 0.2 : 1 }}
                />

                {/* Data Packet (Animated along path) */}
                <motion.path
                  d={line.path}
                  stroke="#60A5FA" // Highlight color
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 0.2, 0],
                    pathOffset: [0, 0.8, 1],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Center Core: Knowvation */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10"
      >
        {/* Animated Pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-40 h-40 rounded-full blur-xl transition-colors duration-300 ${hoveredNode !== null ? 'bg-blue-500/40' : 'bg-blue-600/20'}`}
        />
        
        {/* Rotating Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute w-32 h-32 rounded-full border transition-all duration-300 ${hoveredNode !== null ? 'border-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.6)] border-t-white' : 'border-blue-500/30 border-t-blue-400'}`}
        />

        {/* Core Image */}
        <div className="w-28 h-28 flex items-center justify-center relative z-10 transition-all duration-300">
          <img src={noviImg} alt="Novi" className={`w-full h-full object-contain transition-all duration-300 ${hoveredNode !== null ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]'}`} />
        </div>
      </div>

      {/* Ecosystem Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        
        // A node is active if it's the hovered node, or if it's connected to the active path
        let isActive = false;
        if (hoveredNode === null) {
          isActive = true; // all active by default when nothing is hovered (but not "lit up")
        } else {
          // Check if this node is involved in any active line
          const isConnected = lines.some(line => 
            (line.source === node.id || line.target === node.id) && isLineActive(line.source, line.target)
          );
          isActive = hoveredNode === node.id || isConnected;
        }

        const isDim = hoveredNode !== null && !isActive;
        const isPathActive = hoveredNode !== null && isActive;

        return (
          <motion.div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              y: ["-3px", "3px", "-3px"],
            }}
            transition={{
              duration: 3 + node.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
            className={`absolute flex flex-col items-center group cursor-pointer transition-all duration-300 ${isDim ? 'opacity-30 blur-[1px]' : 'opacity-100 z-20'}`}
            style={{ 
              top: `${(node.y / 600) * 100}%`, 
              left: `${(node.x / 600) * 100}%`,
              transform: 'translate(-50%, -50%)' 
            }}
          >
            {/* The Floating Container */}
            <div className="absolute top-0 left-0 w-full h-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              
              {/* Stat Card attached to the node */}
              {node.stat && (
                <div className="absolute -top-10 flex flex-col items-center">
                  <span className={`text-xl md:text-2xl font-black drop-shadow-md transition-colors ${isPathActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {node.stat}
                  </span>
                </div>
              )}

              {/* The Node Icon Circle */}
              <div className={`w-12 h-12 rounded-full bg-slate-900 border flex items-center justify-center transition-all duration-300 ${isPathActive ? 'border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.6)]' : 'border-blue-900 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]'}`}>
                <Icon className={`w-5 h-5 transition-colors ${isPathActive ? 'text-white' : 'text-blue-200 group-hover:text-white'}`} />
              </div>

              {/* Node Label */}
              <span className={`mt-2 text-[10px] md:text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${isPathActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-slate-400 group-hover:text-white'}`}>
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
