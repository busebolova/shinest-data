"use client"

import { useState, useEffect } from "react"

export interface Project {
  id: string
  title: { tr: string; en: string; de: string; fr: string; it: string; ru: string; ar: string }
  slug: string
  category: string
  location: string
  year: string
  status: "published" | "draft" | "archived"
  featured_image: string
  images: string[]
  description: { tr: string; en: string; de: string; fr: string; it: string; ru: string; ar: string }
  full_description: { tr: string; en: string; de: string; fr: string; it: string; ru: string; ar: string }
  client: string
  area: string
  duration: string
  tags: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

// Mock data for development
const mockProjects: Project[] = [
  {
    id: "1",
    title: {
      tr: "Modern Villa Tasarımı",
      en: "Modern Villa Design",
      de: "Moderne Villa Design",
      fr: "Design de Villa Moderne",
      it: "Design Villa Moderna",
      ru: "Дизайн Современной Виллы",
      ar: "تصميم فيلا عصرية",
    },
    slug: "modern-villa-tasarimi",
    category: "Konut Tasarımı",
    location: "İstanbul",
    year: "2024",
    status: "published",
    featured_image: "/images/modern-living-room.jpeg",
    images: ["/images/modern-living-room.jpeg", "/images/modern-kitchen-living.png"],
    description: {
      tr: "Lüks villa iç mekan tasarımı projesi",
      en: "Luxury villa interior design project",
      de: "Luxus Villa Innenarchitektur Projekt",
      fr: "Projet de design d'intérieur de villa de luxe",
      it: "Progetto di design d'interni villa di lusso",
      ru: "Проект дизайна интерьера роскошной виллы",
      ar: "مشروع تصميم داخلي لفيلا فاخرة",
    },
    full_description: {
      tr: "Bu proje, modern yaşam tarzını yansıtan lüks bir villa iç mekan tasarımıdır.",
      en: "This project is a luxury villa interior design reflecting modern lifestyle.",
      de: "Dieses Projekt ist ein luxuriöses Villa-Innendesign, das den modernen Lebensstil widerspiegelt.",
      fr: "Ce projet est un design d'intérieur de villa de luxe reflétant le style de vie moderne.",
      it: "Questo progetto è un design d'interni di villa di lusso che riflette lo stile di vita moderno.",
      ru: "Этот проект представляет собой роскошный дизайн интерьера виллы, отражающий современный образ жизни.",
      ar: "هذا المشروع هو تصميم داخلي لفيلا فاخرة يعكس نمط الحياة العصري",
    },
    client: "Özel Müşteri",
    area: "350m²",
    duration: "6 ay",
    tags: ["modern", "lüks", "villa"],
    featured: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
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

      // For now, use localStorage as fallback
      const savedProjects = localStorage.getItem("shinest-projects")
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects)
          setProjects(Array.isArray(parsedProjects) ? parsedProjects : mockProjects)
        } catch (parseError) {
          console.error("Error parsing saved projects:", parseError)
          setProjects(mockProjects)
        }
      } else {
        setProjects(mockProjects)
      }
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Failed to fetch projects")
      setProjects(mockProjects)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<Project, "id" | "created_at" | "updated_at">) => {
    try {
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Save to localStorage
      const currentProjects = [...projects, newProject]
      localStorage.setItem("shinest-projects", JSON.stringify(currentProjects))
      setProjects(currentProjects)

      return newProject
    } catch (err) {
      console.error("Error creating project:", err)
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updatedProjects = projects.map((project) =>
        project.id === id ? { ...project, ...updates, updated_at: new Date().toISOString() } : project,
      )

      localStorage.setItem("shinest-projects", JSON.stringify(updatedProjects))
      setProjects(updatedProjects)

      return updatedProjects.find((p) => p.id === id)
    } catch (err) {
      console.error("Error updating project:", err)
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const filteredProjects = projects.filter((project) => project.id !== id)
      localStorage.setItem("shinest-projects", JSON.stringify(filteredProjects))
      setProjects(filteredProjects)
    } catch (err) {
      console.error("Error deleting project:", err)
      throw err
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects: Array.isArray(projects) ? projects : [],
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
