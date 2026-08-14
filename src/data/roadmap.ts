import { Flame, Hammer, Rocket, Mic, Crown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ROUTES } from '../constants/routes'
import { lmsCourses } from './lms/courseContent'
import type { UserProfile } from './profile-mock'

/**
 * The Knowvation Path — five stages from first module to hired.
 *
 * The stages are the ecosystem's, not any one course's: you learn, you build,
 * you compete, you teach, you launch. So the five are the same whichever path
 * you pick, and only the numbers underneath them change.
 *
 * Two things work differently here than on the marketing site's version:
 *
 *  - A milestone is graded against real counters, not a phase number. "Unlock
 *    after phase 3" tells you nothing you can act on; "2 of 3 rated contests"
 *    tells you exactly what is left.
 *  - Phases and milestones are one thing rather than two. The original had
 *    five milestones scored against four phases, so two different nodes both
 *    read "Phase 3 required" and the 1/4 counter never matched the five dots.
 */

export interface Requirement {
  label: string
  current: number
  target: number
  /** Percentages render as "15% / 50%"; counts render as "2 / 3". */
  unit?: 'percent'
}

export interface Milestone {
  id: string
  title: string
  tagline: string
  icon: LucideIcon
  xp: number
  /** Where to go to move this one forward. A locked node with no way in is a
      dead end, which is the one thing a roadmap must never be. */
  action: { label: string; to: string }
  requirements: Requirement[]
}

export interface MilestoneState extends Milestone {
  index: number
  /**
   * `upcoming`, not `locked` — every stage is readable and every stage has a
   * way in, so nothing on this page is shut. The distinction is about where
   * you are, not about what you are allowed to look at.
   */
  status: 'complete' | 'current' | 'upcoming'
  /** 0–1 across this milestone's own requirements. */
  progress: number
}

export interface Roadmap {
  milestones: MilestoneState[]
  completed: number
  total: number
  /** 0–1 along the whole road, including part-way into the current stage. */
  fraction: number
  xpEarned: number
  xpTotal: number
  current?: MilestoneState
}

/** The paths a learner can walk. These are the LMS courses, so the progress
    numbers on this page are the same ones the course player shows. */
export const ROADMAP_PATHS = Object.values(lmsCourses).map(c => ({
  id: c.courseId,
  title: c.title,
}))

export const DEFAULT_PATH = ROADMAP_PATHS[0]?.id ?? ''

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function ratio(req: Requirement): number {
  return req.target <= 0 ? 1 : clamp01(req.current / req.target)
}

export function isMet(req: Requirement): boolean {
  return req.current >= req.target
}

function define(courseId: string, p: UserProfile): Milestone[] {
  const course = lmsCourses[courseId]
  const pathProgress = course?.overallProgress ?? 0
  const solved = p.solveStats.easy.solved + p.solveStats.medium.solved + p.solveStats.hard.solved
  const { contestsEntered, hackathonsJoined, talksGiven } = p.participation

  return [
    {
      id: 'spark',
      title: 'The Spark',
      tagline: 'Your journey begins here. Ignite your passion for tech.',
      icon: Flame,
      xp: 500,
      action: { label: 'Open your path', to: courseId ? ROUTES.LMS_COURSE(courseId) : ROUTES.COURSES },
      requirements: [
        { label: 'Enrol in a learning path', current: course ? 1 : 0, target: 1 },
        { label: 'Finish your first module', current: course?.modulesCompleted ?? 0, target: 1 },
      ],
    },
    {
      id: 'craftsman',
      title: 'Code Craftsman',
      tagline: 'Master the tools of the trade. Build with precision.',
      icon: Hammer,
      xp: 1000,
      action: { label: 'Solve problems', to: ROUTES.PRACTICE },
      requirements: [
        { label: 'Reach halfway through your path', current: pathProgress, target: 50, unit: 'percent' },
        { label: 'Solve 100 practice problems', current: solved, target: 100 },
      ],
    },
    {
      id: 'challenger',
      title: 'Techknowthon Challenger',
      tagline: 'Compete, collaborate, and conquer hackathons.',
      icon: Rocket,
      xp: 1500,
      action: { label: 'Find a hackathon', to: ROUTES.HACKATHONS },
      requirements: [
        { label: 'Finish your path', current: pathProgress, target: 100, unit: 'percent' },
        { label: 'Enter 3 rated contests', current: contestsEntered, target: 3 },
        { label: 'Join a hackathon', current: hackathonsJoined, target: 1 },
      ],
    },
    {
      id: 'orator',
      title: 'OpenMic Orator',
      tagline: 'Share your knowledge and inspire the community.',
      icon: Mic,
      xp: 2000,
      action: { label: 'See what is on', to: ROUTES.EVENTS },
      requirements: [
        { label: 'Give an OpenMic talk', current: talksGiven, target: 1 },
        { label: 'Hold a 30-day streak', current: p.stats.longestStreak, target: 30 },
      ],
    },
    {
      id: 'elite',
      title: 'Ecosystem Elite',
      tagline: 'Launch your career into the tech stratosphere.',
      icon: Crown,
      xp: 3000,
      action: { label: 'Check the leaderboard', to: ROUTES.LEADERBOARD },
      requirements: [
        { label: 'Earn 3 certificates', current: p.certificates.length, target: 3 },
        { label: 'Break into the global top 5%', current: p.stats.percentile, target: 95, unit: 'percent' },
      ],
    },
  ]
}

/**
 * Grades the path. Sequential on purpose: a later stage can have all its boxes
 * ticked and still read as upcoming, because the road is walked in order — you
 * do not skip the build years because you happened to win a contest early.
 */
export function buildRoadmap(courseId: string, p: UserProfile): Roadmap {
  const defined = define(courseId, p)

  let reached = false
  const milestones: MilestoneState[] = defined.map((m, index) => {
    const progress = m.requirements.reduce((sum, r) => sum + ratio(r), 0) / m.requirements.length
    const met = m.requirements.every(isMet)

    let status: MilestoneState['status']
    if (reached) {
      status = 'upcoming'
    } else if (met) {
      status = 'complete'
    } else {
      status = 'current'
      reached = true
    }

    return { ...m, index, status, progress }
  })

  const completed = milestones.filter(m => m.status === 'complete').length
  const current = milestones.find(m => m.status === 'current')

  return {
    milestones,
    completed,
    total: milestones.length,
    // Part-way into the current stage, so the road creeps forward as you work
    // rather than sitting still until a whole stage clears.
    fraction: clamp01((completed + (current?.progress ?? 0)) / milestones.length),
    xpEarned: milestones.filter(m => m.status === 'complete').reduce((sum, m) => sum + m.xp, 0),
    xpTotal: milestones.reduce((sum, m) => sum + m.xp, 0),
    current,
  }
}
