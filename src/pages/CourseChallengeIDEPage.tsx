import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { ChevronLeft, Play, Check } from 'lucide-react'
import { Button } from '../ui'
import { problems } from '../data'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { CodeEditorMock } from '../components/problem/CodeEditorMock'
import { EditorToolbar } from '../components/problem/EditorToolbar'
import { ProblemDescriptionPanel } from '../components/problem/ProblemDescriptionPanel'
import { TestCasePanel } from '../components/problem/TestCasePanel'
import { ResultPanel } from '../components/problem/ResultPanel'
import type { ProgrammingLanguage } from '../types'
import { useSettings } from '../hooks/useSettings'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function CourseChallengeIDEPage() {
  const { courseId, challengeId } = useParams<{ courseId: string, challengeId: string }>()
  const location = useLocation()
  const returnTo = location.state?.returnTo || `/lms/${courseId}`
  const problem = problems.find(p => p.id === challengeId || p.slug === challengeId)

  useDocumentTitle(problem?.title || 'Coding Challenge')

  const { settings } = useSettings()
  const [language, setLanguage] = useState<ProgrammingLanguage>(settings.defaultLanguage)
  const [code, setCode] = useState<string>(problem?.starterCode[settings.defaultLanguage] || '')
  const [resultStatus, setResultStatus] = useState<'accepted' | 'wrong' | 'error' | null>(null)
  const [resultData, setResultData] = useState<{ runtime?: string; memory?: string; hiddenCasesPassed?: number; totalHiddenCases?: number }>({})

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language])
    }
  }, [language, problem])

  if (!problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-page text-strong">
        Problem not found
      </div>
    )
  }

  const handleLanguageChange = (lang: ProgrammingLanguage) => setLanguage(lang)
  
  const handleReset = () => {
    setCode(problem.starterCode[language])
    setResultStatus(null)
  }

  const handleRun = () => {
    setResultStatus('accepted')
    setResultData({ runtime: '42ms', memory: '16.4 MB', hiddenCasesPassed: undefined, totalHiddenCases: undefined })
  }

  const handleSubmit = () => {
    setResultStatus('accepted')
    setResultData({ runtime: '38ms', memory: '16.2 MB', hiddenCasesPassed: 54, totalHiddenCases: 54 })
  }

  return (
    <div className="h-[100dvh] w-full bg-page flex flex-col relative overflow-hidden text-body font-sans">
      {/* Header */}
      <header className="h-14 shrink-0 bg-panel border-b border-line px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={returnTo} className="flex items-center gap-2 text-subtle hover:text-strong transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-wide">Back to Course</span>
          </Link>
          <div className="w-px h-4 bg-line hidden sm:block" />
          <h1 className="text-sm font-bold text-strong hidden sm:block">{problem.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm" variant="secondary" onClick={handleRun} className="gap-1.5">
            <Play className="w-3.5 h-3.5 fill-current" strokeWidth={0} aria-hidden />
            Run
          </Button>
          <Button size="sm" onClick={handleSubmit} className="gap-1.5">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden />
            Submit
          </Button>
          <div className="w-px h-4 bg-line mx-2" />
          <ThemeToggle />
        </div>
      </header>

      {/* Main IDE Layout */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row w-full">
        {/* Left pane — question (Scrollable) */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col border-b md:border-b-0 md:border-r border-line bg-panel overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ProblemDescriptionPanel problem={problem} />
          </div>
        </div>

        {/* Right pane — editor & terminal */}
        <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col flex-1 min-h-0 overflow-hidden bg-page">
          <EditorToolbar language={language} onLanguageChange={handleLanguageChange} onReset={handleReset} />
          
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="flex-1 overflow-auto min-h-0 relative">
              <CodeEditorMock code={code} onChange={setCode} />
            </div>
            
            <TestCasePanel testCases={problem.testCases} />
            <ResultPanel
              status={resultStatus}
              runtime={resultData.runtime}
              memory={resultData.memory}
              hiddenCasesPassed={resultData.hiddenCasesPassed}
              totalHiddenCases={resultData.totalHiddenCases}
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
