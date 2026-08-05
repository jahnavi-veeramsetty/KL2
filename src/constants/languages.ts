import type { ProgrammingLanguage } from '../types'

/**
 * The languages the editor accepts, in the order they are offered.
 *
 * Its own module rather than an export from LanguageSelect: Settings needs the
 * same list to pick a default from, and two hand-kept copies is how a saved
 * default ends up being something the editor cannot select.
 */
export const LANGUAGES: { value: ProgrammingLanguage; label: string }[] = [
  { value: 'python', label: 'Python 3' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
]
