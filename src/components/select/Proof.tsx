import { Card } from '../../ui/Card'

export default function Proof() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6 text-center">
      <div className="mb-12">
        <span className="text-sm font-medium text-accent mb-3 block">Proof</span>
        <h2 className="text-3xl md:text-4xl font-bold text-strong tracking-tight">
          We'll show you the numbers once we have them.
        </h2>
      </div>

      <Card className="max-w-4xl mx-auto border-dashed border-2 border-line-strong bg-page/50 p-12 mb-6 shadow-none hover:shadow-none hover:translate-y-0 flex items-center justify-center min-h-[240px]">
        <p className="text-subtle text-lg max-w-xl mx-auto">
          Hiring funnel snapshots and employer testimonials will appear here once real, verified data exists.
        </p>
      </Card>

      <p className="text-xs text-faint italic">
        Illustrative future format — not live data: 1 role → 34 relevant profiles → 7 shortlisted → 4 interviewed → 1 selected
      </p>
    </div>
  )
}
