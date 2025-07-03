export interface User {
  email: string
  name: string
  role: string
}

export class SimpleAuth {
  private static readonly ADMIN_EMAIL = "admin@shinesticmimarlik.com"
  private static readonly ADMIN_PASSWORD = "shinest2024"
  private static readonly SESSION_KEY = "shinest_admin_session"

  static login(email: string, password: string): User | null {
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      const user: User = {
        email: this.ADMIN_EMAIL,
        name: "Admin",
        role: "admin",
      }

      // Store session
      if (typeof window !== "undefined") {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(user))
      }

      return user
    }
    return null
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    try {
      const session = localStorage.getItem(this.SESSION_KEY)
      return session ? JSON.parse(session) : null
    } catch {
      return null
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static requireAuth(): User {
    const user = this.getCurrentUser()
    if (!user) {
      throw new Error("Authentication required")
    }
    return user
  }
}

export const auth = SimpleAuth
