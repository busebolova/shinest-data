import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Admin rotalarını kontrol et
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Login sayfası hariç tüm admin sayfaları için auth kontrolü
    if (request.nextUrl.pathname !== "/admin/login") {
      // Basit bir auth kontrolü - gerçek uygulamada session kontrolü yapılmalı
      // Şimdilik sadece /admin/login'e yönlendir
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
