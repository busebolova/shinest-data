"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { RealtimeIndicator } from "@/components/admin/realtime-indicator"
import { githubRealtime } from "@/lib/github-realtime"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("admin-logged-in") === "true"
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)

      if (!isLoggedIn) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      // Initialize real-time connection
      githubRealtime.connect().catch(console.error)

      // Listen for real-time updates and show notifications
      const unsubscribe = githubRealtime.onMessage((data) => {
        if (data.type === "commits" && data.data) {
          // Show notification for new commits
          console.log("New commit detected:", data.data)
        }
      })

      return () => {
        unsubscribe()
        githubRealtime.disconnect()
      }
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 lg:pl-64">
          <div className="p-6">
            {/* Real-time Status Indicator */}
            <div className="mb-6">
              <RealtimeIndicator />
            </div>

            {/* Page Content */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">{children}</div>
            </div>
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  )
}
