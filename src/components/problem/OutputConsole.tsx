interface OutputConsoleProps {
  lines: string[]
  running: boolean
  onClear: () => void
}

export function OutputConsole({ lines, running, onClear }: OutputConsoleProps) {
  return (
    <div className="flex flex-col h-full bg-editor-bg border-t md:border-t-0 md:border-l border-line min-h-0">
      <div className="flex items-center justify-between px-4 py-2 bg-editor-panel border-b border-line flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-strong">Output</span>
          <span
            className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-amber-400/25 bg-amber-400/10 text-amber-400"
            title="This playground previews output. It does not execute your code."
          >
            Simulated
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-xs text-subtle hover:text-strong transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-6 min-h-0">
        {running && <div className="text-subtle">Running…</div>}

        {!running && lines.length === 0 && (
          <div className="text-subtle/60">
            Press <span className="text-strong">Run</span> to preview the output of your code.
          </div>
        )}

        {!running &&
          lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('[')
                  ? 'text-subtle/70'
                  : 'text-strong/90 whitespace-pre-wrap break-words'
              }
            >
              {line}
            </div>
          ))}
      </div>
    </div>
  )
}
