"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Eye, EyeOff, Plus, Trash2, ImageIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ContentSection {
  id: string
  title: string
  content: string
  image?: string
  type: "text" | "image" | "gallery" | "hero"
}

interface PageContent {
  [key: string]: ContentSection[]
}

const defaultContent: PageContent = {
  home: [
    {
      id: "hero",
      title: "Hero Section",
      content: "Modern İç Mimari Çözümleri",
      image: "/images/hero-image.png",
      type: "hero",
    },
    {
      id: "about",
      title: "About Section",
      content: "SHINEST olarak, modern yaşamın gereksinimlerini karşılayan özgün tasarımlar yaratıyoruz.",
      type: "text",
    },
    {
      id: "gallery",
      title: "Gallery Section",
      content: "Featured Projects Gallery",
      type: "gallery",
    },
  ],
  about: [
    {
      id: "intro",
      title: "Introduction",
      content: "Hakkımızda sayfası içeriği...",
      type: "text",
    },
  ],
  services: [
    {
      id: "consulting",
      title: "Danışmanlık",
      content: "Profesyonel iç mimari danışmanlık hizmetleri",
      image: "/images/consulting-service.png",
      type: "text",
    },
    {
      id: "design",
      title: "Tasarım",
      content: "Yaratıcı ve fonksiyonel tasarım çözümleri",
      image: "/images/design-service.png",
      type: "text",
    },
    {
      id: "implementation",
      title: "Uygulama",
      content: "Projelerinizin kusursuz uygulanması",
      image: "/images/implementation-service.png",
      type: "text",
    },
  ],
}

interface ContentEditorProps {
  page: string
  language?: string
}

export default function ContentEditor({ page, language = "tr" }: ContentEditorProps) {
  const [content, setContent] = useState<ContentSection[]>(defaultContent[page] || [])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    loadContent()
  }, [page, language])

  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/page-content?page=${page}&language=${language}`)
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setContent(
            data.map((item: any) => ({
              id: item.section,
              title: item.section,
              content: item.content.text || item.content,
              image: item.content.image,
              type: item.content.type || "text",
            })),
          )
        }
      }
    } catch (error) {
      console.error("Error loading content:", error)
      toast({
        title: "Hata",
        description: "İçerik yüklenirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      const promises = content.map((section) =>
        fetch("/api/admin/page-content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page,
            section: section.id,
            content: {
              text: section.content,
              image: section.image,
              type: section.type,
            },
            language,
          }),
        }),
      )

      await Promise.all(promises)

      toast({
        title: "Başarılı",
        description: "İçerik başarıyla kaydedildi",
      })
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Hata",
        description: "İçerik kaydedilirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addSection = () => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      title: "Yeni Bölüm",
      content: "",
      type: "text",
    }
    setContent([...content, newSection])
  }

  const updateSection = (id: string, field: keyof ContentSection, value: string) => {
    setContent(content.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
  }

  const deleteSection = (id: string) => {
    setContent(content.filter((section) => section.id !== id))
  }

  const handleImageUpload = async (sectionId: string, file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "content")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        updateSection(sectionId, "image", data.url)
        toast({
          title: "Başarılı",
          description: "Resim başarıyla yüklendi",
        })
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Hata",
        description: "Resim yüklenirken hata oluştu",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">{page} İçerik Editörü</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{previewMode ? "Düzenleme" : "Önizleme"}</span>
          </Button>
          <Button onClick={addSection} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Bölüm Ekle</span>
          </Button>
          <Button onClick={saveContent} disabled={saving} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>{saving ? "Kaydediliyor..." : "Kaydet"}</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tr" className="w-full">
        <TabsList>
          <TabsTrigger value="tr">Türkçe</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="de">Deutsch</TabsTrigger>
        </TabsList>

        <TabsContent value="tr" className="space-y-4">
          {content.map((section, index) => (
            <Card key={section.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSection(section.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`title-${section.id}`}>Başlık</Label>
                  <Input
                    id={`title-${section.id}`}
                    value={section.title}
                    onChange={(e) => updateSection(section.id, "title", e.target.value)}
                    placeholder="Bölüm başlığı"
                  />
                </div>

                <div>
                  <Label htmlFor={`content-${section.id}`}>İçerik</Label>
                  <Textarea
                    id={`content-${section.id}`}
                    value={section.content}
                    onChange={(e) => updateSection(section.id, "content", e.target.value)}
                    placeholder="Bölüm içeriği"
                    rows={4}
                  />
                </div>

                {section.type !== "text" && (
                  <div>
                    <Label>Resim</Label>
                    <div className="flex items-center space-x-4">
                      {section.image && (
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt={section.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleImageUpload(section.id, file)
                            }
                          }}
                          className="hidden"
                          id={`image-${section.id}`}
                        />
                        <Label
                          htmlFor={`image-${section.id}`}
                          className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>Resim Seç</span>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {previewMode && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Önizleme:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">{section.title}</h5>
                      <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
                      {section.image && (
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt={section.title}
                          className="mt-2 max-w-xs rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="en">
          <div className="text-center py-8 text-gray-500">İngilizce içerik editörü yakında eklenecek</div>
        </TabsContent>

        <TabsContent value="de">
          <div className="text-center py-8 text-gray-500">Almanca içerik editörü yakında eklenecek</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
