

interface CodeEditorMockProps {
  code: string
  onChange: (code: string) => void
}

export function CodeEditorMock({ code, onChange }: CodeEditorMockProps) {
  // The prop is typed string, but it is fed by a lookup into a per-language
  // map — one missing key and this used to throw on .split and take the whole
  // page down behind the error boundary. An empty editor beats a dead route.
  const text = code ?? ''
  const lines = text.split('\n')

  return (
    // code-pane / code-gutter carry the size from Settings → Appearance. The
    // gutter takes only the line height, so the numbers stay small and still
    // line up with the code beside them.
    <div className="flex flex-1 overflow-hidden font-mono">
      {/* Line numbers */}
      <div className="select-none bg-editor-bg/50 border-r border-line px-3 py-4 text-right min-w-[3rem]">
        {lines.map((_, i) => (
          <div key={i} className="code-gutter text-subtle/40 text-xs">
            {i + 1}
          </div>
        ))}
      </div>
      {/* Editable code area */}
      <textarea
        value={text}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        className="code-pane flex-1 bg-editor-bg text-strong/90 py-4 px-4 resize-none focus:outline-none caret-accent"
        style={{ fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace' }}
        aria-label="Code editor"
      />
    </div>
  )
}
