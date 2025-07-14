"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save, Upload, Eye } from "lucide-react"

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

export default function HomeContentPage() {
  const { toast } = useToast()
  const [content, setContent] = useState<HomeContent>({
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
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content/home")
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
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
      setLoading(false)
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ana Sayfa İçerik Yönetimi</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Önizle
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Kaydediliyor..." : "Kaydet"}
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
                  placeholder="İç Mimarlık"
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Açıklama</Label>
                <Textarea
                  id="hero-description"
                  value={content.hero.description}
                  onChange={(e) => updateHero("description", e.target.value)}
                  placeholder="Yenilikçi ve fonksiyonel iç mekan çözümleri"
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
                  value={content.bigText.line1}
                  onChange={(e) => updateBigText("line1", e.target.value)}
                  placeholder="MEKANLARINIZ"
                  className="font-display text-lg"
                />
              </div>
              <div>
                <Label htmlFor="line2">2. Satır</Label>
                <Input
                  id="line2"
                  value={content.bigText.line2}
                  onChange={(e) => updateBigText("line2", e.target.value)}
                  placeholder="YAŞAMINIZA"
                  className="font-display text-lg"
                />
              </div>
              <div>
                <Label htmlFor="line3">3. Satır (Özel Stil)</Label>
                <Input
                  id="line3"
                  value={content.bigText.line3}
                  onChange={(e) => updateBigText("line3", e.target.value)}
                  placeholder="IŞIK TUTAR!"
                  className="font-display text-lg text-[#c4975a] italic"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-6 bg-[#f5f3f0] rounded-lg">
                <h3 className="text-sm font-medium mb-4">Önizleme:</h3>
                <div className="text-center space-y-2">
                  <div className="font-display text-2xl text-[#15415b]">{content.bigText.line1}</div>
                  <div className="font-display text-2xl text-[#15415b]">{content.bigText.line2}</div>
                  <div className="font-display text-2xl text-[#c4975a] italic">{content.bigText.line3}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Galeri Görselleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.gallery.images.map((image, index) => (
                <div key={index}>
                  <Label htmlFor={`gallery-${index}`}>Görsel {index + 1}</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`gallery-${index}`}
                      value={image}
                      onChange={(e) => {
                        const newImages = [...content.gallery.images]
                        newImages[index] = e.target.value
                        setContent((prev) => ({
                          ...prev,
                          gallery: { images: newImages },
                        }))
                      }}
                      placeholder={`/images/gallery-${index + 1}.png`}
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Hizmetler Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="services-title">Bölüm Başlığı</Label>
                <Input
                  id="services-title"
                  value={content.services.title}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      services: { ...prev.services, title: e.target.value },
                    }))
                  }
                  placeholder="Hizmetlerimiz"
                />
              </div>

              {content.services.items.map((service, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Hizmet {index + 1}</h4>
                  <div>
                    <Label htmlFor={`service-title-${index}`}>Başlık</Label>
                    <Input
                      id={`service-title-${index}`}
                      value={service.title}
                      onChange={(e) => {
                        const newItems = [...content.services.items]
                        newItems[index].title = e.target.value
                        setContent((prev) => ({
                          ...prev,
                          services: { ...prev.services, items: newItems },
                        }))
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`service-desc-${index}`}>Açıklama</Label>
                    <Textarea
                      id={`service-desc-${index}`}
                      value={service.description}
                      onChange={(e) => {
                        const newItems = [...content.services.items]
                        newItems[index].description = e.target.value
                        setContent((prev) => ({
                          ...prev,
                          services: { ...prev.services, items: newItems },
                        }))
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`service-image-${index}`}>Görsel</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`service-image-${index}`}
                        value={service.image}
                        onChange={(e) => {
                          const newItems = [...content.services.items]
                          newItems[index].image = e.target.value
                          setContent((prev) => ({
                            ...prev,
                            services: { ...prev.services, items: newItems },
                          }))
                        }}
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
