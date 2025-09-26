import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          // In a real app, you would validate the token with your backend
          // For now, we'll simulate a user
          setUser({
            id: '1',
            email: 'user@example.com',
            name: 'Devotee User',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      setUser(userData)
      localStorage.setItem('auth_token', 'mock_token')
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData: User = {
        id: '1',
        email,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      setUser(userData)
      localStorage.setItem('auth_token', 'mock_token')
    } catch (error) {
      throw new Error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      localStorage.removeItem('auth_token')
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setUser({ ...user, ...data, updated_at: new Date().toISOString() })
    } catch (error) {
      throw new Error('Profile update failed')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
