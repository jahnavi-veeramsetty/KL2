import { useSettings } from '../../hooks/useSettings'
import { SettingsSection, ToggleRow } from './SettingsSection'

/**
 * What we're allowed to interrupt you about.
 *
 * Split by why the mail exists rather than by channel. "Email vs push" is how
 * the system is built; "a contest I registered for is starting" is the thing a
 * person actually decides about.
 */
export function NotificationSettings() {
  const { settings, toggle } = useSettings()

  return (
    <>
      <SettingsSection
        title="Learning"
        description="Reminders tied to something you already signed up for."
      >
        <ToggleRow
          label="Daily challenge reminder"
          description="One nudge a day while your streak is alive."
          checked={settings.notifyDailyReminder}
          onChange={() => toggle('notifyDailyReminder')}
        />
        <ToggleRow
          label="Course updates"
          description="New lessons or materials in a course you are enrolled in."
          checked={settings.notifyCourseUpdates}
          onChange={() => toggle('notifyCourseUpdates')}
        />
        <ToggleRow
          label="Masterclass reminders"
          description="An hour before a live session you registered for."
          checked={settings.notifyMasterclasses}
          onChange={() => toggle('notifyMasterclasses')}
        />
      </SettingsSection>

      <SettingsSection title="Competition">
        <ToggleRow
          label="Contest and hackathon alerts"
          description="Registration opening, and the start of a contest you joined."
          checked={settings.notifyContests}
          onChange={() => toggle('notifyContests')}
        />
      </SettingsSection>

      <SettingsSection title="Digest and news">
        <ToggleRow
          label="Weekly summary"
          description="Your solved count, streak and rank movement, every Monday."
          checked={settings.notifyWeeklyDigest}
          onChange={() => toggle('notifyWeeklyDigest')}
        />
        <ToggleRow
          label="Product announcements"
          description="New features and occasional offers. Off unless you ask for it."
          checked={settings.notifyAnnouncements}
          onChange={() => toggle('notifyAnnouncements')}
        />
      </SettingsSection>
    </>
  )
}
