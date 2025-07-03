"use client"

import { useState, useEffect } from "react"
import { githubRealtime } from "@/lib/github-realtime"

interface GitHubProject {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
  year: string
  location: string
  area?: string
  status: "completed" | "in-progress" | "planned"
  tags: string[]
  client?: string
  duration?: string
  createdAt: string
  updatedAt: string
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/projects", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setProjects(data)
      console.log("Projects loaded:", data.length)
    } catch (err) {
      console.error("Failed to fetch projects:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch projects")

      // Set default projects on error
      setProjects([
        {
          id: "1",
          title: "Modern Living Room",
          description: "Contemporary living space with minimalist design",
          category: "Residential",
          images: ["/images/living-room-design-1.png"],
          featured: true,
          year: "2024",
          location: "Istanbul",
          area: "120m²",
          status: "completed",
          tags: ["modern", "minimalist", "living room"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Luxury Hotel Lobby",
          description: "Elegant hotel lobby with premium finishes",
          category: "Hospitality",
          images: ["/images/cafe-design-1.png"],
          featured: false,
          year: "2024",
          location: "Ankara",
          area: "300m²",
          status: "in-progress",
          tags: ["luxury", "hotel", "lobby"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()

    // Subscribe to real-time project updates
    const unsubscribe = githubRealtime.subscribe("projects", (update) => {
      console.log("Project update received:", update)
      fetchProjects() // Refetch projects when updates are received
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  }
}
