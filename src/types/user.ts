export interface UserSolvedStats {
  easy: number
  medium: number
  hard: number
}

export interface UserRatingHistory {
  date: string
  rating: number
}

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  streak: number
  rating: number
  maxRating: number
  solved: UserSolvedStats
  totalProblems: { easy: number; medium: number; hard: number }
  rank: number
  country: string
  joinedDate: string
  ratingHistory: UserRatingHistory[]
}

export interface ContinueLearningItem {
  id: number
  courseId: string
  title: string
  module: string
  progress: number
  image: string
  timeRemaining?: string
  badgeType?: 'FREE' | 'PAID'
  color?: 'teal' | 'green' | 'blue'
}

