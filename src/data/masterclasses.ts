import type { Masterclass, CourseCategory } from '../types'
import javaImage from '../assets/course cards/java.webp'
import pythonImage from '../assets/course cards/python.webp'
import aiImage from '../assets/course cards/image.webp'
import analyticsImage from '../assets/course cards/analytics.webp'

const realMasterclasses: Masterclass[] = [
  {
    id: 'system-design-interview',
    slug: 'system-design-interview',
    title: 'System Design Interview Masterclass',
    category: 'Engineering',
    level: 'Advanced',
    thumbnail: javaImage,
    shortDescription: 'Master the art of system design interviews with a former Big Tech interviewer in this intensive 2-hour session.',
    longDescription: 'System design interviews are notoriously difficult. This 2-hour intensive masterclass gives you the exact framework to tackle any system design problem. We will cover real-world architectures, scalability bottlenecks, database choices, and how to communicate your design clearly under pressure.',
    instructor: {
      name: 'Rahul Verma',
      title: 'Senior Java Architect',
      avatar: '/react_course.webp',
      bio: 'Rahul has over 10 years of experience building enterprise Java applications. He specializes in distributed systems and microservices architecture.',
      stats: { students: 15400, courses: 3, rating: 4.8 }
    },
    rating: 4.9,
    ratingCount: 340,
    studentsEnrolled: 1200,
    durationHours: 2,
    price: 999,
    tags: ['System Design', 'Interview Prep', 'Architecture'],
    isBestseller: true,
    date: 'August 15, 2026 • 10:00 AM IST',
    language: 'English',
    sessionAgenda: [
      { time: '10:00 AM', topic: 'Introduction & The 5-Step Framework' },
      { time: '10:30 AM', topic: 'Deep Dive: Designing a Rate Limiter' },
      { time: '11:15 AM', topic: 'Scaling Databases & Caching Strategies' },
      { time: '11:45 AM', topic: 'Live Q&A' }
    ],
    keyTakeaways: [
      'A repeatable 5-step framework for any design interview',
      'Understanding of trade-offs between SQL and NoSQL',
      'Strategies to handle 10M+ DAU',
      'Common pitfalls to avoid during the interview'
    ],
    whatYouGet: [
      '2 hours of live interactive instruction',
      'Lifetime access to the session recording',
      'System Design Cheat Sheet PDF',
      'Access to a private Discord channel for 30 days'
    ],
    reviews: [
      { user: 'Amit K.', avatar: '/react_course.webp', rating: 5, date: '2024-11-15', text: 'This masterclass completely changed how I approach system design.' }
    ]
  },
  {
    id: 'generative-ai-production',
    slug: 'generative-ai-production',
    title: 'Generative AI in Production',
    category: 'AI/ML',
    level: 'Intermediate',
    thumbnail: aiImage,
    shortDescription: 'Learn how to move LLMs from prototype to production securely and efficiently.',
    longDescription: 'Building a demo with an LLM is easy; putting it into production is hard. This masterclass covers the engineering challenges of deploying GenAI applications, including prompt management, RAG architectures, latency optimization, and cost control.',
    instructor: {
      name: 'Dr. Meena Iyer',
      title: 'AI Researcher',
      avatar: '/ui_ux_course.webp',
      bio: 'Dr. Iyer holds a PhD in Machine Learning and has published research at top conferences. She leads an ML research team focusing on deep learning applications.',
      stats: { students: 52000, courses: 2, rating: 4.9 }
    },
    rating: 4.8,
    ratingCount: 215,
    studentsEnrolled: 850,
    durationHours: 2,
    price: 1299,
    tags: ['Generative AI', 'LLMs', 'RAG', 'Production'],
    isNew: true,
    date: 'August 22, 2026 • 2:00 PM IST',
    language: 'English',
    sessionAgenda: [
      { time: '2:00 PM', topic: 'The GenAI Tech Stack' },
      { time: '2:30 PM', topic: 'Advanced RAG Patterns' },
      { time: '3:15 PM', topic: 'Prompt Evaluation & Security' },
      { time: '3:45 PM', topic: 'Live Q&A' }
    ],
    keyTakeaways: [
      'Architecting a robust RAG pipeline',
      'Strategies for prompt injection defense',
      'Optimizing API costs and latency',
      'Tools for LLM observability'
    ],
    whatYouGet: [
      '2 hours of live interactive instruction',
      'Lifetime access to the session recording',
      'Starter code templates in Python',
      'Curated list of enterprise AI tools'
    ],
    reviews: [
      { user: 'Sara J.', avatar: '/ui_ux_course.webp', rating: 5, date: '2024-10-10', text: 'Highly practical. We implemented the RAG pattern the next day at work.' }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// DEMO PADDING — placeholder entries so the catalog grid shows full rows while
// the real schedule is still short. Delete this block (and the spread below)
// once there are enough real masterclasses.
// ─────────────────────────────────────────────────────────────────────────────
const demoVariants: Array<Pick<Masterclass, 'id' | 'title' | 'category' | 'level' | 'price' | 'date'> &
  Partial<Pick<Masterclass, 'isBestseller' | 'isNew'>>> = [
  { id: 'advanced-react-patterns',   title: 'Advanced React Patterns',          category: 'Engineering', level: 'Advanced',     price: 899,  date: 'August 29, 2026 • 11:00 AM IST', isNew: true },
  { id: 'kubernetes-for-devs',       title: 'Kubernetes for Developers',        category: 'Engineering', level: 'Intermediate', price: 1099, date: 'September 5, 2026 • 10:00 AM IST' },
  { id: 'sql-query-optimisation',    title: 'SQL Query Optimisation Deep Dive', category: 'Data',        level: 'Intermediate', price: 799,  date: 'September 12, 2026 • 3:00 PM IST', isBestseller: true },
  { id: 'data-viz-storytelling',     title: 'Data Visualisation & Storytelling', category: 'Data',       level: 'Beginner',     price: 699,  date: 'September 19, 2026 • 11:00 AM IST' },
  { id: 'llm-fine-tuning',           title: 'Fine-Tuning LLMs on a Budget',     category: 'AI/ML',       level: 'Advanced',     price: 1499, date: 'September 26, 2026 • 2:00 PM IST', isNew: true },
  { id: 'ml-feature-engineering',    title: 'Feature Engineering Masterclass',  category: 'AI/ML',       level: 'Intermediate', price: 999,  date: 'October 3, 2026 • 10:00 AM IST' },
  { id: 'microservices-patterns',    title: 'Microservices Design Patterns',    category: 'Engineering', level: 'Advanced',     price: 1199, date: 'October 10, 2026 • 4:00 PM IST', isBestseller: true },
  { id: 'analytics-with-python',     title: 'Product Analytics with Python',    category: 'Data',        level: 'Beginner',     price: 749,  date: 'October 17, 2026 • 11:00 AM IST' },
]

// Banner art per topic. Each category cycles its own pool so the grid does not
// repeat the same image twice in a row.
const THUMBNAILS_BY_CATEGORY: Record<CourseCategory, string[]> = {
  Engineering: [javaImage, pythonImage],
  'AI/ML': [aiImage, pythonImage],
  Data: [analyticsImage, aiImage],
}

const categorySeen: Partial<Record<CourseCategory, number>> = {}

const demoMasterclasses: Masterclass[] = demoVariants.map((variant, i) => {
  const pool = THUMBNAILS_BY_CATEGORY[variant.category]
  const seen = categorySeen[variant.category] ?? 0
  categorySeen[variant.category] = seen + 1

  return {
    ...realMasterclasses[i % realMasterclasses.length],
    ...variant,
    slug: variant.id,
    // reset the flags so they only come from the variant
    isBestseller: variant.isBestseller ?? false,
    isNew: variant.isNew ?? false,
    thumbnail: pool[seen % pool.length],
  }
})

export const masterclasses: Masterclass[] = [...realMasterclasses, ...demoMasterclasses]
