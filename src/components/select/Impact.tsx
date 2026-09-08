export default function Impact() {
  const points = [
    "Fewer profiles that don't fit the role",
    "A shortlist you don't have to double-check",
    "Interviewers scoring against the same rubric",
    "One thread instead of five tools",
    "Less back-and-forth to reach a decision",
  ]

  return (
    <div className="py-24 max-w-3xl mx-auto px-6">
      <div className="mb-12">
        <span className="text-sm font-medium text-accent mb-3 block">Impact</span>
        <h2 className="text-3xl md:text-4xl font-bold text-strong tracking-tight">
          Less time filtering. More time deciding.
        </h2>
      </div>

      <div className="space-y-6 mb-12">
        {points.map((point, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-medium text-strong">{point}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-faint italic border-t border-line pt-6">
        Qualitative claims only — no time-to-hire or "top 1%" figures until they're backed by real data.
      </p>
    </div>
  )
}
