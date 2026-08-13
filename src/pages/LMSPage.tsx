import { useState, useEffect, useRef } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import {
  PlayCircle, CheckCircle, FileText, LayoutList, Clock, Trophy,
  Grid, List
} from 'lucide-react'
import { lmsCourses, type LmsModule } from '../data/lms/courseContent'
import { moduleDataMap } from '../data/lms/moduleContent'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ROUTES } from '../constants/routes'
import { ProgressBar, Card } from '../ui'

export default function LMSPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = lmsCourses[courseId || '']
  
  useDocumentTitle(course?.title || 'Course')

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [visibleCount, setVisibleCount] = useState(6)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + 6)
        }
      },
      { rootMargin: '100px' }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loaderRef])

  if (!courseId || !lmsCourses[courseId]) {
    return <Navigate to={ROUTES.COURSES} replace />
  }
  const displayedModules = course.modules.slice(0, visibleCount)
  const hasMoreModules = course.modules.length > visibleCount

  const getLessonsCount = (module: LmsModule) => {
    const detailedData = moduleDataMap[module.id]
    const totalLessons = detailedData ? detailedData.days.length : 4
    const completedLessons = Math.round((module.progress / 100) * totalLessons)
    return `${completedLessons} / ${totalLessons} Lessons`
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-accent" />
      case 'reading': return <FileText className="w-5 h-5 text-emerald-500" />
      case 'exercise': return <LayoutList className="w-5 h-5 text-orange-500" />
      case 'quiz': return <CheckCircle className="w-5 h-5 text-purple-500" />
      default: return <PlayCircle className="w-5 h-5 text-accent" />
    }
  }

  const getTags = () => {
    if (courseId === 'python-full-stack') {
      return ['Python', 'Django', 'PostgreSQL', 'React']
    } else if (courseId === 'java-full-stack') {
      return ['Java', 'Spring Boot', 'MySQL', 'React']
    } else {
      return ['Python', 'TensorFlow', 'PyTorch', 'Data Science']
    }
  }

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto w-full pt-4 pb-20">

      {/* Hero Header (Clean Banner) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-6">

        {/* Course Information */}
        <div className="flex-1 min-w-0 z-10">
          <div className="flex items-center gap-3 text-xs font-bold mb-5 uppercase tracking-wider text-subtle">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> {course.totalDurationHours}H TOTAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            <span>
              {course.totalModules} MODULES
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-strong tracking-tight mb-5 leading-tight">
            {course.title}
          </h1>

          <p className="text-subtle text-base md:text-lg max-w-3xl leading-relaxed mb-8">
            {course.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap mt-2">
            {getTags().map((tag, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-panel border border-line px-4 py-1.5 rounded-full text-[13px] font-semibold text-strong">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {tag}
              </span>
            ))}

            <Link 
              to={`/lms/${courseId}/module/${course.modules.find(m => m.progress < 100)?.id || course.modules[0].id}`} 
              className="w-full flex justify-center mt-3 sm:mt-0 sm:w-auto sm:ml-2 sm:block"
            >
              <button className="px-8 py-3 bg-accent text-on-accent font-extrabold text-base rounded-xl transition-all hover:bg-accent-strong active:scale-95 shadow-lg shadow-accent/30 flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Continue Learning
              </button>
            </Link>
          </div>
        </div>

        {/* Progress Stats Card */}
        <div className="relative w-full lg:w-80 shrink-0 z-10">
          <Card className="p-6 bg-panel border-line shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-strong uppercase tracking-wider">Course Progress</span>
              <span className="text-2xl font-black text-accent">{course.overallProgress}%</span>
            </div>

            <ProgressBar
              value={course.overallProgress}
              color="accent"
              size="md"
              className="mb-6"
            />

            <div className="grid grid-cols-2 gap-4 text-center border-t border-line pt-5">
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-faint uppercase tracking-widest mb-1.5">Modules Completed</div>
                <div className="text-xl font-bold text-emerald-500">
                  {course.modulesCompleted} <span className="text-subtle text-base">/ {course.totalModules}</span>
                </div>
              </div>
              <div className="flex flex-col items-center border-l border-line">
                <div className="text-[10px] font-bold text-faint uppercase tracking-widest mb-1.5">XP Earned<br />In Course</div>
                <div className="text-xl font-bold text-yellow-500 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  {course.totalXP}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Curriculum Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl font-extrabold text-strong flex items-center gap-3">
            <span className="w-6 h-1 bg-accent rounded-full" />
            Curriculum
          </h2>

          <div className="hidden sm:flex items-center gap-1 bg-panel border border-line p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${viewMode === 'grid' ? 'bg-raised text-strong shadow-sm border border-line' : 'text-subtle hover:text-strong hover:bg-raised/50 border border-transparent'}`}
            >
              <Grid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${viewMode === 'list' ? 'bg-raised text-strong shadow-sm border border-line' : 'text-subtle hover:text-strong hover:bg-raised/50 border border-transparent'}`}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedModules.map((module: LmsModule, index: number) => (
              <Link 
                to={`/lms/${courseId}/module/${module.id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={module.id} 
                className="block outline-none"
              >
                <Card
                  className="p-6 bg-panel border-line hover:border-accent/40 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full rounded-2xl group"
                >
                  <div className="flex items-start gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-page border border-line flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {getIconForType(module.type)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-subtle uppercase tracking-widest block mb-1 group-hover:text-accent transition-colors">Module {index + 1}</span>
                    <h3 className="text-base font-bold text-strong leading-snug">
                      {module.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-auto space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-faint uppercase tracking-wider">
                    <div className="flex items-center gap-3.5">
                      <span>{getLessonsCount(module)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {module.durationMins} MIN</span>
                    </div>
                    <span className={`text-xs font-black ${module.progress === 100 ? 'text-emerald-500' : 'text-strong'}`}>
                      {module.progress}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={module.progress} 
                    color={module.progress === 100 ? 'easy' : 'accent'} 
                    className="h-1.5"
                  />
                </div>
              </Card>
             </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayedModules.map((module: LmsModule, index: number) => (
              <Link 
                to={`/lms/${courseId}/module/${module.id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={module.id} 
                className="block outline-none"
              >
                <Card
                  className="flex flex-col sm:flex-row sm:items-center p-5 gap-6 bg-panel border-line hover:border-accent/40 hover:shadow-md transition-all cursor-pointer rounded-2xl group"
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-page border border-line flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {getIconForType(module.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-subtle uppercase tracking-widest block mb-1 group-hover:text-accent transition-colors">Module {index + 1}</span>
                    <h3 className="text-base font-bold text-strong leading-snug truncate">
                      {module.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-line">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-subtle uppercase w-20 tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> {module.durationMins}m
                  </div>
                  <div className="flex flex-col gap-1.5 w-40 shrink-0 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-faint uppercase tracking-wider">
                       <span>{getLessonsCount(module)}</span>
                       <span className={`text-xs font-black text-right ${module.progress === 100 ? 'text-emerald-500' : 'text-strong'}`}>
                         {module.progress}%
                       </span>
                    </div>
                    <ProgressBar 
                      value={module.progress} 
                      color={module.progress === 100 ? 'easy' : 'accent'} 
                      className="h-1.5"
                    />
                  </div>
                </div>
              </Card>
             </Link>
            ))}
          </div>
        )}

        {hasMoreModules && (
          <div ref={loaderRef} className="mt-10 flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-line border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

    </div>
  )
}
