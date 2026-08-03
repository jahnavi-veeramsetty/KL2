

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import StarfieldBackground from "../../components/landing/StarfieldBackground";

export default function Signup() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && id && password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#000511] flex p-4 md:p-8 relative overflow-hidden font-sans">

      {/* Interactive Network Background */}
      <StarfieldBackground />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Liquid Background Orbs */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-primary/20 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] filter blur-[100px] animate-[spin_20s_linear_infinite] z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#466eff]/10 rounded-[60%_40%_30%_70%/50%_40%_60%_50%] filter blur-[120px] animate-[spin_25s_linear_infinite_reverse] z-0 pointer-events-none" />

      {/* Slanted Glass Accent Panels */}
      <div className="absolute top-[20%] left-[10%] w-[120%] h-32 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -rotate-45 pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[15%] w-[120%] h-64 bg-gradient-to-r from-transparent via-[#466eff]/[0.02] to-transparent -rotate-45 pointer-events-none z-0" />

      {/* --- BACK BUTTON --- */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group z-30 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,253,240,0.2)]"
        aria-label="Back to Home"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      <div className="w-full flex max-w-7xl mx-auto h-full items-center justify-center md:justify-end z-10 gap-12">
        {/* --- FORM CARD --- */}
        <div className="w-full max-w-[380px] animate-fade-slide-up opacity-0-init">
          {/* Liquid Glass Card */}
          <div className="relative p-6 md:p-8 rounded-[2rem] bg-[#000918]/60 backdrop-blur-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/[0.08] overflow-hidden group/card transition-all duration-700 hover:shadow-[0_20px_64px_rgba(255,253,240,0.1)] hover:border-white/[0.12] hover:bg-[#000918]/70">

            {/* Ambient Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50 opacity-60 pointer-events-none mix-blend-overlay" />

            {/* Shimmer Highlight Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#466eff]/50 to-transparent opacity-70" />

            {/* Decorative Corner Refraction */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#466eff]/20 rounded-full blur-2xl pointer-events-none group-hover/card:bg-[#466eff]/30 transition-colors duration-700" />

            <div className="relative z-10 text-center mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-1.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Create Account
              </h1>
              <p className="text-brand-neutral/50 text-xs">
                Join KLM and start mastering new skills today
              </p>
            </div>

            <form onSubmit={handleSignup} className="relative z-10 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-brand-neutral/70 ml-1" htmlFor="signup-name">
                  Full Name
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#466eff]/40 to-brand-tertiary/40 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500" />
                  <input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="relative w-full bg-[#00040a]/80 border border-white/[0.1] rounded-2xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-[#00040a] transition-all duration-300 backdrop-blur-md shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-brand-neutral/70 ml-1" htmlFor="signup-id">
                  User ID / Email
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#466eff]/40 to-brand-tertiary/40 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500" />
                  <input
                    id="signup-id"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter your ID or Email"
                    className="relative w-full bg-[#00040a]/80 border border-white/[0.1] rounded-2xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-[#00040a] transition-all duration-300 backdrop-blur-md shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-brand-neutral/70 ml-1" htmlFor="signup-password">
                  Password
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#466eff]/40 to-brand-tertiary/40 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500" />
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="relative w-full bg-[#00040a]/80 border border-white/[0.1] rounded-2xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-[#00040a] transition-all duration-300 backdrop-blur-md shadow-inner"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full relative overflow-hidden group/btn py-3.5 px-4 rounded-2xl font-bold text-[#00040a] text-sm transition-all duration-500 focus:outline-none mt-4 shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover/btn:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00040a]/0 via-[#00040a]/20 to-[#00040a]/0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] skew-x-12" />
                <span className="relative z-10 tracking-wide">Sign Up</span>
              </button>
            </form>

            <div className="relative z-10 mt-6 text-center text-xs text-brand-neutral/50">
              Already have an account?{" "}
              <Link to="/?auth=login" className="text-white hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
