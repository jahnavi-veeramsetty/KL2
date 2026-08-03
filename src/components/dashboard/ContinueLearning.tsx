import { Link } from 'react-router-dom'
import { continueLearningItems } from '../../data/continueLearning'
import { ROUTES } from '../../constants/routes'
import { Card } from '../../ui'

export function ContinueLearning() {
  if (continueLearningItems.length === 0) return null

  const getGradient = (color?: string) => {
    switch (color) {
      case 'teal': return 'from-teal-900/80 via-teal-900/20 to-[#0a0f1c]'
      case 'green': return 'from-emerald-900/80 via-emerald-900/20 to-[#0a0f1c]'
      case 'blue': return 'from-blue-900/80 via-blue-900/20 to-[#0a0f1c]'
      default: return 'from-white/10 to-[#0a0f1c]'
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">Continue Learning</h2>
        <Link to={ROUTES.COURSES} className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
          View all 
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {continueLearningItems.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            to={ROUTES.COURSE_DETAIL(item.courseId)}
            className="group block focus-visible:outline-none rounded-[20px]"
          >
            <Card className="h-full p-0">
              {/* Top Gradient Background */}
              <div className={`absolute inset-0 h-40 bg-gradient-to-b ${getGradient(item.color)} opacity-80 pointer-events-none`} />

              <div className="relative p-5 flex flex-col h-full min-h-[200px]">
                {/* Badge */}
                {item.badgeType && (
                  <div className="mb-auto">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      item.badgeType === 'FREE' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {item.badgeType}
                    </span>
                  </div>
                )}

                {/* Spacer if no badge to push content down */}
                {!item.badgeType && <div className="mb-auto" />}

                {/* Content Bottom */}
                <div className="mt-12">
                  <h3 className="text-white font-semibold text-[17px] mb-1.5 group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  
                  {item.timeRemaining && (
                    <div className="flex items-center text-sm text-slate-400 mb-6">
                      <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.timeRemaining}
                    </div>
                  )}

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-slate-400 font-medium">Progress</span>
                      <span className="text-xs text-white font-semibold">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
