"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save, Upload, Eye, Plus, Trash2 } from "lucide-react"

interface HomeContent {
  hero: {
    title: string
    subtitle: string
    description: string
    image: string
  }
  bigText: {
    line1: string
    line2: string
    line3: string
  }
  gallery: {
    images: string[]
  }
  services: {
    title: string
    items: Array<{
      title: string
      description: string
      image: string
    }>
  }
}

const defaultContent: HomeContent = {
  hero: {
    title: "SHINEST",
    subtitle: "İç Mimarlık",
    description: "Yenilikçi ve fonksiyonel iç mekan çözümleri",
    image: "/images/hero-image.png",
  },
  bigText: {
    line1: "MEKANLARINIZ",
    line2: "YAŞAMINIZA",
    line3: "IŞIK TUTAR!",
  },
  gallery: {
    images: [
      "/images/gallery-1.png",
      "/images/gallery-2.png",
      "/images/gallery-3.png",
      "/images/gallery-4.png",
      "/images/gallery-5.png",
    ],
  },
  services: {
    title: "Hizmetlerimiz",
    items: [
      {
        title: "Danışmanlık",
        description: "Profesyonel iç mimarlık danışmanlığı",
        image: "/images/consulting-service.png",
      },
      {
        title: "Tasarım",
        description: "Yaratıcı ve fonksiyonel tasarım çözümleri",
        image: "/images/design-service.png",
      },
      {
        title: "Uygulama",
        description: "Kusursuz uygulama ve proje yönetimi",
        image: "/images/implementation-service.png",
      },
    ],
  },
}

