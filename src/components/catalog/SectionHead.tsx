interface SectionHeadProps {
  title: string
  count: number
  /** Text colour class for the label — the band's meaning, not decoration. */
  tone?: string
  /** A live dot, for anything happening right now. */
  pulse?: boolean
}

/**
 * The divider above a band of cards. Courses, masterclasses and hackathons had
 * three private copies of this that had already started to drift.
 */
export function SectionHead({ title, count, tone = 'text-faint', pulse }: SectionHeadProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden />}
      <h3 className={`text-xs font-bold uppercase tracking-[0.12em] ${tone}`}>{title}</h3>
      <span className="text-[11px] font-semibold text-faint tabular-nums">{count}</span>
      <span className="flex-1 h-px bg-raised" aria-hidden />
    </div>
  )
}
