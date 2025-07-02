export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
}

export const ADMIN_CREDENTIALS = {
  email: "admin@shinesticmimarlik.com",
  password: "shinest2024",
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("admin_user")
  const isLoggedIn = localStorage.getItem("admin_logged_in")

  if (isLoggedIn === "true" && userData) {
    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  }

  return null
}

export function setAdminUser(user: AdminUser): void {
  if (typeof window === "undefined") return

  localStorage.setItem("admin_user", JSON.stringify(user))
  localStorage.setItem("admin_logged_in", "true")
}

export function clearAdminUser(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("admin_user")
  localStorage.removeItem("admin_logged_in")
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  return localStorage.getItem("admin_logged_in") === "true"
}
