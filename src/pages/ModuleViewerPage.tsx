import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, ChevronDown, PlayCircle, FileText, Code, Menu, Maximize, Minimize, Copy, Search, ClipboardList, BrainCircuit, Rocket } from 'lucide-react'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { moduleDataMap, type ContentBlock } from '../data/lms/moduleContent'
import { lmsCourses } from '../data/lms/courseContent'

// --- Code Block Component ---
function CodeBlock({ language, code }: { language?: string, code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-line bg-[#0d1117] my-10 shadow-lg">
      <div className="bg-panel px-5 py-2.5 text-xs font-mono text-subtle border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 hidden sm:flex">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <span>{language || 'text'}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-strong transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-6 text-[13px] sm:text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// --- Content Renderer Component ---
function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            const HeadingTag = `h${block.level}` as any
            return (
              <HeadingTag key={index} className={`font-bold text-strong ${block.level === 1 ? 'text-3xl mb-6' : block.level === 2 ? 'text-2xl mt-8 mb-4' : 'text-xl mt-6 mb-3'}`}>
                {block.text}
              </HeadingTag>
            )
          case 'paragraph':
            return <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: block.html }} />
          case 'code':
            return <CodeBlock key={index} language={block.language} code={block.code} />
          case 'table':
            return (
              <div key={index} className="overflow-x-auto my-6 border border-line rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-panel text-strong font-bold border-b border-line">
                    <tr>
                      {block.headers.map((h, i) => <th key={i} className="px-4 py-3">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {block.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-raised/30 transition-colors">
                        {row.map((cell, j) => <td key={j} className="px-4 py-3">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'list':
            const ListTag = block.format === 'number' ? 'ol' : 'ul'
            const listClass = block.format === 'number' ? 'list-decimal' : 'list-disc'
            return (
              <ListTag key={index} className={`${listClass} pl-6 space-y-2 my-4`}>
                {block.items.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ListTag>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default function ModuleViewerPage() {
  const { courseId, moduleId, topicId } = useParams<{ courseId: string, moduleId: string, topicId?: string }>()
  const navigate = useNavigate()

  // Look up the course data to get the list of modules
  const course = lmsCourses[courseId || ''] || lmsCourses['java-full-stack']

  // Use mock data for internal module content if available, fallback to dynamic generation
  let moduleData = moduleDataMap[moduleId || '']
  
  if (!moduleData) {
    const fallbackModule = course?.modules.find(m => m.id === moduleId)
    if (fallbackModule) {
      moduleData = {
        id: fallbackModule.id,
        title: fallbackModule.title,
        days: [
          {
            id: 'day-1',
            title: 'Day 1: Overview & Setup',
            topics: [
              {
                id: 'topic-1-1',
                title: fallbackModule.title + ' Introduction',
                type: (fallbackModule.type === 'video' ? 'video' : 'reading') as any,
                isCompleted: false,
                content: [
                  { type: 'heading', level: 1, text: fallbackModule.title },
                  { type: 'paragraph', html: `This is dynamically generated placeholder content for the <strong>${fallbackModule.title}</strong> module. The actual detailed curriculum and lessons for this module will be loaded here.` }
                ]
              }
            ]
          }
        ]
      }
    } else {
      moduleData = moduleDataMap['m1']
    }
  }

  // Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Compute search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    const results: { moduleId: string, topicId?: string, title: string, type: 'module' | 'topic', moduleTitle: string }[] = []
    
    course.modules.forEach(m => {
      if (m.title.toLowerCase().includes(query)) {
        results.push({ moduleId: m.id, title: m.title, type: 'module', moduleTitle: m.title })
      }
      
      const detailedData = moduleDataMap[m.id]
      if (detailedData) {
        detailedData.days.forEach(day => {
          day.topics.forEach(topic => {
            if (topic.title.toLowerCase().includes(query) || day.title.toLowerCase().includes(query)) {
              results.push({ moduleId: m.id, topicId: topic.id, title: topic.title, type: 'topic', moduleTitle: m.title })
            }
          })
        })
      }
    })
    return results
  }, [searchQuery, course])

  // Determine the display title for the module
  const currentModuleTitle = course?.modules.find(m => m.id === moduleId)?.title || moduleData.title

  // Flatten topics for easy next/prev navigation
  const allTopics = moduleData.days.flatMap(day =>
    day.topics.map(topic => ({ ...topic, dayId: day.id, dayTitle: day.title }))
  )

  let currentTopicIndex = 0
  if (topicId) {
    const found = allTopics.findIndex(t => t.id === topicId)
    if (found !== -1) currentTopicIndex = found
  }

  const currentTopic = allTopics[currentTopicIndex]
  const currentDay = moduleData.days.find(d => d.id === currentTopic.dayId)

  // State for Navigation
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    [currentDay?.id || moduleData.days[0].id]: true
  })

  // Progress state (simulating completion)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set(
    allTopics.filter(t => t.isCompleted).map(t => t.id)
  ))

  const scrollRef = useRef<HTMLDivElement>(null)

  // Sidebar Resizing State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isDragging, setIsDragging] = useState(false)
  
  // Module Dropdown State
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false)
  
  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.log(err))
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.log(err))
    }
  }

  // Handle Dragging Events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      // Constrain sidebar width between 200px and 600px
      const newWidth = Math.max(200, Math.min(e.clientX, 600))
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none' // Prevent text highlighting during drag
    } else {
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  // Redirect to first topic if no topicId is in the URL
  useEffect(() => {
    if (!topicId && allTopics.length > 0) {
      navigate(`/lms/${courseId}/module/${moduleId}/topic/${allTopics[0].id}`, { replace: true })
    }
  }, [topicId, courseId, moduleId, navigate, allTopics])

  // Auto-expand day when topic changes
  useEffect(() => {
    if (currentDay && !expandedDays[currentDay.id]) {
      toggleDay(currentDay.id)
    }
  }, [currentTopicIndex])

  const toggleDay = (dayId: string) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }))
  }

  const goToTopic = (index: number) => {
    if (index >= 0 && index < allTopics.length) {
      navigate(`/lms/${courseId}/module/${moduleId}/topic/${allTopics[index].id}`)
      if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      goToTopic(currentTopicIndex - 1)
    } else if (course) {
      const currentModuleIndex = course.modules.findIndex(m => m.id === moduleId)
      if (currentModuleIndex > 0) {
        const prevModule = course.modules[currentModuleIndex - 1]
        const prevModuleData = moduleDataMap[prevModule.id]
        if (prevModuleData) {
          const lastDay = prevModuleData.days[prevModuleData.days.length - 1]
          const lastTopic = lastDay.topics[lastDay.topics.length - 1]
          navigate(`/lms/${course.courseId}/module/${prevModule.id}/topic/${lastTopic.id}`)
          if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          navigate(`/lms/${course.courseId}/module/${prevModule.id}`)
        }
      }
    }
  }

  const handleNext = () => {
    if (currentTopicIndex < allTopics.length - 1) {
      goToTopic(currentTopicIndex + 1)
    } else if (course) {
      const currentModuleIndex = course.modules.findIndex(m => m.id === moduleId)
      if (currentModuleIndex >= 0 && currentModuleIndex < course.modules.length - 1) {
        const nextModule = course.modules[currentModuleIndex + 1]
        const nextModuleData = moduleDataMap[nextModule.id]
        if (nextModuleData) {
          const firstDay = nextModuleData.days[0]
          const firstTopic = firstDay.topics[0]
          navigate(`/lms/${course.courseId}/module/${nextModule.id}/topic/${firstTopic.id}`)
          if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          navigate(`/lms/${course.courseId}/module/${nextModule.id}`)
        }
      }
    }
  }

  const markCompleteAndNext = () => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev)
      newSet.add(currentTopic.id)
      return newSet
    })

    // Go to next
    handleNext()
  }

  const breadcrumbs = (
    <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-semibold w-full flex-1 min-w-0 pr-4">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-1.5 -ml-1.5 rounded-lg text-subtle hover:text-strong hover:bg-raised transition-colors shrink-0"
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Module Dropdown */}
      <div className="relative shrink-0 flex items-center">
        {isModuleDropdownOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsModuleDropdownOpen(false)} />
        )}
        <div className="relative z-40">
          <button 
            onClick={() => setIsModuleDropdownOpen(!isModuleDropdownOpen)}
            className="flex items-center gap-1.5 text-subtle hover:text-strong transition-colors max-w-[200px] sm:max-w-[150px] md:max-w-[200px]"
            title={currentModuleTitle}
          >
            <span className="truncate">{currentModuleTitle}</span>
            <ChevronDown className="w-4 h-4 shrink-0" />
          </button>
          
          {isModuleDropdownOpen && (
            <div className="absolute top-full left-0 mt-3 w-80 bg-panel border border-line rounded-xl shadow-xl overflow-y-auto max-h-[60vh] py-1">
              {course.modules.map((m, index) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setIsModuleDropdownOpen(false)
                    navigate(`/lms/${course.courseId}/module/${m.id}`)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-raised transition-colors flex items-center justify-between ${m.id === moduleId ? 'text-accent font-bold bg-accent/5' : 'text-strong'}`}
                >
                  <span className="truncate pr-4">{index + 1}. {m.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hide Day and Topic breadcrumbs on mobile */}
      <ChevronRight className="hidden sm:block w-4 h-4 text-faint shrink-0" />
      <span className="hidden sm:inline-block text-subtle truncate max-w-[100px] md:max-w-[120px] shrink-0" title={currentDay?.title}>{currentDay?.title}</span>
      <ChevronRight className="hidden sm:block w-4 h-4 text-faint shrink-0" />
      <span className="hidden sm:inline-block text-strong truncate min-w-[60px] max-w-[150px]" title={currentTopic.title}>{currentTopic.title}</span>
    </div>
  )

  const headerRight = (
    <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-1 justify-end">
      
      {/* Search Bar */}
      <div className="relative hidden md:block max-w-[280px] w-full mr-2">
        <div className="relative">
          <Search className="w-4 h-4 text-subtle absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search course..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className="w-full bg-raised border border-line focus:border-accent/50 rounded-lg pl-9 pr-4 py-1.5 text-sm text-strong outline-none transition-colors shadow-sm"
          />
        </div>
        
        {/* Search Results Dropdown */}
        {isSearchFocused && searchQuery.trim() !== '' && (
          <div className="absolute top-full right-0 mt-2 w-[400px] bg-panel border border-line rounded-xl shadow-xl overflow-hidden py-2 z-50 max-h-[60vh] overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="px-4 py-3 text-sm text-subtle text-center">No results found for "{searchQuery}"</div>
            ) : (
              searchResults.map((result, idx) => (
                <button
                  key={`${result.moduleId}-${result.topicId || idx}`}
                  onClick={() => {
                    navigate(`/lms/${course.courseId}/module/${result.moduleId}${result.topicId ? '/topic/' + result.topicId : ''}`)
                    setSearchQuery('')
                    setIsSearchFocused(false)
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-raised transition-colors flex flex-col gap-1 border-b border-line/50 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-strong text-sm truncate pr-2">{result.title}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent shrink-0">{result.type}</span>
                  </div>
                  <span className="text-xs text-subtle truncate">Module: {result.moduleTitle}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <ThemeToggle />
      
      {/* Hide Fullscreen button on mobile */}
      <button
        onClick={toggleFullscreen}
        className="hidden sm:flex px-4 py-1.5 text-sm font-bold bg-raised hover:bg-line text-strong rounded-lg transition-colors items-center gap-2"
      >
        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
      </button>
    </div>
  )

  const getTopicIcon = (type: string, isCompleted: boolean) => {
    if (isCompleted) return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
    switch (type) {
      case 'reading': return <FileText className="w-4 h-4 text-subtle shrink-0" />
      case 'video': return <PlayCircle className="w-4 h-4 text-subtle shrink-0" />
      case 'coding': return <Code className="w-4 h-4 text-subtle shrink-0" />
      case 'quiz': return <ClipboardList className="w-4 h-4 text-accent shrink-0" />
      default: return <FileText className="w-4 h-4 text-subtle shrink-0" />
    }
  }

  return (
    <div className="h-[100dvh] w-full bg-page flex flex-col relative overflow-hidden">
      {/* Minimal Top Header */}
      <div className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 lg:px-6 border-b border-line bg-panel/90 backdrop-blur-md">
        {breadcrumbs}
        {headerRight}
      </div>

      <main className="flex-1 pt-14 w-full flex overflow-hidden">

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar (Drawer on Mobile, Resizable on Desktop) */}
        <aside
          className={`
            shrink-0 border-r border-line bg-panel overflow-x-hidden overflow-y-auto flex flex-col whitespace-nowrap
            fixed inset-y-0 left-0 z-40 h-[100dvh] pt-14 w-[280px]
            md:relative md:z-auto md:h-auto md:pt-0 md:w-[var(--md-width)]
            ${isDragging ? '' : 'transition-all duration-300 ease-in-out'}
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
          style={{ '--md-width': `${isSidebarOpen ? sidebarWidth : 0}px` } as React.CSSProperties}
        >

          <div className="p-3">
            {moduleData.days.map((day) => {
              const isExpanded = expandedDays[day.id]
              return (
                <div key={day.id} className="mb-2">
                  <button
                    onClick={() => toggleDay(day.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-raised transition-colors text-left"
                  >
                    <span className="font-bold text-sm text-strong">{day.title}</span>
                    <ChevronDown className={`w-4 h-4 text-subtle transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-1 pl-2 space-y-1">
                      {day.topics.map(topic => {
                        const isCurrent = currentTopic.id === topic.id
                        const isCompleted = completedTopics.has(topic.id)
                        const topicIndex = allTopics.findIndex(t => t.id === topic.id)

                        return (
                          <button
                            key={topic.id}
                            onClick={() => {
                              goToTopic(topicIndex)
                              if (window.innerWidth < 768) setIsSidebarOpen(false)
                            }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-lg transition-colors relative z-10 text-left group
                              ${isCurrent ? 'bg-accent/10 text-accent' : 'hover:bg-raised text-subtle'}
                            `}
                          >
                            <div className="mt-0.5 shrink-0 bg-panel group-hover:bg-raised transition-colors">
                              {getTopicIcon(topic.type, isCompleted)}
                            </div>
                            <span className={`text-sm font-semibold leading-tight ${isCurrent ? 'text-accent' : 'group-hover:text-strong'}`}>
                              {topic.title}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>

        {/* Drag Handle */}
        {isSidebarOpen && (
          <div
            className="w-1.5 -ml-[3px] shrink-0 cursor-col-resize hover:bg-accent/50 active:bg-accent transition-colors hidden md:block z-20 relative"
            onMouseDown={() => setIsDragging(true)}
          />
        )}

        {/* Main Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-page" ref={scrollRef}>
          <div className="max-w-4xl px-8 sm:px-12 lg:px-16 py-10 pb-32">

            {/* Dynamic Content Rendering */}
            {currentTopic.type === 'quiz' ? (
              <div className="flex flex-col items-center justify-center py-6 sm:py-10 px-4 h-full">
                <div className="max-w-2xl w-full bg-panel border border-line rounded-3xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
                  
                  {/* Decorative background elements */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-accent/20">
                      <BrainCircuit className="w-10 h-10 text-accent" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-strong tracking-tight mb-3">{currentTopic.title}</h2>
                    
                    <p className="text-subtle text-base mb-8 max-w-md mx-auto leading-relaxed">
                      This module concludes with a comprehensive Knowledge Check. You will have <strong className="text-strong">15 minutes</strong> to complete <strong className="text-strong">20 Multiple Choice Questions</strong>. 
                    </p>
                    
                    <button
                      onClick={() => window.open(`/lms/${courseId}/quiz/${currentTopic.id}`, '_blank')}
                      className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-on-accent font-extrabold text-base rounded-xl transition-all hover:bg-accent-strong active:scale-95 shadow-md shadow-accent/20 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Rocket className="w-4 h-4" />
                        Launch Quiz Environment
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <ContentRenderer blocks={currentTopic.content} />
            )}

            {/* Footer Actions */}
            <div className="mt-16 pt-8 border-t border-line flex items-center justify-between">
              {!(currentTopicIndex === 0 && course?.modules.findIndex(m => m.id === moduleId) === 0) ? (
                <button
                  onClick={handlePrevious}
                  className="px-5 py-2.5 rounded-lg border border-line text-sm font-bold text-strong hover:bg-raised transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={markCompleteAndNext}
                className="px-6 py-2.5 rounded-lg bg-accent text-on-accent text-sm font-extrabold hover:bg-accent-strong transition-all flex items-center gap-2 shadow-md shadow-accent/20 active:scale-95"
              >
                {completedTopics.has(currentTopic.id) ? 'Continue to Next' : 'Mark as Complete'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
