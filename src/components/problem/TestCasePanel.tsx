import { useState } from 'react'
import type { ProblemTestCase } from '../../types'

interface TestCasePanelProps {
  testCases: ProblemTestCase[]
}

export function TestCasePanel({ testCases }: TestCasePanelProps) {
  const [activeCase, setActiveCase] = useState(0)
  const tc = testCases[activeCase]

  return (
    <div className="bg-editor-panel border-t border-line p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-subtle uppercase tracking-wider">Test Cases</span>
        <div className="flex items-center gap-1 ml-2">
          {testCases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCase(i)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeCase === i
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'text-subtle hover:text-strong hover:bg-raised'
              }`}
            >
              Case {i + 1}
            </button>
          ))}
        </div>
      </div>
      {tc && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-subtle mb-1">Input</p>
            <div className="bg-editor-bg rounded-lg p-2 text-xs font-mono text-strong min-h-[40px]">
              {tc.input}
            </div>
          </div>
          <div>
            <p className="text-xs text-subtle mb-1">Expected Output</p>
            <div className="bg-editor-bg rounded-lg p-2 text-xs font-mono text-easy min-h-[40px]">
              {tc.expected}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
