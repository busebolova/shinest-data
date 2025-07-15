import type React from "react"
import { Inter } from "next/font/google"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex min-h-screen bg-gray-100`}>
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
