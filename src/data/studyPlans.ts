import type { StudyPlan } from '../types'

export const studyPlans: StudyPlan[] = [
  {
    id: 'dsa-starter',
    slug: 'dsa-starter',
    title: 'DSA Starter',
    description: 'Build a strong foundation in Data Structures & Algorithms with 75 carefully selected problems.',
    iconName: 'layers',
    problemCount: 75,
    completedCount: 23,
    color: '#22D3EE'
  },
  {
    id: 'interview-prep-75',
    slug: 'interview-prep-75',
    title: 'Interview Prep 75',
    description: 'The 75 most important problems for cracking FAANG interviews. Curated by ex-Google engineers.',
    iconName: 'briefcase',
    problemCount: 75,
    completedCount: 12,
    color: '#A78BFA'
  },
  {
    id: 'sql-50',
    slug: 'sql-50',
    title: 'SQL 50',
    description: '50 essential SQL problems from basic SELECT to advanced window functions and CTEs.',
    iconName: 'database',
    problemCount: 50,
    completedCount: 31,
    color: '#34D399'
  },
  {
    id: '30-day-challenge',
    slug: '30-day-challenge',
    title: '30-Day Challenge',
    description: 'One problem per day for 30 days. Build the habit of daily coding practice.',
    iconName: 'calendar',
    problemCount: 30,
    completedCount: 18,
    color: '#F59E0B'
  },
  {
    id: 'amazon-prep',
    slug: 'amazon-prep',
    title: 'Amazon',
    description: 'Problems most frequently asked in Amazon SDE interviews, with leadership principle alignment.',
    iconName: 'building',
    problemCount: 60,
    completedCount: 5,
    color: '#F97316'
  },
  {
    id: 'google-prep',
    slug: 'google-prep',
    title: 'Google',
    description: 'Google interview problems focusing on algorithms, system design, and brain teasers.',
    iconName: 'building',
    problemCount: 55,
    completedCount: 3,
    color: '#4ADE80'
  }
]
