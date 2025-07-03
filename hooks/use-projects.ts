"use client"

import { useState, useEffect } from "react"
import { githubAPI } from "@/lib/github-api"

export interface Project {
  id: string
  title: string
  description: string
  category: string
  status: "draft" | "published" | "archived"
  images: string[]
  created_at: string
  updated_at: string
  slug: string
  featured: boolean
  client?: string
  location?: string
  year?: number
  area?: string
  tags?: string[]
}

// Mock data for development
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Modern Villa Tasarımı",
    description: "Lüks villa iç mekan tasarımı projesi",
    category: "Konut",
    status: "published",
    images: ["/images/modern-living-room.jpeg", "/images/modern-kitchen-living.png"],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    slug: "modern-villa-tasarimi",
    featured: true,
    client: "Özel Müşteri",
    location: "İstanbul",
    year: 2024,
    area: "350m²",
    tags: ["modern", "lüks", "villa"],
  },
  {
    id: "2",
    title: "Boutique Otel Projesi",
    description: "Butik otel iç mekan ve dekorasyon projesi",
    category: "Ticari",
    status: "published",
    images: ["/images/luxury-hotel-lobby.png", "/images/bedroom-design-1.png"],
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
    slug: "boutique-otel-projesi",
    featured: true,
    client: "Otel Grubu",
    location: "Antalya",
    year: 2023,
    area: "1200m²",
    tags: ["otel", "ticari", "lüks"],
  },
  {
    id: "3",
    title: "Ofis Tasarımı",
    description: "Modern ofis alanı tasarım ve uygulama projesi",
    category: "Ofis",
    status: "draft",
    images: ["/images/modern-wooden-office.png"],
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
    slug: "ofis-tasarimi",
    featured: false,
    client: "Teknoloji Şirketi",
    location: "İstanbul",
    year: 2024,
    area: "800m²",
    tags: ["ofis", "modern", "teknoloji"],
  },
]

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from GitHub
      const githubProjects = await githubAPI.getProjects()

      if (githubProjects && githubProjects.length > 0) {
        setProjects(githubProjects)
      } else {
        // Use mock data if GitHub has no projects
        setProjects(mockProjects)
      }
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Failed to fetch projects")
      // Use mock data as fallback
      setProjects(mockProjects)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<Project, "id" | "created_at" | "updated_at">) => {
    try {
      const newProject = {
        ...projectData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      await githubAPI.createProject(newProject)
      await fetchProjects()
      return newProject
    } catch (err) {
      console.error("Error creating project:", err)
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updatedData = {
        ...updates,
        updated_at: new Date().toISOString(),
      }

      await githubAPI.updateProject(id, updatedData)
      await fetchProjects()
      return updatedData
    } catch (err) {
      console.error("Error updating project:", err)
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await githubAPI.deleteProject(id)
      await fetchProjects()
    } catch (err) {
      console.error("Error deleting project:", err)
      throw err
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : []

  return {
    projects: safeProjects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
