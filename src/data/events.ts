import type { EventItem } from '../types'
import cardImage from '../assets/cardimage.webp'

// Helper to get dates relative to today
const getRelativeDate = (offsetDays: number) => {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d
}

// Generate dynamic events spanning the current week
export const upcomingEvents: EventItem[] = [
  { 
    id: 1, 
    eventId: 'weekly-contest-364',
    title: 'Weekly Coding Contest 364', 
    date: '10:00 AM IST',
    isoDate: getRelativeDate(1).toISOString(), // Tomorrow
    type: 'Coding Contest', 
    image: cardImage,
    color: 'blue'
  },
  { 
    id: 2, 
    eventId: 'ai-innovation-hackathon',
    title: 'AI Innovation Hackathon', 
    date: '2:00 PM IST', 
    isoDate: getRelativeDate(2).toISOString(),
    type: 'Hackathon', 
    image: cardImage,
    color: 'purple'
  },
  { 
    id: 3, 
    eventId: 'biweekly-contest-113',
    title: 'Biweekly Contest 113', 
    date: '1:00 PM IST', 
    isoDate: getRelativeDate(-1).toISOString(), // Yesterday
    type: 'Coding Contest', 
    image: cardImage,
    color: 'teal'
  },
  { 
    id: 4, 
    eventId: 'web3-global-hack',
    title: 'Web3 Global Hackathon', 
    date: '9:00 AM IST', 
    isoDate: getRelativeDate(4).toISOString(), 
    type: 'Hackathon', 
    image: cardImage,
    color: 'orange'
  },
  { 
    id: 5, 
    eventId: 'algo-sprint-2026',
    title: 'Algorithm Sprint 2026', 
    date: '3:00 PM IST', 
    isoDate: getRelativeDate(0).toISOString(), // Today
    type: 'Coding Contest', 
    image: cardImage,
    color: 'green'
  }
]
