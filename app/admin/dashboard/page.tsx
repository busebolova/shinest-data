"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ImageIcon,
  Eye,
  Plus,
  Settings,
  Activity,
  Calendar,
  Clock,
  BarChart3,
  Users,
  Globe,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface DashboardData {
  totalProjects: number
  completedProjects: number
  inProgressProjects: number
  plannedProjects: number
  featuredProjects: number
  totalBlogPosts: number
  publishedPosts: number
  featuredPosts: number
  recentCommits: number
  lastUpdate: string
  recentActivity: Array<{
    id: string
    type: string
    action: string
    title: string
    description?: string
    timestamp: string
    status?: string
  }>
  monthlyStats: {
    projects: number[]
    views: number[]
    months: string[]
  }
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Dashboard verileri alınamadı")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Bağlantı hatası oluştu")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c4975a] mx-auto mb-4"></div>
            <p className="text-gray-600">Dashboard yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">Hata Oluştu</h3>
          <p className="text-gray-500 mb-8">{error}</p>
          <Button onClick={fetchDashboardData} className="bg-[#c4975a] hover:bg-[#b8864d] text-white">
            Tekrar Dene
          </Button>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: "Yeni Proje Ekle",
      description: "Portföye yeni proje ekleyin",
      href: "/admin/projects/new",
      icon: Plus,
      color: "bg-blue-500",
    },
    {
      title: "İçerik Düzenle",
      description: "Sayfa içeriklerini güncelleyin",
      href: "/admin/content",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Medya Yöneticisi",
      description: "Görselleri yönetin",
      href: "/admin/media",
      icon: ImageIcon,
      color: "bg-purple-500",
    },
    {
      title: "Ayarlar",
      description: "Site ayarlarını düzenleyin",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">SHINEST Admin Panel</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Son güncelleme: {new Date(dashboardData.lastUpdate).toLocaleString("tr-TR")}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Proje</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.totalProjects}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-blue-600 font-medium">{dashboardData.featuredProjects} öne çıkan</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Blog Yazısı</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.totalBlogPosts}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-600 font-medium">{dashboardData.publishedPosts} yayınlanmış</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">GitHub Commit</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.recentCommits}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-purple-600 font-medium">Son commit'ler</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sistem Durumu</p>
                  <p className="text-3xl font-bold text-green-600">Aktif</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-600 font-medium">GitHub bağlı</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Activity className="w-5 h-5" />
                  Hızlı İşlemler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className={`${action.color} p-2 rounded-lg`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{action.title}</p>
                        <p className="text-xs text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Calendar className="w-5 h-5" />
                  Son Aktiviteler
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.recentActivity.slice(0, 8).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === "project"
                              ? "bg-blue-500"
                              : activity.type === "blog"
                                ? "bg-green-500"
                                : activity.type === "commit"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          {activity.description && <p className="text-xs text-gray-500 mt-1">{activity.description}</p>}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(activity.timestamp).toLocaleString("tr-TR")}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            activity.type === "project"
                              ? "border-blue-200 text-blue-700"
                              : activity.type === "blog"
                                ? "border-green-200 text-green-700"
                                : activity.type === "commit"
                                  ? "border-purple-200 text-purple-700"
                                  : "border-gray-200 text-gray-700"
                          }`}
                        >
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Henüz aktivite bulunmuyor</p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t">
                  <Link href="/admin/activity">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      Tüm Aktiviteleri Görüntüle
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <BarChart3 className="w-5 h-5" />
                Proje Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yayınlanan</span>
                  <span className="font-semibold text-green-600">{dashboardData.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Devam Eden</span>
                  <span className="font-semibold text-blue-600">{dashboardData.inProgressProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Planlanan</span>
                  <span className="font-semibold text-orange-600">{dashboardData.plannedProjects}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium text-gray-900">Toplam</span>
                  <span className="font-bold text-gray-900">{dashboardData.totalProjects}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Users className="w-5 h-5" />
                İçerik Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Yazısı</span>
                  <span className="font-semibold text-blue-600">{dashboardData.totalBlogPosts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Öne Çıkan Proje</span>
                  <span className="font-semibold text-green-600">{dashboardData.featuredProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">GitHub Commit</span>
                  <span className="font-semibold text-purple-600">{dashboardData.recentCommits}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium text-gray-900">Sistem</span>
                  <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Site Preview */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-900">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Site Önizleme
              </span>
              <Link href="/" target="_blank">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
                >
                  Siteyi Ziyaret Et
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="mb-4">
                <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">SHINEST İç Mimarlık</h3>
              <p className="text-gray-500 mb-6">
                {dashboardData.totalProjects} proje, {dashboardData.totalBlogPosts} blog yazısı ile aktif olarak
                çalışıyor
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>✅ GitHub Bağlantısı Aktif</span>
                <span>✅ İçerikler Güncel</span>
                <span>✅ Sistem Çalışıyor</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
