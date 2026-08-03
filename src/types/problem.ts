export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type ProblemStatus = 'solved' | 'attempted' | 'todo'

export type ProgrammingLanguage = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'c'

export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export interface ProblemTestCase {
  input: string
  expected: string
}

export interface Problem {
  id: string
  slug: string
  number: number
  title: string
  difficulty: Difficulty
  topics: string[]
  companies: string[]
  acceptanceRate: number
  status: ProblemStatus
  isBookmarked: boolean
  likes: number
  dislikes: number
  description: string
  examples: ProblemExample[]
  constraints: string[]
  hints: string[]
  starterCode: Record<ProgrammingLanguage, string>
  testCases: ProblemTestCase[]
}

export interface StudyPlan {
  id: string
  slug: string
  title: string
  description: string
  iconName: string
  problemCount: number
  completedCount: number
  color: string
}
