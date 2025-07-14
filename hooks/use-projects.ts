"use client"

import { useState, useEffect } from "react"

interface Project {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: string
  location: string
  year: string
  status: "published" | "draft" | "archived"
  featured: boolean
  images: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/projects", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        throw new Error("Failed to fetch projects")
      }
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          await fetchProjects() // Refresh the list
          return { success: true, project: result.project, message: result.message }
        }
      }

      throw new Error("Failed to create project")
    } catch (err) {
      console.error("Error creating project:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          await fetchProjects() // Refresh the list
          return { success: true, project: result.project, message: result.message }
        }
      }

      throw new Error("Failed to update project")
    } catch (err) {
      console.error("Error updating project:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          await fetchProjects() // Refresh the list
          return { success: true, message: result.message }
        }
      }

      throw new Error("Failed to delete project")
    } catch (err) {
      console.error("Error deleting project:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }
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
    createProject,
    updateProject,
    deleteProject,
  }
}
