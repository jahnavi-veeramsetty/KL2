import { useSettings } from '../../hooks/useSettings'
import type { Visibility } from '../../lib/settings'
import { ChoiceRow, SettingsSection, ToggleRow } from './SettingsSection'

const VISIBILITY: { value: Visibility; label: string }[] = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
]

/**
 * Who can see what.
 *
 * The three switches below are disabled while the profile is private — not
 * hidden. A control that vanishes reads as a bug; one that greys out with the
 * reason above it explains the rule.
 */
export function PrivacySettings() {
  const { settings, update, toggle } = useSettings()
  const isPrivate = settings.profileVisibility === 'private'

  return (
    <>
      <SettingsSection
        title="Profile"
        description={
          isPrivate
            ? 'Your profile is private, so the options below have nothing to show.'
            : 'Anyone with the link can see your profile, badges and solved count.'
        }
      >
        <ChoiceRow
          label="Profile visibility"
          value={settings.profileVisibility}
          options={VISIBILITY}
          onChange={(value: Visibility) => update({ profileVisibility: value })}
        />
      </SettingsSection>

      <SettingsSection title="What's shown">
        <ToggleRow
          label="Appear on leaderboards"
          description="Turning this off removes you from public rankings. Your score is still counted."
          checked={settings.showOnLeaderboard && !isPrivate}
          onChange={() => toggle('showOnLeaderboard')}
          disabled={isPrivate}
        />
        <ToggleRow
          label="Show activity heatmap"
          description="The day-by-day grid of what you solved."
          checked={settings.showActivity && !isPrivate}
          onChange={() => toggle('showActivity')}
          disabled={isPrivate}
        />
        <ToggleRow
          label="Show email address"
          description="Visible to anyone viewing your profile. Off is the sane default."
          checked={settings.showEmail && !isPrivate}
          onChange={() => toggle('showEmail')}
          disabled={isPrivate}
        />
      </SettingsSection>
    </>
  )
}
