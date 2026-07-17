import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const UserContext = createContext(null)

const defaultUser = {
  name: 'Hari Suthan',
  role: 'Frontend Developer',
  bio: 'Learning React one project at a time. Building PromptVerse AI as a final project.',
}

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('promptverse_user', defaultUser)

  const updateUser = (updates) => setUser((prev) => ({ ...prev, ...updates }))

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}
