'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getStoredToken, setStoredToken, clearStoredToken, getCurrentUser } from './api'

interface User {
  id: number
  name: string
  email: string
  github_id: number
  github_username: string
  github_avatar: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for token in URL params (OAuth callback)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get('token')
    const provider = params.get('provider')

    if (urlToken && provider === 'github') {
      setStoredToken(urlToken)
      setToken(urlToken)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } else {
      const storedToken = getStoredToken()
      if (storedToken) {
        setToken(storedToken)
      }
    }
  }, [])

  // Fetch user data when token is available
  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const response = await getCurrentUser(token).catch((error) => {
          // If API is not configured, just skip user fetch
          if ((error as any).code === 'API_NOT_CONFIGURED') {
            setIsLoading(false)
            return null
          }
          throw error
        })

        if (!response) {
          return
        }

        setUser(response.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        clearStoredToken()
        setToken(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [token])

  const login = async (newToken: string) => {
    setStoredToken(newToken)
    setToken(newToken)
  }

  const logout = () => {
    clearStoredToken()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
