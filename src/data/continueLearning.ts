import type { ContinueLearningItem } from '../types'
import javaImage from '../assets/course cards/java.webp'
import pythonImage from '../assets/course cards/python.webp'
import aiImage from '../assets/course cards/image.webp'
import { lmsCourses } from './lms/courseContent'

const getTimeLeft = (courseId: string) => {
  const course = lmsCourses[courseId as keyof typeof lmsCourses]
  if (!course) return ''
  const hoursLeft = Math.ceil(course.totalDurationHours * (1 - course.overallProgress / 100))
  if (hoursLeft === 0) return 'Completed'
  return `${hoursLeft}h left`
}

export const continueLearningItems: ContinueLearningItem[] = [
  { id: 1, courseId: 'java-full-stack', title: 'Java Full Stack Development', module: '', progress: lmsCourses['java-full-stack']?.overallProgress || 0, image: javaImage, timeRemaining: getTimeLeft('java-full-stack'), badgeType: 'FREE', color: 'teal' },
  { id: 2, courseId: 'python-full-stack', title: 'Python Full Stack', module: '', progress: lmsCourses['python-full-stack']?.overallProgress || 0, image: pythonImage, timeRemaining: getTimeLeft('python-full-stack'), badgeType: 'PAID', color: 'green' },
  { id: 3, courseId: 'ai-and-ml', title: 'AI and ML', module: '', progress: lmsCourses['ai-and-ml']?.overallProgress || 0, image: aiImage, timeRemaining: getTimeLeft('ai-and-ml'), badgeType: 'FREE', color: 'blue' }
]
