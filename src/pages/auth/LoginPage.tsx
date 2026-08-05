import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KeyRound, Smartphone } from "lucide-react";

import StarfieldBackground from "../../components/landing/StarfieldBackground";
import { SocialAuthButtons, type AuthProvider } from "../../components/auth/SocialAuthButtons";
import { ROUTES } from "../../constants/routes";
import { signIn } from "../../lib/auth";
import { cn } from "../../lib/cn";

/* Shared field styling — repeated across five inputs, so it lives here once. */
const LABEL = "block text-xs font-medium text-brand-neutral/70 ml-1";
const INPUT =
  "relative w-full bg-[#00040a]/80 border border-white/[0.1] rounded-2xl px-4 py-2.5 md:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-[#00040a] transition-all duration-300 backdrop-blur-md shadow-inner";
const GLOW =
  "absolute -inset-0.5 bg-gradient-to-r from-[#466eff]/40 to-brand-tertiary/40 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500";

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full relative overflow-hidden group/btn py-3.5 px-4 rounded-2xl font-bold text-[#00040a] text-sm transition-all duration-500 focus:outline-none mt-4 shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]"
    >
      <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover/btn:scale-[1.03]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00040a]/0 via-[#00040a]/20 to-[#00040a]/0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] skew-x-12" />
      <span className="relative z-10 tracking-wide">{children}</span>
    </button>
  );
}

type Method = "password" | "phone";

