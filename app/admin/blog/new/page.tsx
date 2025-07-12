"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { dataManager } from "@/lib/data-manager"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [titleTR, setTitleTR] = useState("")
  const [titleEN, setTitleEN] = useState("")
  const [excerptTR, setExcerptTR] = useState("")
  const [excerptEN, setExcerptEN] = useState("")
  const [contentTR, setContentTR] = useState("")
  const [contentEN, setContentEN] = useState("")
  const [image, setImage] = useState("")
  const [status, setStatus] = useState<"published" | "draft">("draft")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (!titleTR || !titleEN || !contentTR || !contentEN || !excerptTR || !excerptEN) {
      toast.error("Lütfen tüm zorunlu alanları doldurun (Türkçe ve İngilizce).")
      setSaving(false)
      return
    }

    try {
      const newPost = {
        title: { tr: titleTR, en: titleEN },
        excerpt: { tr: excerptTR, en: excerptEN },
        content: { tr: contentTR, en: contentEN },
        image,
        status,
        publishedAt: status === "published" ? new Date().toISOString() : "",
      }
      await dataManager.createBlogPost(newPost)
      toast.success("Blog yazısı başarıyla oluşturuldu!")
      router.push("/admin/blog")
    } catch (error) {
      console.error("Error creating blog post:", error)
      toast.error("Blog yazısı oluşturulurken hata oluştu.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
          <p className="text-gray-600 mt-2">Yeni bir blog yazısı oluşturun</p>
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
          <CardTitle>Yazı Detayları</CardTitle>
          <CardDescription>Blog yazısının temel bilgilerini girin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title-tr">Başlık (Türkçe)</Label>
              <Input id="title-tr" value={titleTR} onChange={(e) => setTitleTR(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="title-en">Başlık (İngilizce)</Label>
              <Input id="title-en" value={titleEN} onChange={(e) => setTitleEN(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="excerpt-tr">Özet (Türkçe)</Label>
              <Textarea
                id="excerpt-tr"
                value={excerptTR}
                onChange={(e) => setExcerptTR(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="excerpt-en">Özet (İngilizce)</Label>
              <Textarea
                id="excerpt-en"
                value={excerptEN}
                onChange={(e) => setExcerptEN(e.target.value)}
                rows={3}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="content-tr">İçerik (Türkçe)</Label>
              <Textarea
                id="content-tr"
                value={contentTR}
                onChange={(e) => setContentTR(e.target.value)}
                rows={10}
                required
              />
            </div>
            <div>
              <Label htmlFor="content-en">İçerik (İngilizce)</Label>
              <Textarea
                id="content-en"
                value={contentEN}
                onChange={(e) => setContentEN(e.target.value)}
                rows={10}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">Görsel URL (public/images/blog-post.png gibi)</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/modern-interior-2024.png"
            />
            {image && (
              <img
                src={image || "/placeholder.svg"}
                alt="Görsel Önizleme"
                className="mt-2 h-32 w-auto object-cover rounded-md"
              />
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Görseli `public` klasörüne yükleyip buraya yolunu girin.
            </p>
          </div>

          <div>
            <Label htmlFor="status">Durum</Label>
            <Select value={status} onValueChange={(value: "published" | "draft") => setStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum Seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Yayınlandı</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
