import React, { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { signOut } from '../lib/auth'

const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Heart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  HelpCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  LogOut: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Camera: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  AtSign: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>,
  Mail: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
}

function InputField({ label, name, icon, defaultValue, placeholder, prefix }: { label: string, name: string, icon?: React.ReactNode, defaultValue?: string, placeholder?: string, prefix?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold tracking-widest text-muted uppercase">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-muted pointer-events-none">
            {icon}
          </div>
        )}
        {prefix && (
          <div className="absolute left-4 text-muted pointer-events-none text-sm font-medium">
            {prefix}
          </div>
        )}
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`w-full bg-secondary/50 border border-white/5 rounded-xl py-3 text-sm text-tertiary focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${icon || prefix ? 'pl-11' : 'pl-4'} pr-4`}
        />
      </div>
    </div>
  )
}

function TextAreaField({ label, name, defaultValue, placeholder, rows = 4 }: { label: string, name: string, defaultValue?: string, placeholder?: string, rows?: number }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold tracking-widest text-muted uppercase">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-secondary/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-tertiary focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y"
      />
    </div>
  )
}

function SelectField({ label, name, options, defaultValue }: { label: string, name: string, options: string[], defaultValue?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold tracking-widest text-muted uppercase">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full bg-secondary/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-tertiary focus:outline-none focus:ring-1 focus:ring-accent transition-colors appearance-none cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt} className="bg-[#0f172a]">{opt}</option>)}
      </select>
    </div>
  )
}

export default function ProfileSettingsPage() {
  const { profile, updateProfile } = useProfile()
  const navigate = useNavigate()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatarUrl)
  
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setAvatarUrl(URL.createObjectURL(file))
  }

  const handleLogout = () => {
    signOut()
    navigate(ROUTES.HOME, { replace: true })
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Construct updates from form
    const updates: any = {
      fullName: formData.get('fullName'),
      location: formData.get('location'),
      bio: formData.get('bio'),
      links: {
        github: formData.get('github'),
        linkedin: formData.get('linkedin'),
        website: formData.get('website'),
      }
    }
    
    if (avatarUrl) {
      updates.avatarUrl = avatarUrl
    }
    
    updateProfile(updates)
    
    // Redirect back to profile page to see changes
    navigate(ROUTES.PROFILE)
  }

  return (
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-72 bg-secondary/30 border border-white/5 rounded-2xl p-6 flex flex-col h-auto lg:sticky lg:top-28">
            {/* User Mini Profile */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#0f172a] border-2 border-white/10 flex items-center justify-center text-xl font-bold text-white overflow-hidden flex-shrink-0">
                {avatarUrl ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" /> : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{profile.fullName}</span>
                <span className="text-xs text-muted">alex.chen@example.com</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent/10 text-accent rounded-xl text-sm font-medium transition-colors text-left">
                <Icons.User /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:bg-white/5 hover:text-white rounded-xl text-sm font-medium transition-colors text-left">
                <Icons.Heart /> Enrolled Courses
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:bg-white/5 hover:text-white rounded-xl text-sm font-medium transition-colors text-left">
                <Icons.Calendar /> My Certificates
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:bg-white/5 hover:text-white rounded-xl text-sm font-medium transition-colors text-left">
                <Icons.HelpCircle /> Help
              </button>
            </div>

            {/* Log Out */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-xl text-sm font-medium transition-colors w-full text-left"
              >
                <Icons.LogOut /> Log Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <form onSubmit={handleSave} className="flex-1 w-full bg-secondary/30 border border-white/5 rounded-2xl p-8 md:p-10">
            {/* Header / Big Avatar */}
            <div className="flex items-center gap-6 mb-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#0f172a] border-2 border-white/10 flex items-center justify-center text-3xl font-bold text-white overflow-hidden shadow-xl">
                  {avatarUrl ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" /> : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-secondary border border-white/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-secondary transition-colors shadow-lg">
                  <Icons.Camera />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                </label>
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white">{profile.fullName}</h2>
                <p className="text-sm text-muted mt-1">Member since March 2026</p>
              </div>
            </div>

            {/* Basic Information */}
            <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
              <InputField name="fullName" label="Full Name" defaultValue={profile.fullName} icon={<Icons.AtSign />} />
              <InputField name="email" label="Email Address" defaultValue="alex.chen@example.com" icon={<Icons.Mail />} />
              <InputField name="phone" label="Phone Number" defaultValue="9876543210" prefix="+91" />
              <InputField name="designation" label="Designation" defaultValue="Software Engineer" />
            </div>

            {/* About Me */}
            <div className="border-t border-white/5 pt-8 mb-10">
              <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">About Me</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <InputField name="headline" label="Headline" placeholder="e.g., Computer Science Student" />
                <SelectField name="gender" label="Gender" options={['Select gender', 'Male', 'Female', 'Other']} defaultValue="Select gender" />
                <SelectField name="state" label="State" options={['Select state', 'California', 'New York', 'Texas']} defaultValue="Select state" />
                <InputField name="location" label="City" defaultValue={profile.location} placeholder="e.g., San Francisco" />
              </div>
              <TextAreaField name="bio" label="Bio" defaultValue={profile.bio} placeholder="e.g., I'm a computer science student..." />
            </div>

            {/* Professional Experience */}
            <div className="border-t border-white/5 pt-8 mb-10">
              <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">Professional Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <InputField name="company" label="Company Name" placeholder="e.g., Tech Startup Inc." />
                </div>
                <InputField name="role" label="Role" placeholder="e.g., Software Engineering Intern" />
                <InputField name="duration" label="Duration" placeholder="e.g., Jun 2023 - Aug 2023" />
              </div>
            </div>

            {/* Education */}
            <div className="border-t border-white/5 pt-8 mb-10">
              <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <InputField name="institution" label="Institution Name" placeholder="e.g., Stanford University" />
                </div>
                <InputField name="degree" label="Degree / Major" placeholder="e.g., B.S. Computer Science" />
                <InputField name="gradYear" label="Graduation Year" placeholder="e.g., 2025" />
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-white/5 pt-8 mb-10">
              <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputField name="github" label="GitHub URL" defaultValue={profile.links.github} placeholder="e.g., https://github.com/alexcodes" />
                <InputField name="linkedin" label="LinkedIn URL" defaultValue={profile.links.linkedin} placeholder="e.g., https://linkedin.com/in/alexcodes" />
                <div className="md:col-span-2">
                  <InputField name="website" label="Personal Portfolio URL" defaultValue={profile.links.website} placeholder="e.g., https://alexchen.dev" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-accent text-[#060b19] px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-accent/90 transition-colors">
                Save Changes
              </button>
            </div>
          </form>

        </div>
      </div>
  )
}
