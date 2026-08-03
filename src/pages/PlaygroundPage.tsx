import { useState, useEffect } from 'react'
import { CodeEditorMock } from '../components/problem/CodeEditorMock'
import { LanguageSelect } from '../components/problem/LanguageSelect'
import { OutputConsole } from '../components/problem/OutputConsole'
import { Button, IconButton } from '../ui'
import { playgroundSnippets } from '../data/snippets'
import type { ProgrammingLanguage } from '../types'

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
  const [language, setLanguage] = useState<ProgrammingLanguage>('python')
  const [code, setCode] = useState<string>(playgroundSnippets.python)
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
        <div className="flex items-center justify-between px-3 py-2 bg-editor-panel border-b border-white/8 flex-shrink-0">
          <LanguageSelect value={language} onChange={setLanguage} />
          <div className="flex items-center gap-2">
            <IconButton label="Reset to starter code" size="sm" onClick={handleReset}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </IconButton>
            <Button size="sm" onClick={handleRun} disabled={running}>
              {running ? 'Running…' : '▶ Run'}
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
