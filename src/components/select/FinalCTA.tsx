import { Button } from '../../ui/Button'

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#060B19] relative border-y border-line-strong overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Stop sorting resumes. Start meeting candidates who fit.
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Post the role. Meet Select-qualified talent. Interview, evaluate and onboard — in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">Post a role</Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-slate-300 bg-transparent hover:bg-white/5"
          >
            Browse qualified talent
          </Button>
        </div>
      </div>
    </section>
  )
}
