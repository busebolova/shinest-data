"use client"

import { useState, useEffect, useCallback } from "react"
import { githubRealtime, type ContentUpdate } from "@/lib/github-realtime"

interface UseRealtimeContentResult<T> {
  data: T
  loading: boolean
  error: string | null
  lastUpdate: Date | null
  updateCount: number
  refresh: () => Promise<void>
}

export function useRealtimeContent<T>(
  endpoint: string,
  initialData: T,
  contentType?: string,
): UseRealtimeContentResult<T> {
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [updateCount, setUpdateCount] = useState(0)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch(endpoint, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
      setLastUpdate(new Date())
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err)
      setError(err instanceof Error ? err.message : "Veri alınamadı")
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  const refresh = useCallback(async () => {
    setLoading(true)
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    // Initial fetch
    fetchData()

    // Subscribe to real-time updates
    let unsubscribe: (() => void) | undefined

    if (contentType) {
      unsubscribe = githubRealtime.subscribe(contentType, (update: ContentUpdate) => {
        console.log(`Real-time update received for ${contentType}:`, update)
        setUpdateCount((prev) => prev + 1)
        setLastUpdate(new Date())

        // Refresh data when update is received
        fetchData()
      })
    }

    // Also subscribe to global updates
    const globalUnsubscribe = githubRealtime.subscribe("*", (update: ContentUpdate) => {
      if (update.type === "sync" || update.type === "commits") {
        console.log("Global update received:", update)
        setUpdateCount((prev) => prev + 1)
        setLastUpdate(new Date())
        fetchData()
      }
    })

    return () => {
      if (unsubscribe) unsubscribe()
      globalUnsubscribe()
    }
  }, [fetchData, contentType])

  return {
    data,
    loading,
    error,
    lastUpdate,
    updateCount,
    refresh,
  }
}

// Specific hooks for different content types
export function useRealtimeProjects() {
  return useRealtimeContent("/api/projects", [], "projects")
}

export function useRealtimeBlogPosts() {
  return useRealtimeContent("/api/blog", [], "blog")
}

export function useRealtimeDashboard() {
  return useRealtimeContent(
    "/api/admin/dashboard",
    {
      stats: {},
      recentActivity: [],
      projects: [],
      blogPosts: [],
    },
    "dashboard",
  )
}
