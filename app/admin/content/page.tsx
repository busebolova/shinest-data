"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Upload, Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function ContentManagement() {
  const [currentLanguage, setCurrentLanguage] = useState("tr")
  const [saving, setSaving] = useState(false)

  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  // Ana sayfa içerik durumu
  const [homeContent, setHomeContent] = useState({
    hero: {
      title: {
        tr: "SHINEST",
        en: "SHINEST",
      },
      subtitle: {
        tr: "İÇ MİMARLIK",
        en: "INTERIOR ARCHITECTURE",
      },
      description: {
        tr: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
        en: "We turn your dream spaces into reality",
      },
      buttonText: {
        tr: "Keşfet",
        en: "Explore",
      },
      backgroundImage: "/images/hero-image.png",
      showAnimation: true,
      isVisible: true,
    },
    textSection: {
      mainText1: {
        tr: "MEKANLARINIZ",
        en: "YOUR SPACES",
      },
      mainText2: {
        tr: "YAŞAMINIZA",
        en: "BRING LIGHT TO",
      },
      handwritingText: {
        tr: "ışık tutar!",
        en: "your life!",
      },
      description: {
        tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz.",
        en: "As SHINEST Interior Architecture, we transform your living spaces into works of art. With our modern design approach and experienced team, we carefully bring each project to life.",
      },
      isVisible: true,
    },
    aboutSection: {
      title: {
        tr: "Hakkımızda",
        en: "About Us",
      },
      subtitle: {
        tr: "Tasarım Felsefemiz",
        en: "Our Design Philosophy",
      },
      description: {
        tr: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır.",
        en: "We transform your living spaces into works of art. Each project tells a unique story that turns our clients' dreams into reality.",
      },
      isVisible: true,
    },
    servicesSection: {
      title: {
        tr: "Hizmetlerimiz",
        en: "Our Services",
      },
      subtitle: {
        tr: "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
        en: "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers.",
      },
      services: [
        {
          id: 1,
          title: {
            tr: "Danışmanlık",
            en: "Consulting",
          },
          description: {
            tr: "Profesyonel iç mimarlık danışmanlığı hizmeti",
            en: "Professional interior architecture consulting service",
          },
          image: "/images/consulting-service.png",
        },
        {
          id: 2,
          title: {
            tr: "Tasarım",
            en: "Design",
          },
          description: {
            tr: "Yaratıcı ve işlevsel tasarım çözümleri",
            en: "Creative and functional design solutions",
          },
          image: "/images/design-service.png",
        },
        {
          id: 3,
          title: {
            tr: "Uygulama",
            en: "Implementation",
          },
          description: {
            tr: "Tasarımdan gerçeğe dönüşüm süreci",
            en: "Design to reality transformation process",
          },
          image: "/images/implementation-service.png",
        },
      ],
      isVisible: true,
    },
    projectsSection: {
      title: {
        tr: "Projelerimiz",
        en: "Our Projects",
      },
      subtitle: {
        tr: "Öne Çıkan Çalışmalarımız",
        en: "Our Featured Works",
      },
      description: {
        tr: "Gerçekleştirdiğimiz projelerden örnekler ve tasarım hikayelerimiz",
        en: "Examples from our completed projects and our design stories",
      },
      isVisible: true,
    },
    gallerySection: {
      title: {
        tr: "Projelerimizden",
        en: "From Our Projects",
      },
      images: [
        {
          id: 1,
          url: "/images/gallery-1.png",
          alt: {
            tr: "Modern Salon",
            en: "Modern Living Room",
          },
        },
        {
          id: 2,
          url: "/images/gallery-2.png",
          alt: {
            tr: "Lüks Banyo",
            en: "Luxury Bathroom",
          },
        },
        {
          id: 3,
          url: "/images/gallery-3.png",
          alt: {
            tr: "Kafe Tasarımı",
            en: "Cafe Design",
          },
        },
        {
          id: 4,
          url: "/images/gallery-4.png",
          alt: {
            tr: "Yatak Odası",
            en: "Bedroom",
          },
        },
        {
          id: 5,
          url: "/images/gallery-5.png",
          alt: {
            tr: "Mutfak Tasarımı",
            en: "Kitchen Design",
          },
        },
      ],
      isVisible: true,
    },
  })

  const handleSave = async (section: string) => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage for demo
      localStorage.setItem(`shinest_${section}`, JSON.stringify(homeContent[section]))

      toast.success(`${section} bölümü başarıyla kaydedildi!`)
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Save all to localStorage for demo
      localStorage.setItem("shinest_home_content", JSON.stringify(homeContent))

      toast.success("Tüm içerikler başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: string, field: string, value: any, lang?: string) => {
    setHomeContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: lang ? { ...prev[section][field], [lang]: value } : value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İçerik Yönetimi</h1>
          <p className="text-gray-600 mt-2">Ana sayfa içeriklerini düzenleyin ve yönetin</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSaveAll} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
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
                    checked={homeContent.hero.isVisible}
                    onCheckedChange={(checked) => updateContent("hero", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{homeContent.hero.isVisible ? "Görünür" : "Gizli"}</span>
                  {homeContent.hero.isVisible ? (
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
                    <Label>Ana Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.hero.title[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "title", e.target.value, currentLanguage)}
                      placeholder="SHINEST"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.hero.subtitle[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "subtitle", e.target.value, currentLanguage)}
                      placeholder="İÇ MİMARLIK"
                    />
                  </div>
                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.hero.description[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "description", e.target.value, currentLanguage)}
                      placeholder="Hayalinizdeki mekanları gerçeğe dönüştürüyoruz"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Buton Metni ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.hero.buttonText[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "buttonText", e.target.value, currentLanguage)}
                      placeholder="Keşfet"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Hero Görseli</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <img
                        src={homeContent.hero.backgroundImage || "/placeholder.svg"}
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={homeContent.hero.showAnimation}
                      onCheckedChange={(checked) => updateContent("hero", "showAnimation", checked)}
                    />
                    <Label>Animasyon Göster</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("hero")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Hero Kaydet"}
                </Button>
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
                    checked={homeContent.textSection.isVisible}
                    onCheckedChange={(checked) => updateContent("textSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.textSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ana Metin 1 ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.textSection.mainText1[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "mainText1", e.target.value, currentLanguage)}
                      placeholder="MEKANLARINIZ"
                    />
                  </div>
                  <div>
                    <Label>Ana Metin 2 ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.textSection.mainText2[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "mainText2", e.target.value, currentLanguage)}
                      placeholder="YAŞAMINIZA"
                    />
                  </div>
                  <div>
                    <Label>El Yazısı Metin ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.textSection.handwritingText[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "handwritingText", e.target.value, currentLanguage)}
                      placeholder="ışık tutar!"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.textSection.description[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "description", e.target.value, currentLanguage)}
                      placeholder="SHINEST İç Mimarlık olarak..."
                      rows={6}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("textSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Metin Bölümü Kaydet"}
                </Button>
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
                    checked={homeContent.aboutSection.isVisible}
                    onCheckedChange={(checked) => updateContent("aboutSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.aboutSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.aboutSection.title[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "title", e.target.value, currentLanguage)}
                      placeholder="Hakkımızda"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.aboutSection.subtitle[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "subtitle", e.target.value, currentLanguage)}
                      placeholder="Tasarım Felsefemiz"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.aboutSection.description[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "description", e.target.value, currentLanguage)}
                      placeholder="Yaşam alanlarınızı sanat eserine dönüştürüyoruz..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("aboutSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Hakkımızda Kaydet"}
                </Button>
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
                    checked={homeContent.servicesSection.isVisible}
                    onCheckedChange={(checked) => updateContent("servicesSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.servicesSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={homeContent.servicesSection.title[currentLanguage] || ""}
                    onChange={(e) => updateContent("servicesSection", "title", e.target.value, currentLanguage)}
                    placeholder="Hizmetlerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Textarea
                    value={homeContent.servicesSection.subtitle[currentLanguage] || ""}
                    onChange={(e) => updateContent("servicesSection", "subtitle", e.target.value, currentLanguage)}
                    placeholder="SHINEST İç Mimarlık olarak..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Hizmetler</Label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {homeContent.servicesSection.services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                            <Input
                              value={service.title[currentLanguage] || ""}
                              onChange={(e) => {
                                const newServices = homeContent.servicesSection.services.map((s) =>
                                  s.id === service.id
                                    ? { ...s, title: { ...s.title, [currentLanguage]: e.target.value } }
                                    : s,
                                )
                                updateContent("servicesSection", "services", newServices)
                              }}
                              placeholder="Danışmanlık"
                            />
                          </div>
                          <div>
                            <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                            <Textarea
                              value={service.description[currentLanguage] || ""}
                              onChange={(e) => {
                                const newServices = homeContent.servicesSection.services.map((s) =>
                                  s.id === service.id
                                    ? { ...s, description: { ...s.description, [currentLanguage]: e.target.value } }
                                    : s,
                                )
                                updateContent("servicesSection", "services", newServices)
                              }}
                              placeholder="Hizmet açıklaması..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Görsel</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
                              <img
                                src={service.image || "/placeholder.svg"}
                                alt="Service"
                                className="mx-auto h-16 w-auto object-cover rounded mb-2"
                              />
                              <Button variant="outline" size="sm">
                                Görsel Seç
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("servicesSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Hizmetler Kaydet"}
                </Button>
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
                    checked={homeContent.projectsSection.isVisible}
                    onCheckedChange={(checked) => updateContent("projectsSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.projectsSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={homeContent.projectsSection.title[currentLanguage] || ""}
                    onChange={(e) => updateContent("projectsSection", "title", e.target.value, currentLanguage)}
                    placeholder="Projelerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={homeContent.projectsSection.subtitle[currentLanguage] || ""}
                    onChange={(e) => updateContent("projectsSection", "subtitle", e.target.value, currentLanguage)}
                    placeholder="Öne Çıkan Çalışmalarımız"
                  />
                </div>
                <div>
                  <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                  <Textarea
                    value={homeContent.projectsSection.description[currentLanguage] || ""}
                    onChange={(e) => updateContent("projectsSection", "description", e.target.value, currentLanguage)}
                    placeholder="Gerçekleştirdiğimiz projelerden örnekler..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("projectsSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Projeler Kaydet"}
                </Button>
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
                    checked={homeContent.gallerySection.isVisible}
                    onCheckedChange={(checked) => updateContent("gallerySection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.gallerySection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                <Input
                  value={homeContent.gallerySection.title[currentLanguage] || ""}
                  onChange={(e) => updateContent("gallerySection", "title", e.target.value, currentLanguage)}
                  placeholder="Projelerimizden"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Galeri Görselleri</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {homeContent.gallerySection.images.map((image, index) => (
                    <Card key={image.id}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.alt[currentLanguage] || "Gallery Image"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Label>Alt Metin ({currentLanguage.toUpperCase()})</Label>
                            <Input
                              value={image.alt[currentLanguage] || ""}
                              onChange={(e) => {
                                const newImages = homeContent.gallerySection.images.map((img) =>
                                  img.id === image.id
                                    ? { ...img, alt: { ...img.alt, [currentLanguage]: e.target.value } }
                                    : img,
                                )
                                updateContent("gallerySection", "images", newImages)
                              }}
                              placeholder="Görsel açıklaması"
                            />
                          </div>
                          <div>
                            <Label>Görsel URL</Label>
                            <div className="flex gap-2">
                              <Input
                                value={image.url}
                                onChange={(e) => {
                                  const newImages = homeContent.gallerySection.images.map((img) =>
                                    img.id === image.id ? { ...img, url: e.target.value } : img,
                                  )
                                  updateContent("gallerySection", "images", newImages)
                                }}
                                placeholder="/images/gallery-1.png"
                              />
                              <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newImages = homeContent.gallerySection.images.filter((img) => img.id !== image.id)
                              updateContent("gallerySection", "images", newImages)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Sil
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const newImage = {
                      id: Date.now(),
                      url: "/placeholder.svg",
                      alt: {
                        tr: "Yeni Görsel",
                        en: "New Image",
                      },
                    }
                    const newImages = [...homeContent.gallerySection.images, newImage]
                    updateContent("gallerySection", "images", newImages)
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Görsel Ekle
                </Button>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("gallerySection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Galeri Kaydet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
