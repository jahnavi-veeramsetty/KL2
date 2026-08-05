import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chip } from '../../ui'

const TOPICS = [
  'Arrays', 'Strings', 'Hashing', 'Linked List', 'Stacks & Queues',
  'Trees', 'Graphs', 'Recursion', 'Backtracking', 'DP', 'Greedy',
  'Sorting', 'Searching', 'Bit Manipulation', 'Math', 'SQL'
]

interface TopicFilterModalProps {
  selectedTopics: string[]
  onTopicToggle: (topic: string) => void
  onClear: () => void
}

export function TopicFilterModal({ selectedTopics, onTopicToggle, onClear }: TopicFilterModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 px-4 rounded-lg bg-panel border border-line text-sm font-medium text-strong hover:bg-raised transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Topics {selectedTopics.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-md bg-accent/20 text-accent text-xs">{selectedTopics.length}</span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-panel border border-line-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-line-strong">
                <h2 className="text-lg font-bold text-strong">Filter by Topic</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-subtle hover:text-strong rounded-lg hover:bg-raised transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto no-scrollbar">
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(topic => (
                    <Chip
                      key={topic}
                      selected={selectedTopics.includes(topic)}
                      onClick={() => onTopicToggle(topic)}
                    >
                      {topic}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-line-strong bg-page flex justify-between items-center">
                <button
                  onClick={onClear}
                  className="text-sm font-medium text-subtle hover:text-strong transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 bg-accent text-on-accent text-sm font-bold rounded-lg hover:bg-accent-strong transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
