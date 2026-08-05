/**
 * App settings, stored per browser.
 *
 * Scope, honestly: this is localStorage, so a setting follows the browser and
 * not the account. Appearance and Interface take effect immediately because
 * they are client-side by nature. Notifications and Privacy are recorded and
 * shown back correctly, but nothing sends mail or gates a profile until there
 * is a server to hold them — the UI is the part that stays.
 *
 * Written as one flat record with an explicit default for every key, so a
 * release that adds a setting reads through to its default rather than
 * rendering an undefined control.
 */
import type { ProgrammingLanguage } from '../types'
import { LANGUAGES } from '../constants/languages'

export type FontSize = 'small' | 'medium' | 'large'
export type WeekStart = 'sunday' | 'monday'
export type Visibility = 'public' | 'private'

export interface Settings {
  /* Notifications */
  notifyContests: boolean
  notifyDailyReminder: boolean
  notifyCourseUpdates: boolean
  notifyMasterclasses: boolean
  notifyWeeklyDigest: boolean
  notifyAnnouncements: boolean

  /* Interface */
  defaultLanguage: ProgrammingLanguage
  editorFontSize: FontSize
  weekStartsOn: WeekStart
  reducedMotion: boolean

  /* Privacy */
  profileVisibility: Visibility
  showOnLeaderboard: boolean
  showEmail: boolean
  showActivity: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  notifyContests: true,
  notifyDailyReminder: true,
  notifyCourseUpdates: true,
  notifyMasterclasses: true,
  notifyWeeklyDigest: false,
  // Off by default. Marketing mail is the one category where the honest
  // default is the one the user has to ask for.
  notifyAnnouncements: false,

  defaultLanguage: 'python',
  editorFontSize: 'medium',
  weekStartsOn: 'monday',
  reducedMotion: false,

  profileVisibility: 'public',
  showOnLeaderboard: true,
  showEmail: false,
  showActivity: true,
}

const KEY = 'settings'

let cache: Settings | null = null
const listeners = new Set<() => void>()

const LANGUAGE_VALUES = LANGUAGES.map(l => l.value)
const FONT_SIZES: FontSize[] = ['small', 'medium', 'large']
const WEEK_STARTS: WeekStart[] = ['sunday', 'monday']
const VISIBILITIES: Visibility[] = ['public', 'private']

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback
}

function bool(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

/**
 * Every field is validated, not merged.
 *
 * Spreading the parsed blob over the defaults looked equivalent and is not: it
 * keeps whatever is in storage, including a value this release no longer
 * understands. That is not hypothetical — an earlier build wrote
 * defaultLanguage as "Python" before the setting moved to the editor's own
 * lowercase ids, and the stale value survived the upgrade, indexed into
 * playgroundSnippets as a missing key and took the editor down with an
 * undefined `code`. Storage is untrusted input; a value that is not one of the
 * options is not a value.
 */
function read(): Settings {
  if (cache) return cache
  let raw: Record<string, unknown> = {}
  try {
    const stored = localStorage.getItem(KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : {}
    if (parsed && typeof parsed === 'object') raw = parsed as Record<string, unknown>
  } catch {
    // private mode, or somebody hand-edited the key into nonsense
  }

  const d = DEFAULT_SETTINGS
  cache = {
    notifyContests:      bool(raw.notifyContests,      d.notifyContests),
    notifyDailyReminder: bool(raw.notifyDailyReminder, d.notifyDailyReminder),
    notifyCourseUpdates: bool(raw.notifyCourseUpdates, d.notifyCourseUpdates),
    notifyMasterclasses: bool(raw.notifyMasterclasses, d.notifyMasterclasses),
    notifyWeeklyDigest:  bool(raw.notifyWeeklyDigest,  d.notifyWeeklyDigest),
    notifyAnnouncements: bool(raw.notifyAnnouncements, d.notifyAnnouncements),

    defaultLanguage: oneOf(raw.defaultLanguage, LANGUAGE_VALUES, d.defaultLanguage),
    editorFontSize:  oneOf(raw.editorFontSize,  FONT_SIZES,      d.editorFontSize),
    weekStartsOn:    oneOf(raw.weekStartsOn,    WEEK_STARTS,     d.weekStartsOn),
    reducedMotion:   bool(raw.reducedMotion,    d.reducedMotion),

    profileVisibility:  oneOf(raw.profileVisibility, VISIBILITIES, d.profileVisibility),
    showOnLeaderboard:  bool(raw.showOnLeaderboard,  d.showOnLeaderboard),
    showEmail:          bool(raw.showEmail,          d.showEmail),
    showActivity:       bool(raw.showActivity,       d.showActivity),
  }
  return cache
}

/** Stable reference between writes — useSyncExternalStore requires it. */
export function getSettingsSnapshot(): Settings {
  return read()
}

export function subscribeToSettings(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

export function updateSettings(patch: Partial<Settings>): void {
  cache = { ...read(), ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {
    // private mode — the session still reflects it
  }
  applySideEffects(cache)
  listeners.forEach(listener => listener())
}

export function resetSettings(): void {
  cache = { ...DEFAULT_SETTINGS }
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing to clear
  }
  applySideEffects(cache)
  listeners.forEach(listener => listener())
}

/**
 * The settings that are more than a stored flag. Kept beside the store rather
 * than in a component, so they hold whether the settings page is mounted or
 * not — reduced motion has to survive navigating away from it.
 */
export function applySideEffects(settings: Settings = read()): void {
  const root = document.documentElement
  root.toggleAttribute('data-reduced-motion', settings.reducedMotion)
  root.setAttribute('data-editor-font', settings.editorFontSize)
}
