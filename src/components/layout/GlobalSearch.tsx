import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchInput } from '../../ui'
import { courses, hackathons, contests } from '../../data'
import { ROUTES } from '../../constants/routes'

type SearchResult = {
  id: string
  title: string
  type: 'Course' | 'Hackathon' | 'Contest'
  url: string
  subtitle?: string
}

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Handle click outside to close dropdown
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const q = query.toLowerCase()
    const newResults: SearchResult[] = []

    // Search Courses
    courses.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.tags?.some(t => t.toLowerCase().includes(q))) {
        newResults.push({
          id: c.id,
          title: c.title,
          type: 'Course',
          url: ROUTES.COURSE_DETAIL(c.id),
          subtitle: c.level
        })
      }
    })

    // Search Hackathons
    hackathons.forEach(h => {
      if (h.title.toLowerCase().includes(q) || h.theme?.some(t => t.toLowerCase().includes(q))) {
        newResults.push({
          id: h.id,
          title: h.title,
          type: 'Hackathon',
          url: ROUTES.HACKATHON_DETAIL(h.id),
          subtitle: h.mode
        })
      }
    })


    // Search Contests
    contests.forEach(c => {
      if (c.title.toLowerCase().includes(q)) {
        newResults.push({
          id: c.id,
          title: c.title,
          type: 'Contest',
          url: ROUTES.CONTEST_DETAIL(c.id),
          subtitle: c.status
        })
      }
    })

    // Take top 8 results to avoid massive dropdown
    setResults(newResults.slice(0, 8))
    setIsOpen(true)
  }, [query])

  const handleResultClick = (url: string) => {
    setQuery('')
    setIsOpen(false)
    navigate(url)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Course': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'Hackathon': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'Contest': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      default: return 'bg-line-strong text-strong'
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full z-50">
      <SearchInput 
        placeholder="Search courses, contests, hackathons..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
        onFocus={() => {
          if (query.trim() && results.length > 0) setIsOpen(true)
        }}
      />
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-page/95 backdrop-blur-xl border border-line-strong rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="max-h-[60vh] overflow-y-auto p-2">
            {results.map(result => (
              <li key={`${result.type}-${result.id}`}>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-raised rounded-lg transition-colors flex items-center justify-between group"
                  onClick={() => handleResultClick(result.url)}
                >
                  <div className="flex flex-col">
                    <span className="text-strong font-medium group-hover:text-accent transition-colors">
                      {result.title}
                    </span>
                    {result.subtitle && (
                      <span className="text-xs text-subtle mt-0.5 capitalize">
                        {result.subtitle}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-md border uppercase tracking-wider font-semibold ${getTypeColor(result.type)}`}>
                    {result.type}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-page/95 backdrop-blur-xl border border-line-strong rounded-xl shadow-2xl p-6 text-center animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-subtle text-sm">No results found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
