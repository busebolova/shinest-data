"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

export default function NewBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: { tr: "", en: "" },
    content: { tr: "", en: "" },
    excerpt: { tr: "", en: "" },
    image: "",
    status: "draft" as "draft" | "published",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const blogPost = {
        ...formData,
        publishedAt: formData.status === "published" ? new Date().toISOString() : "",
      }

      await apiClient.createBlogPost(blogPost)
      router.push("/admin/blog")
    } catch (error) {
      console.error("Error creating blog post:", error)
      alert("Blog yazısı oluşturulurken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string, lang?: string) => {
    setFormData((prev) => {
      if (lang) {
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof typeof prev],
            [lang]: value,
          },
        }
      }
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
          <p className="text-gray-600 mt-1">Yeni bir blog yazısı oluşturun</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Başlık</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title-tr">Türkçe Başlık</Label>
                  <Input
                    id="title-tr"
                    value={formData.title.tr}
                    onChange={(e) => handleInputChange("title", e.target.value, "tr")}
                    placeholder="Blog yazısı başlığı..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title-en">İngilizce Başlık</Label>
                  <Input
                    id="title-en"
                    value={formData.title.en}
                    onChange={(e) => handleInputChange("title", e.target.value, "en")}
                    placeholder="Blog post title..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Excerpt */}
            <Card>
              <CardHeader>
                <CardTitle>Özet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="excerpt-tr">Türkçe Özet</Label>
                  <Textarea
                    id="excerpt-tr"
                    value={formData.excerpt.tr}
                    onChange={(e) => handleInputChange("excerpt", e.target.value, "tr")}
                    placeholder="Blog yazısının kısa özeti..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt-en">İngilizce Özet</Label>
                  <Textarea
                    id="excerpt-en"
                    value={formData.excerpt.en}
                    onChange={(e) => handleInputChange("excerpt", e.target.value, "en")}
                    placeholder="Short summary of the blog post..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>İçerik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="content-tr">Türkçe İçerik</Label>
                  <Textarea
                    id="content-tr"
                    value={formData.content.tr}
                    onChange={(e) => handleInputChange("content", e.target.value, "tr")}
                    placeholder="Blog yazısının tam içeriği..."
                    rows={10}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content-en">İngilizce İçerik</Label>
                  <Textarea
                    id="content-en"
                    value={formData.content.en}
                    onChange={(e) => handleInputChange("content", e.target.value, "en")}
                    placeholder="Full content of the blog post..."
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Yayın Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Durum</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "draft" | "published") => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Taslak</SelectItem>
                      <SelectItem value="published">Yayında</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Öne Çıkan Görsel</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="image">Görsel URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="/images/blog-image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => window.open("https://www.shinesticmimarlik.com/blog", "_blank")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Önizleme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
