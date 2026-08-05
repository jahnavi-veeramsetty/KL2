import { Component, type ErrorInfo, type ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import { StatusPage, StatusAction } from './StatusPage'

/**
 * Catches render-time crashes so a thrown error shows something recoverable
 * instead of a blank white page.
 *
 * Has to be a class — componentDidCatch has no hook equivalent. Note this does
 * not catch errors in event handlers or async code; React only routes render,
 * lifecycle and constructor errors here.
 */
interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Nowhere to report to yet; the console is better than swallowing it.
    console.error('Unhandled render error:', error, info.componentStack)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <StatusPage
        code="500"
        tone="danger"
        icon={<TriangleAlert className="w-6 h-6" />}
        title="Something broke on our side"
        description="This page hit an unexpected error. Reloading usually clears it."
        actions={
          <>
            <StatusAction onClick={() => window.location.reload()}>Reload page</StatusAction>
            <button
              type="button"
              onClick={() => { window.location.href = '/' }}
              className="px-6 py-3 rounded-xl bg-raised border border-line-strong text-xs font-bold uppercase tracking-wide text-body hover:bg-line-strong hover:text-strong transition-colors"
            >
              Go home
            </button>
          </>
        }
        detail={
          <details className="group">
            <summary className="text-[11px] font-semibold text-faint cursor-pointer hover:text-body transition-colors list-none">
              <span className="group-open:hidden">Show error details</span>
              <span className="hidden group-open:inline">Hide error details</span>
            </summary>
            <pre className="mt-3 p-3 rounded-lg bg-black/40 border border-line text-[10.5px] leading-relaxed text-red-300/80 overflow-x-auto whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        }
      />
    )
  }
}
