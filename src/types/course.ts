export interface CourseInstructorStats {
  students: number
  courses: number
  rating: number
}

export interface CourseInstructor {
  name: string
  title: string
  avatar: string
  bio: string
  stats: CourseInstructorStats
}

export interface CourseLesson {
  title: string
  type: 'video' | 'article' | 'quiz' | 'project' | 'exercise'
  durationMins: number
}

export interface CourseModule {
  title: string
  lessons: CourseLesson[]
}

export interface CourseReview {
  user: string
  avatar: string
  rating: number
  date: string
  text: string
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type CourseCategory =
  | 'AI/ML'
  | 'Engineering'
  | 'Data'

export interface Course {
  id: string
  slug: string
  title: string
  category: CourseCategory
  level: CourseLevel
  thumbnail: string
  shortDescription: string
  longDescription: string
  instructor: CourseInstructor
  rating: number
  ratingCount: number
  studentsEnrolled: number
  durationHours: number
  moduleCount: number
  lessonCount: number
  price: number
  tags: string[]
  whatYouWillLearn: string[]
  curriculum: CourseModule[]
  requirements: string[]
  reviews: CourseReview[]
  language: string
  certificate: boolean
  isLimitedSeats?: boolean
  isBestseller?: boolean
  isNew?: boolean
  progress?: number
}
