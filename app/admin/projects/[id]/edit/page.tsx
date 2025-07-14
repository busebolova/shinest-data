"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: string
  title: string
  titleEn: string
  titleDe: string
  titleFr: string
  titleIt: string
  titleRu: string
  titleAr: string
  description: string
  descriptionEn: string
  descriptionDe: string
  descriptionFr: string
  descriptionIt: string
  descriptionRu: string
  descriptionAr: string
  category: string
  location: string
  year: string
  area: string
  status: "published" | "draft" | "archived"
  featured: boolean
  images: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Load project data
    const loadProject = () => {
      // First check localStorage for custom projects
      const savedProjects = localStorage.getItem("shinest-projects")
      let allProjects: Project[] = []

      if (savedProjects) {
        try {
          allProjects = JSON.parse(savedProjects)
        } catch (error) {
          console.error("Error loading projects:", error)
        }
      }

      // Add mock projects for demo
      const mockProjects: Project[] = [
        {
          id: "1",
          title: "Modern Villa Tasarımı",
          titleEn: "Modern Villa Design",
          titleDe: "Moderne Villa Design",
          titleFr: "Design de Villa Moderne",
          titleIt: "Design Villa Moderna",
          titleRu: "Дизайн Современной Виллы",
          titleAr: "تصميم فيلا عصرية",
          description: "Lüks modern villa iç mekan tasarımı projesi",
          descriptionEn: "Luxury modern villa interior design project",
          descriptionDe: "Luxus moderne Villa Innenarchitektur Projekt",
          descriptionFr: "Projet de design d'intérieur de villa moderne de luxe",
          descriptionIt: "Progetto di design d'interni villa moderna di lusso",
          descriptionRu: "Проект дизайна интерьера роскошной современной виллы",
          descriptionAr: "مشروع تصميم داخلي لفيلا عصرية فاخرة",
          category: "Residential",
          location: "İstanbul",
          year: "2024",
          area: "450m²",
          status: "published",
          featured: true,
          images: ["/images/modern-living-room.jpeg", "/images/bedroom-design-1.png"],
          slug: "modern-villa-tasarimi",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-20",
        },
      ]

      allProjects = [...mockProjects, ...allProjects]

      const foundProject = allProjects.find((p) => p.id === params.id)
      if (foundProject) {
        setProject(foundProject)
      }
      setLoading(false)
    }

    loadProject()
  }, [params.id])

  const handleSave = async () => {
    if (!project) return

    setSaving(true)
    try {
      // Update project
      const updatedProject = {
        ...project,
        updatedAt: new Date().toISOString(),
      }

      // Load existing projects
      const savedProjects = localStorage.getItem("shinest-projects")
      let allProjects: Project[] = []

      if (savedProjects) {
        try {
          allProjects = JSON.parse(savedProjects)
        } catch (error) {
          console.error("Error loading projects:", error)
        }
      }

      // Update or add project
      const existingIndex = allProjects.findIndex((p) => p.id === project.id)
      if (existingIndex >= 0) {
        allProjects[existingIndex] = updatedProject
      } else {
        allProjects.push(updatedProject)
      }

      // Save to localStorage
      localStorage.setItem("shinest-projects", JSON.stringify(allProjects))

      alert("Proje başarıyla güncellendi!")
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Proje kaydedilirken bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && project) {
      // In a real app, you would upload to a server
      // For demo, we'll use placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) =>
          `/placeholder.svg?height=400&width=600&text=Uploaded+Image+${project.images.length + index + 1}`,
      )

      setProject({
        ...project,
        images: [...project.images, ...newImages],
      })
    }
  }

  const removeImage = (index: number) => {
    if (project) {
      const newImages = project.images.filter((_, i) => i !== index)
      setProject({
        ...project,
        images: newImages,
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#c4975a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Proje yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Proje bulunamadı</h1>
        <p className="text-gray-600 mb-6">Aradığınız proje mevcut değil.</p>
        <Link href="/admin/projects">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Projelere Dön
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proje Düzenle</h1>
            <p className="text-gray-600">Proje bilgilerini güncelleyin</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#c4975a] hover:bg-[#b8894d] text-white">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="tr" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="tr">TR</TabsTrigger>
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="de">DE</TabsTrigger>
              <TabsTrigger value="fr">FR</TabsTrigger>
              <TabsTrigger value="it">IT</TabsTrigger>
              <TabsTrigger value="ru">RU</TabsTrigger>
              <TabsTrigger value="ar">AR</TabsTrigger>
            </TabsList>

            {/* Turkish */}
            <TabsContent value="tr">
              <Card>
                <CardHeader>
                  <CardTitle>Türkçe İçerik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      value={project.title}
                      onChange={(e) => setProject({ ...project, title: e.target.value })}
                      placeholder="Proje başlığı"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      value={project.description}
                      onChange={(e) => setProject({ ...project, description: e.target.value })}
                      placeholder="Proje açıklaması"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* English */}
            <TabsContent value="en">
              <Card>
                <CardHeader>
                  <CardTitle>English Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleEn">Title</Label>
                    <Input
                      id="titleEn"
                      value={project.titleEn}
                      onChange={(e) => setProject({ ...project, titleEn: e.target.value })}
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionEn">Description</Label>
                    <Textarea
                      id="descriptionEn"
                      value={project.descriptionEn}
                      onChange={(e) => setProject({ ...project, descriptionEn: e.target.value })}
                      placeholder="Project description"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* German */}
            <TabsContent value="de">
              <Card>
                <CardHeader>
                  <CardTitle>Deutsche Inhalte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleDe">Titel</Label>
                    <Input
                      id="titleDe"
                      value={project.titleDe}
                      onChange={(e) => setProject({ ...project, titleDe: e.target.value })}
                      placeholder="Projekt titel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionDe">Beschreibung</Label>
                    <Textarea
                      id="descriptionDe"
                      value={project.descriptionDe}
                      onChange={(e) => setProject({ ...project, descriptionDe: e.target.value })}
                      placeholder="Projekt beschreibung"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* French */}
            <TabsContent value="fr">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu Français</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleFr">Titre</Label>
                    <Input
                      id="titleFr"
                      value={project.titleFr}
                      onChange={(e) => setProject({ ...project, titleFr: e.target.value })}
                      placeholder="Titre du projet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionFr">Description</Label>
                    <Textarea
                      id="descriptionFr"
                      value={project.descriptionFr}
                      onChange={(e) => setProject({ ...project, descriptionFr: e.target.value })}
                      placeholder="Description du projet"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Italian */}
            <TabsContent value="it">
              <Card>
                <CardHeader>
                  <CardTitle>Contenuto Italiano</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleIt">Titolo</Label>
                    <Input
                      id="titleIt"
                      value={project.titleIt}
                      onChange={(e) => setProject({ ...project, titleIt: e.target.value })}
                      placeholder="Titolo del progetto"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionIt">Descrizione</Label>
                    <Textarea
                      id="descriptionIt"
                      value={project.descriptionIt}
                      onChange={(e) => setProject({ ...project, descriptionIt: e.target.value })}
                      placeholder="Descrizione del progetto"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Russian */}
            <TabsContent value="ru">
              <Card>
                <CardHeader>
                  <CardTitle>Русский Контент</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleRu">Заголовок</Label>
                    <Input
                      id="titleRu"
                      value={project.titleRu}
                      onChange={(e) => setProject({ ...project, titleRu: e.target.value })}
                      placeholder="Название проекта"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionRu">Описание</Label>
                    <Textarea
                      id="descriptionRu"
                      value={project.descriptionRu}
                      onChange={(e) => setProject({ ...project, descriptionRu: e.target.value })}
                      placeholder="Описание проекта"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Arabic */}
            <TabsContent value="ar">
              <Card>
                <CardHeader>
                  <CardTitle>المحتوى العربي</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleAr">العنوان</Label>
                    <Input
                      id="titleAr"
                      value={project.titleAr}
                      onChange={(e) => setProject({ ...project, titleAr: e.target.value })}
                      placeholder="عنوان المشروع"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionAr">الوصف</Label>
                    <Textarea
                      id="descriptionAr"
                      value={project.descriptionAr}
                      onChange={(e) => setProject({ ...project, descriptionAr: e.target.value })}
                      placeholder="وصف المشروع"
                      rows={4}
                      dir="rtl"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Görselleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Button */}
                <div>
                  <Label htmlFor="images" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#c4975a] transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Görsel yüklemek için tıklayın</p>
                      <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                    </div>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Image Grid */}
                {project.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Proje görseli ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Durum</Label>
                <select
                  id="status"
                  value={project.status}
                  onChange={(e) => setProject({ ...project, status: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4975a]"
                >
                  <option value="draft">Taslak</option>
                  <option value="published">Yayınlandı</option>
                  <option value="archived">Arşivlendi</option>
                </select>
              </div>

              <div>
                <Label htmlFor="category">Kategori</Label>
                <select
                  id="category"
                  value={project.category}
                  onChange={(e) => setProject({ ...project, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4975a]"
                >
                  <option value="Residential">Konut</option>
                  <option value="Commercial">Ticari</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={project.featured}
                  onCheckedChange={(checked) => setProject({ ...project, featured: checked })}
                />
                <Label htmlFor="featured">Öne Çıkan Proje</Label>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Detayları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Konum</Label>
                <Input
                  id="location"
                  value={project.location}
                  onChange={(e) => setProject({ ...project, location: e.target.value })}
                  placeholder="Şehir, Ülke"
                />
              </div>

              <div>
                <Label htmlFor="year">Yıl</Label>
                <Input
                  id="year"
                  value={project.year}
                  onChange={(e) => setProject({ ...project, year: e.target.value })}
                  placeholder="2024"
                />
              </div>

              <div>
                <Label htmlFor="area">Alan</Label>
                <Input
                  id="area"
                  value={project.area}
                  onChange={(e) => setProject({ ...project, area: e.target.value })}
                  placeholder="450m²"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={project.slug}
                  onChange={(e) => setProject({ ...project, slug: e.target.value })}
                  placeholder="proje-url-slug"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Oluşturulma:</span>
                <span>{new Date(project.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>
              <div className="flex justify-between">
                <span>Son Güncelleme:</span>
                <span>{new Date(project.updatedAt).toLocaleDateString("tr-TR")}</span>
              </div>
              <div className="flex justify-between">
                <span>Proje ID:</span>
                <span className="font-mono">{project.id}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
