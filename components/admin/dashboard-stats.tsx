"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, FolderOpen, MessageSquare, Activity, TrendingUp, Users, Calendar, GitBranch } from "lucide-react"

interface DashboardStats {
  totalProjects: number
  publishedProjects: number
  draftProjects: number
  totalBlogPosts: number
  publishedBlogPosts: number
  draftBlogPosts: number
  totalMessages: number
  unreadMessages: number
  githubCommits: number
  lastSyncTime: string
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalBlogPosts: 0,
    publishedBlogPosts: 0,
    draftBlogPosts: 0,
    totalMessages: 0,
    unreadMessages: 0,
    githubCommits: 0,
    lastSyncTime: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: "Toplam Proje",
      value: stats.totalProjects,
      icon: FolderOpen,
      description: `${stats.publishedProjects} yayında, ${stats.draftProjects} taslak`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Blog Yazısı",
      value: stats.totalBlogPosts,
      icon: FileText,
      description: `${stats.publishedBlogPosts} yayında, ${stats.draftBlogPosts} taslak`,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Mesajlar",
      value: stats.totalMessages,
      icon: MessageSquare,
      description: `${stats.unreadMessages} okunmamış mesaj`,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "GitHub Commit",
      value: stats.githubCommits,
      icon: GitBranch,
      description: "Son 30 gün",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Sistem Durumu",
      value: "Aktif",
      icon: Activity,
      description: "Tüm sistemler çalışıyor",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Ziyaretçi",
      value: "1,234",
      icon: Users,
      description: "Bu ay",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Performans",
      value: "98%",
      icon: TrendingUp,
      description: "Uptime oranı",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Son Senkronizasyon",
      value: stats.lastSyncTime ? new Date(stats.lastSyncTime).toLocaleDateString("tr-TR") : "Henüz yok",
      icon: Calendar,
      description: "GitHub ile",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.description}</p>
            {stat.title === "Mesajlar" && stats.unreadMessages > 0 && (
              <Badge variant="destructive" className="mt-2 text-xs">
                {stats.unreadMessages} yeni
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
