import { Accordion } from '../../ui/Accordion'

export default function FAQ() {
  const items = [
    {
      id: "who",
      title: "Who can we hire through Select?",
      content: <p className="text-sm text-subtle leading-relaxed">At launch, fresh AI/ML and GenAI engineers who've cleared the Select evaluation for that domain.</p>
    },
    {
      id: "how-match",
      title: "How does Select match candidates to our role?",
      content: <p className="text-sm text-subtle leading-relaxed">You post the JD and required skills. Select surfaces platform candidates whose assessed skills fit that specific requirement, not the entire pool.</p>
    },
    {
      id: "interviews",
      title: "Can we run interviews and scoring here too?",
      content: <p className="text-sm text-subtle leading-relaxed">Yes. Scheduling, interview rounds, structured scoring and candidate progress tracking all stay on the platform.</p>
    },
    {
      id: "all-members",
      title: "Is every Knowvation member Select-qualified?",
      content: <p className="text-sm text-subtle leading-relaxed">No. The community is open to anyone learning and building. Select is the pool of candidates who've cleared the evaluation.</p>
    },
    {
      id: "expansion",
      title: "Will Select expand past AI/ML?",
      content: <p className="text-sm text-subtle leading-relaxed">AI/ML is the initial focus. Expansion into other domains depends on demand and building out the Select Standard for each one.</p>
    }
  ]

  return (
    <div className="py-24 max-w-3xl mx-auto px-6">
      <div className="mb-12 text-center">
        <span className="text-sm font-medium text-accent mb-3 block">FAQ</span>
        <h2 className="text-3xl md:text-4xl font-bold text-strong tracking-tight">
          Common questions
        </h2>
      </div>

      <Accordion items={items} />
    </div>
  )
}
