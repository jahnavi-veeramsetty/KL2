import { FileText, PenLine, PlayCircle, Wrench, Zap } from 'lucide-react'
import type { CourseModule } from '../../types'
import { Accordion } from '../../ui'
import { formatDurationMins } from '../../lib/format'

/* Lesson kind, as an icon rather than an emoji. The old set mixed a geometric
   glyph with four colour emoji, so a curriculum list rendered at five different
   sizes and two different colour models down a single column. */
const TYPE_ICONS: Record<string, typeof FileText> = {
  video: PlayCircle,
  article: FileText,
  quiz: PenLine,
  project: Wrench,
  exercise: Zap,
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
        <ul className="space-y-1">
          {mod.lessons.map((lesson, li) => {
            const LessonIcon = TYPE_ICONS[lesson.type] ?? PlayCircle
            return (
              <li
                key={li}
                className="flex items-center gap-3 text-xs py-2 border-b border-line last:border-0"
              >
                <LessonIcon className="w-4 h-4 shrink-0 text-faint" strokeWidth={1.8} aria-label={lesson.type} />
                <span className="flex-1 text-body">{lesson.title}</span>
                <span className="text-faint shrink-0 tabular-nums">
                  {formatDurationMins(lesson.durationMins)}
                </span>
              </li>
            )
          })}
        </ul>
      )
    }
  })

  return (
    <div>
      <div className="flex items-center gap-4 text-sm text-subtle mb-4">
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
