

interface CodeEditorMockProps {
  code: string
  onChange: (code: string) => void
}

export function CodeEditorMock({ code, onChange }: CodeEditorMockProps) {
  const lines = code.split('\n')

  return (
    <div className="flex flex-1 overflow-hidden font-mono text-sm">
      {/* Line numbers */}
      <div className="select-none bg-editor-bg/50 border-r border-white/5 px-3 py-4 text-right min-w-[3rem]">
        {lines.map((_, i) => (
          <div key={i} className="leading-6 text-muted/40 text-xs">
            {i + 1}
          </div>
        ))}
      </div>
      {/* Editable code area */}
      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 bg-editor-bg text-tertiary/90 py-4 px-4 resize-none focus:outline-none leading-6 text-sm caret-accent"
        style={{ fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace' }}
        aria-label="Code editor"
      />
    </div>
  )
}
