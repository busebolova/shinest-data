"use client"

import { useState, useEffect } from "react"
import { githubAPI, type GitHubProject } from "@/lib/github-api"

export function useGitHubProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)

        const fetchedProjects = await githubAPI.getProjects()
        setProjects(fetchedProjects)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err instanceof Error ? err.message : "Bilinmeyen hata")

        // Fallback to empty array on error
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const refreshProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const fetchedProjects = await githubAPI.getProjects()
      setProjects(fetchedProjects)
    } catch (err) {
      console.error("Error refreshing projects:", err)
      setError(err instanceof Error ? err.message : "Bilinmeyen hata")
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<GitHubProject, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newProject = await githubAPI.createProject(projectData)
      setProjects((prev) => [newProject, ...prev])
      return newProject
    } catch (err) {
      console.error("Error creating project:", err)
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<GitHubProject>) => {
    try {
      const updatedProject = await githubAPI.updateProject(id, updates)
      setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)))
      return updatedProject
    } catch (err) {
      console.error("Error updating project:", err)
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await githubAPI.deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error("Error deleting project:", err)
      throw err
    }
  }

  return {
    projects,
    loading,
    error,
    refreshProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
