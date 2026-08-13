import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, AlertTriangle, Clock, ChevronRight, ChevronLeft, LayoutGrid, X, User } from 'lucide-react'
import { cn } from '../lib/cn'
import { currentUser } from '../data'

// Mock Data for the Quiz
const MOCK_QUESTIONS = [
  {
    id: 'q1',
    text: 'Which of the following is correct about Java?',
    options: [
      'Java is a sequence-dependent language',
      'Java is a code dependent language',
      'Java is a platform-dependent language',
      'Java is a platform-independent language'
    ],
    correctAnswer: 3
  },
  ...Array.from({ length: 19 }).map((_, i) => ({
    id: `q${i + 2}`,
    text: `Sample Question ${i + 2}: What is a core concept of Object-Oriented Programming?`,
    options: ['Inheritance', 'Compilation', 'Execution', 'Debugging'],
    correctAnswer: 0
  }))
]

type QuizState = 'instructions' | 'active' | 'results'

export default function QuizEnginePage() {
  const [quizState, setQuizState] = useState<QuizState>('instructions')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [score, setScore] = useState(0)
  const [warnings, setWarnings] = useState(0)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false)
  const [seenQuestions, setSeenQuestions] = useState<Set<string>>(new Set([MOCK_QUESTIONS[0].id]))

  // Track seen questions
  useEffect(() => {
    setSeenQuestions(prev => {
      const newSet = new Set(prev)
      newSet.add(MOCK_QUESTIONS[currentQuestionIndex].id)
      return newSet
    })
  }, [currentQuestionIndex])

  // Force Light Theme
  useEffect(() => {
    const root = document.documentElement
    const previousTheme = root.getAttribute('data-theme')
    root.setAttribute('data-theme', 'light')
    
    return () => {
      if (previousTheme) {
        root.setAttribute('data-theme', previousTheme)
      } else {
        root.removeAttribute('data-theme')
      }
    }
  }, [])
  
  // Tab-switching, Fullscreen, and Key detection
  useEffect(() => {
    if (quizState !== 'active') return

    // Attempt to lock keyboard (prevents ESC from exiting fullscreen on supported browsers)
    if ('keyboard' in navigator && (navigator as any).keyboard && (navigator as any).keyboard.lock) {
      (navigator as any).keyboard.lock(['Escape']).catch(console.warn)
    }

    const triggerWarning = (reason: string) => {
      setWarnings(prev => {
        const newWarnings = prev + 1
        if (newWarnings >= 3) {
          setWarningMessage('Maximum warnings exceeded. Your quiz is being automatically submitted.')
        } else {
          setWarningMessage(`Warning ${newWarnings}/3: ${reason} Please remain in full screen and do not switch tabs.`)
        }
        setShowWarningModal(true)
        return newWarnings
      })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        triggerWarning('You switched tabs or minimized the window.')
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        triggerWarning('You exited full screen mode.')
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'F11') {
        e.preventDefault()
        triggerWarning('Keyboard shortcuts for exiting full screen are disabled.')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('keydown', handleKeyDown)
      
      if ('keyboard' in navigator && (navigator as any).keyboard && (navigator as any).keyboard.unlock) {
        (navigator as any).keyboard.unlock()
      }
    }
  }, [quizState])

  // Timer logic
  useEffect(() => {
    if (quizState !== 'active') return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          submitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizState])

  const submitQuiz = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.warn)
    }
    let finalScore = 0
    MOCK_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        finalScore += 1
      }
    })
    setScore(finalScore)
    setQuizState('results')
  }, [answers])

  useEffect(() => {
    if (warnings >= 3 && quizState === 'active') {
       submitQuiz()
       setShowWarningModal(false)
    }
  }, [warnings, quizState, submitQuiz])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleStartQuiz = async () => {
    try {
      await document.documentElement.requestFullscreen()
    } catch (err) {
      console.warn("Fullscreen request failed", err)
    }
    setQuizState('active')
  }

  // Instructions View
  if (quizState === 'instructions') {
    return (
      <div className="h-[100dvh] bg-page flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <div className="max-w-5xl w-full bg-panel border border-line rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-full">
          
          {/* Left Side: Content */}
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center overflow-y-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-strong tracking-tight">Module Knowledge Check</h1>
                <p className="text-subtle font-medium text-sm sm:text-base">Verify your understanding before moving forward.</p>
              </div>
            </div>

            <div className="space-y-4 text-strong">
              <div className="p-4 rounded-xl bg-raised border border-line flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base">Format & Rules</h3>
                  <p className="text-subtle text-sm mt-0.5">20 Multiple Choice Questions. This is a strict proctored exam. Full screen is required and tab shifting is prohibited.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-raised border border-line flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base">3 Warnings Rule</h3>
                  <p className="text-subtle text-sm mt-0.5">Leaving full screen or switching tabs will result in a warning. Your quiz will be automatically submitted after 3 warnings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="w-full md:w-80 bg-raised border-t md:border-t-0 md:border-l border-line p-8 sm:p-10 flex flex-col items-center justify-center gap-4 shrink-0">
            <div className="text-center mb-4">
              <div className="text-4xl font-black text-strong mb-1">15:00</div>
              <div className="text-sm font-bold text-subtle uppercase tracking-widest">Time Limit</div>
            </div>
            
            <button
              onClick={handleStartQuiz}
              className="w-full py-4 bg-accent text-on-accent text-lg font-extrabold rounded-xl hover:bg-accent-strong transition-all shadow-lg shadow-accent/20 active:scale-95"
            >
              Start Quiz Now
            </button>
            
            <button
              onClick={() => window.close()}
              className="w-full py-3 rounded-xl font-bold text-subtle hover:text-strong hover:bg-line transition-colors"
            >
              Cancel & Close
            </button>
          </div>
          
        </div>
      </div>
    )
  }

  // Results View
  if (quizState === 'results') {
    const percentage = Math.round((score / MOCK_QUESTIONS.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="min-h-[100dvh] bg-page flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-panel border border-line rounded-3xl p-10 shadow-2xl text-center flex flex-col items-center">
          <div className={cn(
            "w-32 h-32 rounded-full flex items-center justify-center mb-8 border-8",
            passed ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
          )}>
            {passed ? <CheckCircle className="w-16 h-16" /> : <AlertTriangle className="w-16 h-16" />}
          </div>
          
          <h1 className="text-4xl font-extrabold text-strong tracking-tight mb-8">
            {passed ? 'Quiz Passed!' : 'Quiz Failed'}
          </h1>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mb-10">
            <div className="bg-page border border-line rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-sm font-semibold text-subtle uppercase tracking-wider mb-1">Correct</span>
              <div className="text-3xl font-black text-strong">
                {score} <span className="text-lg text-subtle font-medium">/ {MOCK_QUESTIONS.length}</span>
              </div>
            </div>
            
            <div className="bg-page border border-line rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-sm font-semibold text-subtle uppercase tracking-wider mb-1">Score</span>
              <div className={cn(
                "text-3xl font-black",
                passed ? "text-emerald-500" : "text-red-500"
              )}>
                {percentage}%
              </div>
            </div>
          </div>

          <button
            onClick={() => window.close()}
            className="px-8 py-3.5 bg-accent text-on-accent text-lg font-extrabold rounded-xl hover:bg-accent-strong transition-all shadow-lg shadow-accent/20"
          >
            Close Window
          </button>
        </div>
      </div>
    )
  }

  const currentQ = MOCK_QUESTIONS[currentQuestionIndex]

  // Active Quiz View
  return (
    <div 
      className="h-[100dvh] bg-page flex flex-col overflow-hidden relative select-none"
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {/* Top Header */}
      <header className="h-16 shrink-0 bg-panel border-b border-line px-5 md:px-6 lg:px-10 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        
        {/* Left: User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-strong leading-tight truncate max-w-[120px] md:max-w-none">{currentUser.name}</span>
            <span className="text-[11px] text-subtle font-medium uppercase tracking-wider">Candidate</span>
          </div>
        </div>

        {/* Right: Actions & Timer */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsNavigatorOpen(true)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-raised hover:bg-line text-strong text-sm font-medium rounded-lg transition-colors"
          >
            <LayoutGrid className="w-4 h-4 text-subtle" />
            <span className="hidden sm:inline">Navigator</span>
          </button>

          <div className="w-px h-6 bg-line hidden sm:block" />

          <div className="flex items-center gap-2 text-strong font-semibold tabular-nums text-base bg-red-500/10 px-3 py-1.5 rounded-lg text-red-500 shrink-0">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>

      </header>

      {/* Main Area (Split Layout) */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Side: Question Text */}
        <div className="shrink-0 md:flex-1 md:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col justify-start md:justify-center overflow-y-auto border-b md:border-b-0 md:border-r border-line bg-page">
          <div className="max-w-xl w-full mx-auto mt-4 md:mt-0">
            <span className="text-subtle font-medium tracking-wide uppercase text-xs mb-3 block">
              Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold text-strong leading-snug md:leading-relaxed">
              {currentQ.text}
            </h2>
          </div>
        </div>
        
        {/* Right Side: Options & Nav */}
        <div className="flex-1 md:w-1/2 flex flex-col overflow-hidden bg-panel">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-lg w-full mx-auto space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                      isSelected 
                        ? "border-accent bg-accent/5 ring-1 ring-accent/30 shadow-sm" 
                        : "border-line bg-page hover:border-accent/40"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "border-accent" : "border-line-strong group-hover:border-accent/40"
                    )}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                    </div>
                    <span className={cn(
                      "text-base",
                      isSelected ? "text-strong font-medium" : "text-subtle group-hover:text-strong"
                    )}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Bottom Nav */}
          <div className="h-20 shrink-0 border-t border-line px-5 md:px-8 flex items-center justify-between bg-panel">
            <button
              onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 font-medium text-sm text-subtle hover:text-strong rounded-lg hover:bg-raised transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            {currentQuestionIndex < MOCK_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(i => Math.min(MOCK_QUESTIONS.length - 1, i + 1))}
                className="flex items-center gap-2 px-6 py-2.5 bg-accent text-on-accent font-semibold text-sm rounded-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-sm shadow-accent/20"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitConfirmOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-sm shadow-emerald-500/20"
              >
                Submit <span className="hidden sm:inline">Quiz</span>
              </button>
            )}
          </div>
        </div>

      </main>

      {/* Navigator Modal Overlay */}
      {isNavigatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsNavigatorOpen(false)}
          />
          <div className="relative w-full max-w-md bg-panel border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-line bg-page/50">
              <h2 className="text-base font-semibold text-strong">Quiz Navigator</h2>
              <button 
                onClick={() => setIsNavigatorOpen(false)}
                className="p-1.5 rounded-full hover:bg-raised text-subtle hover:text-strong transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-5 gap-2">
                {MOCK_QUESTIONS.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined
                  const isCurrent = idx === currentQuestionIndex
                  const isSeen = seenQuestions.has(q.id)
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx)
                        setIsNavigatorOpen(false)
                      }}
                      className={cn(
                        "aspect-square rounded-lg font-medium text-sm flex items-center justify-center transition-all border",
                        isCurrent 
                          ? "border-accent bg-accent text-on-accent shadow-md shadow-accent/20 ring-2 ring-accent/30 ring-offset-2 ring-offset-page" : 
                        isAnswered 
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" : 
                        isSeen 
                          ? "bg-panel border-line-strong text-strong" :
                        "bg-raised border-transparent text-subtle/50"
                      )}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Submit Confirmation Modal */}
      {isSubmitConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSubmitConfirmOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-panel border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-line">
              <h2 className="text-xl font-bold text-strong mb-1">Submit Quiz?</h2>
              <p className="text-sm text-subtle">Review your progress before final submission.</p>
            </div>
            
            <div className="p-6 bg-page/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-subtle">Attempted</span>
                <span className="text-sm font-bold text-emerald-500">{Object.keys(answers).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-subtle">Not Attempted</span>
                <span className="text-sm font-bold text-red-500">{MOCK_QUESTIONS.length - Object.keys(answers).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-subtle">Unseen</span>
                <span className="text-sm font-bold text-subtle">{MOCK_QUESTIONS.length - seenQuestions.size}</span>
              </div>
            </div>

            <div className="p-4 border-t border-line flex gap-3">
              <button
                onClick={() => setIsSubmitConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-strong hover:bg-raised transition-colors border border-line"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSubmitConfirmOpen(false)
                  submitQuiz()
                }}
                className="flex-1 py-2.5 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-panel border border-red-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-center p-8">
            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-strong mb-2">Exam Rule Violation</h2>
            <p className="text-subtle mb-6">{warningMessage}</p>
            <button
              onClick={() => {
                setShowWarningModal(false)
                if (warnings < 3 && quizState === 'active') {
                  document.documentElement.requestFullscreen().catch(console.warn)
                }
              }}
              className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
