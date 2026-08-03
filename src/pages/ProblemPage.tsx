import { useState, useEffect } from 'react'
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

  const [language, setLanguage] = useState<ProgrammingLanguage>('python')
  const [code, setCode] = useState<string>(problem?.starterCode['python'] || '')
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
      <header className="flex items-center gap-3 px-4 h-12 border-b border-white/8 bg-editor-panel flex-shrink-0">
        <Link
          to={ROUTES.PRACTICE}
          className="text-muted hover:text-tertiary transition-colors"
          aria-label="Back to practice"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="text-sm font-semibold text-tertiary truncate max-w-48 hidden sm:block">
          {problem.number}. {problem.title}
        </span>
        <Badge color={difficultyColor[problem.difficulty]} size="sm">{problem.difficulty}</Badge>
        <div className="flex items-center gap-1 ml-2">
          {prevProblem && (
            <Link to={ROUTES.PROBLEM(prevProblem.slug)} className="p-1 text-muted hover:text-tertiary" aria-label="Previous problem">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          {nextProblem && (
            <Link to={ROUTES.PROBLEM(nextProblem.slug)} className="p-1 text-muted hover:text-tertiary" aria-label="Next problem">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs font-mono text-muted">{timerStr}</span>
          <Button size="sm" variant="secondary" onClick={handleRun}>
            ▶ Run
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </header>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left panel */}
        <div className="flex flex-col w-full md:w-2/5 lg:w-[42%] border-r border-white/8 min-h-0">
          <div className="flex-shrink-0 px-4 pt-3 pb-0">
            <Tabs tabs={PANEL_TABS} activeTab={activePanel} onChange={setActivePanel} size="sm" />
          </div>
          <div className="flex-1 overflow-hidden min-h-0">
            {activePanel === 'description' && (
              <ProblemDescriptionPanel problem={problem} />
            )}
            {activePanel === 'editorial' && (
              <div className="p-5 text-sm text-muted">Editorial coming soon. Check back after the contest ends.</div>
            )}
            {activePanel === 'solutions' && (
              <div className="p-5 text-sm text-muted">Community solutions coming soon.</div>
            )}
            {activePanel === 'submissions' && (
              <div className="p-5">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted border-b border-white/5">
                      <th className="text-left pb-2">Status</th>
                      <th className="text-left pb-2">Runtime</th>
                      <th className="text-left pb-2">Memory</th>
                      <th className="text-left pb-2">Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-muted border-b border-white/5">
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
