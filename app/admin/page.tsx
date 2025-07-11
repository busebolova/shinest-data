"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, FolderOpen, FileText, TrendingUp, RefreshCw, Github, Activity } from "lucide-react"

interface DashboardStats {
  totalProjects: number
  publishedProjects: number
  draftProjects: number
  featuredProjects: number
  totalBlogPosts: number
  publishedBlogPosts: number
  lastUpdated: string
}

interface RecentActivity {
  id: string
  type: string
  action: string
  title: string
  timestamp: string
}

interface DashboardData {
  stats: DashboardStats
  recentActivity: RecentActivity[]
  isGitHubConnected: boolean
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/dashboard", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      const dashboardData = await response.json()
      setData(dashboardData)
      setLastRefresh(new Date())
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()

    // Auto refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    fetchDashboardData()
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Yükleniyor...</span>
        </div>
      </div>
    )
  }

  const stats = data?.stats || {
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    featuredProjects: 0,
    totalBlogPosts: 0,
    publishedBlogPosts: 0,
    lastUpdated: new Date().toISOString(),
  }

  const recentActivity = data?.recentActivity || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">SHINEST Admin Panel - Genel Bakış</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <Badge variant={data?.isGitHubConnected ? "default" : "secondary"}>
              {data?.isGitHubConnected ? "GitHub Bağlı" : "Yerel"}
            </Badge>
          </div>
          <Button onClick={handleRefresh} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedProjects} yayında, {stats.draftProjects} taslak
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Öne Çıkan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProjects}</div>
            <p className="text-xs text-muted-foreground">Öne çıkan projeler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
            <p className="text-xs text-muted-foreground">{stats.publishedBlogPosts} yayında</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sistem Durumu</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Aktif</div>
            <p className="text-xs text-muted-foreground">Son güncelleme: {lastRefresh.toLocaleTimeString("tr-TR")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Proje Durumu</CardTitle>
            <CardDescription>Yayınlanan ve taslak projelerin dağılımı</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Yayında</span>
                <span>
                  {stats.publishedProjects}/{stats.totalProjects}
                </span>
              </div>
              <Progress
                value={stats.totalProjects > 0 ? (stats.publishedProjects / stats.totalProjects) * 100 : 0}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Öne Çıkan</span>
                <span>
                  {stats.featuredProjects}/{stats.totalProjects}
                </span>
              </div>
              <Progress
                value={stats.totalProjects > 0 ? (stats.featuredProjects / stats.totalProjects) * 100 : 0}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
            <CardDescription>Sistemdeki son değişiklikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === "project" && <FolderOpen className="h-4 w-4" />}
                      {activity.type === "blog" && <FileText className="h-4 w-4" />}
                      {activity.type === "content" && <BarChart3 className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Henüz aktivite bulunmuyor</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>Sistem Bilgileri</CardTitle>
          <CardDescription>Sistem durumu ve bağlantı bilgileri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Veri Kaynağı</p>
              <div className="flex items-center gap-2">
                <Badge variant={data?.isGitHubConnected ? "default" : "secondary"}>
                  {data?.isGitHubConnected ? "GitHub Repository" : "Local Storage"}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Son Güncelleme</p>
              <p className="text-sm text-muted-foreground">{new Date(stats.lastUpdated).toLocaleString("tr-TR")}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Otomatik Yenileme</p>
              <Badge variant="outline">30 saniye</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
