import { Link } from 'react-router-dom'
import { continueLearningItems } from '../../data/continueLearning'
import { ROUTES } from '../../constants/routes'
import { Card } from '../../ui'
import { ViewAllLink } from '../../ui/ViewAllLink'

export function ContinueLearning() {
  if (continueLearningItems.length === 0) return null

  // Dark gets a wash fading to transparent, which reads as the card being lit
  // from the top. Light flattens it to one flat band of the same hue — a
  // fading pastel over white has no light to fall off from, it just smears.
  const getGradient = (color?: string) => {
    switch (color) {
      case 'teal': return 'from-teal-500/30 via-teal-500/8 to-transparent light:bg-none light:bg-teal-500/12'
      case 'green': return 'from-emerald-500/30 via-emerald-500/8 to-transparent light:bg-none light:bg-emerald-500/12'
      case 'blue': return 'from-blue-500/30 via-blue-500/8 to-transparent light:bg-none light:bg-blue-500/12'
      default: return 'from-strong/10 to-transparent light:bg-none light:bg-strong/[0.06]'
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-strong tracking-tight">Continue Learning</h2>
        <ViewAllLink to={ROUTES.COURSES} />
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
                  <h3 className="text-strong font-semibold text-[17px] mb-1.5 line-clamp-1">
                    {item.title}
                  </h3>
                  
                  {item.timeRemaining && (
                    <div className="flex items-center text-sm text-subtle mb-6">
                      <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.timeRemaining}
                    </div>
                  )}

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-subtle font-medium">Progress</span>
                      <span className="text-xs text-strong font-semibold">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-raised rounded-full overflow-hidden">
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
