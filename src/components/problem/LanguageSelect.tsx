import type { ProgrammingLanguage } from '../../types'
import { LANGUAGES } from '../../constants/languages'

interface LanguageSelectProps {
  value: ProgrammingLanguage
  onChange: (lang: ProgrammingLanguage) => void
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={e => onChange(e.target.value as ProgrammingLanguage)}
        className="appearance-none pl-3 pr-8 py-1.5 bg-editor-panel border border-line-strong rounded-lg text-sm text-strong focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
      >
        {LANGUAGES.map(l => (
          <option key={l.value} value={l.value} className="bg-editor-panel">{l.label}</option>
        ))}
      </select>
      <svg className="absolute right-2 w-3.5 h-3.5 text-subtle pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
