export default function Footer() {
  return (
    <footer className="bg-panel border-t border-line py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="text-xl font-semibold tracking-tight text-strong block mb-2">
              Knowvation <span className="text-accent">Select</span>
            </a>
            <p className="text-sm text-subtle">
              Hiring talent that's already proven itself.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-strong mb-4">For employers</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-subtle hover:text-accent transition-colors">Browse talent</a></li>
              <li><a href="#how-it-works" className="text-subtle hover:text-accent transition-colors">How it works</a></li>
              <li><a href="#the-standard" className="text-subtle hover:text-accent transition-colors">The Select standard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-strong mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#for-candidates" className="text-subtle hover:text-accent transition-colors">For candidates</a></li>
              <li><a href="#" className="text-subtle hover:text-accent transition-colors">About Knowvation</a></li>
              <li><a href="#" className="text-subtle hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-strong mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-subtle hover:text-accent transition-colors">Privacy policy</a></li>
              <li><a href="#" className="text-subtle hover:text-accent transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-line pt-8 flex items-center justify-between">
          <p className="text-sm text-faint">© {new Date().getFullYear()} Knowvation Select</p>
        </div>
      </div>
    </footer>
  )
}
