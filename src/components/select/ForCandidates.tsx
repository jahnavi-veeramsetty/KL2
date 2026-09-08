import { Button } from '../../ui/Button'

export default function ForCandidates() {
  return (
    <div className="py-16 max-w-5xl mx-auto px-6 text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-strong mb-2">
        On the other side of this: candidates who earned their way in.
      </h2>
      <p className="text-subtle mb-6">
        You don't apply to Select. You qualify for it.
      </p>
      <Button variant="ghost">See how qualification works</Button>
    </div>
  )
}
