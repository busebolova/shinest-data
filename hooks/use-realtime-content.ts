"use client"

import { useEffect, useState } from "react"
import { githubRealtime, type ContentUpdate } from "@/lib/github-realtime"

export function useRealtimeContent<T>(type: string, initialData: T, fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe(type, async (update: ContentUpdate) => {
      console.log(`Content update received for ${type}:`, update)

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

    // Also listen for global updates
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

    return () => {
      unsubscribe()
      unsubscribeGlobal()
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
