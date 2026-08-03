import { useState } from 'react'
import type { ReactNode } from 'react'
import { mockProfileData } from '../data/profile-mock'
import type { UserProfile } from '../data/profile-mock'
import { ProfileContext } from './profile-context'

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(mockProfileData)

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}
