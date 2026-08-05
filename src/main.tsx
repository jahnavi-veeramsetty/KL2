import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/system/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeProvider'
import { applySideEffects } from './lib/settings'

// Stamp the root attributes before the first paint, so reduce-motion does not
// let one round of transitions through on the way in.
applySideEffects()

// Theme sits outside the boundary so the crash screen is themed too.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
