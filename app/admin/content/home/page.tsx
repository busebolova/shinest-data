"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface HomeContent {
  hero: {
    title: string
    subtitle: string
    description: string
    image: string
  }
  about: {
    title: string
    description: string
    image: string
  }
  services: Array<{
    id: number
    title: string
    description: string
    image: string
  }>
  gallery: Array<{
    id: number
    image: string
    title: string
  }>
}

export default function HomeContentPage() {
  const [content, setContent] = useState<HomeContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch("/api/content/home")
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
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
    if (!content) return

    setSaving(true)
    try {
      const response = await fetch("/api/content/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "İçerik başarıyla kaydedildi ve anında yansıtıldı!",
        })
        // Force refresh the homepage to see changes
        setTimeout(() => {
          window.open("/", "_blank")
        }, 1000)
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "İçerik kaydedilirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (file: File, section: string, field: string) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("path", `${section}-${field}-${Date.now()}.${file.name.split(".").pop()}`)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        return url
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Dosya yükleme başarısız",
        variant: "destructive",
      })
      return null
    } finally {
      setUploading(false)
    }
  }

  const updateHero = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    })
  }

  const updateAbout = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      about: {
        ...content.about,
        [field]: value,
      },
    })
  }

  const updateService = (index: number, field: string, value: string) => {
    if (!content) return
    const newServices = [...content.services]
    newServices[index] = {
      ...newServices[index],
      [field]: value,
    }
    setContent({
      ...content,
      services: newServices,
    })
  }

  const addService = () => {
    if (!content) return
    const newService = {
      id: Date.now(),
      title: "Yeni Hizmet",
      description: "Hizmet açıklaması",
      image: "/placeholder.svg?height=300&width=400",
    }
    setContent({
      ...content,
      services: [...content.services, newService],
    })
  }

  const removeService = (index: number) => {
    if (!content) return
    const newServices = content.services.filter((_, i) => i !== index)
    setContent({
      ...content,
      services: newServices,
    })
  }

  const updateGalleryItem = (index: number, field: string, value: string) => {
    if (!content) return
    const newGallery = [...content.gallery]
    newGallery[index] = {
      ...newGallery[index],
      [field]: value,
    }
    setContent({
      ...content,
      gallery: newGallery,
    })
  }

  const addGalleryItem = () => {
    if (!content) return
    const newItem = {
      id: Date.now(),
      image: "/placeholder.svg?height=400&width=600",
      title: "Yeni Galeri Öğesi",
    }
    setContent({
      ...content,
      gallery: [...content.gallery, newItem],
    })
  }

  const removeGalleryItem = (index: number) => {
    if (!content) return
    const newGallery = content.gallery.filter((_, i) => i !== index)
    setContent({
      ...content,
      gallery: newGallery,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>İçerik yüklenemedi</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ana Sayfa İçerik Yönetimi</h1>
        <Button onClick={saveContent} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Kaydet
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Bölümü</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Başlık</Label>
                    <Input
                      id="hero-title"
                      value={content.hero.title}
                      onChange={(e) => updateHero("title", e.target.value)}
                      placeholder="SHINEST"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Alt Başlık</Label>
                    <Input
                      id="hero-subtitle"
                      value={content.hero.subtitle}
                      onChange={(e) => updateHero("subtitle", e.target.value)}
                      placeholder="İÇ MİMARLIK"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-description">Açıklama</Label>
                    <Textarea
                      id="hero-description"
                      value={content.hero.description}
                      onChange={(e) => updateHero("description", e.target.value)}
                      placeholder="Hayalinizdeki mekanları gerçeğe dönüştürüyoruz"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-image">Görsel URL</Label>
                    <Input
                      id="hero-image"
                      value={content.hero.image}
                      onChange={(e) => updateHero("image", e.target.value)}
                      placeholder="/images/hero-image.png"
                    />
                  </div>
                  <div>
                    <Label>Görsel Dosyası Yükle</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const url = await handleFileUpload(file, "hero", "main")
                            if (url) {
                              updateHero("image", url)
                            }
                          }
                        }}
                        disabled={uploading}
                      />
                      {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Önizleme</Label>
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <Image
                      src={content.hero.image || "/placeholder.svg"}
                      alt="Hero Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Hakkımızda Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="about-title">Başlık</Label>
                    <Input
                      id="about-title"
                      value={content.about.title}
                      onChange={(e) => updateAbout("title", e.target.value)}
                      placeholder="Hakkımızda"
                    />
                  </div>
                  <div>
                    <Label htmlFor="about-description">Açıklama</Label>
                    <Textarea
                      id="about-description"
                      value={content.about.description}
                      onChange={(e) => updateAbout("description", e.target.value)}
                      placeholder="Modern ve şık tasarımlarla yaşam alanlarınızı dönüştürüyoruz."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="about-image">Görsel URL</Label>
                    <Input
                      id="about-image"
                      value={content.about.image}
                      onChange={(e) => updateAbout("image", e.target.value)}
                      placeholder="/images/about-image.png"
                    />
                  </div>
                  <div>
                    <Label>Görsel Dosyası Yükle</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const url = await handleFileUpload(file, "about", "main")
                            if (url) {
                              updateAbout("image", url)
                            }
                          }
                        }}
                        disabled={uploading}
                      />
                      {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Önizleme</Label>
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <Image
                      src={content.about.image || "/placeholder.svg"}
                      alt="About Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Hizmetler</h3>
              <Button onClick={addService} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Hizmet Ekle
              </Button>
            </div>

            <div className="grid gap-4">
              {content.services.map((service, index) => (
                <Card key={service.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base">Hizmet {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeService(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <Label>Başlık</Label>
                          <Input
                            value={service.title}
                            onChange={(e) => updateService(index, "title", e.target.value)}
                            placeholder="Hizmet başlığı"
                          />
                        </div>
                        <div>
                          <Label>Açıklama</Label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => updateService(index, "description", e.target.value)}
                            placeholder="Hizmet açıklaması"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Görsel URL</Label>
                          <Input
                            value={service.image}
                            onChange={(e) => updateService(index, "image", e.target.value)}
                            placeholder="/images/service.png"
                          />
                        </div>
                        <div>
                          <Label>Görsel Dosyası Yükle</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const url = await handleFileUpload(file, "service", `${index}`)
                                  if (url) {
                                    updateService(index, "image", url)
                                  }
                                }
                              }}
                              disabled={uploading}
                            />
                            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label>Önizleme</Label>
                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt="Service Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Galeri</h3>
              <Button onClick={addGalleryItem} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Görsel Ekle
              </Button>
            </div>

            <div className="grid gap-4">
              {content.gallery.map((item, index) => (
                <Card key={item.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base">Galeri Öğesi {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeGalleryItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <Label>Başlık</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateGalleryItem(index, "title", e.target.value)}
                            placeholder="Görsel başlığı"
                          />
                        </div>
                        <div>
                          <Label>Görsel URL</Label>
                          <Input
                            value={item.image}
                            onChange={(e) => updateGalleryItem(index, "image", e.target.value)}
                            placeholder="/images/gallery.png"
                          />
                        </div>
                        <div>
                          <Label>Görsel Dosyası Yükle</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const url = await handleFileUpload(file, "gallery", `${index}`)
                                  if (url) {
                                    updateGalleryItem(index, "image", url)
                                  }
                                }
                              }}
                              disabled={uploading}
                            />
                            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label>Önizleme</Label>
                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt="Gallery Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
