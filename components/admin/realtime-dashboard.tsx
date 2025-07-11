"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, FileText, ImageIcon, RefreshCw, Clock, TrendingUp, Eye, MessageSquare } from "lucide-react"

interface DashboardStats {
  totalProjects: number
  totalPosts: number
  totalViews: number
  totalMessages: number
  recentActivity: Array<{
    id: string
    type: "project" | "post" | "message"
    title: string
    timestamp: string
  }>
}

export function RealtimeDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalPosts: 0,
    totalViews: 0,
    totalMessages: 0,
    recentActivity: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  // Gerçek zamanlı veri yükleme
  const loadDashboardData = async () => {
    try {
      setIsLoading(true)

      // localStorage'dan veri yükle
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      const posts = JSON.parse(localStorage.getItem("blog") || "[]")

      // Mock veriler
      const mockStats: DashboardStats = {
        totalProjects: projects.length || 12,
        totalPosts: posts.length || 8,
        totalViews: Math.floor(Math.random() * 10000) + 5000,
        totalMessages: Math.floor(Math.random() * 50) + 20,
        recentActivity: [
          {
            id: "1",
            type: "project",
            title: "Yeni proje eklendi: Modern Villa",
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          },
          {
            id: "2",
            type: "message",
            title: "Yeni mesaj alındı",
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          },
          {
            id: "3",
            type: "post",
            title: "Blog yazısı güncellendi",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          },
        ],
      }

      setStats(mockStats)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Dashboard verisi yüklenirken hata:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Bağlantı durumunu kontrol et
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // İlk yükleme ve otomatik güncelleme
  useEffect(() => {
    loadDashboardData()

    // Her 30 saniyede bir güncelle
    const interval = setInterval(loadDashboardData, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Az önce"
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} saat önce`
    return `${Math.floor(diffInMinutes / 1440)} gün önce`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FileText className="h-4 w-4" />
      case "post":
        return <ImageIcon className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Durum Göstergesi */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm text-gray-600">{isOnline ? "Çevrimiçi" : "Çevrimdışı"}</span>
          {lastUpdate && (
            <span className="text-xs text-gray-500">• Son güncelleme: {lastUpdate.toLocaleTimeString("tr-TR")}</span>
          )}
        </div>
        <Button onClick={loadDashboardData} disabled={isLoading} size="sm" variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Yenile
        </Button>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 bu ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Yazısı</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +1 bu hafta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görüntüleme</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% bu ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesajlar</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {Math.floor(stats.totalMessages * 0.3)} yeni
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Son Aktiviteler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Son Aktiviteler
            </CardTitle>
            <CardDescription>Sistemdeki son değişiklikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sistem Durumu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Sistem Durumu
            </CardTitle>
            <CardDescription>Performans ve kaynak kullanımı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Sunucu Performansı</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Veritabanı Kullanımı</span>
                  <span>62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Depolama Alanı</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span>Sistem Sağlığı</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    İyi Durumda
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
