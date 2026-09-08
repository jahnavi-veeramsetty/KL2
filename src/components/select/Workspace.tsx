export default function Workspace() {
  const items = [
    { title: "Job posts", desc: "Create and manage open roles." },
    { title: "Matched pool", desc: "See who fits, for this role." },
    { title: "Shortlist", desc: "Move candidates forward, no separate tracker." },
    { title: "Scheduling", desc: "Coordinate calls and interview rounds." },
    { title: "Scoring", desc: "Structured feedback, captured in the moment." },
    { title: "Selection status", desc: "Know exactly where each candidate stands." },
    { title: "Onboarding letter", desc: "Send it without leaving the workflow." },
  ]

  return (
    <div className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16 max-w-3xl mx-auto text-center">
        <span className="text-sm font-medium text-accent mb-3 block">Workspace</span>
        <h2 className="text-3xl md:text-4xl font-bold text-strong tracking-tight mb-4">
          Finding them was step one.
        </h2>
        <p className="text-lg text-subtle">
          Run the rest of the hire — scheduling, scoring, tracking, onboarding — without leaving Select.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2"></span>
              <div>
                <h3 className="text-base font-semibold text-strong mb-1">{item.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
