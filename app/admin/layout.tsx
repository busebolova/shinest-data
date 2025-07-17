"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
              <AdminHeader />
              <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
