import type { Contest } from '../types'

// All times relative to the current moment for realistic display
const now = new Date()
const inHours = (h: number) => new Date(now.getTime() + h * 3600 * 1000).toISOString()
const inDays = (d: number) => new Date(now.getTime() + d * 86400 * 1000).toISOString()
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400 * 1000).toISOString()

export const contests: Contest[] = [
  {
    id: 'klm-weekly-free',
    slug: 'klm-weekly-free',
    title: 'KLM Weekly Free Contest',
    startTime: inHours(2.5),
    durationMins: 90,
    difficulty: 'Div. 2',
    prize: '₹5,000',
    entryFee: 'Free',
    participants: 4821,
    status: 'upcoming',
    description: 'Our flagship free weekly contest with 4 algorithmic problems ranging from easy to hard. All skill levels welcome.',
    tags: ['algorithms', 'dp', 'graphs'],
    rules: [
      'Each problem has a fixed score based on difficulty.',
      'Penalty of 5 minutes per wrong submission.',
      'Problems unlock in order of difficulty.',
      'No external tools, AI assistants, or collaboration allowed.',
      'Results finalized 1 hour after contest ends.'
    ],
    problems: [
      { id: 'p1', title: 'Array Manipulation', points: 500, solved: 0 },
      { id: 'p2', title: 'Graph Traversal', points: 1000, solved: 0 },
      { id: 'p3', title: 'Dynamic Programming', points: 1500, solved: 0 },
      { id: 'p4', title: 'Advanced Strings', points: 2000, solved: 0 }
    ]
  },
  {
    id: 'klm-weekly-premium',
    slug: 'klm-weekly-premium',
    title: 'KLM Weekly Premium Contest',
    startTime: inDays(1),
    durationMins: 90,
    difficulty: 'Div. 1',
    prize: '₹10,000',
    entryFee: '₹99',
    participants: 2104,
    status: 'upcoming',
    description: 'Our premium weekly contest with high quality problems and massive prize pools. Requires a ₹99 entry fee.',
    tags: ['beginner-friendly', 'arrays', 'strings'],
    rules: [
      'Each problem has a fixed score.',
      'Penalty: 5 minutes per wrong submission.',
      'All problems visible from the start.',
      'No plagiarism or AI tools.'
    ]
  },
  {
    id: 'klm-global-17',
    slug: 'klm-global-17',
    title: 'KLM Global Round #17',
    startTime: inDays(7),
    durationMins: 120,
    difficulty: 'Global',
    prize: '₹10,000',
    participants: 8932,
    status: 'upcoming',
    description: 'The prestigious Global Round — top 200 from Div.1 and beyond. Problems designed to challenge the best.',
    tags: ['competitive', 'advanced', 'top-rated'],
    rules: [
      'Rated for all participants above 2100 rating.',
      'Problems scored by number of solvers (ICPC style).',
      '10-minute penalty per wrong answer.',
      'Strict anti-cheat measures in place.'
    ]
  },
  {
    id: 'klm-weekly-341',
    slug: 'klm-weekly-341',
    title: 'KLM Weekly Contest #341',
    startTime: daysAgo(7),
    durationMins: 90,
    difficulty: 'Div. 2',
    prize: '₹5,000',
    participants: 5241,
    status: 'past',
    description: 'Weekly contest #341 — now completed.',
    tags: ['algorithms', 'trees'],
    yourRank: 142,
    yourScore: 5600,
    rules: ['Standard KLM contest rules apply.'],
    leaderboard: [
      { rank: 1, username: 'tourist', avatar: '/react_course.webp', score: 7800, penalty: 0, country: 'BY' },
      { rank: 2, username: 'Petr', avatar: '/react_course.webp', score: 7600, penalty: 3, country: 'RU' },
      { rank: 3, username: 'um_nik', avatar: '/react_course.webp', score: 7400, penalty: 8, country: 'RU' },
      { rank: 4, username: 'ksun48', avatar: '/react_course.webp', score: 7200, penalty: 12, country: 'US' },
      { rank: 5, username: 'ecnerwala', avatar: '/react_course.webp', score: 7000, penalty: 15, country: 'US' }
    ]
  },
  {
    id: 'klm-educational-148',
    slug: 'klm-educational-148',
    title: 'Educational Round #148',
    startTime: daysAgo(14),
    durationMins: 105,
    difficulty: 'Educational',
    prize: '₹3,000',
    participants: 6132,
    status: 'past',
    description: 'Educational rounds focus on teaching specific topics. This round covered segment trees and fenwick trees.',
    tags: ['segment-tree', 'fenwick-tree', 'educational'],
    yourRank: 89,
    yourScore: 6200,
    rules: ['Copy-pasting from editorials after submission is allowed for practice.']
  },
  {
    id: 'klm-live-sprint-5',
    slug: 'klm-live-sprint-5',
    title: 'Live Sprint #5 — Speed Round',
    startTime: inHours(-0.5),
    durationMins: 60,
    difficulty: 'Div. 2',
    prize: '₹4000',
    participants: 1843,
    status: 'live',
    description: 'A fast-paced 1-hour sprint currently in progress! Solve as many problems as you can.',
    tags: ['live', 'sprint', 'speed'],
    rules: ['Score = problems solved × 1000 - penalty minutes × 10.'],
    leaderboard: [
      { rank: 1, username: 'speedcoder_x', avatar: '/react_course.webp', score: 3000, penalty: 2, country: 'IN' },
      { rank: 2, username: 'algo_master', avatar: '/react_course.webp', score: 2800, penalty: 5, country: 'CN' },
      { rank: 3, username: 'dev_ninja99', avatar: '/react_course.webp', score: 2600, penalty: 8, country: 'US' }
    ]
  }
]
