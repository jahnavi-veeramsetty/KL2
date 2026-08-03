import type { CourseInstructor, CourseCategory, CourseLevel, CourseReview } from './course'

export interface Masterclass {
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
  price: number
  tags: string[]
  isBestseller?: boolean
  isNew?: boolean
  
  // Masterclass specific fields
  sessionAgenda: { time: string; topic: string }[]
  keyTakeaways: string[]
  whatYouGet: string[]
  date: string
  language: string
  reviews: CourseReview[]
}
