"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { RealtimeIndicator } from "@/components/admin/realtime-indicator"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      if (pathname === "/admin/login") {
        setLoading(false)
        return
      }

      const isAuth = localStorage.getItem("admin-authenticated") === "true"

      if (!isAuth) {
        router.push("/admin/login")
      } else {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Login page doesn't need sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RealtimeIndicator />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen ml-64">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
