import { useState, useMemo } from 'react'

import { ProblemSidebar } from '../components/practice/ProblemSidebar'
import { PracticeStatsStrip } from '../components/practice/PracticeStatsStrip'
import { ProblemTable } from '../components/practice/ProblemTable'
import { TopicFilterModal } from '../components/practice/TopicFilterModal'
import { SearchInput, Select } from '../ui'
import { problems as allProblems } from '../data'
import type { Difficulty, ProblemStatus, Problem } from '../types'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function PracticePage() {
  useDocumentTitle('Practice Problems')
  const [search, setSearch] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<ProblemStatus | 'all'>('all')
  const [showBookmarked, setShowBookmarked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [problemList, setProblemList] = useState<Problem[]>(allProblems)
  

  const filtered = useMemo(() => {
    let result = [...problemList]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.topics.some(t => t.toLowerCase().includes(q)))
    }
    if (selectedTopics.length > 0) {
      result = result.filter(p => selectedTopics.some(t => p.topics.includes(t)))
    }
    if (selectedDifficulty) {
      result = result.filter(p => p.difficulty === selectedDifficulty)
    }
    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status === selectedStatus)
    }
    if (showBookmarked) {
      result = result.filter(p => p.isBookmarked)
    }
    return result
  }, [problemList, search, selectedTopics, selectedDifficulty, selectedStatus, showBookmarked])

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const handleBookmarkToggle = (id: string) => {
    setProblemList(prev =>
      prev.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p)
    )
  }


  return (
        <div className="flex flex-1 pt-20 lg:pt-14 h-full overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside 
          className={`
            fixed top-20 lg:top-14 h-[calc(100vh-5rem)] lg:h-[calc(100vh-3.5rem)]
            w-72 bg-page border-r border-line z-40
            overflow-y-auto no-scrollbar transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden
            flex-shrink-0 p-4
          `}
          style={{ left: 0 }}
        >
          <ProblemSidebar
            showBookmarked={showBookmarked}
            onBookmarkToggle={() => setShowBookmarked(v => !v)}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 h-full min-w-0 p-4 md:p-8 overflow-y-auto no-scrollbar">
          {/* Mobile sidebar toggle */}
          <button
            className="lg:hidden mb-4 flex items-center gap-2 text-sm text-subtle hover:text-strong"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Filters & Plans
          </button>

          {/* Stats */}
          <PracticeStatsStrip />

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <SearchInput
              className="flex-1"
              placeholder="Search problems..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClear={() => setSearch('')}
            />
            <TopicFilterModal
              selectedTopics={selectedTopics}
              onTopicToggle={handleTopicToggle}
              onClear={() => setSelectedTopics([])}
            />
            {/* Two half-width selects on one line below sm. `sm:contents`
                dissolves this wrapper from sm up, so they become direct flex
                children again and the desktop row is unchanged — same approach
                as the course and masterclass filters. */}
            <div className="grid grid-cols-2 gap-3 sm:contents">
              <Select
                options={[
                  { label: 'Difficulty', value: 'all' },
                  { label: 'Easy', value: 'Easy' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Hard', value: 'Hard' }
                ]}
                value={selectedDifficulty || 'all'}
                onChange={(e) => setSelectedDifficulty(e.target.value === 'all' ? null : e.target.value as Difficulty)}
                className="min-w-0 sm:w-36"
              />
              <Select
                options={[
                  { label: 'Status', value: 'all' },
                  { label: 'Solved', value: 'solved' },
                  { label: 'Attempted', value: 'attempted' },
                  { label: 'Todo', value: 'todo' }
                ]}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ProblemStatus | 'all')}
                className="min-w-0 sm:w-36"
              />
            </div>
          </div>

          {/* Count */}
          <p className="text-xs text-subtle mb-3">
            Showing {filtered.length} of {allProblems.length} problems
          </p>

          <ProblemTable problems={filtered} onBookmarkToggle={handleBookmarkToggle} />
        </main>

        {/* Desktop Sidebar (Moved to right) */}
        <aside 
          className={`
            hidden lg:block
            h-full w-72 bg-page border-l border-line z-40
            overflow-y-auto no-scrollbar
            flex-shrink-0 p-4
          `}
        >
          <ProblemSidebar
            showBookmarked={showBookmarked}
            onBookmarkToggle={() => setShowBookmarked(v => !v)}
          />
        </aside>

        </div>
  )
}
