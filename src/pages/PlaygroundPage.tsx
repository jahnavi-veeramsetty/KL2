import { useState, useEffect } from 'react'
import { Loader2, Play, RotateCcw, Terminal } from 'lucide-react'
import { CodeEditorMock } from '../components/problem/CodeEditorMock'
import { LanguageSelect } from '../components/problem/LanguageSelect'
import { OutputConsole } from '../components/problem/OutputConsole'
import { Button, IconButton } from '../ui'
import { playgroundSnippets } from '../data/snippets'
import type { ProgrammingLanguage } from '../types'
import { useSettings } from '../hooks/useSettings'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const STORAGE_KEY = 'playground_code'

/**
 * Pull string literals out of common print calls so the simulated console shows
 * something recognisable. This does NOT execute the code — see the "Simulated"
 * badge on OutputConsole.
 */
const PRINT_PATTERNS = [
  /console\.log\(\s*(['"`])([^'"`]*)\1/g,      // JS / TS
  /print\(\s*(['"`])([^'"`]*)\1/g,             // Python
  /System\.out\.print(?:ln)?\(\s*(")([^"]*)\1/g, // Java
  /printf\(\s*(")([^"]*)"/g,                   // C
  /cout\s*<<\s*(")([^"]*)\1/g,                 // C++
]

function simulateOutput(code: string): string[] {
  const found: string[] = []
  for (const pattern of PRINT_PATTERNS) {
    for (const match of code.matchAll(pattern)) {
      const text = match[2].replace(/\\n/g, '')
      if (text.trim()) found.push(text)
    }
  }
  return found
}

export default function PlaygroundPage() {
  useDocumentTitle('Playground')
  // Seeded from Settings → Appearance; switching here is a scratchpad choice,
  // not a change to the saved default.
  const { settings } = useSettings()
  const [language, setLanguage] = useState<ProgrammingLanguage>(settings.defaultLanguage)
  const [code, setCode] = useState<string>(playgroundSnippets[settings.defaultLanguage])
  const [lines, setLines] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  // Restore the scratchpad for this language, falling back to the starter snippet.
  useEffect(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}:${language}`)
    setCode(saved ?? playgroundSnippets[language])
    setLines([])
  }, [language])

  // Persist as the student types so a refresh does not lose work.
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}:${language}`, code)
  }, [language, code])

  const handleRun = () => {
    setRunning(true)
    setLines([])
    const printed = simulateOutput(code)
    window.setTimeout(() => {
      setLines([
        ...(printed.length ? printed : ['(no output)']),
        '',
        `[finished in ${(Math.random() * 0.4 + 0.05).toFixed(2)}s — simulated, code was not executed]`,
      ])
      setRunning(false)
    }, 500)
  }

  const handleReset = () => {
    setCode(playgroundSnippets[language])
    setLines([])
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 pt-20 lg:pt-14 h-full overflow-hidden">
      {/* Editor pane */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0">
        <div className="flex items-center gap-3 px-3 py-2 bg-editor-panel border-b border-line flex-shrink-0">
          {/* A named surface, so the toolbar says what this pane is. The IDE
              chrome is otherwise identical to the problem page, which left the
              playground looking like a problem with the question missing. */}
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-faint">
            <Terminal className="w-3.5 h-3.5" strokeWidth={2} aria-hidden />
            Scratchpad
          </span>

          <div className="ml-auto flex items-center gap-2">
            <LanguageSelect value={language} onChange={setLanguage} />
            <IconButton label="Reset to starter code" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" strokeWidth={1.8} />
            </IconButton>
            {/* lucide Play, not a ▶ glyph — the character rendered at whatever
                weight the system emoji font felt like, next to a toolbar drawn
                entirely in lucide. */}
            <Button size="sm" onClick={handleRun} disabled={running} className="gap-1.5">
              {running ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.5} aria-hidden />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" strokeWidth={0} aria-hidden />
                  Run
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <CodeEditorMock code={code} onChange={setCode} />
        </div>
      </div>

      {/* Output pane */}
      <aside className="flex flex-col w-full h-2/5 md:h-auto md:w-[380px] lg:w-[440px] flex-shrink-0 min-h-0">
        <OutputConsole lines={lines} running={running} onClear={() => setLines([])} />
      </aside>
    </div>
  )
}
