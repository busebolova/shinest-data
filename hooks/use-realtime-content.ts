"use client"

import { useEffect, useState, useCallback } from "react"
import { githubRealtime, type ContentUpdate } from "@/lib/github-realtime"

export function useRealtimeContent<T>(
  type: string,
  initialData: T,
  fetchFunction: () => Promise<T>,
  options: { autoRefresh?: boolean } = {},
) {
  const { autoRefresh = true } = options
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)

  const refreshData = useCallback(async () => {
    if (!fetchFunction) return

    try {
      setLoading(true)
      const newData = await fetchFunction()
      setData(newData)
      setLastUpdate(new Date())
      setUpdateCount((prev) => prev + 1)
    } catch (error) {
      console.error(`Failed to refresh ${type} data:`, error)
    } finally {
      setLoading(false)
    }
  }, [type, fetchFunction])

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe(type, async (update: ContentUpdate) => {
      console.log(`Real-time update received for ${type}:`, update)

      if (autoRefresh) {
        await refreshData()
      } else {
        setLastUpdate(update.timestamp)
        setUpdateCount((prev) => prev + 1)
      }
    })

    const unsubscribeGlobal = githubRealtime.subscribe("*", async (update: ContentUpdate) => {
      if (update.type === type && autoRefresh) {
        await refreshData()
      }
    })

    const unsubscribeStatus = githubRealtime.onStatusChange((status) => {
      setIsConnected(status.status === "connected" || status.status === "polling")
    })

    return () => {
      unsubscribe()
      unsubscribeGlobal()
      unsubscribeStatus()
    }
  }, [type, autoRefresh, refreshData])

  const refresh = useCallback(async () => {
    await refreshData()
  }, [refreshData])

  const forceSync = useCallback(async () => {
    try {
      setLoading(true)
      await githubRealtime.forceSync()
      await refreshData()
    } catch (error) {
      console.error("Force sync failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [refreshData])

  return {
    data,
    setData,
    loading,
    lastUpdate,
    isConnected,
    updateCount,
    refresh,
    forceSync,
  }
}

export function useRealtimeProjects() {
  return useRealtimeContent("projects", [], async () => {
    const response = await fetch("/api/projects")
    if (!response.ok) throw new Error("Failed to fetch projects")
    return response.json()
  })
}

export function useRealtimePageContent(page: string) {
  return useRealtimeContent(`pages-${page}`, null, async () => {
    const response = await fetch(`/api/content/${page}`)
    if (!response.ok) throw new Error(`Failed to fetch ${page} content`)
    return response.json()
  })
}

export function useRealtimeBlogPosts() {
  return useRealtimeContent("blog", [], async () => {
    const response = await fetch("/api/blog")
    if (!response.ok) throw new Error("Failed to fetch blog posts")
    return response.json()
  })
}

export function useRealtimeDashboard() {
  return useRealtimeContent("dashboard", null, async () => {
    const response = await fetch("/api/admin/dashboard")
    if (!response.ok) throw new Error("Failed to fetch dashboard data")
    return response.json()
  })
}
