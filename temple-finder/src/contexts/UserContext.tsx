import React, { createContext, useContext, useState, useEffect } from 'react'

const USER_NAME_KEY = 'darshanam-user-name'
const BIRTH_NAKSHATRA_KEY = 'darshanam-birth-nakshatra'

interface UserContextType {
  userName: string
  setUserName: (name: string) => void
  birthNakshatra: string
  setBirthNakshatra: (nakshatra: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState('')
  const [birthNakshatra, setBirthNakshatraState] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(USER_NAME_KEY)
    if (saved) setUserNameState(saved)
    const savedNak = localStorage.getItem(BIRTH_NAKSHATRA_KEY)
    if (savedNak) setBirthNakshatraState(savedNak)
  }, [])

  const setUserName = (name: string) => {
    const trimmed = name.trim()
    setUserNameState(trimmed)
    if (trimmed) localStorage.setItem(USER_NAME_KEY, trimmed)
    else localStorage.removeItem(USER_NAME_KEY)
  }

  const setBirthNakshatra = (nakshatra: string) => {
    const trimmed = nakshatra.trim()
    setBirthNakshatraState(trimmed)
    if (trimmed) localStorage.setItem(BIRTH_NAKSHATRA_KEY, trimmed)
    else localStorage.removeItem(BIRTH_NAKSHATRA_KEY)
  }

  return (
    <UserContext.Provider value={{ userName, setUserName, birthNakshatra, setBirthNakshatra }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
