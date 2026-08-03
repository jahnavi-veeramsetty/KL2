export interface Badge {
  id: string
  name: string
  description: string
  icon: string // Lucide icon name
  dateEarned?: string // ISO date string or undefined if locked
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  isLocked: boolean
}

export interface LanguageStat {
  name: string
  percentage: number
  color: string
}

export interface Activity {
  id: string
  type: 'problem_solved' | 'course_progress'
  title: string
  timestamp: string // ISO date
  difficulty?: 'easy' | 'medium' | 'hard'
  status: 'passed' | 'failed' | 'in_progress'
}

export interface RatingDataPoint {
  date: string
  rating: number
  contestName: string
  placement: number
}

export interface ContributionDataPoint {
  date: string
  count: number
}

export interface Certificate {
  id: string
  courseName: string
  dateCompleted: string
  imageUrl?: string
}

export interface UserProfile {
  id: string
  username: string
  fullName: string
  avatarUrl: string
  title: string
  memberSince: string
  location: string
  bio: string
  links: {
    github?: string
    linkedin?: string
    website?: string
  }
  stats: {
    globalRank: number
    percentile: number
    totalXP: number
    currentStreak: number
    longestStreak: number
    totalActiveDays: number
  }
  solveStats: {
    easy: { solved: number; total: number }
    medium: { solved: number; total: number }
    hard: { solved: number; total: number }
  }
  languages: LanguageStat[]
  badges: Badge[]
  contributions: ContributionDataPoint[]
  ratings: RatingDataPoint[]
  activities: Activity[]
  certificates: Certificate[]
  isPrivate?: boolean
}

// Generate realistic heatmap data for the past 365 days
const generateHeatmap = (): ContributionDataPoint[] => {
  const data: ContributionDataPoint[] = []
  const now = new Date()
  for (let i = 365; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    // Randomize activity. Less activity on weekends, some clusters.
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const baseChance = isWeekend ? 0.3 : 0.7
    
    let count = 0
    if (Math.random() < baseChance) {
      count = Math.floor(Math.random() * 5) + 1
      if (Math.random() > 0.8) {
        count += Math.floor(Math.random() * 10)
      }
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      count,
    })
  }
  return data
}

export const mockProfileData: UserProfile = {
  id: 'usr_001',
  username: 'alex_codes',
  fullName: 'Alex Chen',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
  title: 'Lvl 14 · Algorithm Adept',
  memberSince: '2024-02-15',
  location: 'San Francisco, CA',
  bio: `Hi, I'm Alex! 👋 

I'm a computer science student passionate about building scalable web applications and solving algorithmic puzzles. 

Currently learning **Rust** and exploring systems programming.
- 🔭 Working on a distributed task queue
- 🌱 Learning WebAssembly
- ⚡ Fun fact: I use Vim for everything`,
  links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    website: 'https://alexcodes.dev'
  },
  stats: {
    globalRank: 4231,
    percentile: 92.5,
    totalXP: 14500,
    currentStreak: 12,
    longestStreak: 45,
    totalActiveDays: 210,
  },
  solveStats: {
    easy: { solved: 145, total: 300 },
    medium: { solved: 89, total: 400 },
    hard: { solved: 23, total: 150 },
  },
  languages: [
    { name: 'TypeScript', percentage: 42, color: '#3178c6' },
    { name: 'Python', percentage: 28, color: '#3572A5' },
    { name: 'C++', percentage: 18, color: '#f34b7d' },
    { name: 'Go', percentage: 12, color: '#00ADD8' },
  ],
  badges: [
    { id: 'b1', name: 'First Blood', description: 'Solved your first problem', icon: 'zap', dateEarned: '2024-02-16', rarity: 'common', isLocked: false },
    { id: 'b2', name: 'Weekend Warrior', description: 'Solved 10 problems on weekends', icon: 'sword', dateEarned: '2024-03-10', rarity: 'rare', isLocked: false },
    { id: 'b3', name: 'Graph Guru', description: 'Completed all hard graph problems', icon: 'network', dateEarned: '2024-06-22', rarity: 'epic', isLocked: false },
    { id: 'b4', name: 'Algorithm Master', description: 'Reach top 1% in contest rating', icon: 'crown', rarity: 'legendary', isLocked: true },
    { id: 'b5', name: 'Bug Hunter', description: 'Report 5 bugs in problems', icon: 'bug', dateEarned: '2024-04-05', rarity: 'rare', isLocked: false },
    { id: 'b6', name: 'Consistency Key', description: 'Maintain a 30 day streak', icon: 'flame', dateEarned: '2024-05-15', rarity: 'epic', isLocked: false },
    { id: 'b7', name: 'Polyglot', description: 'Solve problems in 5 different languages', icon: 'code', rarity: 'rare', isLocked: true },
    { id: 'b8', name: 'Early Bird', description: 'Solve a daily challenge within 10 minutes', icon: 'sun', dateEarned: '2024-07-01', rarity: 'common', isLocked: false },
  ],
  contributions: generateHeatmap(),
  ratings: [
    { date: '2024-03-01', rating: 1200, contestName: 'Weekly Contest 1', placement: 4500 },
    { date: '2024-04-01', rating: 1350, contestName: 'Weekly Contest 5', placement: 2100 },
    { date: '2024-05-01', rating: 1320, contestName: 'Biweekly Contest 2', placement: 3200 },
    { date: '2024-06-01', rating: 1480, contestName: 'Weekly Contest 9', placement: 1200 },
    { date: '2024-07-01', rating: 1610, contestName: 'Weekly Contest 13', placement: 450 },
    { date: '2024-07-15', rating: 1590, contestName: 'Biweekly Contest 6', placement: 800 },
  ],
  activities: [
    { id: 'a1', type: 'problem_solved', title: 'Two Sum', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), difficulty: 'easy', status: 'passed' },
    { id: 'a2', type: 'problem_solved', title: 'LRU Cache', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), difficulty: 'medium', status: 'failed' },
    { id: 'a3', type: 'problem_solved', title: 'LRU Cache', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), difficulty: 'medium', status: 'passed' },
    { id: 'a4', type: 'course_progress', title: 'Advanced Data Structures: Graphs', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'in_progress' },
    { id: 'a5', type: 'problem_solved', title: 'Median of Two Sorted Arrays', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), difficulty: 'hard', status: 'passed' },
  ],
  certificates: [
    { id: 'c1', courseName: 'Mastering Dynamic Programming', dateCompleted: '2024-05-20' },
    { id: 'c2', courseName: 'System Design Interview Prep', dateCompleted: '2024-07-10' },
  ],
}
