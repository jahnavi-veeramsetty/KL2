export type DailyChallengeType = 'Coding' | 'Pattern' | 'MCQ'
export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard'

export interface DailyChallenge {
  id: string
  date: string // YYYY-MM-DD
  title: string
  type: DailyChallengeType
  difficulty: ChallengeDifficulty
  xpReward: number
  description: string
  isCompleted: boolean
  
  // MCQ specific fields
  options?: string[]
  correctOptionIndex?: number
  
  // Coding/Pattern specific fields (linked problem)
  problemId?: string
}
