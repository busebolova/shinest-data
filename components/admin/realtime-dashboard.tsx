"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Activity,
  Github,
  Wifi,
  WifiOff,
  RefreshCw,
  Settings,
} from "lucide-react"
import { githubRealtime, type RealtimeData } from "@/lib/github-realtime"
import { githubAPI } from "@/lib/github-api"

interface DashboardStats {
  projects: number
  blogPosts: number
  messages: number
  visitors: number
  githubConnected: boolean
  lastSync: string
}

export function RealtimeDashboard() {
  const [data, setData] = useState<RealtimeData>(githubRealtime.getData())
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe((newData) => {
      setData(newData)
      setLoading(false)
    })

    const fetchInitialData = async () => {
      // Fetch initial data for recent activity
      try {
        const isConnected = githubAPI.isConfigured()
        if (isConnected) {
          const commits = await githubAPI.getCommits(5)
          setRecentActivity(
            commits.map((commit) => ({
              id: commit.sha,
              type: "commit",
              title: commit.commit.message.split("\n")[0],
              description: `by ${commit.commit.author.name}`,
              timestamp: commit.commit.author.date,
              url: commit.html_url,
            })),
          )
        }
      } catch (error) {
        console.error("Failed to fetch initial GitHub activity:", error)
      }
      setLoading(false)
    }

    fetchInitialData()

    return () => unsubscribe()
  }, [])

  const handleGithubSync = async () => {
    setLoading(true)
    try {
      await githubRealtime.refresh()
      const isConnected = githubAPI.isConfigured()
      if (isConnected) {
        const commits = await githubAPI.getCommits(5)
        setRecentActivity(
          commits.map((commit) => ({
            id: commit.sha,
            type: "commit",
            title: commit.commit.message.split("\n")[0],
            description: `by ${commit.commit.author.name}`,
            timestamp: commit.commit.author.date,
            url: commit.html_url,
          })),
        )
      }
    } catch (error) {
      console.error("GitHub sync failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const githubStatus = data.connectionStatus
  const stats: DashboardStats = {
    projects: data.projects?.length || 0,
    blogPosts: data.blogs?.length || 0,
    messages: data.dashboard?.messages || 0,
    visitors: data.dashboard?.visitors || 0,
    githubConnected: githubRealtime.isGitHubConfigured() && data.connectionStatus === "connected",
    lastSync: data.lastUpdate,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c4975a]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">SHINEST Admin Panel Özeti</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleGithubSync}
            disabled={githubStatus === "connecting"}
            variant="outline"
            className="border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${githubStatus === "connecting" ? "animate-spin" : ""}`} />
            Senkronize Et
          </Button>
        </div>
      </div>

      {/* GitHub Connection Status */}
      <Card className="border-l-4 border-l-[#c4975a]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-700" />
              <div>
                <CardTitle className="text-lg">GitHub Bağlantısı</CardTitle>
                <CardDescription>İçerik senkronizasyon durumu</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stats.githubConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Bağlı
                  </Badge>
                </>
              ) : githubStatus === "connecting" ? (
                <>
                  <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                    Kontrol Ediliyor
                  </Badge>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <Badge variant="destructive">Bağlantı Yok</Badge>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Durum:</span>
              <span
                className={`ml-2 font-medium ${
                  stats.githubConnected
                    ? "text-green-600"
                    : githubStatus === "connecting"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {stats.githubConnected ? "Aktif" : githubStatus === "connecting" ? "Kontrol Ediliyor" : "Pasif"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Son Senkronizasyon:</span>
              <span className="ml-2 font-medium">
                {stats.lastSync ? new Date(stats.lastSync).toLocaleString("tr-TR") : "Henüz yok"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Otomatik Güncelleme:</span>
              <span className="ml-2 font-medium">{stats.githubConnected ? "30 saniye" : "Durduruldu"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
            <FileText className="h-4 w-4 text-[#c4975a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">+2 geçen aydan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
            <FileText className="h-4 w-4 text-[#c4975a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts}</div>
            <p className="text-xs text-muted-foreground">+1 bu hafta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesajlar</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#c4975a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages}</div>
            <p className="text-xs text-muted-foreground">+5 bugün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ziyaretçiler</CardTitle>
            <Users className="h-4 w-4 text-[#c4975a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors}</div>
            <p className="text-xs text-muted-foreground">+12% geçen haftadan</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#c4975a]" />
              Son Aktiviteler
            </CardTitle>
            <CardDescription>GitHub'dan son değişiklikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-2 h-2 bg-[#c4975a] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Henüz aktivite yok</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#c4975a]" />
              Hızlı İşlemler
            </CardTitle>
            <CardDescription>Sık kullanılan işlemler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
                onClick={() => (window.location.href = "/admin/projects/new")}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs">Yeni Proje</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
                onClick={() => (window.location.href = "/admin/blog/new")}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs">Yeni Blog</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
                onClick={() => (window.location.href = "/admin/messages")}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs">Mesajlar</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
                onClick={() => (window.location.href = "/admin/settings")}
              >
                <Settings className="w-5 h-5" />
                <span className="text-xs">Ayarlar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#c4975a]" />
            Performans Özeti
          </CardTitle>
          <CardDescription>Site performans metrikleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sayfa Yükleme Hızı</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>SEO Skoru</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kullanıcı Deneyimi</span>
                <span>88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
