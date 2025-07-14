"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Project } from "@/types/project"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/projects", { cache: "no-store" })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch projects")
      }
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Error Loading Projects",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the project "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete project")
      }

      toast({
        title: "Success",
        description: `Project "${title}" deleted successfully.`,
      })
      await fetchProjects()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({
        title: "Error Deleting Project",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-destructive">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p className="text-center">Error loading projects: {error}</p>
          <Button onClick={fetchProjects} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden sm:table-cell">Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title.tr}</TableCell>
                <TableCell className="hidden md:table-cell">{project.category.tr}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={project.status === "published" ? "default" : "secondary"}>{project.status}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {project.featured ? <Badge variant="outline">Yes</Badge> : <Badge variant="secondary">No</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/projects/${project.id}/edit`} passHref>
                    <Button variant="ghost" size="icon" aria-label="Edit Project">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project.id, project.title.tr)}
                    aria-label="Delete Project"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Manage Projects</CardTitle>
          <Link href="/admin/projects/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}
