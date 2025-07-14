"use client"

import { useState, useEffect } from "react"
import type { GitHubProject } from "@/lib/github-api"

export function useProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      console.error("Failed to fetch projects:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<GitHubProject, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const newProject = await response.json()
      setProjects((prev) => [...prev, newProject])
      return newProject
    } catch (err) {
      console.error("Failed to create project:", err)
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<GitHubProject>) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const updatedProject = await response.json()
      setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)))
      return updatedProject
    } catch (err) {
      console.error("Failed to update project:", err)
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error("Failed to delete project:", err)
      throw err
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
