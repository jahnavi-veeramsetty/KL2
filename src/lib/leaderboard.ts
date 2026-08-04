import type {
  Institution,
  LeaderboardPeriod,
  LeaderboardPlayer,
  LeaderboardScope,
} from '../types/leaderboard'
import { institutions, leaderboardPlayers, YOUR_COLLEGE_ID, YOUR_PLAYER_ID } from '../data/leaderboard'

export const SCOPES: LeaderboardScope[] = ['state', 'district', 'college']

/**
 * What the student table is currently showing.
 *
 * `id` names a specific district or college, which is what makes the district
 * and college boards drillable — clicking a row swaps the filter rather than
 * navigating away.
 */
export interface BoardFilter {
  kind: LeaderboardScope
  id?: string
}

export function yourInstitution(): Institution | undefined {
  return institutions.find(i => i.id === YOUR_COLLEGE_ID)
}

export function institutionById(id?: string): Institution | undefined {
  return id ? institutions.find(i => i.id === id) : undefined
}

/** Districts are derived from the institution list — there is no separate table. */
export function districtName(districtId: string): string {
  return institutions.find(i => i.districtId === districtId)?.district ?? districtId
}

/**
 * Tab label. State is the widest scope there is now, so it reads as "everyone"
 * rather than as a place — the place name still appears beside the tabs.
 */
export function scopeTab(scope: LeaderboardScope): string {
  return scope === 'state' ? 'All Students' : scope === 'district' ? 'District' : 'College'
}

/** The place name itself — 'Hyderabad', not 'Hyderabad district'. */
export function filterLabel(filter: BoardFilter): string {
  const home = yourInstitution()
  switch (filter.kind) {
    case 'college':
      return institutionById(filter.id ?? home?.id)?.name ?? 'Your college'
    case 'district':
      return districtName(filter.id ?? home?.districtId ?? '')
    default:
      return home?.state ?? 'Your state'
  }
}

function scoreOf(player: LeaderboardPlayer, period: LeaderboardPeriod): number {
  return period === 'month' ? player.monthScore : player.score
}

/**
 * Students inside a filter, ranked. Rank is positional within the returned
 * list, so it always agrees with what is on screen — a stored global rank would
 * contradict the college view the moment the board is narrowed.
 */
export function playersIn(filter: BoardFilter, period: LeaderboardPeriod = 'all'): LeaderboardPlayer[] {
  const home = yourInstitution()

  const inScope = leaderboardPlayers.filter(p => {
    const college = institutions.find(i => i.id === p.collegeId)
    if (!college) return false

    switch (filter.kind) {
      case 'college':
        return college.id === (filter.id ?? home?.id)
      case 'district':
        return college.districtId === (filter.id ?? home?.districtId)
      default:
        return college.stateId === home?.stateId
    }
  })

  return inScope.slice().sort((a, b) => scoreOf(b, period) - scoreOf(a, period))
}

export interface Standing {
  scope: LeaderboardScope
  label: string
  rank: number
  total: number
  topPercent: number
}

export function standingIn(scope: LeaderboardScope, period: LeaderboardPeriod = 'all'): Standing {
  const ranked = playersIn({ kind: scope }, period)
  const index = ranked.findIndex(p => p.id === YOUR_PLAYER_ID)
  const rank = index === -1 ? ranked.length : index + 1

  return {
    scope,
    label: filterLabel({ kind: scope }),
    rank,
    total: ranked.length,
    topPercent: ranked.length === 0 ? 100 : Math.max(0.1, Math.round((rank / ranked.length) * 1000) / 10),
  }
}

export function allStandings(period: LeaderboardPeriod = 'all'): Standing[] {
  return SCOPES.map(s => standingIn(s, period))
}

/** The scope where you place best — the number worth leading with. */
export function bestStanding(standings: Standing[]): Standing {
  return standings.reduce((best, s) => (s.topPercent < best.topPercent ? s : best), standings[0])
}

export interface RivalRow {
  player: LeaderboardPlayer
  rank: number
  /** Points relative to you: positive is ahead, negative behind, 0 is you. */
  gap: number
}

/** You plus the students either side — a ranking says where you are, this says what moves it. */
export function rivalsAround(
  filter: BoardFilter,
  period: LeaderboardPeriod = 'all',
  radius = 2
): RivalRow[] {
  const ranked = playersIn(filter, period)
  const index = ranked.findIndex(p => p.id === YOUR_PLAYER_ID)
  if (index === -1) return []

  const mine = scoreOf(ranked[index], period)
  const from = Math.max(0, index - radius)

  return ranked.slice(from, Math.min(ranked.length, index + radius + 1)).map((player, i) => ({
    player,
    rank: from + i + 1,
    gap: scoreOf(player, period) - mine,
  }))
}

/* ── Aggregate boards ────────────────────────────────────────────────────── */

export interface GroupStanding {
  id: string
  name: string
  /** Districts show their state; colleges show their district. */
  sub: string
  short: string
  rank: number
  averageScore: number
  totalScore: number
  competing: number
  isYours: boolean
}

/**
 * Both aggregate boards rank by **average**, not total.
 *
 * Ranking by total just rewards whichever group has the most students on the
 * platform — Hyderabad would win on headcount whatever its students scored.
 * Total is still returned, because it is the number people expect to see.
 */
function rankGroups(groups: Omit<GroupStanding, 'rank'>[]): GroupStanding[] {
  return groups
    .filter(g => g.competing > 0)
    .sort((a, b) => b.averageScore - a.averageScore)
    .map((g, i) => ({ ...g, rank: i + 1 }))
}

export function districtStandings(period: LeaderboardPeriod = 'all'): GroupStanding[] {
  const home = yourInstitution()
  const ids = Array.from(new Set(institutions.map(i => i.districtId)))

  return rankGroups(
    ids.map(districtId => {
      const colleges = institutions.filter(i => i.districtId === districtId)
      const members = leaderboardPlayers.filter(p => colleges.some(c => c.id === p.collegeId))
      const totalScore = members.reduce((sum, p) => sum + scoreOf(p, period), 0)

      return {
        id: districtId,
        name: districtName(districtId),
        sub: `${colleges.length} ${colleges.length === 1 ? 'college' : 'colleges'} · ${colleges[0]?.state ?? ''}`,
        short: districtName(districtId).slice(0, 3).toUpperCase(),
        averageScore: members.length === 0 ? 0 : Math.round(totalScore / members.length),
        totalScore,
        competing: members.length,
        isYours: districtId === home?.districtId,
      }
    })
  )
}

export function institutionStandings(
  period: LeaderboardPeriod = 'all',
  districtId?: string
): GroupStanding[] {
  const scoped = districtId ? institutions.filter(i => i.districtId === districtId) : institutions

  return rankGroups(
    scoped.map(institution => {
      const members = leaderboardPlayers.filter(p => p.collegeId === institution.id)
      const totalScore = members.reduce((sum, p) => sum + scoreOf(p, period), 0)

      return {
        id: institution.id,
        name: institution.name,
        sub: `${institution.district} · ${institution.state}`,
        short: institution.short,
        averageScore: members.length === 0 ? 0 : Math.round(totalScore / members.length),
        totalScore,
        competing: members.length,
        isYours: institution.id === YOUR_COLLEGE_ID,
      }
    })
  )
}
