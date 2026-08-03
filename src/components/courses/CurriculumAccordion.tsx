import type { CourseModule } from '../../types'
import { Accordion } from '../../ui'
import { formatDurationMins } from '../../lib/format'

const typeIcon = (type: string) => {
  const icons: Record<string, string> = {
    video: '▶',
    article: '📄',
    quiz: '📝',
    project: '🛠',
    exercise: '⚡',
  }
  return icons[type] ?? '▶'
}

interface CurriculumAccordionProps {
  modules: CourseModule[]
}

export function CurriculumAccordion({ modules }: CurriculumAccordionProps) {
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)
  const totalMins = modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.durationMins, 0), 0)

  const items = modules.map((mod, idx) => {
    const modMins = mod.lessons.reduce((s, l) => s + l.durationMins, 0)
    return {
      id: `mod-${idx}`,
      title: mod.title,
      meta: `${mod.lessons.length} lessons · ${formatDurationMins(modMins)}`,
      content: (
        <ul className="space-y-2">
          {mod.lessons.map((lesson, li) => (
            <li key={li} className="flex items-center gap-3 text-xs text-muted py-1.5 border-b border-white/5 last:border-0">
              <span className="text-base">{typeIcon(lesson.type)}</span>
              <span className="flex-1 text-tertiary/80">{lesson.title}</span>
              <span className="text-muted/60 flex-shrink-0">{formatDurationMins(lesson.durationMins)}</span>
            </li>
          ))}
        </ul>
      )
    }
  })

  return (
    <div>
      <div className="flex items-center gap-4 text-sm text-muted mb-4">
        <span>{modules.length} modules</span>
        <span>·</span>
        <span>{totalLessons} lessons</span>
        <span>·</span>
        <span>{formatDurationMins(totalMins)} total</span>
      </div>
      <Accordion items={items} allowMultiple />
    </div>
  )
}
