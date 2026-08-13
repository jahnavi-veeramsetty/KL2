import StarfieldBackground from "../components/landing/StarfieldBackground";
import HeroSection from "../components/landing/hero/HeroSection";
import AssociatedWithSection from "../components/landing/associated/AssociatedWithSection";
import AboutUsSection from "../components/landing/about/AboutUsSection";
import CollegeCollaborationsSection from "../components/landing/collaborations/CollegeCollaborationsSection";
import CourseSection from "../components/landing/course/CourseSection";
import PracticeSection from "../components/landing/practice/PracticeSection";
import TutorialSection from "../components/landing/tutorial/TutorialSection";
import MilestonesSection from "../components/landing/milestones/MilestonesSection";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    // on-dark: the marketing site keeps its own dark identity in both themes,
    // so anything shared with the app renders against dark tokens here.
    <div className="on-dark min-h-screen bg-[#000511] relative overflow-hidden font-sans text-slate-200">
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
        <AboutUsSection />

        {/* 3.5. Regional Reach / Collaborations */}
        <CollegeCollaborationsSection />

        {/* 4. Course Features */}
        <CourseSection />

        {/* 5. Practice & Code Environments */}
        <PracticeSection />

        {/* 6. Tutorials & Roadmaps */}
        <TutorialSection />

        {/* 7. Milestones & Achievements */}
        <MilestonesSection />
      </div>
      <div className="relative z-20 w-full bg-panel">
        <Footer />
      </div>
    </div>
  );
}
