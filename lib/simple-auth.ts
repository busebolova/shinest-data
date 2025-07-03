// Simple authentication without Supabase
interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

const ADMIN_CREDENTIALS = {
  email: "admin@shinesticmimarlik.com",
  password: "shinest2024",
  name: "Admin User",
  role: "admin" as const,
}

class SimpleAuth {
  private currentUser: User | null = null

  constructor() {
    // Check for existing session in localStorage
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("shinest-user")
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser)
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("shinest-user")
        }
      }
    }
  }

  async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Check admin credentials
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const user: User = {
          id: "admin-1",
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role,
        }

        this.currentUser = user

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("shinest-user", JSON.stringify(user))
        }

        return { user, error: null }
      }

      return { user: null, error: "Geçersiz email veya şifre" }
    } catch (error) {
      console.error("Login error:", error)
      return { user: null, error: "Giriş yapılırken bir hata oluştu" }
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null

    // Remove from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("shinest-user")
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }

  isAdmin(): boolean {
    return this.currentUser?.role === "admin"
  }

  async checkAuth(): Promise<User | null> {
    return this.currentUser
  }

  // Session management
  async refreshSession(): Promise<User | null> {
    // In a real app, you would validate the token with a server
    return this.currentUser
  }

  async validateSession(): Promise<boolean> {
    // Simple validation - check if user exists
    return this.currentUser !== null
  }
}

// Create singleton instance
const simpleAuth = new SimpleAuth()

export default simpleAuth
export type { User }

// Helper functions
export const login = (email: string, password: string) => simpleAuth.login(email, password)
export const logout = () => simpleAuth.logout()
export const getCurrentUser = () => simpleAuth.getCurrentUser()
export const isAuthenticated = () => simpleAuth.isAuthenticated()
export const isAdmin = () => simpleAuth.isAdmin()
export const checkAuth = () => simpleAuth.checkAuth()
