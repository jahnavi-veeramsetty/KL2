import { Link } from 'react-router-dom'
import { CheckCircle2, Code2, BrainCircuit, ListTodo, Trophy, ArrowRight } from 'lucide-react'
import { Button } from '../../ui'
import type { DailyChallenge } from '../../types'
import { ROUTES } from '../../constants/routes'

interface DailyChallengeCardProps {
  challenge: DailyChallenge
  isToday?: boolean
}

export function DailyChallengeCard({ challenge, isToday = false }: DailyChallengeCardProps) {
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

  return (
    <div className={`rounded-3xl p-6 lg:p-8 border transition-all ${
      isToday 
        ? 'spotlight-accent border-accent/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]' 
        : 'bg-raised/20 border-line opacity-80 hover:opacity-100'
    }`}>
      
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-raised border border-line-strong text-body">
            {getIcon()}
            {challenge.type}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor()}`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
          <Trophy className="w-4 h-4" />
          +{challenge.xpReward} XP
        </div>
      </div>

      {/* Content */}
      <h3 className={`font-extrabold text-strong mb-8 ${isToday ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
        {challenge.title}
      </h3>

      {/* Dynamic Action Area */}
      <div>
        {challenge.isCompleted ? (
           <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold flex items-center justify-center gap-2">
             <CheckCircle2 className="w-5 h-5" />
             Challenge Completed!
           </div>
        ) : (
          <Link to={ROUTES.PROBLEM(challenge.problemId || 'unknown')} className="block">
            <Button className="w-full py-4 text-lg rounded-xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2">
              Solve Challenge <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
