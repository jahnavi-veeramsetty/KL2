import { createContext } from 'react'
import type { UserProfile } from '../data/profile-mock'

export interface ProfileContextType {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined)
