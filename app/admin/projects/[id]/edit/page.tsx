"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { dataManager } from "@/lib/data-manager"

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

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    setLoading(true)
    try {
      const fetchedProject = await dataManager.getProject(id)
      if (fetchedProject) {
        setProject(fetchedProject)
      } else {
        toast.error("Proje bulunamadı.")
        router.push("/admin/projects")
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      toast.error("Proje yüklenirken hata oluştu.")
      router.push("/admin/projects")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof Project, value: any, lang?: "tr" | "en") => {
    if (!project) return
    if (lang && (field === "title" || field === "description")) {
      setProject({
        ...project,
        [field]: {
          ...(project[field] as { tr: string; en: string }),
          [lang]: value,
        },
      })
    } else {
      setProject({ ...project, [field]: value })
    }
  }

  const handleImageChange = (index: number, value: string) => {
    if (!project) return
    const newImages = [...project.images]
    newImages[index] = value
    setProject({ ...project, images: newImages })
  }

  const addImageField = () => {
    if (!project) return
    setProject({ ...project, images: [...project.images, ""] })
  }

  const removeImageField = (index: number) => {
    if (!project) return
    const newImages = project.images.filter((_, i) => i !== index)
    setProject({ ...project, images: newImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return

    setSaving(true)
    try {
      await dataManager.updateProject(id, project)
      toast.success("Proje başarıyla güncellendi!")
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error updating project:", error)
      toast.error("Proje güncellenirken hata oluştu.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#c4975a]" />
      </div>
    )
  }

  if (!project) {
    return null // Should be redirected by now
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeyi Düzenle</h1>
          <p className="text-gray-600 mt-2">{project.title.tr || project.title.en}</p>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="bg-[#c4975a] hover:bg-[#a67d4e]">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proje Bilgileri</CardTitle>
          <CardDescription>Projenin temel bilgilerini düzenleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title-tr">Başlık (Türkçe)</Label>
              <Input
                id="title-tr"
                value={project.title.tr}
                onChange={(e) => handleChange("title", e.target.value, "tr")}
              />
            </div>
            <div>
              <Label htmlFor="title-en">Başlık (İngilizce)</Label>
              <Input
                id="title-en"
                value={project.title.en}
                onChange={(e) => handleChange("title", e.target.value, "en")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="description-tr">Açıklama (Türkçe)</Label>
              <Textarea
                id="description-tr"
                value={project.description.tr}
                onChange={(e) => handleChange("description", e.target.value, "tr")}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="description-en">Açıklama (İngilizce)</Label>
              <Textarea
                id="description-en"
                value={project.description.en}
                onChange={(e) => handleChange("description", e.target.value, "en")}
                rows={4}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                value={project.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Konum</Label>
              <Input
                id="location"
                value={project.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="year">Yıl</Label>
              <Input
                id="year"
                type="number"
                value={project.year}
                onChange={(e) => handleChange("year", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Durum</Label>
            <Select
              value={project.status}
              onValueChange={(value: "published" | "draft" | "archived") => handleChange("status", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum Seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Yayınlandı</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
                <SelectItem value="archived">Arşivlendi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={project.featured}
              onCheckedChange={(checked) => handleChange("featured", checked)}
            />
            <Label htmlFor="featured">Öne Çıkan Proje</Label>
          </div>

          <div>
            <Label>Görseller</Label>
            <div className="space-y-2 mt-2">
              {project.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="/images/project-image.png"
                  />
                  <Button variant="destructive" size="icon" onClick={() => removeImageField(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addImageField}>
                <Plus className="h-4 w-4 mr-2" />
                Görsel Ekle
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                Görselleri `public` klasörüne yükleyip buraya yolunu girin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
