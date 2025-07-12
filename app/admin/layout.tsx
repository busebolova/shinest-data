"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Toaster } from "@/components/ui/toaster"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // SSL zorlaması production'da
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
        const httpsUrl = window.location.href.replace("http:", "https:")
        window.location.replace(httpsUrl)
        return
      }
    }

    // CSP ayarları (bu meta etiketi Next.js'in kendi header ayarlarıyla çakışabilir,
    // next.config.mjs'deki headers fonksiyonu daha güvenli bir yaklaşımdır.)
    // Bu kısım genellikle Next.js'in kendi güvenlik mekanizmaları tarafından halledilir.
    // Eğer özel bir CSP ihtiyacınız varsa, next.config.mjs'i kullanmanız önerilir.
    // const meta = document.createElement("meta")
    // meta.httpEquiv = "Content-Security-Policy"
    // meta.content = `
    //   default-src 'self' https: data:;
    //   script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
    //   style-src 'self' 'unsafe-inline' https:;
    //   img-src 'self' data: https: blob:;
    //   font-src 'self' https: data:;
    //   connect-src 'self' https: wss:;
    //   media-src 'self' https:;
    //   object-src 'none';
    //   base-uri 'self';
    //   form-action 'self' https:;
    //   frame-ancestors 'none';
    //   upgrade-insecure-requests;
    // `
    //   .replace(/\s+/g, " ")
    //   .trim()

    // document.head.appendChild(meta)

    // return () => {
    //   if (document.head.contains(meta)) {
    //     document.head.removeChild(meta)
    //   }
    // }
  }, [])

  useEffect(() => {
    if (isClient && !isLoading) {
      if (!isAuthenticated() && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, isClient])

  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-10 w-10 animate-spin text-[#c4975a]" />
      </div>
    )
  }

  if (!isAuthenticated() && pathname !== "/admin/login") {
    return null // Redirect handled by useEffect
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1">
            <AdminHeader />
            <main className="p-6">{children}</main>
          </div>
        </div>
        <Toaster />
      </div>
    </AuthProvider>
  )
}
