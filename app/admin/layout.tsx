"use client"

import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Hatalı olan ve sunucu taraflı çalışan `cookies()` fonksiyonu kaldırıldı.
  // Layout yapısı, sidebar ve ana içeriğin uyumlu çalışması için yeniden düzenlendi.
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <AdminHeader />
            <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8">{children}</main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  )
}
