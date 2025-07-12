"use client"

import { useState, useEffect, useCallback } from "react"
import { dataManager } from "@/lib/data-manager"
import { toast } from "sonner"

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

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedProjects = await dataManager.getProjects()
      setProjects(fetchedProjects)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Projeler yüklenirken bir hata oluştu.")
      toast.error("Projeler yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = useCallback(async (projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "slug">) => {
    setLoading(true)
    setError(null)
    try {
      const newProject = await dataManager.createProject(projectData)
      setProjects((prev) => [newProject, ...prev])
      toast.success("Proje başarıyla oluşturuldu!")
      return newProject
    } catch (err) {
      console.error("Error creating project:", err)
      setError("Proje oluşturulurken bir hata oluştu.")
      toast.error("Proje oluşturulurken bir hata oluştu.")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedProject = await dataManager.updateProject(id, updates)
      setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)))
      toast.success("Proje başarıyla güncellendi!")
      return updatedProject
    } catch (err) {
      console.error("Error updating project:", err)
      setError("Proje güncellenirken bir hata oluştu.")
      toast.error("Proje güncellenirken bir hata oluştu.")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await dataManager.deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      toast.success("Proje başarıyla silindi!")
    } catch (err) {
      console.error("Error deleting project:", err)
      setError("Proje silinirken bir hata oluştu.")
      toast.error("Proje silinirken bir hata oluştu.")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { projects, loading, error, createProject, updateProject, deleteProject, refreshProjects: fetchProjects }
}
