"use client"

import { useState, useEffect } from "react"

interface UseContentOptions {
  fallbackData?: any
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useContent(page: string, options: UseContentOptions = {}) {
  const [content, setContent] = useState<any>(options.fallbackData || {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/content/${page}`)
      const result = await response.json()

      if (result.success) {
        setContent(result.data)
        setLastUpdated(result.timestamp)
      } else {
        throw new Error(result.error || "Failed to fetch content")
      }
    } catch (err) {
      console.error(`Error fetching content for ${page}:`, err)
      setError(err instanceof Error ? err.message : "Unknown error")

      // Use fallback data if available
      if (options.fallbackData) {
        setContent(options.fallbackData)
      }
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async (newContent: any) => {
    try {
      setError(null)

      const response = await fetch(`/api/content/${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      })

      const result = await response.json()

      if (result.success) {
        setContent(newContent)
        setLastUpdated(result.timestamp)
        return true
      } else {
        throw new Error(result.error || "Failed to save content")
      }
    } catch (err) {
      console.error(`Error saving content for ${page}:`, err)
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  const refreshContent = () => {
    fetchContent()
  }

  useEffect(() => {
    fetchContent()
  }, [page])

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchContent, options.refreshInterval)
      return () => clearInterval(interval)
    }
  }, [options.autoRefresh, options.refreshInterval, page])

  return {
    content,
    loading,
    error,
    lastUpdated,
    saveContent,
    refreshContent,
  }
}

export default useContent
