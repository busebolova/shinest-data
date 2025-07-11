"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  Users,
  FileText,
  MessageSquare,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  TrendingUp,
  Eye,
  Calendar,
} from "lucide-react"

interface DashboardStats {
  totalProjects: number
  totalBlogs: number
  totalViews: number
  totalMessages: number
  recentActivities: Array<{
    id: string
    type: string
    description: string
    timestamp: string
  }>
}

export function RealtimeDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalBlogs: 0,
    totalViews: 0,
    totalMessages: 0,
    recentActivities: [],
  })
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchStats = async () => {
    try {
      setIsRefreshing(true)

      // localStorage'dan verileri al
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]")
      const messages = JSON.parse(localStorage.getItem("messages") || "[]")

      // Mock views data
      const views = Math.floor(Math.random() * 10000) + 5000

      // Recent activities oluştur
      const activities = [
        {
          id: "1",
          type: "project",
          description: "Yeni proje eklendi",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: "2",
          type: "blog",
          description: "Blog yazısı güncellendi",
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
        {
          id: "3",
          type: "message",
          description: "Yeni mesaj alındı",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
      ]

      setStats({
        totalProjects: projects.length,
        totalBlogs: blogs.length,
        totalViews: views,
        totalMessages: messages.length,
        recentActivities: activities,
      })

      setLastUpdated(new Date())
      setIsOnline(true)
    } catch (error) {
      console.error("Stats fetch error:", error)
      setIsOnline(false)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchStats()
  }

  useEffect(() => {
    fetchStats()

    // 30 saniyede bir güncelle
    const interval = setInterval(fetchStats, 30000)

    // Online/offline durumunu takip et
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      clearInterval(interval)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))

    if (minutes < 1) return "Az önce"
    if (minutes < 60) return `${minutes} dakika önce`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} saat önce`
    const days = Math.floor(hours / 24)
    return `${days} gün önce`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Sistem durumu ve gerçek zamanlı istatistikler</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            Son güncelleme: {formatTime(lastUpdated)}
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            size="sm"
            variant="outline"
            className="border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </div>
      </div>

      {/* Status Indicator */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-green-500" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Gerçek Zamanlı Bağlantı Aktif</span>
                    <div className="text-sm text-gray-500">Veriler otomatik olarak güncelleniyor</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-5 w-5 text-red-500" />
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-red-600 font-medium">Bağlantı Sorunu</span>
                    <div className="text-sm text-gray-500">Veriler manuel olarak güncelleniyor</div>
                  </div>
                </>
              )}
            </div>
            <Badge
              variant={isOnline ? "default" : "destructive"}
              className={isOnline ? "bg-green-100 text-green-800" : ""}
            >
              {isOnline ? "Çevrimiçi" : "Çevrimdışı"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Toplam Projeler</CardTitle>
            <div className="bg-[#c4975a]/10 p-3 rounded-full">
              <FileText className="h-4 w-4 text-[#c4975a]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalProjects}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="h-3 w-3 inline mr-1 text-[#c4975a]" />
              +2 bu ay
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Blog Yazıları</CardTitle>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalBlogs}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="h-3 w-3 inline mr-1 text-blue-600" />
              +1 bu hafta
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Toplam Görüntüleme</CardTitle>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-600" />
              +12% bu ay
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Mesajlar</CardTitle>
            <div className="bg-purple-100 p-3 rounded-full">
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalMessages}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="h-3 w-3 inline mr-1 text-purple-600" />
              +3 bugün
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Son Aktiviteler
          </CardTitle>
          <CardDescription>Sistemdeki son değişiklikler ve güncellemeler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivities.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
                {index < stats.recentActivities.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
