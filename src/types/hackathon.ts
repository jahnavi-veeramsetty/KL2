export type HackathonMode = 'online' | 'offline' | 'hybrid'
export type HackathonStatus = 'upcoming' | 'ongoing' | 'past'

export interface HackathonSponsor {
  name: string
  logo: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
}

export interface HackathonJudge {
  name: string
  title: string
  company: string
  avatar: string
}

export interface HackathonTimelinePhase {
  phase: string
  date: string
  description: string
}

export interface HackathonTrack {
  title: string
  description: string
  /** Name of a lucide-react icon, resolved by TRACK_ICONS on the detail page. */
  icon: string
}

export interface HackathonPrizeTier {
  place: string
  amount: string
  perks: string[]
}

export interface HackathonFAQ {
  question: string
  answer: string
}

export interface Hackathon {
  id: string
  slug: string
  title: string
  tagline: string
  theme: string[]
  banner: string
  prizePool: string
  prizes: HackathonPrizeTier[]
  mode: HackathonMode
  startDate: string
  endDate: string
  registrationDeadline: string
  teamSize: { min: number; max: number }
  participantsCount: number
  sponsors: HackathonSponsor[]
  tracks: HackathonTrack[]
  judges: HackathonJudge[]
  timeline: HackathonTimelinePhase[]
  status: HackathonStatus
  about: string
  requirements: string[]
  faq: HackathonFAQ[]
}
