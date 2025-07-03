"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  ImageIcon,
  Clock,
  GitBranch,
  Activity,
  TrendingUp,
  Eye,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { githubAPI } from "@/lib/github-api"
import { useRealtimeContent } from "@/hooks/use-realtime-content"
import { className } from "@/utils/classname" // Importing className utility

interface DashboardStats {
  projects: number
  blogPosts: number
  mediaFiles: number
  pageViews: number
  lastCommit?: {
    sha: string
    message: string
    author: string
    date: string
  }
}

interface RecentActivity {
  id: string
  type: "project" | "blog" | "page" | "media"
  title: string
  action: string
  timestamp: Date
  user: string
}

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push("/admin/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Dashboard'a yönlendiriliyor...</p>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    blogPosts: 0,
    mediaFiles: 0,
    pageViews: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { lastUpdate, updateCount, isConnected, refresh } = useRealtimeContent("dashboard", stats, async () => {
    const [projects, blogPosts, latestCommit] = await Promise.all([
      githubAPI.getProjects(),
      githubAPI.getBlogPosts(),
      githubAPI.getLatestCommit(),
    ])

    return {
      projects: projects.length,
      blogPosts: blogPosts.length,
      mediaFiles: 0, // This would need to be implemented
      pageViews: Math.floor(Math.random() * 10000), // Mock data
      lastCommit: {
        sha: latestCommit.sha.substring(0, 7),
        message: latestCommit.commit.message,
        author: latestCommit.commit.author.name,
        date: latestCommit.commit.author.date,
      },
    }
  })

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [projects, blogPosts, latestCommit] = await Promise.all([
          githubAPI.getProjects(),
          githubAPI.getBlogPosts(),
          githubAPI.getLatestCommit(),
        ])

        const newStats = {
          projects: projects.length,
          blogPosts: blogPosts.length,
          mediaFiles: 0,
          pageViews: Math.floor(Math.random() * 10000),
          lastCommit: {
            sha: latestCommit.sha.substring(0, 7),
            message: latestCommit.commit.message,
            author: latestCommit.commit.author.name,
            date: latestCommit.commit.author.date,
          },
        }

        setStats(newStats)

        // Mock recent activity
        setRecentActivity([
          {
            id: "1",
            type: "project",
            title: "Modern Living Room",
            action: "updated",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            user: "Admin",
          },
          {
            id: "2",
            type: "blog",
            title: "Interior Design Trends 2024",
            action: "published",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            user: "Admin",
          },
          {
            id: "3",
            type: "page",
            title: "Homepage",
            action: "edited",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            user: "Admin",
          },
          {
            id: "4",
            type: "media",
            title: "Project Images",
            action: "uploaded",
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            user: "Admin",
          },
        ])
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const quickActions = [
    {
      title: "Edit Homepage",
      description: "Update hero, gallery, and content sections",
      href: "/admin/content/home",
      icon: FolderOpen,
      color: "bg-blue-500",
    },
    {
      title: "Manage Projects",
      description: "Add, edit, or remove portfolio projects",
      href: "/admin/projects",
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Write Blog Post",
      description: "Create new blog content",
      href: "/admin/blog/new",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "Media Library",
      description: "Upload and manage images",
      href: "/admin/media",
      icon: ImageIcon,
      color: "bg-orange-500",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FolderOpen className="h-4 w-4" />
      case "blog":
        return <FileText className="h-4 w-4" />
      case "page":
        return <LayoutDashboard className="h-4 w-4" />
      case "media":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-green-100 text-green-600"
      case "blog":
        return "bg-purple-100 text-purple-600"
      case "page":
        return "bg-blue-100 text-blue-600"
      case "media":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your site.</p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected && (
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Activity className="w-3 h-3 mr-1" />
              Live Updates
            </Badge>
          )}
          {updateCount > 0 && <Badge variant="secondary">{updateCount} updates</Badge>}
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">Portfolio projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant="outline" className="text-green-600">
                Live
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Real-time updates active</p>
          </CardContent>
        </Card>
      </div>

      {/* Latest Commit */}
      {stats.lastCommit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Latest Changes
              {lastUpdate && (
                <Badge variant="secondary" className="text-xs">
                  Updated {lastUpdate.toLocaleTimeString()}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{stats.lastCommit.message}</p>
                <p className="text-sm text-muted-foreground">
                  by {stats.lastCommit.author} • {stats.lastCommit.sha}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{new Date(stats.lastCommit.date).toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">{new Date(stats.lastCommit.date).toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className={className(
                  "flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                  action.color,
                )}
              >
                <div className="p-2 rounded-lg">{action.icon({ className: "h-4 w-4 text-white" })}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={action.href}>Go</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={getActivityColor(activity.type)}>{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">
                      {activity.action} • {activity.timestamp.toLocaleDateString()} at{" "}
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.user}
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
