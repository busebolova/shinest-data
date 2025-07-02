"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      const adminLoggedIn = localStorage.getItem("admin_logged_in")
      const userData = localStorage.getItem("admin_user")

      if (adminLoggedIn === "true" && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("admin_logged_in")
          localStorage.removeItem("admin_user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials
      if (email === "admin@shinesticmimarlik.com" && password === "shinest2024") {
        const userData: User = {
          id: "1",
          name: "Admin",
          email: "admin@shinesticmimarlik.com",
          role: "admin",
        }

        setUser(userData)
        localStorage.setItem("admin_logged_in", "true")
        localStorage.setItem("admin_user", JSON.stringify(userData))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("admin_logged_in")
    localStorage.removeItem("admin_user")
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
