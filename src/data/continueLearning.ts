import type { ContinueLearningItem } from '../types'
import cardImage from '../assets/cardimage.webp'

export const continueLearningItems: ContinueLearningItem[] = [
  { id: 1, courseId: 'java-full-stack', title: 'Java Full Stack Development', module: '', progress: 65, image: cardImage, timeRemaining: '35 min remaining', badgeType: 'FREE', color: 'teal' },
  { id: 2, courseId: 'python-full-stack', title: 'Python Full Stack', module: '', progress: 40, image: cardImage, timeRemaining: '18h left', badgeType: 'PAID', color: 'green' },
  { id: 3, courseId: 'ai-and-ml', title: 'AI and ML', module: '', progress: 75, image: cardImage, timeRemaining: '3h left', badgeType: 'FREE', color: 'blue' }
]
