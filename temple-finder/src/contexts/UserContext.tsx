import React, { createContext, useContext, useState, useEffect } from 'react'

const USER_NAME_KEY = 'darshanam-user-name'

interface UserContextType {
  userName: string
  setUserName: (name: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(USER_NAME_KEY)
    if (saved) setUserNameState(saved)
  }, [])

  const setUserName = (name: string) => {
    const trimmed = name.trim()
    setUserNameState(trimmed)
    if (trimmed) localStorage.setItem(USER_NAME_KEY, trimmed)
    else localStorage.removeItem(USER_NAME_KEY)
  }

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
