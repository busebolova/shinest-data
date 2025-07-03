"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, X, Plus, ArrowLeft, Eye } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { useProjects } from "@/hooks/use-projects"

interface ProjectForm {
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
}

export default function NewProject() {
  const router = useRouter()
  const { createProject } = useProjects()
  const [currentLanguage, setCurrentLanguage] = useState<"tr" | "en" | "de" | "fr" | "it" | "ru" | "ar">("tr")
  const [saving, setSaving] = useState(false)

  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const [formData, setFormData] = useState<ProjectForm>({
    title: { tr: "", en: "", de: "", fr: "", it: "", ru: "", ar: "" },
    slug: "",
    category: "",
    location: "",
    year: "2024",
    status: "draft",
    featured_image: "",
    images: [],
    description: { tr: "", en: "", de: "", fr: "", it: "", ru: "", ar: "" },
    full_description: { tr: "", en: "", de: "", fr: "", it: "", ru: "", ar: "" },
    client: "",
    area: "",
    duration: "",
    tags: [],
    featured: false,
  })

  const categories = [
    "Banyo Tasarımı",
    "Kafe Tasarımı",
    "Kış Bahçesi",
    "Salon Tasarımı",
    "Yatak Odası",
    "Konut Tasarımı",
    "Ofis Tasarımı",
    "Restoran Tasarımı",
  ]

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (value: string, lang: "tr" | "en" | "de" | "fr" | "it" | "ru" | "ar") => {
    setFormData((prev) => ({
      ...prev,
      title: { ...prev.title, [lang]: value },
      slug: lang === "tr" ? generateSlug(value) : prev.slug,
    }))
  }

  const handleImageUpload = (file: File, type: "featured" | "gallery") => {
    const url = URL.createObjectURL(file)

    if (type === "featured") {
      setFormData((prev) => ({ ...prev, featured_image: url }))
    } else {
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }))
    }

    toast.success("Görsel yüklendi!")
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleSave = async (status: "draft" | "published") => {
    setSaving(true)
    try {
      // Validation
      if (!formData.title.tr || !formData.category) {
        toast.error("Lütfen gerekli alanları doldurun")
        return
      }

      const projectData = {
        ...formData,
        status,
      }

      await createProject(projectData)
      toast.success(`Proje ${status === "published" ? "yayınlandı" : "taslak olarak kaydedildi"}!`)
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error saving project:", error)
      toast.error("Kaydetme sırasında hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yeni Proje Ekle</h1>
            <p className="text-gray-600 mt-2">Yeni bir proje oluşturun ve yönetin</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage(lang.code as any)}
                className="flex items-center gap-1"
              >
                <span>{lang.flag}</span>
                <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
              </Button>
            ))}
          </div>

          <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Taslak Kaydet
          </Button>

          <Button onClick={() => handleSave("published")} disabled={saving}>
            <Eye className="h-4 w-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Yayınla"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
              <CardDescription>Proje hakkında temel bilgileri girin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Proje Başlığı ({currentLanguage.toUpperCase()})</Label>
                <Input
                  value={formData.title[currentLanguage]}
                  onChange={(e) => handleTitleChange(e.target.value, currentLanguage)}
                  placeholder="Proje başlığını girin"
                />
              </div>

              <div>
                <Label>URL Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="proje-url-slug"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /projects/{formData.slug}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Kategori</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Konum</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="İzmir, Türkiye"
                  />
                </div>
              </div>

              <div>
                <Label>Kısa Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={formData.description[currentLanguage]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: { ...prev.description, [currentLanguage]: e.target.value },
                    }))
                  }
                  placeholder="Proje hakkında kısa açıklama"
                  rows={3}
                />
              </div>

              <div>
                <Label>Detaylı Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={formData.full_description[currentLanguage]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      full_description: { ...prev.full_description, [currentLanguage]: e.target.value },
                    }))
                  }
                  placeholder="Proje hakkında detaylı açıklama"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Görselleri</CardTitle>
              <CardDescription>Ana görsel ve galeri görsellerini yükleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Featured Image */}
              <div>
                <Label>Ana Görsel</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {formData.featured_image ? (
                    <div className="relative">
                      <div className="relative h-48 w-full">
                        <Image
                          src={formData.featured_image || "/placeholder.svg"}
                          alt="Ana Görsel"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData((prev) => ({ ...prev, featured_image: "" }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="featured-image" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">Ana görsel yükleyin</span>
                          <input
                            id="featured-image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "featured")
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <Label>Galeri Görselleri</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-32 w-full">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Galeri ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}

                  {/* Add New Image */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    <label htmlFor="gallery-image" className="cursor-pointer text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <span className="mt-2 block text-xs text-gray-500">Görsel Ekle</span>
                      <input
                        id="gallery-image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file, "gallery")
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Detayları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Yıl</Label>
                <Input
                  value={formData.year}
                  onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="2024"
                />
              </div>

              <div>
                <Label>Müşteri</Label>
                <Input
                  value={formData.client}
                  onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                  placeholder="Müşteri adı"
                />
              </div>

              <div>
                <Label>Alan</Label>
                <Input
                  value={formData.area}
                  onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                  placeholder="120 m²"
                />
              </div>

              <div>
                <Label>Süre</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="8 hafta"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="featured">Öne Çıkan Proje</Label>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Etiketler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Etiket ekle"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addTag(input.value)
                    input.value = ""
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Durum</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
                <option value="archived">Arşivlendi</option>
              </select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
