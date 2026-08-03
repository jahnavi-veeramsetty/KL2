type ResultStatus = 'accepted' | 'wrong' | 'error' | null

interface ResultPanelProps {
  status: ResultStatus
  runtime?: string
  memory?: string
  wrongInput?: string
  wrongExpected?: string
  wrongGot?: string
}

export function ResultPanel({ status, runtime, memory, wrongInput, wrongExpected, wrongGot }: ResultPanelProps) {
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
            <span className="text-easy text-lg">✓</span>
            <span className="text-easy font-bold">Accepted</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted">
            <span>Runtime: <strong className="text-tertiary">{runtime}</strong></span>
            <span>Memory: <strong className="text-tertiary">{memory}</strong></span>
          </div>
        </div>
      )}

      {status === 'wrong' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-danger text-lg">✗</span>
            <span className="text-danger font-bold">Wrong Answer</span>
          </div>
          <div className="text-xs space-y-1">
            {wrongInput && <div className="text-muted">Input: <span className="font-mono text-tertiary">{wrongInput}</span></div>}
            {wrongExpected && <div className="text-muted">Expected: <span className="font-mono text-easy">{wrongExpected}</span></div>}
            {wrongGot && <div className="text-muted">Got: <span className="font-mono text-danger">{wrongGot}</span></div>}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-warning text-lg">!</span>
            <span className="text-warning font-bold">Runtime Error</span>
          </div>
          <p className="text-xs text-muted">Check your code for edge cases and null pointer errors.</p>
        </div>
      )}
    </div>
  )
}
