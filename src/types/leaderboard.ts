/**
 * Geographic scoping for leaderboards.
 *
 * Colleges, districts and states are referenced by **id**, never by name.
 * UserProfile.location is free text ('San Francisco, CA'), and free text cannot
 * be grouped — "KL University", "K.L. University" and "KLU" would each become a
 * separate college on the board. Signup has to offer a searchable list.
 */
/** State is the widest scope — everyone here competes within Telangana. */
export type LeaderboardScope = 'state' | 'district' | 'college'

export type LeaderboardPeriod = 'all' | 'month'

export interface Institution {
  id: string
  /** Full name, as shown in a row. */
  name: string
  /** 3–4 letters for the crest badge. */
  short: string
  districtId: string
  district: string
  stateId: string
  state: string
}

export interface LeaderboardPlayer {
  id: string
  username: string
  avatar: string
  /** All-time points. */
  score: number
  /** Points earned this month — drives the period filter. */
  monthScore: number
  contests: number
  /** Places gained (+) or lost (-) over the selected period. */
  rankDelta: number
  branch: string
  year: number
  collegeId: string
  isYou?: boolean
}
