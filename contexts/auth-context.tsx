"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import {
  login as authLogin,
  logout as authLogout,
  isAuthenticated as checkAuth,
  getCurrentUser,
  type User,
} from "@/lib/simple-auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: () => boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuthentication = useCallback(() => {
    setIsLoading(true)
    const authenticated = checkAuth()
    if (authenticated) {
      setUser(getCurrentUser())
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    const success = authLogin(email, password)
    if (success) {
      setUser(getCurrentUser())
    } else {
      setUser(null)
    }
    setIsLoading(false)
    return success
  }

  const logout = () => {
    authLogout()
    setUser(null)
  }

  const contextValue = React.useMemo(
    () => ({
      user,
      isAuthenticated: checkAuth,
      login,
      logout,
      isLoading,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
