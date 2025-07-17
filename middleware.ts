import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request: NextRequest) {
    const { nextUrl } = request
    const isLoggedIn = request.nextauth.token !== undefined

    // Admin routes that require authentication
    const isAdminRoute = nextUrl.pathname.startsWith("/admin")
    const isLoginPage = nextUrl.pathname === "/admin/login"

    // If accessing admin routes (except login) without being logged in
    if (isAdminRoute && !isLoginPage && !isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl))
    }

    // If logged in and trying to access login page, redirect to admin dashboard
    if (isLoginPage && isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", nextUrl))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to login page
        if (pathname === "/admin/login") {
          return true
        }

        // Require authentication for admin routes
        if (pathname.startsWith("/admin")) {
          return !!token
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ["/admin/:path*"],
}
