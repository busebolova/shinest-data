"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X, RefreshCw, Search } from "lucide-react"
import Image from "next/image"
import { githubRealtime } from "@/lib/github-realtime"

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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [refreshing, setRefreshing] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const emptyProject: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
    title: { tr: "", en: "" },
    description: { tr: "", en: "" },
    category: "",
    location: "",
    year: new Date().getFullYear().toString(),
    status: "draft",
    featured: false,
    images: [],
    slug: "",
  }

  useEffect(() => {
    fetchProjects()

    // Subscribe to realtime updates
    const unsubscribe = githubRealtime.onMessage((data) => {
      if (data.type === "sync") {
        // Refresh projects when sync happens
        fetchProjects()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Auto-hide notifications after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      setNotification({ type: "error", message: "Projeler yüklenirken hata oluştu" })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchProjects()
  }

  const handleSave = async (project: Project | Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    setSaving(true)
    try {
      const isNew = !("id" in project)
      const url = isNew ? "/api/projects" : `/api/projects/${(project as Project).id}`
      const method = isNew ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setNotification({
            type: "success",
            message: isNew ? "Proje başarıyla oluşturuldu!" : "Proje başarıyla güncellendi!",
          })
          await fetchProjects() // Listeyi yenile
          setEditingProject(null)
          setIsCreating(false)
        } else {
          throw new Error(data.error || "Kaydetme başarısız")
        }
      } else {
        throw new Error("Kaydetme başarısız")
      }
    } catch (error) {
      console.error("Save error:", error)
      setNotification({ type: "error", message: "Kaydetme sırasında hata oluştu" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu projeyi silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setNotification({ type: "success", message: "Proje başarıyla silindi!" })
          await fetchProjects()
        } else {
          throw new Error("Silme başarısız")
        }
      } else {
        throw new Error("Silme başarısız")
      }
    } catch (error) {
      console.error("Delete error:", error)
      setNotification({ type: "error", message: "Silme sırasında hata oluştu" })
    }
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
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  // Filter projects based on search term and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || project.status === filterStatus

    return matchesSearch && matchesStatus
  })

  if (loading && projects.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c4975a]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 relative">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-600">Proje portföyünüzü yönetin</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">Yenile</span>
          </Button>
          <Button onClick={() => setIsCreating(true)} className="bg-[#c4975a] hover:bg-[#b8864d]">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Proje ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c4975a]"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlenmiş</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {(isCreating || editingProject) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Yeni Proje Oluştur" : "Projeyi Düzenle"}</CardTitle>
            <CardDescription>Proje bilgilerini doldurun</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectForm
              project={editingProject || emptyProject}
              onSave={handleSave}
              onCancel={() => {
                setEditingProject(null)
                setIsCreating(false)
              }}
              saving={saving}
              generateSlug={generateSlug}
            />
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative h-48">
              {project.images[0] ? (
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title.tr}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Görsel yok</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                {project.featured && <Badge className="bg-[#c4975a]">Öne Çıkan</Badge>}
                <Badge variant={project.status === "published" ? "default" : "secondary"}>
                  {project.status === "published" ? "Yayında" : project.status === "draft" ? "Taslak" : "Arşiv"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-lg line-clamp-1">{project.title.tr}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description.tr}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingProject(project)} className="h-8 px-2">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="h-8 px-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <span className="text-xs text-gray-400">{new Date(project.updatedAt).toLocaleDateString("tr-TR")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz proje yok</h3>
            <p className="text-gray-600 text-center mb-4">İlk projenizi oluşturarak başlayın</p>
            <Button onClick={() => setIsCreating(true)} className="bg-[#c4975a] hover:bg-[#b8864d]">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Proje
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {projects.length > 0 && filteredProjects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sonuç bulunamadı</h3>
            <p className="text-gray-600 text-center mb-4">Arama kriterlerinize uygun proje bulunamadı</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilterStatus("all")
              }}
              variant="outline"
            >
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ProjectForm({
  project,
  onSave,
  onCancel,
  saving,
  generateSlug,
}: {
  project: Project | Omit<Project, "id" | "createdAt" | "updatedAt">
  onSave: (project: Project | Omit<Project, "id" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
  saving: boolean
  generateSlug: (title: string) => string
}) {
  const [formData, setFormData] = useState(project)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [field]: value },
    }))
  }

  // Auto-generate slug when Turkish title changes
  useEffect(() => {
    if (formData.title.tr && !formData.slug) {
      updateField("slug", generateSlug(formData.title.tr))
    }
  }, [formData.title.tr, formData.slug, generateSlug])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title-tr">Başlık (Türkçe)</Label>
          <Input
            id="title-tr"
            value={formData.title.tr}
            onChange={(e) => updateNestedField("title", "tr", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="title-en">Başlık (İngilizce)</Label>
          <Input
            id="title-en"
            value={formData.title.en}
            onChange={(e) => updateNestedField("title", "en", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="description-tr">Açıklama (Türkçe)</Label>
          <Textarea
            id="description-tr"
            value={formData.description.tr}
            onChange={(e) => updateNestedField("description", "tr", e.target.value)}
            rows={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="description-en">Açıklama (İngilizce)</Label>
          <Textarea
            id="description-en"
            value={formData.description.en}
            onChange={(e) => updateNestedField("description", "en", e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="category">Kategori</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Villa, Ofis, Cafe..."
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Konum</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="İstanbul, Ankara..."
            required
          />
        </div>
        <div>
          <Label htmlFor="year">Yıl</Label>
          <Input
            id="year"
            value={formData.year}
            onChange={(e) => updateField("year", e.target.value)}
            placeholder="2024"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          placeholder="proje-url-slug"
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Görsel URL'leri (her satıra bir URL)</Label>
        <Textarea
          id="images"
          value={formData.images.join("\n")}
          onChange={(e) =>
            updateField(
              "images",
              e.target.value.split("\n").filter((url) => url.trim()),
            )
          }
          rows={3}
          placeholder="/images/project-1.jpg&#10;/images/project-2.jpg"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => updateField("featured", checked)}
          />
          <Label htmlFor="featured">Öne Çıkan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={formData.status === "published"}
            onCheckedChange={(checked) => updateField("status", checked ? "published" : "draft")}
          />
          <Label htmlFor="published">Yayında</Label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving} className="bg-[#c4975a] hover:bg-[#b8864d]">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          İptal
        </Button>
      </div>
    </form>
  )
}
