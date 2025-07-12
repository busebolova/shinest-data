import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Authentication is now handled by `lib/simple-auth.ts` and `contexts/auth-context.tsx`.
// This file might be a remnant or a placeholder for a different auth system.

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple authentication - in production, use proper password hashing
        if (credentials?.username === "admin" && credentials?.password === "shinest2024") {
          return {
            id: "1",
            name: "Admin",
            email: "admin@shinest.com",
            role: "admin",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
}
