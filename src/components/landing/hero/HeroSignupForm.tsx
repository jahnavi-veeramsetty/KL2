

import { useState, type FormEvent, type ChangeEvent } from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  interest: string;
}

const INTEREST_OPTIONS = [
  "Web Development",
  "Data Science & AI",
  "Product Management",
  "UX / Design",
  "Cloud & DevOps",
  "Cybersecurity",
  "Finance & Investing",
  "Other",
] as const;

/* ─────────────────────────────────────────────
   Glass Input
───────────────────────────────────────────── */
interface GlassInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}

function GlassInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
}: GlassInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-semibold tracking-wide text-brand-neutral/60 uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="input-glass w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm placeholder:text-white/40 transition-all duration-200 ease-in-out focus:bg-white/10 focus:border-white/20"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Glass Select
───────────────────────────────────────────── */
interface GlassSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  required?: boolean;
}

function GlassSelect({ id, label, value, onChange, options, required }: GlassSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-semibold tracking-wide text-brand-neutral/60 uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="input-glass w-full px-3 py-2 pr-8 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm appearance-none cursor-pointer transition-all duration-200 ease-in-out focus:bg-white/10 focus:border-white/20"
          style={{ colorScheme: "dark" }}
        >
          <option value="" disabled className="bg-[#001240]">
            Select a topic…
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#001240]">
              {opt}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-neutral/40 pointer-events-none"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Success State
───────────────────────────────────────────── */
function SuccessState({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-6 animate-fade-in">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/60 border border-brand-tertiary/30">
        <svg
          className="w-8 h-8 text-brand-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <span className="absolute inset-0 rounded-full animate-ping bg-brand-tertiary/20" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xl font-bold text-brand-neutral" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          You&apos;re on the list, {name.split(" ")[0]}! 🎉
        </p>
        <p className="text-sm text-brand-secondary mt-2 max-w-xs mx-auto">
          We&apos;ll send your personalised learning path to your inbox shortly.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HeroSignupForm
───────────────────────────────────────────── */
export default function HeroSignupForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    interest: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      className="bg-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden animate-float-card"
      role="region"
      aria-label="Get started with KLM"
    >
      {/* Card inner glow ring */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" aria-hidden="true">
        <div className="absolute inset-[1px] rounded-2xl border border-white/8" />
      </div>

      {/* Header stripe */}
      <div className="relative px-5 pt-5 pb-3 border-b border-white/8">
        {/* Gradient accent bar */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-brand-tertiary/60 to-transparent"
          aria-hidden="true"
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-tertiary/70 mb-1">
          Start for free
        </p>
        <h2
          className="text-xl font-bold text-brand-neutral"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Begin your learning journey
        </h2>
        <p className="text-xs text-brand-secondary mt-1">
          Personalised path in minutes.
        </p>
      </div>

      <div className="px-5 py-3">
        {submitted ? (
          <SuccessState name={form.name || "there"} />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5">
            <GlassInput
              id="signup-name"
              label="Full name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Usha Sree"
              required
              autoComplete="name"
            />

            <GlassInput
              id="signup-email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="usha@example.com"
              required
              autoComplete="email"
            />

            <GlassSelect
              id="signup-interest"
              label="What do you want to learn?"
              value={form.interest}
              onChange={handleChange("interest")}
              options={INTEREST_OPTIONS}
              required
            />

            {/* Submit */}
            <button
              id="hero-signup-submit"
              type="submit"
              disabled={loading}
              className="relative mt-1 w-full h-10 flex items-center justify-center gap-2 rounded-lg text-sm font-bold tracking-wide text-white overflow-hidden group bg-gradient-to-r from-[#0A44B0] to-[#2563EB] border border-[#3B82F6]/40 hover:brightness-110 hover:scale-[1.015] hover:-translate-y-px hover:shadow-xl hover:shadow-[#2563EB]/40 active:scale-[0.98] active:brightness-100 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary/60 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              {/* Star glow overlay */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                aria-hidden="true"
              />
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 text-white/80"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z" />
                  </svg>
                  <span>Setting up your path…</span>
                </>
              ) : (
                <>
                  <span>Get my personalised path</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
