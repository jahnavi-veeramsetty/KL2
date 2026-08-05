import { useSettings } from '../../hooks/useSettings'
import type { FontSize, WeekStart } from '../../lib/settings'
import type { ProgrammingLanguage } from '../../types'
import { LANGUAGES } from '../../constants/languages'
import { AppearanceSettings } from './AppearanceSettings'
import { ChoiceRow, SettingRow, SettingsSection, ToggleRow } from './SettingsSection'

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: 'small', label: 'S' },
  { value: 'medium', label: 'M' },
  { value: 'large', label: 'L' },
]

const WEEK_STARTS: { value: WeekStart; label: string }[] = [
  { value: 'sunday', label: 'Sun' },
  { value: 'monday', label: 'Mon' },
]

/**
 * Everything that changes how the app looks and behaves in this browser.
 *
 * Grouped with Appearance rather than given its own tab: theme, editor size and
 * motion are one decision — "how do I want to read this" — and splitting them
 * makes you check two places to answer it.
 */
export function InterfaceSettings() {
  const { settings, update, toggle } = useSettings()

  return (
    <>
      <SettingsSection
        title="Theme"
        description="System follows your device, and switches with it at sunset."
      >
        <AppearanceSettings />
      </SettingsSection>

      <SettingsSection title="Editor">
        <SettingRow
          label="Default language"
          description="Preselected when you open a problem or the playground."
        >
          <select
            value={settings.defaultLanguage}
            onChange={e => update({ defaultLanguage: e.target.value as ProgrammingLanguage })}
            aria-label="Default language"
            className="bg-raised border border-line-strong rounded-lg py-1.5 pl-3 pr-8 text-sm text-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 cursor-pointer"
          >
            {LANGUAGES.map(language => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </SettingRow>

        <ChoiceRow
          label="Editor text size"
          description="Applies to the code panes, not the rest of the app."
          value={settings.editorFontSize}
          options={FONT_SIZES}
          onChange={(value: FontSize) => update({ editorFontSize: value })}
        />
      </SettingsSection>

      <SettingsSection title="Display">
        <ChoiceRow
          label="Week starts on"
          description="Used by the events calendar and the consistency tracker."
          value={settings.weekStartsOn}
          options={WEEK_STARTS}
          onChange={(value: WeekStart) => update({ weekStartsOn: value })}
        />
        <ToggleRow
          label="Reduce motion"
          description="Drops transitions, hover lifts and the animated backgrounds."
          checked={settings.reducedMotion}
          onChange={() => toggle('reducedMotion')}
        />
      </SettingsSection>
    </>
  )
}
