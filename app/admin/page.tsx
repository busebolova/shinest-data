"use client"

import { useEffect, useState } from "react"
import { RealtimeDashboard } from "@/components/admin/realtime-dashboard"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { githubRealtime } from "@/lib/github-realtime"
import { githubAPI } from "@/lib/github-api"
import { Loader2 } from "lucide-react"

interface DashboardStats {
  projects: number
  blogPosts: number
  messages: number
  visitors: number
  githubConnected: boolean
  lastSync: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    blogPosts: 0,
    messages: 0,
    visitors: 0,
    githubConnected: false,
    lastSync: "",
  })
  const [githubStatus, setGithubStatus] = useState<"connected" | "disconnected" | "checking">("checking")
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated()) {
        router.replace("/admin/dashboard")
      } else {
        router.replace("/admin/login")
      }
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated()) {
      fetchDashboardData()
      checkGithubConnection()

      // Realtime updates
      const unsubscribe = githubRealtime.subscribe((data) => {
        setStats((prev) => ({
          ...prev,
          projects: data.projects?.length || 0,
          lastSync: data.lastUpdate,
        }))
      })

      return unsubscribe
    }
  }, [isAuthenticated])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error)
    }
  }

  const checkGithubConnection = async () => {
    try {
      setGithubStatus("checking")
      const isConnected = githubAPI.isConfigured()

      if (isConnected) {
        // Test connection
        await githubAPI.getRepositoryInfo()
        setGithubStatus("connected")

        // Get recent activity
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
      } else {
        setGithubStatus("disconnected")
      }
    } catch (error) {
      console.error("GitHub connection check failed:", error)
      setGithubStatus("disconnected")
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-10 w-10 animate-spin text-[#c4975a]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RealtimeDashboard stats={stats} githubStatus={githubStatus} recentActivity={recentActivity} />
    </div>
  )
}
