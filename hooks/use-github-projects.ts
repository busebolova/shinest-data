"use client"

import { useState, useEffect } from "react"

export interface Project {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
  year: string
  location: string
  area: string
  status: "completed" | "in-progress" | "planned"
  tags: string[]
  client?: string
  duration?: string
  budget?: string
  team?: string[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
  testimonial?: {
    text: string
    author: string
    position: string
  }
  createdAt: string
  updatedAt: string
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setProjects(data.projects || data || [])
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch projects")

      // Fallback data
      setProjects([
        {
          id: "1",
          title: "Modern Yaşam Alanı",
          description: "Minimalist tasarım anlayışıyla modern yaşam alanı",
          category: "residential",
          images: ["/images/living-room-design-1.png"],
          featured: true,
          year: "2024",
          location: "İstanbul",
          area: "120m²",
          status: "completed",
          tags: ["modern", "minimalist", "oturma odası"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Lüks Otel Lobisi",
          description: "Premium malzemelerle tasarlanmış otel lobisi",
          category: "hospitality",
          images: ["/images/cafe-design-1.png"],
          featured: false,
          year: "2024",
          location: "Ankara",
          area: "300m²",
          status: "in-progress",
          tags: ["lüks", "otel", "lobi"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Çağdaş Yatak Odası",
          description: "Fonksiyonel ve şık yatak odası tasarımı",
          category: "residential",
          images: ["/images/bedroom-design-1.png"],
          featured: true,
          year: "2024",
          location: "İzmir",
          area: "35m²",
          status: "completed",
          tags: ["yatak odası", "çağdaş", "fonksiyonel"],
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
  }, [])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  }
}

export function useGitHubProject(id: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProject = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/projects/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setProject(data)
    } catch (err) {
      console.error("Error fetching project:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch project")
      setProject(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  }
}
