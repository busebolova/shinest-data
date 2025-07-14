"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectFormProps {
  initialData?: Omit<Project, "createdAt" | "updatedAt"> | null
  isCreating: boolean
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export default function ProjectForm({ initialData, isCreating }: ProjectFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<Omit<Project, "createdAt" | "updatedAt">>(
    initialData || {
      id: "",
      title: { tr: "", en: "" },
      description: { tr: "", en: "" },
      category: { tr: "", en: "" },
      location: "",
      year: new Date().getFullYear().toString(),
      status: "draft",
      featured: false,
      images: [],
      slug: "",
      features: { tr: [], en: [] },
    },
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (field: keyof Omit<Project, "createdAt" | "updatedAt">, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedInputChange = (parent: "title" | "description" | "category", child: "tr" | "en", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev[parent] as object), [child]: value },
    }))
  }

  useEffect(() => {
    if (formData.title.tr && isCreating) {
      handleInputChange("slug", generateSlug(formData.title.tr))
    }
  }, [formData.title.tr, isCreating])

  const handleSave = async () => {
    setSaving(true)
    const url = isCreating ? "/api/projects" : `/api/projects/${formData.id}`
    const method = isCreating ? "POST" : "PUT"

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "An error occurred.")
      }

      toast({
        title: "Success!",
        description: `Project has been ${isCreating ? "created" : "updated"}.`,
      })
      router.push("/admin/projects")
      router.refresh() // Force a refresh of the projects list page
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast({
        title: "Error",
        description: `Failed to save project: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreating ? "Create New Project" : "Edit Project"}</CardTitle>
        <CardDescription>Fill in the details for the project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title-tr">Title (TR)</Label>
            <Input
              id="title-tr"
              value={formData.title.tr}
              onChange={(e) => handleNestedInputChange("title", "tr", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="title-en">Title (EN)</Label>
            <Input
              id="title-en"
              value={formData.title.en}
              onChange={(e) => handleNestedInputChange("title", "en", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" value={formData.slug} onChange={(e) => handleInputChange("slug", e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="desc-tr">Description (TR)</Label>
            <Textarea
              id="desc-tr"
              value={formData.description.tr}
              onChange={(e) => handleNestedInputChange("description", "tr", e.target.value)}
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="desc-en">Description (EN)</Label>
            <Textarea
              id="desc-en"
              value={formData.description.en}
              onChange={(e) => handleNestedInputChange("description", "en", e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="category-tr">Category (TR)</Label>
            <Input
              id="category-tr"
              value={formData.category.tr}
              onChange={(e) => handleNestedInputChange("category", "tr", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category-en">Category (EN)</Label>
            <Input
              id="category-en"
              value={formData.category.en}
              onChange={(e) => handleNestedInputChange("category", "en", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" value={formData.year} onChange={(e) => handleInputChange("year", e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        <div>
          <Label>Images</Label>
          <Textarea
            placeholder="Enter one image URL per line"
            value={formData.images.join("\n")}
            onChange={(e) => handleInputChange("images", e.target.value.split("\n").filter(Boolean))}
            rows={4}
          />
          <p className="text-sm text-muted-foreground mt-2">Enter one public image URL per line.</p>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleInputChange("featured", checked)}
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/admin/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isCreating ? "Create Project" : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
