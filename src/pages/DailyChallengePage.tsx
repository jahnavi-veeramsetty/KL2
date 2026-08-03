import { Link } from 'react-router-dom'
import { Star, Code2, BrainCircuit, ListTodo, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react'
import DailyCalendar from '../components/dashboard/DailyCalendar'
import { dailyChallenges, problems } from '../data'
import { Button } from '../ui'
import { ROUTES } from '../constants/routes'

export default function DailyChallengePage() {
  const todayDateString = new Date().toISOString().split('T')[0]
  const challenge = dailyChallenges.find(c => c.date === todayDateString) || dailyChallenges[dailyChallenges.length - 1]

  // Only link out if the referenced problem actually exists. A dangling
  // problemId would otherwise send the user to ProblemPage, which silently
  // redirects to /practice — indistinguishable from a broken button.
  const linkedProblem = challenge.problemId
    ? problems.find(p => p.id === challenge.problemId || p.slug === challenge.problemId)
    : undefined

  const getIcon = () => {
    switch (challenge.type) {
      case 'Coding': return <Code2 className="w-5 h-5" />
      case 'Pattern': return <BrainCircuit className="w-5 h-5" />
      case 'MCQ': return <ListTodo className="w-5 h-5" />
    }
  }

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20'
    }
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 items-start mt-4 md:mt-8">
        
        {/* Left side: Grand Launchpad */}
        <div className="flex flex-col min-w-0">
          
          <div className="relative rounded-[2rem] p-6 md:p-8 lg:p-10 border border-white/10 bg-gradient-to-br from-[#0c142b] to-[#050914] shadow-2xl overflow-hidden group">
            {/* Glowing Orb Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-accent/30 group-hover:scale-110" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-center">
              
              {/* Subtle Top Meta */}
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-xs bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                  <Star className="w-3 h-3 fill-accent" />
                  Today's Mission
                </span>
                <span className="text-slate-400 font-medium text-xs">
                  {formattedDate}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-6 drop-shadow-lg">
                {challenge.title}
              </h1>

              {/* Metadata Pills */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm shadow-inner">
                  {getIcon()}
                  {challenge.type}
                </span>
                <span className={`px-4 py-2 rounded-xl text-sm font-bold border backdrop-blur-sm ${getDifficultyColor()}`}>
                  {challenge.difficulty}
                </span>
                <div className="flex items-center gap-2 text-amber-400 font-bold bg-amber-400/10 px-4 py-2 rounded-xl border border-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
                  <Trophy className="w-5 h-5" />
                  +{challenge.xpReward} XP
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-4">
                {challenge.isCompleted ? (
                   <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-base font-bold flex items-center justify-center gap-2 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                     <CheckCircle2 className="w-6 h-6" />
                     Challenge Completed! Great job!
                   </div>
                ) : linkedProblem ? (
                  <Link to={ROUTES.PROBLEM(linkedProblem.slug)} className="block group/btn">
                    <Button className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl font-black shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                      Solve Challenge <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-base font-semibold flex items-center justify-center gap-2 backdrop-blur-md">
                    {challenge.type === 'MCQ'
                      ? 'Answer this one from the Daily Challenge card — no editor needed.'
                      : 'This challenge is not available in the editor yet.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Consistency Calendar */}
        <div className="w-full shrink-0 xl:sticky xl:top-24 space-y-6">
          <DailyCalendar />
        </div>
        
      </div>
    </>
  )
}
