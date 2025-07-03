"use client"

import { useState, useEffect } from "react"
import type { GitHubProject } from "@/lib/github-api"

export function useGitHubProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setError(null)
      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchProjects, 30000)

    return () => clearInterval(interval)
  }, [])

  const refetch = () => {
    setLoading(true)
    fetchProjects()
  }

  return {
    projects,
    loading,
    error,
    refetch,
  }
}

export function useGitHubProject(id: string) {
  const [project, setProject] = useState<GitHubProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setError(null)
        const response = await fetch(`/api/projects/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }
        const data = await response.json()
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  return {
    project,
    loading,
    error,
  }
}