export default function HomeContentPage() {
  const { toast } = useToast()
  const [content, setContent] = useState<HomeContent>(defaultContent)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/content/home")
      if (response.ok) {
        const data = await response.json()
        // Merge with default content to ensure all properties exist
        setContent({
          hero: { ...defaultContent.hero, ...data.hero },
          bigText: { ...defaultContent.bigText, ...data.bigText },
          gallery: {
            images: data.gallery?.images || defaultContent.gallery.images,
          },
          services: {
            title: data.services?.title || defaultContent.services.title,
            items: data.services?.items || defaultContent.services.items,
          },
        })
      }
    } catch (error) {
      console.error("Error fetching content:", error)
      toast({
        title: "Hata",
        description: "İçerik yüklenemedi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
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
          description: "İçerik başarıyla kaydedildi",
        })
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "İçerik kaydedilemedi",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateBigText = (field: keyof HomeContent["bigText"], value: string) => {
    setContent((prev) => ({
      ...prev,
      bigText: {
        ...prev.bigText,
        [field]: value.toUpperCase(),
      },
    }))
  }

  const updateHero = (field: keyof HomeContent["hero"], value: string) => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }))
  }

  const addGalleryImage = () => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        images: [...(prev.gallery?.images || []), "/placeholder.svg?height=300&width=400"],
      },
    }))
  }

  const removeGalleryImage = (index: number) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        images: (prev.gallery?.images || []).filter((_, i) => i !== index),
      },
    }))
  }

  const updateGalleryImage = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        images: (prev.gallery?.images || []).map((img, i) => (i === index ? value : img)),
      },
    }))
  }

  const addService = () => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [
          ...(prev.services?.items || []),
          {
            title: "Yeni Hizmet",
            description: "Hizmet açıklaması",
            image: "/placeholder.svg?height=200&width=300",
          },
        ],
      },
    }))
  }

  const removeService = (index: number) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: (prev.services?.items || []).filter((_, i) => i !== index),
      },
    }))
  }

  const updateService = (index: number, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: (prev.services?.items || []).map((service, i) =>
          i === index ? { ...service, [field]: value } : service,
        ),
      },
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>İçerik yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ana Sayfa İçerik Yönetimi</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Önizle
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Bölümü</TabsTrigger>
          <TabsTrigger value="bigtext">Büyük Metin</TabsTrigger>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Başlık</Label>
                <Input
                  id="hero-title"
                  value={content.hero?.title || ""}
                  onChange={(e) => updateHero("title", e.target.value)}
                  placeholder="SHINEST"
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Alt Başlık</Label>
                <Input
                  id="hero-subtitle"
                  value={content.hero?.subtitle || ""}
                  onChange={(e) => updateHero("subtitle", e.target.value)}
                  placeholder="İç Mimarlık"
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Açıklama</Label>
                <Textarea
                  id="hero-description"
                  value={content.hero?.description || ""}
                  onChange={(e) => updateHero("description", e.target.value)}
                  placeholder="Yenilikçi ve fonksiyonel iç mekan çözümleri"
                />
              </div>
              <div>
                <Label htmlFor="hero-image">Görsel URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="hero-image"
                    value={content.hero?.image || ""}
                    onChange={(e) => updateHero("image", e.target.value)}
                    placeholder="/images/hero-image.png"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                {content.hero?.image && (
                  <div className="mt-2">
                    <img
                      src={content.hero.image || "/placeholder.svg"}
                      alt="Hero preview"
                      className="w-full max-w-md h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bigtext">
          <Card>
            <CardHeader>
              <CardTitle>Büyük Metin Animasyonu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="line1">1. Satır</Label>
                <Input
                  id="line1"
                  value={content.bigText?.line1 || ""}
                  onChange={(e) => updateBigText("line1", e.target.value)}
                  placeholder="MEKANLARINIZ"
                  className="font-display text-lg"
                />
              </div>
              <div>
                <Label htmlFor="line2">2. Satır</Label>
                <Input
                  id="line2"
                  value={content.bigText?.line2 || ""}
                  onChange={(e) => updateBigText("line2", e.target.value)}
                  placeholder="YAŞAMINIZA"
                  className="font-display text-lg"
                />
              </div>
              <div>
                <Label htmlFor="line3">3. Satır (Özel Stil)</Label>
                <Input
                  id="line3"
                  value={content.bigText?.line3 || ""}
                  onChange={(e) => updateBigText("line3", e.target.value)}
                  placeholder="IŞIK TUTAR!"
                  className="font-display text-lg text-[#c4975a] italic"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-6 bg-[#f5f3f0] rounded-lg">
                <h3 className="text-sm font-medium mb-4">Önizleme:</h3>
                <div className="text-center space-y-2">
                  <div className="font-display text-2xl text-[#15415b]">{content.bigText?.line1 || ""}</div>
                  <div className="font-display text-2xl text-[#15415b]">{content.bigText?.line2 || ""}</div>
                  <div className="font-display text-2xl text-[#c4975a] italic">{content.bigText?.line3 || ""}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Galeri Görselleri
                <Button onClick={addGalleryImage} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Görsel Ekle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(content.gallery?.images || []).map((image, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={image || "/placeholder.svg?height=100&width=150"}
                    alt={`Gallery ${index + 1}`}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`gallery-${index}`}>Görsel {index + 1}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id={`gallery-${index}`}
                        value={image}
                        onChange={(e) => updateGalleryImage(index, e.target.value)}
                        placeholder={`/images/gallery-${index + 1}.png`}
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => removeGalleryImage(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {(!content.gallery?.images || content.gallery.images.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p>Henüz galeri görseli eklenmemiş</p>
                  <Button onClick={addGalleryImage} className="mt-2">
                    <Plus className="w-4 h-4 mr-1" />
                    İlk Görseli Ekle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Hizmetler Bölümü
                <Button onClick={addService} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Hizmet Ekle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="services-title">Bölüm Başlığı</Label>
                <Input
                  id="services-title"
                  value={content.services?.title || ""}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      services: { ...prev.services, title: e.target.value },
                    }))
                  }
                  placeholder="Hizmetlerimiz"
                />
              </div>

              {(content.services?.items || []).map((service, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Hizmet {index + 1}</h4>
                    <Button variant="destructive" size="sm" onClick={() => removeService(index)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Sil
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor={`service-title-${index}`}>Başlık</Label>
                    <Input
                      id={`service-title-${index}`}
                      value={service.title}
                      onChange={(e) => updateService(index, "title", e.target.value)}
                      placeholder="Hizmet başlığı"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`service-desc-${index}`}>Açıklama</Label>
                    <Textarea
                      id={`service-desc-${index}`}
                      value={service.description}
                      onChange={(e) => updateService(index, "description", e.target.value)}
                      placeholder="Hizmet açıklaması"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`service-image-${index}`}>Görsel</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id={`service-image-${index}`}
                        value={service.image}
                        onChange={(e) => updateService(index, "image", e.target.value)}
                        placeholder="/images/service.png"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    {service.image && (
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-32 h-20 object-cover rounded mt-2"
                      />
                    )}
                  </div>
                </div>
              ))}

              {(!content.services?.items || content.services.items.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p>Henüz hizmet eklenmemiş</p>
                  <Button onClick={addService} className="mt-2">
                    <Plus className="w-4 h-4 mr-1" />
                    İlk Hizmeti Ekle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
