"use client"

import { useEffect, useState } from "react"
import { githubRealtime, type ContentUpdate } from "@/lib/github-realtime"

export function useRealtimeContent<T>(type: string, initialData: T, fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe(type, async (update: ContentUpdate) => {
      console.log(`Real-time update received for ${type}:`, update)

      try {
        setLoading(true)
        const newData = await fetchFunction()
        setData(newData)
        setLastUpdate(new Date())
      } catch (error) {
        console.error(`Failed to refresh ${type} data:`, error)
      } finally {
        setLoading(false)
      }
    })

    const unsubscribeGlobal = githubRealtime.subscribe("*", async (update: ContentUpdate) => {
      if (update.type === type) {
        try {
          setLoading(true)
          const newData = await fetchFunction()
          setData(newData)
          setLastUpdate(new Date())
        } catch (error) {
          console.error(`Failed to refresh ${type} data:`, error)
        } finally {
          setLoading(false)
        }
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
  }, [type, fetchFunction])

  const refresh = async () => {
    try {
      setLoading(true)
      const newData = await fetchFunction()
      setData(newData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error(`Failed to refresh ${type} data:`, error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    lastUpdate,
    isConnected,
    refresh,
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
  return useRealtimeContent("pages", null, async () => {
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
