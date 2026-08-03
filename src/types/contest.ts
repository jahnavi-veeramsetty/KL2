export type ContestStatus = 'upcoming' | 'live' | 'past'
export type ContestDifficulty = 'Div. 1' | 'Div. 2' | 'Div. 3' | 'Educational' | 'Global'

export interface ContestProblem {
  id: string
  title: string
  points: number
  solved: number
}

export interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  score: number
  penalty: number
  country: string
}

export interface Contest {
  id: string
  slug: string
  title: string
  startTime: string
  durationMins: number
  difficulty: ContestDifficulty
  prize: string
  entryFee?: string
  participants: number
  status: ContestStatus
  rules: string[]
  problems?: ContestProblem[]
  leaderboard?: LeaderboardEntry[]
  yourRank?: number
  yourScore?: number
  description: string
  tags: string[]
}
