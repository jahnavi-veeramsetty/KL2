import { useState, useEffect } from 'react'
import { Check, Pause, Play } from 'lucide-react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { problems } from '../data'
import { ROUTES } from '../constants/routes'
import { Badge, Tabs, Button } from '../ui'
import type { TabItem } from '../ui'
import { CodeEditorMock } from '../components/problem/CodeEditorMock'
import { EditorToolbar } from '../components/problem/EditorToolbar'
import { ProblemDescriptionPanel } from '../components/problem/ProblemDescriptionPanel'
import { TestCasePanel } from '../components/problem/TestCasePanel'
import { ResultPanel } from '../components/problem/ResultPanel'
import type { ProgrammingLanguage } from '../types'
import { useSettings } from '../hooks/useSettings'
import { padTwo } from '../lib/format'

type ResultStatus = 'accepted' | 'wrong' | 'error' | null

const PANEL_TABS: TabItem[] = [
  { id: 'description', label: 'Description' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'submissions', label: 'Submissions' },
]

export default function ProblemPage() {
  const { problemId } = useParams<{ problemId: string }>()
  const problem = problems.find(p => p.id === problemId || p.slug === problemId)

  // Seeded from Settings → Appearance, then owned locally — switching language
  // on one problem should not rewrite the account-wide default.
  const { settings } = useSettings()
  const [language, setLanguage] = useState<ProgrammingLanguage>(settings.defaultLanguage)
  const [code, setCode] = useState<string>(problem?.starterCode[settings.defaultLanguage] || '')
  const [activePanel, setActivePanel] = useState('description')
  const [resultStatus, setResultStatus] = useState<ResultStatus>(null)
  const [resultData, setResultData] = useState<{ runtime?: string; memory?: string }>({})
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(true)

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language])
    }
  }, [language, problem])

  useEffect(() => {
    if (!timerActive) return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [timerActive])

  if (!problem) return <Navigate to={ROUTES.PRACTICE} replace />

  const problemIndex = problems.findIndex(p => p.id === problem.id)
  const prevProblem = problems[problemIndex - 1]
  const nextProblem = problems[problemIndex + 1]

  const timerStr = `${padTwo(Math.floor(seconds / 60))}:${padTwo(seconds % 60)}`

  const handleLanguageChange = (lang: ProgrammingLanguage) => {
    setLanguage(lang)
    setCode(problem.starterCode[lang])
  }

  const handleReset = () => setCode(problem.starterCode[language])

  const handleRun = () => {
    setTimerActive(false)
    // 70% chance accepted on run
    if (Math.random() > 0.3) {
      setResultStatus('accepted')
      setResultData({ runtime: `${Math.floor(Math.random() * 80 + 20)}ms`, memory: `${(Math.random() * 10 + 14).toFixed(1)} MB` })
    } else {
      setResultStatus('wrong')
    }
  }

  const handleSubmit = () => {
    setTimerActive(false)
    setResultStatus('accepted')
    setResultData({ runtime: `${Math.floor(Math.random() * 60 + 15)}ms`, memory: `${(Math.random() * 8 + 14).toFixed(1)} MB` })
  }

  const difficultyColor = { Easy: 'easy', Medium: 'medium', Hard: 'hard' } as const

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-editor-bg)', fontFamily: 'var(--font-sans)' }}>
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 h-12 border-b border-line bg-editor-panel flex-shrink-0">
        <Link
          to={ROUTES.PRACTICE}
          className="text-subtle hover:text-strong transition-colors"
          aria-label="Back to practice"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="text-sm font-semibold text-strong truncate max-w-48 hidden sm:block">
          {problem.number}. {problem.title}
        </span>
        <Badge color={difficultyColor[problem.difficulty]} size="sm">{problem.difficulty}</Badge>
        <div className="flex items-center gap-1 ml-2">
          {prevProblem && (
            <Link to={ROUTES.PROBLEM(prevProblem.slug)} className="p-1 text-subtle hover:text-strong" aria-label="Previous problem">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          {nextProblem && (
            <Link to={ROUTES.PROBLEM(nextProblem.slug)} className="p-1 text-subtle hover:text-strong" aria-label="Next problem">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        <div className="ml-auto flex items-center gap-3">
          {/* The timer is a stopwatch, not a countdown — label it so, and give
              it a pause the header always had state for but never exposed. */}
          <button
            type="button"
            onClick={() => setTimerActive(v => !v)}
            aria-label={timerActive ? 'Pause timer' : 'Resume timer'}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono tabular-nums text-subtle hover:text-strong hover:bg-raised transition-colors"
          >
            {timerActive
              ? <Pause className="w-3 h-3" strokeWidth={2} aria-hidden />
              : <Play className="w-3 h-3 fill-current" strokeWidth={0} aria-hidden />}
            {timerStr}
          </button>
          <Button size="sm" variant="secondary" onClick={handleRun} className="gap-1.5">
            <Play className="w-3.5 h-3.5 fill-current" strokeWidth={0} aria-hidden />
            Run
          </Button>
          <Button size="sm" onClick={handleSubmit} className="gap-1.5">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden />
            Submit
          </Button>
        </div>
      </header>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left panel */}
        <div className="flex flex-col w-full md:w-2/5 lg:w-[42%] border-r border-line min-h-0">
          <div className="flex-shrink-0 px-4 pt-3 pb-0">
            <Tabs tabs={PANEL_TABS} activeTab={activePanel} onChange={setActivePanel} size="sm" />
          </div>
          <div className="flex-1 overflow-hidden min-h-0">
            {activePanel === 'description' && (
              <ProblemDescriptionPanel problem={problem} />
            )}
            {activePanel === 'editorial' && (
              <div className="p-5 text-sm text-subtle">Editorial coming soon. Check back after the contest ends.</div>
            )}
            {activePanel === 'solutions' && (
              <div className="p-5 text-sm text-subtle">Community solutions coming soon.</div>
            )}
            {activePanel === 'submissions' && (
              <div className="p-5">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-subtle border-b border-line">
                      <th className="text-left pb-2">Status</th>
                      <th className="text-left pb-2">Runtime</th>
                      <th className="text-left pb-2">Memory</th>
                      <th className="text-left pb-2">Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-subtle border-b border-line">
                      <td className="py-2 text-easy">Accepted</td>
                      <td className="py-2">48ms</td>
                      <td className="py-2">16.2 MB</td>
                      <td className="py-2">Python 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right panel — editor */}
        <div className="hidden md:flex flex-col flex-1 min-h-0 overflow-hidden">
          <EditorToolbar language={language} onLanguageChange={handleLanguageChange} onReset={handleReset} />
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="flex-1 overflow-auto min-h-0">
              <CodeEditorMock code={code} onChange={setCode} />
            </div>
            <TestCasePanel testCases={problem.testCases} />
            <ResultPanel
              status={resultStatus}
              runtime={resultData.runtime}
              memory={resultData.memory}
              wrongInput={problem.testCases[0]?.input}
              wrongExpected={problem.testCases[0]?.expected}
              wrongGot="[]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
