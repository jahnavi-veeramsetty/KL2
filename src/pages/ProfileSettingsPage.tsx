import { useState } from 'react'
import { Bell, Lock, Palette, ShieldCheck, User } from 'lucide-react'
import { useProfile } from '../hooks/useProfile'
import { cn } from '../lib/cn'
import { AccountSettings } from '../components/settings/AccountSettings'
import { InterfaceSettings } from '../components/settings/InterfaceSettings'
import { NotificationSettings } from '../components/settings/NotificationSettings'
import { PrivacySettings } from '../components/settings/PrivacySettings'
import { ProfileSettings } from '../components/settings/ProfileSettings'

/**
 * Settings.
 *
 * Sectioned rather than one long scroll: these are five unrelated decisions,
 * and a page that puts "delete account" three screens under "theme" makes you
 * scroll past things you did not come for. The rail is real navigation — it
 * used to be four buttons that did nothing.
 *
 * Section state is local, not a route. Deep-linking a settings tab is a nice
 * thing to have and a URL contract to keep; it can become one when something
 * actually needs to link here.
 */
const SECTIONS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    blurb: 'How you appear to everyone else on the platform.',
    render: () => <ProfileSettings />,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
    blurb: 'Theme, editor and motion. These apply to this browser.',
    render: () => <InterfaceSettings />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    blurb: 'What we are allowed to interrupt you about.',
    render: () => <NotificationSettings />,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: ShieldCheck,
    blurb: 'Who can see your profile, rank and activity.',
    render: () => <PrivacySettings />,
  },
  {
    id: 'account',
    label: 'Account',
    icon: Lock,
    blurb: 'Sign-in, this device, and the irreversible things.',
    render: () => <AccountSettings />,
  },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

export default function ProfileSettingsPage() {
  const { profile } = useProfile()
  const [active, setActive] = useState<SectionId>('profile')
  const section = SECTIONS.find(s => s.id === active) ?? SECTIONS[0]

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-24">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-strong tracking-tight">Settings</h1>
        <p className="text-sm text-subtle mt-1">
          Signed in as <span className="text-body font-medium">{profile.email}</span>
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Rail. On phones it becomes a horizontal strip rather than five stacked
            full-width buttons pushing the content off the first screen. */}
        <nav
          aria-label="Settings sections"
          className="w-full lg:w-56 shrink-0 lg:sticky lg:top-20"
        >
          <div className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-current={active === id ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                  active === id
                    ? 'bg-accent/15 text-accent'
                    : 'text-subtle hover:text-strong hover:bg-raised',
                )}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 w-full min-w-0 bg-panel border border-line rounded-2xl p-6 md:p-8">
          <div className="mb-8 pb-5 border-b border-line">
            <h2 className="text-lg font-bold text-strong tracking-tight">{section.label}</h2>
            <p className="text-[13px] text-subtle mt-1">{section.blurb}</p>
          </div>
          {section.render()}
        </div>
      </div>
    </div>
  )
}
