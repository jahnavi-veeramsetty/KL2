import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ROUTES } from '../../constants/routes'

export function DailyQuizBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState('06:45:13')
  const navigate = useNavigate()

  // Simple countdown effect for the timer
  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [h, m, s] = prev.split(':').map(Number)
        let totalSeconds = h * 3600 + m * 60 + s - 1
        if (totalSeconds < 0) totalSeconds = 24 * 3600 - 1 // Reset to 24h

        const newH = Math.floor(totalSeconds / 3600)
        const newM = Math.floor((totalSeconds % 3600) / 60)
        const newS = totalSeconds % 60

        return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}:${newS.toString().padStart(2, '0')}`
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 24 }}
          exit={{ opacity: 0, y: -20, height: 0, marginBottom: 0, overflow: 'hidden' }}
          className="relative bg-gradient-to-r from-[#2a130c] to-[#1a0e0a] border border-[#f97316]/20 rounded-2xl flex items-center p-4 md:px-6 md:py-5 shadow-[0_0_30px_rgba(249,115,22,0.05)]"
        >
          {/* Lightning Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#f97316]/10 flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-[#f97316]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex-1 mr-4">
            <h3 className="text-white font-semibold md:text-lg flex items-center flex-wrap gap-x-2">
              Today's Daily Quiz is live! 
              <span className="text-[#f97316]">Earn +75 XP</span>
            </h3>
            <p className="text-muted text-sm mt-0.5">
              Resets in <span className="text-[#f97316] font-medium">{timeLeft}</span> — don't break your 14-day streak
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(ROUTES.DAILY_CHALLENGE)}
              className="hidden sm:block px-6 py-2 bg-[#f97316]/10 border border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/20 font-medium rounded-lg transition-colors"
            >
              Start Now
            </button>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-muted hover:text-white rounded-md hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
