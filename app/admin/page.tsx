"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, FileText, ImageIcon, MessageSquare, TrendingUp, Calendar, Eye, Edit } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalPages: number
  totalProjects: number
  totalBlogPosts: number
  pendingMessages: number
  totalImages: number
  lastUpdate: string
}

interface RecentActivity {
  id: string
  type: "page" | "project" | "blog" | "message"
  title: string
  action: string
  timestamp: string
  user: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 6,
    totalProjects: 12,
    totalBlogPosts: 8,
    pendingMessages: 3,
    totalImages: 45,
    lastUpdate: "2 saat önce",
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "project",
      title: "Banyo Tasarımı",
      action: "güncellendi",
      timestamp: "2 saat önce",
      user: "Admin",
    },
    {
      id: "2",
      type: "blog",
      title: "Modern İç Mimarlık Trendleri",
      action: "yayınlandı",
      timestamp: "1 gün önce",
      user: "Admin",
    },
    {
      id: "3",
      type: "message",
      title: "Yeni proje talebi",
      action: "alındı",
      timestamp: "3 gün önce",
      user: "Sistem",
    },
    {
      id: "4",
      type: "page",
      title: "Ana Sayfa",
      action: "düzenlendi",
      timestamp: "1 hafta önce",
      user: "Admin",
    },
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "page":
        return <FileText className="h-4 w-4" />
      case "project":
        return <ImageIcon className="h-4 w-4" />
      case "blog":
        return <FileText className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "page":
        return "bg-blue-100 text-blue-600"
      case "project":
        return "bg-green-100 text-green-600"
      case "blog":
        return "bg-purple-100 text-purple-600"
      case "message":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  useEffect(() => {
    // Load stats from localStorage or API
    const savedStats = localStorage.getItem("dashboard_stats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">SHINEST İç Mimarlık içerik yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Sayfa</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPages}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/content">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  İçerik Yönet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projeler</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/projects">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Projeleri Yönet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Yazıları</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBlogPosts}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/blog">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Blog Yönet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bekleyen Mesaj</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingMessages}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/messages">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Mesajları Gör
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medya Dosyası</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalImages}</p>
              </div>
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/media">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Medya Yönet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hızlı İşlemler
            </CardTitle>
            <CardDescription>Sık kullanılan işlemlere hızlı erişim</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/content">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                  <Home className="h-6 w-6" />
                  <span className="text-sm">Ana Sayfa Düzenle</span>
                </Button>
              </Link>

              <Link href="/admin/projects/new">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-sm">Yeni Proje Ekle</span>
                </Button>
              </Link>

              <Link href="/admin/blog/new">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Blog Yazısı Ekle</span>
                </Button>
              </Link>

              <Link href="/admin/media">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-sm">Görsel Yükle</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Son Aktiviteler
            </CardTitle>
            <CardDescription>Son yapılan değişiklikler ve güncellemeler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">
                      {activity.action} • {activity.timestamp}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.user}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                Tüm Aktiviteleri Gör
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Site Önizleme
          </CardTitle>
          <CardDescription>Sitenizin canlı halini görüntüleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">SHINEST İç Mimarlık</h3>
              <p className="text-sm text-gray-500">Son güncelleme: {stats.lastUpdate}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
                <Eye className="h-4 w-4 mr-2" />
                Siteyi Görüntüle
              </Button>
              <Link href="/admin/content">
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
