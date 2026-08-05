import { useSyncExternalStore } from 'react'
import {
  getSettingsSnapshot,
  resetSettings,
  subscribeToSettings,
  updateSettings,
} from '../lib/settings'
import type { Settings } from '../lib/settings'

/**
 * Settings that every surface reads from, so a change on the settings page is
 * visible anywhere else that consults it without a reload.
 */
export function useSettings() {
  const settings = useSyncExternalStore(
    subscribeToSettings,
    getSettingsSnapshot,
    getSettingsSnapshot,
  )

  return {
    settings,
    update: updateSettings,
    reset: resetSettings,
    /** Narrow helper for the boolean rows, which are most of the page. */
    toggle: <K extends keyof Settings>(key: K) =>
      updateSettings({ [key]: !settings[key] } as Partial<Settings>),
  }
}
