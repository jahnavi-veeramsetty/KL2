import StarfieldBackground from '../components/landing/StarfieldBackground'
import Footer from '../components/layout/Footer'
import Nav from '../components/select/Nav'
import Hero from '../components/select/Hero'
import HowItWorks from '../components/select/HowItWorks'
import WhySelect from '../components/select/WhySelect'
import TheStandard from '../components/select/TheStandard'
import TalentPool from '../components/select/TalentPool'
import CandidateProfile from '../components/select/CandidateProfile'
import Workspace from '../components/select/Workspace'
import Impact from '../components/select/Impact'
import Proof from '../components/select/Proof'
import FinalCTA from '../components/select/FinalCTA'
import ForCandidates from '../components/select/ForCandidates'
import FAQ from '../components/select/FAQ'

export default function SelectLandingPage() {
  return (
    <div className="on-dark min-h-screen bg-[#000511] relative overflow-hidden font-sans text-slate-200 selection:bg-accent/30 selection:text-white">
      <style>
        {`
          /* Hide scrollbar for the landing page */
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <StarfieldBackground disableInteractive={true} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      <div className="relative z-50 w-full">
        <Nav />
      </div>

      <main className="relative z-10 w-full flex flex-col items-center">
        <section className="w-full">
          <Hero />
        </section>
        
        <section id="how-it-works" className="w-full">
          <HowItWorks />
        </section>
        
        <section className="w-full">
          <WhySelect />
        </section>
        
        <section id="the-standard" className="w-full">
          <TheStandard />
        </section>
        
        <section className="w-full">
          <TalentPool />
        </section>
        
        <section className="w-full">
          <CandidateProfile />
        </section>
        
        <section id="workspace" className="w-full">
          <Workspace />
        </section>
        
        <section className="w-full">
          <Impact />
        </section>
        
        <section className="w-full">
          <Proof />
        </section>
        
        <div className="w-full">
          <FinalCTA />
        </div>
        
        <section id="for-candidates" className="w-full border-b border-line">
          <ForCandidates />
        </section>
        
        <section className="w-full">
          <FAQ />
        </section>
      </main>
      
      <div className="relative z-20 w-full bg-panel">
        <Footer />
      </div>
    </div>
  )
}
