"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, FolderOpen, TrendingUp, Eye, Edit, Plus, RefreshCw, Activity, GitCommit } from "lucide-react"
import Link from "next/link"

interface DashboardData {
  stats: {
    totalProjects: number
    completedProjects: number
    inProgressProjects: number
    totalBlogPosts: number
    featuredPosts: number
    recentCommits: number
    featuredProjects: number
  }
  recentActivity: Array<{
    id: string
    title: string
    description: string
    timestamp: string
    type: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    category: string
    location: string
  }>
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    stats: {
      totalProjects: 12,
      completedProjects: 8,
      inProgressProjects: 4,
      totalBlogPosts: 6,
      featuredPosts: 3,
      recentCommits: 15,
      featuredProjects: 5,
    },
    recentActivity: [
      {
        id: "1",
        title: "Yeni proje eklendi",
        description: "Modern Banyo Tasarımı projesi oluşturuldu",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: "project",
      },
      {
        id: "2",
        title: "Blog yazısı güncellendi",
        description: "2024 İç Mimarlık Trendleri yazısı düzenlendi",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        type: "blog",
      },
      {
        id: "3",
        title: "Ana sayfa içeriği değiştirildi",
        description: "Hero bölümü metni güncellendi",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        type: "content",
      },
    ],
    projects: [
      {
        id: "1",
        title: "Modern Living Room",
        description: "Contemporary living space with minimalist design",
        category: "residential",
        location: "Istanbul",
      },
      {
        id: "2",
        title: "Luxury Hotel Lobby",
        description: "Elegant hotel lobby with premium finishes",
        category: "hospitality",
        location: "Ankara",
      },
      {
        id: "3",
        title: "Office Space Design",
        description: "Modern office interior with collaborative spaces",
        category: "commercial",
        location: "Izmir",
      },
    ],
  })
  const [loading, setLoading] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const refresh = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUpdateCount((prev) => prev + 1)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Refresh failed:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUpdateCount((prev) => prev + 1)
      setLastUpdate(new Date())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Yönetim paneli genel bakış</p>
        </div>
        <div className="flex items-center gap-3">
          {updateCount > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Activity className="w-3 h-3 mr-1" />
              {updateCount} canlı güncelleme
            </Badge>
          )}
          {lastUpdate && (
            <span className="text-sm text-gray-500">Son güncelleme: {lastUpdate.toLocaleTimeString("tr-TR")}</span>
          )}
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Toplam Projeler</CardTitle>
            <FolderOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{data.stats.totalProjects}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-blue-200 text-blue-800">
                {data.stats.completedProjects} tamamlandı
              </Badge>
              <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">
                {data.stats.inProgressProjects} devam ediyor
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Blog Yazıları</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{data.stats.totalBlogPosts}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-green-200 text-green-800">
                {data.stats.featuredPosts} öne çıkan
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Son Commit'ler</CardTitle>
            <GitCommit className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{data.stats.recentCommits}</div>
            <p className="text-xs text-purple-600 mt-2">GitHub aktivitesi</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Öne Çıkan</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{data.stats.featuredProjects}</div>
            <p className="text-xs text-orange-600 mt-2">Öne çıkan projeler</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Hızlı İşlemler
          </CardTitle>
          <CardDescription>Sık kullanılan işlemlere hızlı erişim</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col gap-2">
              <Link href="/admin/projects/new">
                <FolderOpen className="w-6 h-6" />
                <span>Yeni Proje</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <Link href="/admin/blog/new">
                <FileText className="w-6 h-6" />
                <span>Yeni Blog Yazısı</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <Link href="/admin/media">
                <Users className="w-6 h-6" />
                <span>Medya Yönetimi</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Projeler</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/projects">Tümünü Gör</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{project.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      <span className="text-xs text-gray-400">{project.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                      <Link href={`/projects/${project.id}`}>
                        <Eye className="w-3 h-3" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Edit className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(activity.timestamp).toLocaleString("tr-TR")}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
