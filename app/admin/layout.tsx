import type React from "react"
import { Suspense } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { RealtimeIndicator } from "@/components/admin/realtime-indicator"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Suspense fallback={<div className="h-16 bg-gray-100 rounded-lg animate-pulse" />}>
              <RealtimeIndicator />
            </Suspense>
          </div>
          <div className="bg-white rounded-lg shadow-sm">{children}</div>
        </main>
      </div>
    </div>
  )
}
