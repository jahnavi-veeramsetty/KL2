import type { Institution, LeaderboardPlayer } from '../types/leaderboard'

const AVATAR = '/react_course.webp'

/**
 * Sample Telangana institutions. Placeholder roster for the demo — the point is
 * the district/state grouping, not an authoritative college list.
 */
export const institutions: Institution[] = [
  // Hyderabad
  { id: 'iiith', name: 'IIIT Hyderabad',              short: 'IIITH', districtId: 'hyderabad',  district: 'Hyderabad',  stateId: 'ts', state: 'Telangana' },
  { id: 'cbit',  name: 'CBIT Hyderabad',              short: 'CBIT',  districtId: 'hyderabad',  district: 'Hyderabad',  stateId: 'ts', state: 'Telangana' },
  { id: 'vasavi', name: 'Vasavi College of Engg.',    short: 'VCE',   districtId: 'hyderabad',  district: 'Hyderabad',  stateId: 'ts', state: 'Telangana' },
  { id: 'ouce',  name: 'Osmania University CoE',      short: 'OUCE',  districtId: 'hyderabad',  district: 'Hyderabad',  stateId: 'ts', state: 'Telangana' },

  // Rangareddy
  { id: 'vardhaman', name: 'Vardhaman College of Engg.', short: 'VRD', districtId: 'rangareddy', district: 'Rangareddy', stateId: 'ts', state: 'Telangana' },
  { id: 'anurag', name: 'Anurag University',          short: 'AU',    districtId: 'rangareddy', district: 'Rangareddy', stateId: 'ts', state: 'Telangana' },
  { id: 'cmrce',  name: 'CMR College of Engg.',       short: 'CMR',   districtId: 'rangareddy', district: 'Rangareddy', stateId: 'ts', state: 'Telangana' },

  // Warangal
  { id: 'nitw',  name: 'NIT Warangal',                short: 'NITW',  districtId: 'warangal',   district: 'Warangal',   stateId: 'ts', state: 'Telangana' },
  { id: 'kits',  name: 'KITS Warangal',               short: 'KITS',  districtId: 'warangal',   district: 'Warangal',   stateId: 'ts', state: 'Telangana' },
  { id: 'sru',   name: 'SR University',               short: 'SRU',   districtId: 'warangal',   district: 'Warangal',   stateId: 'ts', state: 'Telangana' },

  // Karimnagar
  { id: 'jits',  name: 'Jyothishmathi Institute',     short: 'JITS',  districtId: 'karimnagar', district: 'Karimnagar', stateId: 'ts', state: 'Telangana' },

  // Khammam
  { id: 'sbit',  name: 'Swarna Bharathi Institute',   short: 'SBIT',  districtId: 'khammam',    district: 'Khammam',    stateId: 'ts', state: 'Telangana' },

  // Nizamabad
  { id: 'kce',   name: 'Kshatriya College of Engg.',  short: 'KCE',   districtId: 'nizamabad',  district: 'Nizamabad',  stateId: 'ts', state: 'Telangana' },
]

/** The signed-in student. Everything scoped is measured relative to this. */
export const YOUR_COLLEGE_ID = 'cbit'
export const YOUR_PLAYER_ID = 'p-you'

const BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'MECH']
const HANDLES = ['dev', 'coder', 'algo', 'byte', 'loop', 'stack', 'heap', 'node']

/**
 * Deterministic roster. `strength` shifts a college's whole band, so the
 * district averages differ for a reason rather than by accident — Hyderabad
 * ends up ahead of Khammam because its colleges are stronger, which is the
 * comparison the district board is meant to show.
 *
 * No Math.random: ranks have to be stable across renders, or the board would
 * reshuffle every time a filter changed.
 */
function roster(collegeId: string, count: number, seed: number, strength: number): LeaderboardPlayer[] {
  return Array.from({ length: count }, (_, i) => {
    const n = seed + i * 37
    const score = strength - ((n * 13) % 900)
    return {
      id: `p-${collegeId}-${i}`,
      username: `${HANDLES[n % HANDLES.length]}_${collegeId}${(n % 90) + 10}`,
      avatar: AVATAR,
      score,
      monthScore: Math.round(score * 0.32) + (n % 90),
      contests: 4 + (n % 16),
      rankDelta: (n % 11) - 5,
      branch: BRANCHES[n % BRANCHES.length],
      year: 1 + (n % 4),
      collegeId,
    }
  })
}

