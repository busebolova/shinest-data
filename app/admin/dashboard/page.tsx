"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, FileText, FolderOpen, PlusCircle, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  projects: number
  blogs: number
  pages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 4,
    blogs: 3,
    pages: 6,
  })
  const [isLoading, setIsLoading] = useState(false)

  const refreshStats = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStats({
        projects: 4,
        blogs: 3,
        pages: 6,
      })
    } catch (error) {
      console.error("İstatistik yenileme hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Yeni Proje Ekle",
      description: "Yeni bir proje oluştur",
      href: "/admin/projects/new",
      icon: PlusCircle,
      color: "bg-blue-500",
    },
    {
      title: "Blog Yazısı Yaz",
      description: "Yeni blog yazısı oluştur",
      href: "/admin/blog/new",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "İçerik Yönet",
      description: "Sayfa içeriklerini düzenle",
      href: "/admin/content",
      icon: LayoutDashboard,
      color: "bg-purple-500",
    },
    {
      title: "Medya Yönet",
      description: "Görselleri yönet",
      href: "/admin/media",
      icon: FolderOpen,
      color: "bg-orange-500",
    },
  ]

  const recentActivities = [
    {
      action: "Yeni proje eklendi",
      item: "Modern Banyo Tasarımı",
      time: "2 saat önce",
      type: "project",
    },
    {
      action: "Blog yazısı güncellendi",
      item: "2024 İç Mimarlık Trendleri",
      time: "5 saat önce",
      type: "blog",
    },
    {
      action: "Ana sayfa içeriği düzenlendi",
      item: "Hero bölümü",
      time: "1 gün önce",
      type: "content",
    },
    {
      action: "Yeni görsel yüklendi",
      item: "proje-galeri-1.jpg",
      time: "2 gün önce",
      type: "media",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">SHINEST İç Mimarlık içerik yönetim paneline hoş geldiniz</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={refreshStats} disabled={isLoading} size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            {isLoading ? "Yenileniyor..." : "İstatistikleri Yenile"}
          </Button>
          <Button asChild size="sm">
            <Link href="https://www.shinesticmimarlik.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Siteyi Görüntüle
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Projeler</CardTitle>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.projects}</div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-600">Toplam proje sayısı</p>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/projects">Projeleri Yönet</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Blog Yazıları</CardTitle>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.blogs}</div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-600">Yayınlanan yazı sayısı</p>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/blog">Blog Yönet</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                    <Button asChild variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                      <Link href={action.href}>Başlat →</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "project" && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        {activity.type === "blog" && (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                        )}
                        {activity.type === "content" && (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <LayoutDashboard className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                        {activity.type === "media" && (
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-orange-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {activity.time}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
