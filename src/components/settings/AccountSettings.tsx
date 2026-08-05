import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, LogOut, RotateCcw } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { signOut } from '../../lib/auth'
import { useProfile } from '../../hooks/useProfile'
import { useSettings } from '../../hooks/useSettings'
import { SettingRow, SettingsSection } from './SettingsSection'

const ACTION =
  'text-xs font-bold uppercase tracking-wide px-3.5 py-2 rounded-lg border border-line-strong ' +
  'bg-raised text-strong hover:bg-line-strong transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60'

const DANGER =
  'text-xs font-bold uppercase tracking-wide px-3.5 py-2 rounded-lg border border-red-500/40 ' +
  'bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60'

/**
 * Sign-in, session and the irreversible things.
 *
 * The destructive actions are last and boxed, because a settings page is
 * scanned top to bottom and "delete account" should never be the thing your
 * eye lands on first.
 */
export function AccountSettings() {
  const { profile } = useProfile()
  const { reset } = useSettings()
  const navigate = useNavigate()
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const handleSignOut = () => {
    signOut()
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <>
      <SettingsSection
        title="Sign in"
        description="Password and email changes are handled by the account service; the controls are here once it is wired."
      >
        <SettingRow label="Email address" description={profile.email}>
          <button type="button" className={ACTION} disabled>
            Change
          </button>
        </SettingRow>
        <SettingRow label="Password" description="Last changed — not tracked yet.">
          <button type="button" className={ACTION} disabled>
            Update
          </button>
        </SettingRow>
        <SettingRow
          label="Connected account"
          description="Signed in with Google. Disconnecting needs a password set first."
        >
          <button type="button" className={ACTION} disabled>
            Disconnect
          </button>
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="This device">
        <SettingRow
          label="Reset preferences"
          description="Puts theme, notifications, privacy and editor options back to their defaults on this browser."
        >
          <button type="button" onClick={reset} className={ACTION}>
            <RotateCcw className="w-3.5 h-3.5 inline -mt-0.5 mr-1.5" aria-hidden />
            Reset
          </button>
        </SettingRow>
        <SettingRow label="Sign out" description="Ends the session on this browser only.">
          <button type="button" onClick={handleSignOut} className={ACTION}>
            <LogOut className="w-3.5 h-3.5 inline -mt-0.5 mr-1.5" aria-hidden />
            Sign out
          </button>
        </SettingRow>
      </SettingsSection>

      <section className="rounded-2xl border border-red-500/30 bg-red-500/[0.04] p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-red-400 tracking-tight">
          <AlertTriangle className="w-4 h-4" aria-hidden />
          Danger zone
        </h3>
        <p className="text-[13px] text-subtle mt-1 max-w-prose">
          Deleting your account removes your submissions, streak and contest history. This cannot be
          undone.
        </p>

        <div className="mt-4">
          {confirmingDelete ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-body mr-1">Are you sure?</span>
              {/* Deliberately inert: there is no backend to delete anything, and
                  a button that clears local state while claiming to delete an
                  account is worse than one that does nothing. */}
              <button type="button" className={DANGER} disabled>
                Yes, delete my account
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className={ACTION}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirmingDelete(true)} className={DANGER}>
              Delete account
            </button>
          )}
        </div>
      </section>
    </>
  )
}
