"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, Upload, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface HomeContent {
  hero: {
    title: string
    subtitle: string
    description: string
    buttonText: string
    backgroundImage: string
    isVisible: boolean
  }
  textSection: {
    mainText1: string
    mainText2: string
    handwritingText: string
    description: string
    isVisible: boolean
  }
  aboutSection: {
    title: string
    subtitle: string
    description: string
    vision: string
    mission: string
    isVisible: boolean
  }
  servicesSection: {
    title: string
    subtitle: string
    isVisible: boolean
  }
  projectsSection: {
    title: string
    subtitle: string
    description: string
    displayCount: number
    isVisible: boolean
  }
  gallerySection: {
    title: string
    isVisible: boolean
  }
}

export default function HomeContentPage() {
  const [content, setContent] = useState<HomeContent>({
    hero: {
      title: "SHINEST",
      subtitle: "İÇ MİMARLIK",
      description: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
      buttonText: "Keşfet",
      backgroundImage: "/images/hero-image.png",
      isVisible: true,
    },
    textSection: {
      mainText1: "MEKANLARINIZ",
      mainText2: "YAŞAMINIZA",
      handwritingText: "ışık tutar!",
      description:
        "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz.",
      isVisible: true,
    },
    aboutSection: {
      title: "Hakkımızda",
      subtitle: "Tasarım Felsefemiz",
      description:
        "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır.",
      vision: "İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak",
      mission:
        "Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik mekanlar tasarlamak",
      isVisible: true,
    },
    servicesSection: {
      title: "Hizmetlerimiz",
      subtitle:
        "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
      isVisible: true,
    },
    projectsSection: {
      title: "Projelerimiz",
      subtitle: "Öne Çıkan Çalışmalarımız",
      description: "Gerçekleştirdiğimiz projelerden örnekler ve tasarım hikayelerimiz",
      displayCount: 6,
      isVisible: true,
    },
    gallerySection: {
      title: "Projelerimizden",
      isVisible: true,
    },
  })

  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    // Load content from localStorage on mount
    const savedContent = localStorage.getItem("shinest-home-content")
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (error) {
        console.error("Error loading saved content:", error)
      }
    }
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage
      localStorage.setItem("shinest-home-content", JSON.stringify(content))
      setLastSaved(new Date())

      toast.success("Ana sayfa içeriği başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof HomeContent, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa İçerik Yönetimi</h1>
          <p className="text-gray-600">Ana sayfa bölümlerini düzenleyin ve yönetin</p>
        </div>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-sm text-gray-500">Son kayıt: {lastSaved.toLocaleTimeString("tr-TR")}</span>
          )}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="text">Büyük Metin</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="projects">Projeler</TabsTrigger>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hero bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.hero.isVisible}
                    onCheckedChange={(checked) => updateContent("hero", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.hero.isVisible ? "Görünür" : "Gizli"}</span>
                  {content.hero.isVisible ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ana Başlık</Label>
                    <Input
                      value={content.hero.title}
                      onChange={(e) => updateContent("hero", "title", e.target.value)}
                      placeholder="SHINEST"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık</Label>
                    <Input
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                      placeholder="İÇ MİMARLIK"
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent("hero", "description", e.target.value)}
                      placeholder="Hayalinizdeki mekanları gerçeğe dönüştürüyoruz"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Buton Metni</Label>
                    <Input
                      value={content.hero.buttonText}
                      onChange={(e) => updateContent("hero", "buttonText", e.target.value)}
                      placeholder="Keşfet"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Hero Görseli</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <img
                        src={content.hero.backgroundImage || "/placeholder.svg"}
                        alt="Hero"
                        className="mx-auto h-32 w-auto object-cover rounded mb-4"
                      />
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Görsel yüklemek için tıklayın</p>
                      <Button variant="outline" size="sm">
                        Görsel Seç
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Section */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Büyük Metin Bölümü</CardTitle>
                  <CardDescription>Ana sayfa büyük metin bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.textSection.isVisible}
                    onCheckedChange={(checked) => updateContent("textSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.textSection.isVisible ? "Görünür" : "Gizli"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ana Metin 1</Label>
                    <Input
                      value={content.textSection.mainText1}
                      onChange={(e) => updateContent("textSection", "mainText1", e.target.value)}
                      placeholder="MEKANLARINIZ"
                    />
                  </div>
                  <div>
                    <Label>Ana Metin 2</Label>
                    <Input
                      value={content.textSection.mainText2}
                      onChange={(e) => updateContent("textSection", "mainText2", e.target.value)}
                      placeholder="YAŞAMINIZA"
                    />
                  </div>
                  <div>
                    <Label>El Yazısı Metin</Label>
                    <Input
                      value={content.textSection.handwritingText}
                      onChange={(e) => updateContent("textSection", "handwritingText", e.target.value)}
                      placeholder="ışık tutar!"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={content.textSection.description}
                      onChange={(e) => updateContent("textSection", "description", e.target.value)}
                      placeholder="SHINEST İç Mimarlık olarak..."
                      rows={6}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hakkımızda Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hakkımızda bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.aboutSection.isVisible}
                    onCheckedChange={(checked) => updateContent("aboutSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.aboutSection.isVisible ? "Görünür" : "Gizli"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={content.aboutSection.title}
                      onChange={(e) => updateContent("aboutSection", "title", e.target.value)}
                      placeholder="Hakkımızda"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık</Label>
                    <Input
                      value={content.aboutSection.subtitle}
                      onChange={(e) => updateContent("aboutSection", "subtitle", e.target.value)}
                      placeholder="Tasarım Felsefemiz"
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={content.aboutSection.description}
                      onChange={(e) => updateContent("aboutSection", "description", e.target.value)}
                      placeholder="Yaşam alanlarınızı sanat eserine dönüştürüyoruz..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Vizyon</Label>
                    <Textarea
                      value={content.aboutSection.vision}
                      onChange={(e) => updateContent("aboutSection", "vision", e.target.value)}
                      placeholder="İç mimarlık alanında yenilikçi..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Misyon</Label>
                    <Textarea
                      value={content.aboutSection.mission}
                      onChange={(e) => updateContent("aboutSection", "mission", e.target.value)}
                      placeholder="Müşterilerimizin hayallerini..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hizmetler Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hizmetler bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.servicesSection.isVisible}
                    onCheckedChange={(checked) => updateContent("servicesSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {content.servicesSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Başlık</Label>
                  <Input
                    value={content.servicesSection.title}
                    onChange={(e) => updateContent("servicesSection", "title", e.target.value)}
                    placeholder="Hizmetlerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık</Label>
                  <Textarea
                    value={content.servicesSection.subtitle}
                    onChange={(e) => updateContent("servicesSection", "subtitle", e.target.value)}
                    placeholder="SHINEST İç Mimarlık olarak..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Section */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projeler Bölümü</CardTitle>
                  <CardDescription>Ana sayfa projeler bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.projectsSection.isVisible}
                    onCheckedChange={(checked) => updateContent("projectsSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {content.projectsSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Başlık</Label>
                  <Input
                    value={content.projectsSection.title}
                    onChange={(e) => updateContent("projectsSection", "title", e.target.value)}
                    placeholder="Projelerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık</Label>
                  <Input
                    value={content.projectsSection.subtitle}
                    onChange={(e) => updateContent("projectsSection", "subtitle", e.target.value)}
                    placeholder="Öne Çıkan Çalışmalarımız"
                  />
                </div>
                <div>
                  <Label>Gösterilecek Proje Sayısı</Label>
                  <Input
                    type="number"
                    value={content.projectsSection.displayCount}
                    onChange={(e) => updateContent("projectsSection", "displayCount", Number.parseInt(e.target.value))}
                    placeholder="6"
                  />
                </div>
              </div>
              <div>
                <Label>Açıklama</Label>
                <Textarea
                  value={content.projectsSection.description}
                  onChange={(e) => updateContent("projectsSection", "description", e.target.value)}
                  placeholder="Gerçekleştirdiğimiz projelerden örnekler..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Section */}
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Galeri Bölümü</CardTitle>
                  <CardDescription>Ana sayfa galeri bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.gallerySection.isVisible}
                    onCheckedChange={(checked) => updateContent("gallerySection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {content.gallerySection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Başlık</Label>
                <Input
                  value={content.gallerySection.title}
                  onChange={(e) => updateContent("gallerySection", "title", e.target.value)}
                  placeholder="Projelerimizden"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