export default function Login() {
  const [method, setMethod] = useState<Method>("password");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // RequireAuth stashes the blocked destination here, so someone who followed a
  // link to a course lands on that course instead of a generic dashboard.
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    ROUTES.DASHBOARD;

  // Single exit point for every method below.
  const completeLogin = () => {
    signIn();
    // replace: the login page must not sit in history behind the app
    navigate(from, { replace: true });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && password) completeLogin();
  };

  // MOCK: no SMS is sent. Any 10-digit number advances to the OTP step, and any
  // 6 digits are accepted as valid.
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length === 10) setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) completeLogin();
  };

  // MOCK: a real integration redirects to the provider and returns with a code.
  const handleProvider = (_provider: AuthProvider) => completeLogin();

  const switchMethod = (next: Method) => {
    setMethod(next);
    setOtpSent(false);
    setOtp("");
  };

  return (
    // on-dark: the auth screens are a deliberate dark experience in both
    // themes, so this subtree keeps dark tokens.
    <div className="on-dark min-h-[100dvh] bg-[#000511] flex p-4 md:p-8 relative font-sans">

      {/* Interactive Network Background */}
      <StarfieldBackground />

      {/* --- BACKGROUND EFFECTS ---
          Clipped as a group: the card is now tall enough to scroll on short
          screens, and unclipped decoration would drag the scroll height with it. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Liquid Background Orbs */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-primary/20 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] filter blur-[100px] animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#466eff]/10 rounded-[60%_40%_30%_70%/50%_40%_60%_50%] filter blur-[120px] animate-[spin_25s_linear_infinite_reverse]" />

        {/* Slanted Glass Accent Panels */}
        <div className="absolute top-[20%] left-[10%] w-[120%] h-32 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -rotate-45" />
        <div className="absolute top-[40%] left-[15%] w-[120%] h-64 bg-gradient-to-r from-transparent via-[#466eff]/[0.02] to-transparent -rotate-45" />
      </div>

      {/* --- BACK BUTTON --- */}
      <Link
        to="/"
        className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group z-30 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,253,240,0.2)]"
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

      {/* The upward bias is gated on viewport height: bottom padding adds to
          the height the page must fit, so applying it unconditionally forced a
          scrollbar on short screens even when the card itself fit. Above 800px
          there is guaranteed headroom for it. */}
      <div className="w-full flex max-w-7xl mx-auto items-center justify-center md:justify-end z-10 gap-12 py-4 [@media(min-height:800px)]:pb-24">
        {/* --- FORM CARD --- */}
        <div className="w-full max-w-[380px] animate-fade-slide-up opacity-0-init">
          {/* Liquid Glass Card */}
          <div className="relative p-5 md:p-8 rounded-3xl md:rounded-[2rem] bg-[#000918]/60 backdrop-blur-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/[0.08] overflow-hidden group/card transition-all duration-700 hover:shadow-[0_20px_64px_rgba(255,253,240,0.1)] hover:border-white/[0.12] hover:bg-[#000918]/70">

            {/* Ambient Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50 opacity-60 pointer-events-none mix-blend-overlay" />

            {/* Shimmer Highlight Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#466eff]/50 to-transparent opacity-70" />

            {/* Decorative Corner Refraction */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#466eff]/20 rounded-full blur-2xl pointer-events-none group-hover/card:bg-[#466eff]/30 transition-colors duration-700" />

            <div className="relative z-10 text-center mb-5">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-1.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Welcome Back
              </h1>
              <p className="text-brand-neutral/50 text-xs">
                Enter your credentials to access your account
              </p>
            </div>

            <SocialAuthButtons onProvider={handleProvider} label="or continue with" />

            {/* Method switch */}
            <div className="relative z-10 grid grid-cols-2 gap-1 p-1 mb-4 rounded-2xl bg-black/40 border border-white/[0.08]">
              {([
                { key: "password", label: "User ID", icon: KeyRound },
                { key: "phone", label: "Phone", icon: Smartphone },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => switchMethod(key)}
                  aria-pressed={method === key}
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300",
                    method === key
                      ? "bg-white/[0.12] text-white shadow-inner"
                      : "text-brand-neutral/50 hover:text-brand-neutral"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                  {label}
                </button>
              ))}
            </div>

            {method === "password" ? (
              <form onSubmit={handleLogin} className="relative z-10 space-y-4">
                <div className="space-y-1.5">
                  <label className={LABEL} htmlFor="login-id">
                    User ID
                  </label>
                  <div className="relative group/input">
                    <div className={GLOW} />
                    <input
                      id="login-id"
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="Enter your ID"
                      className={INPUT}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={LABEL} htmlFor="login-password">
                    Password
                  </label>
                  <div className="relative group/input">
                    <div className={GLOW} />
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={INPUT}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs px-1 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                    <div className="relative flex items-center justify-center w-4 h-4 rounded-md border border-white/20 bg-black/50 group-hover/checkbox:border-white/40 transition-colors backdrop-blur-sm overflow-hidden">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="absolute inset-0 bg-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#00040a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-brand-neutral/60 group-hover/checkbox:text-brand-neutral transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-white/60 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    Forgot password?
                  </a>
                </div>

                <SubmitButton>Log In</SubmitButton>
              </form>
            ) : (
              <form
                onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
                className="relative z-10 space-y-4"
              >
                <div className="space-y-1.5">
                  <label className={LABEL} htmlFor="login-phone">
                    Phone number
                  </label>
                  <div className="relative group/input">
                    <div className={GLOW} />
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-sm text-brand-neutral/60 pointer-events-none select-none">
                        +91
                      </span>
                      <input
                        id="login-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="98765 43210"
                        disabled={otpSent}
                        className={cn(INPUT, "pl-14 disabled:opacity-60")}
                        required
                      />
                    </div>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={LABEL} htmlFor="login-otp">
                        Verification code
                      </label>
                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setOtp(""); }}
                        className="text-[11px] text-white/60 hover:text-white transition-colors mr-1"
                      >
                        Change number
                      </button>
                    </div>
                    <div className="relative group/input">
                      <div className={GLOW} />
                      <input
                        id="login-otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="——————"
                        className={cn(INPUT, "text-center tracking-[0.5em] font-semibold")}
                        required
                      />
                    </div>
                    <p className="text-[11px] text-brand-neutral/40 text-center pt-1">
                      Code sent to +91 {phone}
                    </p>
                  </div>
                )}

                <SubmitButton>{otpSent ? "Verify & Log In" : "Send OTP"}</SubmitButton>
              </form>
            )}

            <div className="relative z-10 mt-6 text-center text-xs text-brand-neutral/50">
              Don't have an account?{" "}
              {/* Carry location.state across so a destination stashed by
                  RequireAuth survives switching to the signup form. */}
              <Link to={ROUTES.SIGNUP} state={location.state} className="text-white hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