/** Named students at your college, so the local board reads like real people. */
const atYourCollege: LeaderboardPlayer[] = [
  { id: 'p-cbit-a', username: 'ritvik_m',   avatar: AVATAR, score: 3410, monthScore: 1180, contests: 18, rankDelta:  2, branch: 'CSE', year: 3, collegeId: 'cbit' },
  { id: YOUR_PLAYER_ID, username: 'alex_codes', avatar: AVATAR, score: 3240, monthScore: 1120, contests: 16, rankDelta: 5, branch: 'CSE', year: 3, collegeId: 'cbit', isYou: true },
  { id: 'p-cbit-c', username: 'sneha_p',    avatar: AVATAR, score: 3120, monthScore: 1040, contests: 21, rankDelta: -1, branch: 'IT',  year: 2, collegeId: 'cbit' },
  { id: 'p-cbit-d', username: 'karthik99',  avatar: AVATAR, score: 2980, monthScore:  960, contests: 12, rankDelta:  3, branch: 'ECE', year: 4, collegeId: 'cbit' },
  { id: 'p-cbit-e', username: 'divya_rao',  avatar: AVATAR, score: 2870, monthScore:  910, contests: 14, rankDelta: -2, branch: 'CSE', year: 2, collegeId: 'cbit' },
  { id: 'p-cbit-f', username: 'manoj_k',    avatar: AVATAR, score: 2640, monthScore:  840, contests:  9, rankDelta:  1, branch: 'CSE', year: 4, collegeId: 'cbit' },
  { id: 'p-cbit-g', username: 'anitha_s',   avatar: AVATAR, score: 2510, monthScore:  790, contests: 11, rankDelta: -4, branch: 'IT',  year: 3, collegeId: 'cbit' },
]

/** Named front-runners elsewhere, so the state board is not all filler. */
const notableElsewhere: LeaderboardPlayer[] = [
  { id: 'p-iiith-a', username: 'arjun_h',    avatar: AVATAR, score: 4210, monthScore: 1460, contests: 27, rankDelta:  1, branch: 'CSE', year: 4, collegeId: 'iiith' },
  { id: 'p-iiith-b', username: 'nikhil_r',   avatar: AVATAR, score: 3980, monthScore: 1340, contests: 23, rankDelta:  0, branch: 'CSE', year: 2, collegeId: 'iiith' },
  { id: 'p-nitw-a',  username: 'sai_w',      avatar: AVATAR, score: 3890, monthScore: 1310, contests: 22, rankDelta:  4, branch: 'IT',  year: 4, collegeId: 'nitw' },
  { id: 'p-nitw-b',  username: 'praneeth_v', avatar: AVATAR, score: 3610, monthScore: 1220, contests: 19, rankDelta: -2, branch: 'CSE', year: 3, collegeId: 'nitw' },
  { id: 'p-vasavi-a', username: 'meghana_t', avatar: AVATAR, score: 3480, monthScore: 1180, contests: 20, rankDelta:  3, branch: 'CSE', year: 3, collegeId: 'vasavi' },
  { id: 'p-ouce-a',  username: 'rahul_ou',   avatar: AVATAR, score: 3350, monthScore: 1130, contests: 17, rankDelta: -1, branch: 'ECE', year: 4, collegeId: 'ouce' },
  { id: 'p-kits-a',  username: 'shreya_k',   avatar: AVATAR, score: 3180, monthScore: 1070, contests: 15, rankDelta:  6, branch: 'IT',  year: 3, collegeId: 'kits' },
  { id: 'p-anurag-a', username: 'vamsi_a',   avatar: AVATAR, score: 3050, monthScore: 1020, contests: 13, rankDelta:  2, branch: 'CSE', year: 2, collegeId: 'anurag' },
]

export const leaderboardPlayers: LeaderboardPlayer[] = [
  ...atYourCollege,
  ...notableElsewhere,
  // Hyderabad — strongest band
  ...roster('iiith',     14, 27, 3900),
  ...roster('cbit',      13,  3, 3200),
  ...roster('vasavi',    11, 15, 3050),
  ...roster('ouce',      12, 21, 2950),
  // Rangareddy
  ...roster('vardhaman', 10, 33, 2800),
  ...roster('anurag',     9, 39, 2750),
  ...roster('cmrce',      9, 45, 2650),
  // Warangal
  ...roster('nitw',      12, 51, 3600),
  ...roster('kits',      10, 57, 2900),
  ...roster('sru',        8, 63, 2700),
  // Smaller districts
  ...roster('jits',       7, 69, 2500),
  ...roster('sbit',       6, 75, 2400),
  ...roster('kce',        6, 81, 2350),
]
