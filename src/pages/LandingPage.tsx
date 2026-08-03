import StarfieldBackground from "../components/landing/StarfieldBackground";
import HeroSection from "../components/landing/hero/HeroSection";
import AssociatedWithSection from "../components/landing/associated/AssociatedWithSection";
import AboutUsSection from "../components/landing/about/AboutUsSection";
import ParticleNetwork from "../components/landing/about/ParticleNetwork";
import CourseSection from "../components/landing/course/CourseSection";
import PracticeSection from "../components/landing/practice/PracticeSection";
import TutorialSection from "../components/landing/tutorial/TutorialSection";
import MilestonesSection from "../components/landing/milestones/MilestonesSection";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000511] relative overflow-hidden font-sans text-slate-200">
      <StarfieldBackground />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* --- CONTENT LAYERS --- */}
      <div className="relative z-50 w-full">
        <Nav />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Brand Association Banner */}
        <AssociatedWithSection />

        {/* 3. About Us / Our Ecosystem */}
        <div className="w-full relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000511] via-[#000511]/80 to-[#000511] pointer-events-none" />
          <div className="relative z-10 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutUsSection />
            <ParticleNetwork />
          </div>
        </div>

        {/* 4. Course Features */}
        <CourseSection />

        {/* 5. Practice & Code Environments */}
        <PracticeSection />

        {/* 6. Tutorials & Roadmaps */}
        <TutorialSection />

        {/* 7. Milestones & Achievements */}
        <MilestonesSection />
      </div>
      <div className="relative z-20 w-full bg-secondary">
        <Footer />
      </div>
    </div>
  );
}
