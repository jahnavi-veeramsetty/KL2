import { Button } from '../../ui/Button'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-page/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="text-xl font-semibold tracking-tight text-strong hover:opacity-80 transition-opacity">
            Knowvation <span className="text-accent">Select</span>
          </a>
          
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#how-it-works" className="text-subtle hover:text-accent transition-colors">How it works</a>
            <a href="#the-standard" className="text-subtle hover:text-accent transition-colors">The Standard</a>
            <a href="#workspace" className="text-subtle hover:text-accent transition-colors">Workspace</a>
            <a href="#for-candidates" className="text-subtle hover:text-accent transition-colors">For candidates</a>
          </nav>
        </div>
        
        <div className="flex items-center">
          <Button variant="primary">Login</Button>
        </div>
      </div>
    </header>
  )
}
