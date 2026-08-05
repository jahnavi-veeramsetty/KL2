import React, { useState } from 'react'
import { Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useProfile } from '../../hooks/useProfile'
import { SettingsSection } from './SettingsSection'

const FIELD =
  'w-full bg-raised border border-line rounded-xl py-2.5 px-3.5 text-sm text-strong placeholder:text-faint ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-colors'

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = 'text',
  span,
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  type?: string
  span?: boolean
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
      <label htmlFor={name} className="text-[11px] font-bold tracking-wider text-subtle uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={FIELD}
      />
    </div>
  )
}

/**
 * The editable profile — the one panel on this page that batches its changes
 * behind a Save, because a half-typed name is not a state anyone wants
 * published mid-keystroke. Everything else on the page commits on the spot.
 */
export function ProfileSettings() {
  const { profile, updateProfile } = useProfile()
  const navigate = useNavigate()
  const [avatarUrl, setAvatarUrl] = useState<string>(profile.avatarUrl)

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setAvatarUrl(URL.createObjectURL(file))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const text = (key: string) => String(form.get(key) ?? '')

    updateProfile({
      fullName: text('fullName'),
      username: text('username'),
      email: text('email'),
      title: text('title'),
      location: text('location'),
      bio: text('bio'),
      avatarUrl,
      links: {
        github: text('github'),
        linkedin: text('linkedin'),
        website: text('website'),
      },
    })

    navigate(ROUTES.PROFILE)
  }

  return (
    <form onSubmit={handleSave}>
      <SettingsSection title="Photo">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-raised border border-line-strong overflow-hidden">
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent text-on-accent border-2 border-panel flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <Camera className="w-4 h-4" aria-hidden />
              <span className="sr-only">Upload a new photo</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
            </label>
          </div>
          <p className="text-[13px] text-subtle max-w-xs">
            A square image works best. It is read from your browser and never uploaded until you
            save.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection title="Basic information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Full name" name="fullName" defaultValue={profile.fullName} />
          <Field label="Username" name="username" defaultValue={profile.username} />
          <Field label="Email address" name="email" type="email" defaultValue={profile.email} />
          <Field label="Headline" name="title" defaultValue={profile.title} placeholder="e.g. Final year CSE, NIT Warangal" />
          <Field label="Location" name="location" defaultValue={profile.location} placeholder="e.g. Hyderabad" span />
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="bio" className="text-[11px] font-bold tracking-wider text-subtle uppercase">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              defaultValue={profile.bio}
              placeholder="A couple of lines about what you are working on."
              className={`${FIELD} resize-y`}
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Links" description="Shown on your public profile.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="GitHub" name="github" defaultValue={profile.links.github} placeholder="https://github.com/username" />
          <Field label="LinkedIn" name="linkedin" defaultValue={profile.links.linkedin} placeholder="https://linkedin.com/in/username" />
          <Field label="Portfolio" name="website" defaultValue={profile.links.website} placeholder="https://yoursite.dev" span />
        </div>
      </SettingsSection>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-accent text-on-accent px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          Save changes
        </button>
      </div>
    </form>
  )
}
