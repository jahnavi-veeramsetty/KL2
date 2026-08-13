import type { ContinueLearningItem } from '../types'
import javaImage from '../assets/course cards/java.webp'
import pythonImage from '../assets/course cards/python.webp'
import aiImage from '../assets/course cards/image.webp'

export const continueLearningItems: ContinueLearningItem[] = [
  { id: 1, courseId: 'java-full-stack', title: 'Java Full Stack Development', module: '', progress: 65, image: javaImage, timeRemaining: '35 min remaining', badgeType: 'FREE', color: 'teal' },
  { id: 2, courseId: 'python-full-stack', title: 'Python Full Stack', module: '', progress: 40, image: pythonImage, timeRemaining: '18h left', badgeType: 'PAID', color: 'green' },
  { id: 3, courseId: 'ai-and-ml', title: 'AI and ML', module: '', progress: 75, image: aiImage, timeRemaining: '3h left', badgeType: 'FREE', color: 'blue' }
]
