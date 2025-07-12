export interface User {
  email: string
  name: string
  role: string
}

// Use environment variables for production credentials
// These should be set in Vercel environment variables for production
const ADMIN_EMAIL = process.env.ADMIN_USERNAME || "admin@shinesticmimarlik.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shinest2024"

export function authenticate(email: string, password: string): User | null {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      email: ADMIN_EMAIL,
      name: "Admin",
      role: "admin",
    }
  }
  // Add demo credentials for local development if needed, but not for production
  if (process.env.NODE_ENV === "development") {
    if (email === "demo@shinest.com" && password === "demo123") {
      return { email: "demo@shinest.com", name: "Demo User", role: "admin" }
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  try {
    const auth = localStorage.getItem("admin-auth")
    if (!auth) return false

    const authData = JSON.parse(auth)
    // For security, re-authenticate with the actual credentials, not just stored email
    // This is a simplified check for demo purposes. In a real app, you'd verify a token.
    return authData.email === ADMIN_EMAIL
  } catch {
    return false
  }
}

export function login(email: string, password: string): boolean {
  const user = authenticate(email, password)
  if (user) {
    localStorage.setItem("admin-auth", JSON.stringify(user))
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem("admin-auth")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const auth = localStorage.getItem("admin-auth")
    return auth ? JSON.parse(auth) : null
  } catch {
    return null
  }
}
