"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import AdminLoadingSpinner from "@/components/admin/loading-spinner"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/admin/login")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return <AdminLoadingSpinner />
  }

  if (!session) {
    return <AdminLoadingSpinner />
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-3xl text-shinest-blue">Dashboard</h2>
        <Button onClick={handleSignOut} variant="outline">
          Çıkış Yap
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-display text-xl text-shinest-blue mb-4">Hoş Geldiniz</h3>
          <p className="font-sans text-gray-600">
            Merhaba {session.user?.name || session.user?.email}! SHINEST yönetim paneline hoş geldiniz.
          </p>
          {session.user?.image && (
            <img src={session.user.image || "/placeholder.svg"} alt="Profile" className="w-12 h-12 rounded-full mt-4" />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-display text-xl text-shinest-blue mb-4">İçerik Yönetimi</h3>
          <p className="font-sans text-gray-600 mb-4">Blog yazılarını ve site içeriğini yönetin.</p>
          <a
            href="/admin/content"
            className="inline-flex items-center gap-2 bg-shinest-blue text-white px-4 py-2 rounded-lg hover:bg-shinest-blue/90 transition-colors"
          >
            İçeriği Yönet
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-display text-xl text-shinest-blue mb-4">Sistem Durumu</h3>
          <p className="font-sans text-gray-600">Sistem normal çalışıyor.</p>
          <div className="mt-2">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-green-600">Aktif</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-display text-xl text-shinest-blue mb-4">Kullanıcı Bilgileri</h3>
        <div className="space-y-2">
          <p>
            <strong>İsim:</strong> {session.user?.name || "Belirtilmemiş"}
          </p>
          <p>
            <strong>E-posta:</strong> {session.user?.email || "Belirtilmemiş"}
          </p>
          <p>
            <strong>Profil Resmi:</strong> {session.user?.image ? "Mevcut" : "Yok"}
          </p>
        </div>
      </div>
    </div>
  )
}
