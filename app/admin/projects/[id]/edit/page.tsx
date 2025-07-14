"use client"
import { useState, useEffect } from "react"
import ProjectForm from "@/components/admin/project-form"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProject = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch project data.")
      }
      const data = await response.json()
      setProject(data.project)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchProject()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-destructive">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p className="text-xl">Error loading project</p>
        <p className="text-center mb-4">{error}</p>
        <Button onClick={fetchProject}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <ProjectForm initialData={project} isCreating={false} />
    </div>
  )
}
