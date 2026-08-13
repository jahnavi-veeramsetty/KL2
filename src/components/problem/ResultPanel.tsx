import { CheckCircle2, XCircle } from 'lucide-react'

type ResultStatus = 'accepted' | 'wrong' | 'error' | null

interface ResultPanelProps {
  status: ResultStatus
  runtime?: string
  memory?: string
  wrongInput?: string
  wrongExpected?: string
  wrongGot?: string
  hiddenCasesPassed?: number
  totalHiddenCases?: number
}

export function ResultPanel({ status, runtime, memory, wrongInput, wrongExpected, wrongGot, hiddenCasesPassed, totalHiddenCases }: ResultPanelProps) {
  if (!status) return null

  return (
    <div className={`border-t p-4 ${
      status === 'accepted' ? 'border-easy/30 bg-easy/5' :
      status === 'wrong' ? 'border-danger/30 bg-danger/5' :
      'border-warning/30 bg-warning/5'
    }`}>
      {status === 'accepted' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-[18px] h-[18px] text-easy shrink-0" strokeWidth={2.2} aria-hidden />
            <span className="text-easy font-bold">Accepted</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-subtle mt-1">
            <span>Runtime: <strong className="text-strong">{runtime}</strong></span>
            <span>Memory: <strong className="text-strong">{memory}</strong></span>
          </div>
          {hiddenCasesPassed !== undefined && totalHiddenCases !== undefined && (
            <div className="text-xs mt-2">
              <span className="bg-easy/10 border border-easy/30 text-easy px-2.5 py-1 rounded-full font-medium inline-block">
                Passed {hiddenCasesPassed} / {totalHiddenCases} Hidden Test Cases
              </span>
            </div>
          )}
        </div>
      )}

      {status === 'wrong' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <XCircle className="w-[18px] h-[18px] text-danger shrink-0" strokeWidth={2.2} aria-hidden />
            <span className="text-danger font-bold">Wrong answer</span>
          </div>
          <div className="text-xs space-y-1">
            {wrongInput && <div className="text-subtle">Input: <span className="font-mono text-strong">{wrongInput}</span></div>}
            {wrongExpected && <div className="text-subtle">Expected: <span className="font-mono text-easy">{wrongExpected}</span></div>}
            {wrongGot && <div className="text-subtle">Got: <span className="font-mono text-danger">{wrongGot}</span></div>}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-warning text-lg">!</span>
            <span className="text-warning font-bold">Runtime Error</span>
          </div>
          <p className="text-xs text-subtle">Check your code for edge cases and null pointer errors.</p>
        </div>
      )}
    </div>
  )
}
