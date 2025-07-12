export interface User {
  email: string
  name: string
  role: string
}

export const ADMIN_CREDENTIALS = {
  email: "admin@shinesticmimarlik.com",
  password: "shinest2024",
  name: "Admin",
  role: "admin",
}

export function authenticate(email: string, password: string): User | null {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return {
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
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
    return authData.email === ADMIN_CREDENTIALS.email
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
