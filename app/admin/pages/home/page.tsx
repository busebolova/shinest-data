"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, X, Eye, Plus, Trash2, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface HomePageContent {
  hero: {
    title: { tr: string; en: string }
    subtitle: { tr: string; en: string }
    description: { tr: string; en: string }
    backgroundImage: string
    buttonText: { tr: string; en: string }
    buttonLink: string
  }
  textSection: {
    mainText1: { tr: string; en: string }
    mainText2: { tr: string; en: string }
    handwritingText: { tr: string; en: string }
    description: { tr: string; en: string }
  }
  gallery: {
    title: { tr: string; en: string }
    images: Array<{
      id: string
      url: string
      alt: { tr: string; en: string }
      order: number
    }>
  }
  about: {
    title: { tr: string; en: string }
    subtitle: { tr: string; en: string }
    description: { tr: string; en: string }
    vision: { tr: string; en: string }
    mission: { tr: string; en: string }
    values: Array<{
      id: string
      title: { tr: string; en: string }
      description: { tr: string; en: string }
      icon: string
      order: number
    }>
    showOnHomepage: boolean
  }
  services: {
    title: { tr: string; en: string }
    subtitle: { tr: string; en: string }
    description: { tr: string; en: string }
    items: Array<{
      id: string
      title: { tr: string; en: string }
      description: { tr: string; en: string }
      icon: string
      image: string
      features: Array<string>
      order: number
    }>
    showOnHomepage: boolean
  }
  projects: {
    title: { tr: string; en: string }
    subtitle: { tr: string; en: string }
    description: { tr: string; en: string }
    featured: Array<{
      id: string
      title: { tr: string; en: string }
      location: { tr: string; en: string }
      category: { tr: string; en: string }
      year: string
      image: string
      slug: string
      description: { tr: string; en: string }
      order: number
    }>
    showOnHomepage: boolean
    displayCount: number
  }
  secondGallery: {
    title: { tr: string; en: string }
    images: Array<{
      id: string
      url: string
      alt: { tr: string; en: string }
      order: number
    }>
  }
  instagram: {
    title: { tr: string; en: string }
    description: { tr: string; en: string }
    profileUrl: string
    buttonText: { tr: string; en: string }
    showOnHomepage: boolean
  }
}

export default function HomePageEditor() {
  const [content, setContent] = useState<HomePageContent>({
    hero: {
      title: { tr: "SHINEST", en: "SHINEST" },
      subtitle: { tr: "İÇ MİMARLIK", en: "INTERIOR ARCHITECTURE" },
      description: {
        tr: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
        en: "We turn your dream spaces into reality",
      },
      backgroundImage: "/images/hero-image.png",
      buttonText: { tr: "Keşfet", en: "Explore" },
      buttonLink: "/projects",
    },
    textSection: {
      mainText1: { tr: "MEKANLARINIZ", en: "YOUR SPACES" },
      mainText2: { tr: "YAŞAMINIZA", en: "BRING LIGHT TO" },
      handwritingText: { tr: "ışık tutar!", en: "your life!" },
      description: {
        tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz.",
        en: "As SHINEST Interior Architecture, we transform your living spaces into works of art. With our modern design approach and experienced team, we carefully bring each project to life.",
      },
    },
    gallery: {
      title: { tr: "Projelerimizden", en: "From Our Projects" },
      images: [
        { id: "1", url: "/images/gallery-1.png", alt: { tr: "Modern Salon", en: "Modern Living Room" }, order: 1 },
        { id: "2", url: "/images/gallery-2.png", alt: { tr: "Lüks Banyo", en: "Luxury Bathroom" }, order: 2 },
        { id: "3", url: "/images/gallery-3.png", alt: { tr: "Kafe Tasarımı", en: "Cafe Design" }, order: 3 },
        { id: "4", url: "/images/gallery-4.png", alt: { tr: "Yatak Odası", en: "Bedroom" }, order: 4 },
        { id: "5", url: "/images/gallery-5.png", alt: { tr: "Mutfak Tasarımı", en: "Kitchen Design" }, order: 5 },
      ],
    },
    about: {
      title: { tr: "Hakkımızda", en: "About Us" },
      subtitle: { tr: "SHINEST İç Mimarlık", en: "SHINEST Interior Architecture" },
      description: {
        tr: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır.",
        en: "We transform your living spaces into works of art. Each project tells a unique story that turns our clients' dreams into reality.",
      },
      vision: {
        tr: "İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak",
        en: "To be a pioneer with innovative and sustainable solutions in interior architecture",
      },
      mission: {
        tr: "Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik mekanlar tasarlamak",
        en: "To turn our customers' dreams into reality, to design functional and aesthetic spaces that improve their quality of life",
      },
      values: [
        {
          id: "1",
          title: { tr: "Yenilikçilik", en: "Innovation" },
          description: {
            tr: "Sürekli gelişen teknoloji ve tasarım trendlerini takip ederek yenilikçi çözümler sunuyoruz.",
            en: "We offer innovative solutions by following constantly evolving technology and design trends.",
          },
          icon: "lightbulb",
          order: 1,
        },
        {
          id: "2",
          title: { tr: "Kalite", en: "Quality" },
          description: {
            tr: "Her projede en yüksek kalite standartlarını uygulayarak mükemmel sonuçlar elde ediyoruz.",
            en: "We achieve excellent results by applying the highest quality standards in every project.",
          },
          icon: "award",
          order: 2,
        },
        {
          id: "3",
          title: { tr: "Sürdürülebilirlik", en: "Sustainability" },
          description: {
            tr: "Çevre dostu malzemeler ve sürdürülebilir tasarım anlayışıyla geleceği düşünüyoruz.",
            en: "We think about the future with environmentally friendly materials and sustainable design approach.",
          },
          icon: "leaf",
          order: 3,
        },
      ],
      showOnHomepage: true,
    },
    services: {
      title: { tr: "Hizmetlerimiz", en: "Our Services" },
      subtitle: {
        tr: "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
        en: "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers.",
      },
      description: {
        tr: "Profesyonel iç mimarlık hizmetlerimizle hayalinizdeki mekanları gerçeğe dönüştürüyoruz.",
        en: "We turn your dream spaces into reality with our professional interior architecture services.",
      },
      items: [
        {
          id: "1",
          title: { tr: "Danışmanlık", en: "Consulting" },
          description: {
            tr: "Profesyonel iç mimarlık danışmanlığı hizmeti",
            en: "Professional interior architecture consulting service",
          },
          icon: "consulting",
          image: "/images/consulting-service.png",
          features: ["Mekan Analizi", "Konsept Geliştirme", "Bütçe Planlama", "Proje Yönetimi"],
          order: 1,
        },
        {
          id: "2",
          title: { tr: "Tasarım", en: "Design" },
          description: { tr: "Yaratıcı ve işlevsel tasarım çözümleri", en: "Creative and functional design solutions" },
          icon: "design",
          image: "/images/design-service.png",
          features: ["3D Görselleştirme", "Teknik Çizimler", "Malzeme Seçimi", "Renk Paleti"],
          order: 2,
        },
        {
          id: "3",
          title: { tr: "Uygulama", en: "Implementation" },
          description: { tr: "Tasarımdan gerçeğe dönüşüm süreci", en: "Design to reality transformation process" },
          icon: "implementation",
          image: "/images/implementation-service.png",
          features: ["Uygulama Takibi", "Kalite Kontrolü", "Zaman Yönetimi", "Son Kontrol"],
          order: 3,
        },
      ],
      showOnHomepage: true,
    },
    projects: {
      title: { tr: "Projelerimiz", en: "Our Projects" },
      subtitle: { tr: "Öne Çıkan Projeler", en: "Featured Projects" },
      description: {
        tr: "Gerçekleştirdiğimiz projelerden örnekler ve tasarım hikayelerimiz",
        en: "Examples from our completed projects and our design stories",
      },
      featured: [
        {
          id: "1",
          title: { tr: "Banyo Tasarımı", en: "Bathroom Design" },
          location: { tr: "Türkiye", en: "Turkey" },
          category: { tr: "Banyo Tasarımı", en: "Bathroom Design" },
          year: "2024",
          image: "/images/bathroom-design-1.png",
          slug: "banyo-tasarimi",
          description: {
            tr: "Modern ve minimalist banyo tasarımı. Petrol yeşili dolap, altın detaylar ve beyaz mermer tezgah ile lüks bir atmosfer yaratılmıştır.",
            en: "Modern and minimalist bathroom design. A luxurious atmosphere has been created with petroleum green cabinet, gold details and white marble countertop.",
          },
          order: 1,
        },
        {
          id: "2",
          title: { tr: "Kafe Tasarımı", en: "Cafe Design" },
          location: { tr: "Türkiye", en: "Turkey" },
          category: { tr: "Kafe Tasarımı", en: "Cafe Design" },
          year: "2024",
          image: "/images/cafe-design-1.png",
          slug: "kafe-tasarimi",
          description: {
            tr: "Modern patisserie tasarımı. Yeşil fluted tezgah, beyaz asma lambalar ve şık vitrin dolabı ile sıcak ve davetkar bir atmosfer yaratılmıştır.",
            en: "Modern patisserie design. A warm and inviting atmosphere has been created with green fluted counter, white pendant lights and elegant display cabinet.",
          },
          order: 2,
        },
        {
          id: "3",
          title: { tr: "Kış Bahçesi Tasarımı", en: "Winter Garden Design" },
          location: { tr: "Türkiye", en: "Turkey" },
          category: { tr: "Kış Bahçesi Tasarımı", en: "Winter Garden Design" },
          year: "2024",
          image: "/images/winter-garden-1.png",
          slug: "kis-bahcesi-tasarimi",
          description: {
            tr: "Modern cam kış bahçesi tasarımı. Beyaz çerçeveli büyük cam paneller ile doğal ışığın maksimize edildiği, dört mevsim kullanılabilen yaşam alanı.",
            en: "Modern glass winter garden design. A living space that can be used in all seasons, where natural light is maximized with large glass panels with white frames.",
          },
          order: 3,
        },
        {
          id: "4",
          title: { tr: "Polonya Konut Tasarımı", en: "Poland Apartment Design" },
          location: { tr: "Polonya", en: "Poland" },
          category: { tr: "Konut Tasarımı", en: "Residential Design" },
          year: "2024",
          image: "/images/poland-apartment-1.png",
          slug: "polonya-konut-tasarimi",
          description: {
            tr: "Modern Polonya dairesi tasarımı. Açık plan yaşam alanı, gri-beyaz renk paleti ve altın detaylar ile lüks bir yaşam alanı oluşturulmuştur.",
            en: "Modern Polish apartment design. A luxurious living space has been created with open plan living area, gray-white color palette and gold details.",
          },
          order: 4,
        },
      ],
      showOnHomepage: true,
      displayCount: 4,
    },
    secondGallery: {
      title: { tr: "Tasarım Süreci", en: "Design Process" },
      images: [
        {
          id: "1",
          url: "/images/second-gallery-1.png",
          alt: { tr: "Tasarım Danışmanlığı", en: "Design Consultation" },
          order: 1,
        },
        {
          id: "2",
          url: "/images/second-gallery-2.png",
          alt: { tr: "Proje Uygulaması", en: "Project Implementation" },
          order: 2,
        },
      ],
    },
    instagram: {
      title: { tr: "Instagram'da Bizi Takip Edin", en: "Follow Us on Instagram" },
      description: {
        tr: "En son projelerimizi ve tasarım ilhamlarımızı Instagram'da paylaşıyoruz.",
        en: "We share our latest projects and design inspirations on Instagram.",
      },
      profileUrl: "https://www.instagram.com/icm.selin",
      buttonText: { tr: "Takip Et", en: "Follow" },
      showOnHomepage: true,
    },
  })

  const [saving, setSaving] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"tr" | "en">("tr")
  const [previewMode, setPreviewMode] = useState(false)

  const handleSave = async (section?: string) => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage for demo
      localStorage.setItem("homePageContent", JSON.stringify(content))

      toast.success(section ? `${section} bölümü kaydedildi!` : "Tüm değişiklikler kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (file: File, section: string, imageId?: string) => {
    // Simulate image upload
    const url = URL.createObjectURL(file)

    if (section === "hero") {
      setContent((prev) => ({
        ...prev,
        hero: { ...prev.hero, backgroundImage: url },
      }))
    } else if (section === "gallery" && imageId) {
      setContent((prev) => ({
        ...prev,
        gallery: {
          ...prev.gallery,
          images: prev.gallery.images.map((img) => (img.id === imageId ? { ...img, url } : img)),
        },
      }))
    } else if (section === "service" && imageId) {
      setContent((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          items: prev.services.items.map((item) => (item.id === imageId ? { ...item, image: url } : item)),
        },
      }))
    } else if (section === "project" && imageId) {
      setContent((prev) => ({
        ...prev,
        projects: {
          ...prev.projects,
          featured: prev.projects.featured.map((item) => (item.id === imageId ? { ...item, image: url } : item)),
        },
      }))
    }

    toast.success("Görsel yüklendi!")
  }

  const addGalleryImage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: "/placeholder.svg",
      alt: { tr: "Yeni Görsel", en: "New Image" },
      order: content.gallery.images.length + 1,
    }

    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: [...prev.gallery.images, newImage],
      },
    }))
  }

  const removeGalleryImage = (imageId: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: prev.gallery.images.filter((img) => img.id !== imageId),
      },
    }))
  }

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: { tr: "Yeni Hizmet", en: "New Service" },
      description: { tr: "Hizmet açıklaması", en: "Service description" },
      icon: "service",
      image: "/placeholder.svg",
      features: [],
      order: content.services.items.length + 1,
    }

    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...prev.services.items, newService],
      },
    }))
  }

  const removeService = (serviceId: string) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter((service) => service.id !== serviceId),
      },
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: { tr: "Yeni Proje", en: "New Project" },
      location: { tr: "Türkiye", en: "Turkey" },
      category: { tr: "Kategori", en: "Category" },
      year: "2024",
      image: "/placeholder.svg",
      slug: "yeni-proje",
      description: { tr: "Proje açıklaması", en: "Project description" },
      order: content.projects.featured.length + 1,
    }

    setContent((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        featured: [...prev.projects.featured, newProject],
      },
    }))
  }

  const removeProject = (projectId: string) => {
    setContent((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        featured: prev.projects.featured.filter((project) => project.id !== projectId),
      },
    }))
  }

  const addValue = () => {
    const newValue = {
      id: Date.now().toString(),
      title: { tr: "Yeni Değer", en: "New Value" },
      description: { tr: "Değer açıklaması", en: "Value description" },
      icon: "star",
      order: content.about.values.length + 1,
    }

    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        values: [...prev.about.values, newValue],
      },
    }))
  }

  const removeValue = (valueId: string) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        values: prev.about.values.filter((value) => value.id !== valueId),
      },
    }))
  }

  useEffect(() => {
    // Load saved content
    const savedContent = localStorage.getItem("homePageContent")
    if (savedContent) {
      setContent(JSON.parse(savedContent))
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa Yönetimi</h1>
          <p className="text-gray-600 mt-2">Ana sayfa içeriklerini düzenleyin ve yönetin</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Dil:</Label>
            <div className="flex gap-1">
              <Button
                variant={currentLanguage === "tr" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage("tr")}
              >
                TR
              </Button>
              <Button
                variant={currentLanguage === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage("en")}
              >
                EN
              </Button>
            </div>
          </div>

          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Düzenleme" : "Önizleme"}
          </Button>

          <Button onClick={() => handleSave()} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="text">Büyük Metin</TabsTrigger>
          <TabsTrigger value="gallery">Ana Galeri</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="projects">Projeler</TabsTrigger>
          <TabsTrigger value="second-gallery">İkinci Galeri</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Bölümü</CardTitle>
              <CardDescription>Ana sayfa hero bölümünü düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ana Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={content.hero.title[currentLanguage]}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            title: { ...prev.hero.title, [currentLanguage]: e.target.value },
                          },
                        }))
                      }
                      placeholder="SHINEST"
                    />
                  </div>

                  <div>
                    <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={content.hero.subtitle[currentLanguage]}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            subtitle: { ...prev.hero.subtitle, [currentLanguage]: e.target.value },
                          },
                        }))
                      }
                      placeholder="İÇ MİMARLIK"
                    />
                  </div>

                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={content.hero.description[currentLanguage]}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            description: { ...prev.hero.description, [currentLanguage]: e.target.value },
                          },
                        }))
                      }
                      placeholder="Hayalinizdeki mekanları gerçeğe dönüştürüyoruz"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Buton Metni ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={content.hero.buttonText[currentLanguage]}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            buttonText: { ...prev.hero.buttonText, [currentLanguage]: e.target.value },
                          },
                        }))
                      }
                      placeholder="Keşfet"
                    />
                  </div>

                  <div>
                    <Label>Buton Linki</Label>
                    <Input
                      value={content.hero.buttonLink}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, buttonLink: e.target.value },
                        }))
                      }
                      placeholder="/projects"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Hero Görseli</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      {content.hero.backgroundImage ? (
                        <div className="relative">
                          <div className="relative h-48 w-full">
                            <Image
                              src={content.hero.backgroundImage || "/placeholder.svg"}
                              alt="Hero Image"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() =>
                              setContent((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, backgroundImage: "" },
                              }))
                            }
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label htmlFor="hero-image" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Hero görseli yükleyin
                              </span>
                              <input
                                id="hero-image"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleImageUpload(file, "hero")
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Hero")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Hero Bölümünü Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Section */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Büyük Metin Bölümü</CardTitle>
              <CardDescription>Ana sayfa büyük metin bölümünü düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Ana Metin 1 ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.textSection.mainText1[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        textSection: {
                          ...prev.textSection,
                          mainText1: { ...prev.textSection.mainText1, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="MEKANLARINIZ"
                  />
                </div>

                <div>
                  <Label>Ana Metin 2 ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.textSection.mainText2[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        textSection: {
                          ...prev.textSection,
                          mainText2: { ...prev.textSection.mainText2, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="YAŞAMINIZA"
                  />
                </div>
              </div>

              <div>
                <Label>El Yazısı Metin ({currentLanguage.toUpperCase()})</Label>
                <Input
                  value={content.textSection.handwritingText[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      textSection: {
                        ...prev.textSection,
                        handwritingText: { ...prev.textSection.handwritingText, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="ışık tutar!"
                />
              </div>

              <div>
                <Label>Açıklama Metni ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={content.textSection.description[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      textSection: {
                        ...prev.textSection,
                        description: { ...prev.textSection.description, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="SHINEST İç Mimarlık açıklaması..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Metin")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Metin Bölümünü Kaydet
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
                  <CardTitle>Ana Galeri</CardTitle>
                  <CardDescription>Scroll galeri görsellerini yönetin</CardDescription>
                </div>
                <Button onClick={addGalleryImage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Görsel Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Galeri Başlığı ({currentLanguage.toUpperCase()})</Label>
                <Input
                  value={content.gallery.title[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      gallery: {
                        ...prev.gallery,
                        title: { ...prev.gallery.title, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="Projelerimizden"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.gallery.images.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <div className="relative h-32 w-full">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt[currentLanguage]}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const input = document.createElement("input")
                            input.type = "file"
                            input.accept = "image/*"
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) handleImageUpload(file, "gallery", image.id)
                            }
                            input.click()
                          }}
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeGalleryImage(image.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Input
                        placeholder="Alt metin"
                        value={image.alt[currentLanguage]}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            gallery: {
                              ...prev.gallery,
                              images: prev.gallery.images.map((img) =>
                                img.id === image.id
                                  ? { ...img, alt: { ...img.alt, [currentLanguage]: e.target.value } }
                                  : img,
                              ),
                            },
                          }))
                        }
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Galeri")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Galeri Kaydet
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
                  <Label>Ana sayfada göster:</Label>
                  <input
                    type="checkbox"
                    checked={content.about.showOnHomepage}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, showOnHomepage: e.target.checked },
                      }))
                    }
                    className="rounded"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.about.title[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          title: { ...prev.about.title, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Hakkımızda"
                  />
                </div>

                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.about.subtitle[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          subtitle: { ...prev.about.subtitle, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="SHINEST İç Mimarlık"
                  />
                </div>
              </div>

              <div>
                <Label>Ana Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={content.about.description[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        description: { ...prev.about.description, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="Yaşam alanlarınızı sanat eserine dönüştürüyoruz..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Vizyon ({currentLanguage.toUpperCase()})</Label>
                  <Textarea
                    value={content.about.vision[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          vision: { ...prev.about.vision, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Vizyonumuz..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Misyon ({currentLanguage.toUpperCase()})</Label>
                  <Textarea
                    value={content.about.mission[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          mission: { ...prev.about.mission, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Misyonumuz..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Values Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Değerlerimiz</h3>
                  <Button onClick={addValue} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Değer Ekle
                  </Button>
                </div>

                {content.about.values.map((value, index) => (
                  <Card key={value.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">Değer {index + 1}</Badge>
                      <Button variant="destructive" size="sm" onClick={() => removeValue(value.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                        <Input
                          value={value.title[currentLanguage]}
                          onChange={(e) =>
                            setContent((prev) => ({
                              ...prev,
                              about: {
                                ...prev.about,
                                values: prev.about.values.map((item) =>
                                  item.id === value.id
                                    ? { ...item, title: { ...item.title, [currentLanguage]: e.target.value } }
                                    : item,
                                ),
                              },
                            }))
                          }
                          placeholder="Değer başlığı"
                        />
                      </div>

                      <div>
                        <Label>İkon</Label>
                        <Input
                          value={value.icon}
                          onChange={(e) =>
                            setContent((prev) => ({
                              ...prev,
                              about: {
                                ...prev.about,
                                values: prev.about.values.map((item) =>
                                  item.id === value.id ? { ...item, icon: e.target.value } : item,
                                ),
                              },
                            }))
                          }
                          placeholder="lightbulb, award, leaf"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                      <Textarea
                        value={value.description[currentLanguage]}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            about: {
                              ...prev.about,
                              values: prev.about.values.map((item) =>
                                item.id === value.id
                                  ? { ...item, description: { ...item.description, [currentLanguage]: e.target.value } }
                                  : item,
                              ),
                            },
                          }))
                        }
                        placeholder="Değer açıklaması"
                        rows={3}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Hakkımızda")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Hakkımızda Bölümünü Kaydet
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
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label>Ana sayfada göster:</Label>
                    <input
                      type="checkbox"
                      checked={content.services.showOnHomepage}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          services: { ...prev.services, showOnHomepage: e.target.checked },
                        }))
                      }
                      className="rounded"
                    />
                  </div>
                  <Button onClick={addService}>
                    <Plus className="h-4 w-4 mr-2" />
                    Hizmet Ekle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.services.title[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        services: {
                          ...prev.services,
                          title: { ...prev.services.title, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Hizmetlerimiz"
                  />
                </div>

                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.services.subtitle[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        services: {
                          ...prev.services,
                          subtitle: { ...prev.services.subtitle, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Alt başlık"
                  />
                </div>
              </div>

              <div>
                <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={content.services.description[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      services: {
                        ...prev.services,
                        description: { ...prev.services.description, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="Hizmetler açıklaması..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hizmet Kartları</h3>
                {content.services.items.map((service, index) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">Hizmet {index + 1}</Badge>
                      <Button variant="destructive" size="sm" onClick={() => removeService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                          <Input
                            value={service.title[currentLanguage]}
                            onChange={(e) =>
                              setContent((prev) => ({
                                ...prev,
                                services: {
                                  ...prev.services,
                                  items: prev.services.items.map((item) =>
                                    item.id === service.id
                                      ? { ...item, title: { ...item.title, [currentLanguage]: e.target.value } }
                                      : item,
                                  ),
                                },
                              }))
                            }
                            placeholder="Hizmet başlığı"
                          />
                        </div>

                        <div>
                          <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                          <Textarea
                            value={service.description[currentLanguage]}
                            onChange={(e) =>
                              setContent((prev) => ({
                                ...prev,
                                services: {
                                  ...prev.services,
                                  items: prev.services.items.map((item) =>
                                    item.id === service.id
                                      ? {
                                          ...item,
                                          description: { ...item.description, [currentLanguage]: e.target.value },
                                        }
                                      : item,
                                  ),
                                },
                              }))
                            }
                            placeholder="Hizmet açıklaması"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>İkon</Label>
                          <Input
                            value={service.icon}
                            onChange={(e) =>
                              setContent((prev) => ({
                                ...prev,
                                services: {
                                  ...prev.services,
                                  items: prev.services.items.map((item) =>
                                    item.id === service.id ? { ...item, icon: e.target.value } : item,
                                  ),
                                },
                              }))
                            }
                            placeholder="consulting, design, implementation"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Hizmet Görseli</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          {service.image ? (
                            <div className="relative">
                              <div className="relative h-24 w-full">
                                <Image
                                  src={service.image || "/placeholder.svg"}
                                  alt={service.title[currentLanguage]}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1"
                                onClick={() =>
                                  setContent((prev) => ({
                                    ...prev,
                                    services: {
                                      ...prev.services,
                                      items: prev.services.items.map((item) =>
                                        item.id === service.id ? { ...item, image: "" } : item,
                                      ),
                                    },
                                  }))
                                }
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-1 text-xs text-gray-600">Görsel yükle</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleImageUpload(file, "service", service.id)
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Hizmetler")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Hizmetler Bölümünü Kaydet
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
                  <CardDescription>Ana sayfa öne çıkan projeler bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label>Ana sayfada göster:</Label>
                    <input
                      type="checkbox"
                      checked={content.projects.showOnHomepage}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          projects: { ...prev.projects, showOnHomepage: e.target.checked },
                        }))
                      }
                      className="rounded"
                    />
                  </div>
                  <Button onClick={addProject}>
                    <Plus className="h-4 w-4 mr-2" />
                    Proje Ekle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.projects.title[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        projects: {
                          ...prev.projects,
                          title: { ...prev.projects.title, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Projelerimiz"
                  />
                </div>

                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.projects.subtitle[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        projects: {
                          ...prev.projects,
                          subtitle: { ...prev.projects.subtitle, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Öne Çıkan Projeler"
                  />
                </div>

                <div>
                  <Label>Gösterilecek Proje Sayısı</Label>
                  <Input
                    type="number"
                    value={content.projects.displayCount}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        projects: { ...prev.projects, displayCount: Number.parseInt(e.target.value) || 4 },
                      }))
                    }
                    placeholder="4"
                  />
                </div>
              </div>

              <div>
                <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={content.projects.description[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      projects: {
                        ...prev.projects,
                        description: { ...prev.projects.description, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="Projeler açıklaması..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Öne Çıkan Projeler</h3>
                {content.projects.featured.map((project, index) => (
                  <Card key={project.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">Proje {index + 1}</Badge>
                      <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                          <Input
                            value={project.title[currentLanguage]}
                            onChange={(e) =>
                              setContent((prev) => ({
                                ...prev,
                                projects: {
                                  ...prev.projects,
                                  featured: prev.projects.featured.map((item) =>
                                    item.id === project.id
                                      ? { ...item, title: { ...item.title, [currentLanguage]: e.target.value } }
                                      : item,
                                  ),
                                },
                              }))
                            }
                            placeholder="Proje başlığı"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Konum ({currentLanguage.toUpperCase()})</Label>
                            <Input
                              value={project.location[currentLanguage]}
                              onChange={(e) =>
                                setContent((prev) => ({
                                  ...prev,
                                  projects: {
                                    ...prev.projects,
                                    featured: prev.projects.featured.map((item) =>
                                      item.id === project.id
                                        ? { ...item, location: { ...item.location, [currentLanguage]: e.target.value } }
                                        : item,
                                    ),
                                  },
                                }))
                              }
                              placeholder="Türkiye"
                            />
                          </div>

                          <div>
                            <Label>Yıl</Label>
                            <Input
                              value={project.year}
                              onChange={(e) =>
                                setContent((prev) => ({
                                  ...prev,
                                  projects: {
                                    ...prev.projects,
                                    featured: prev.projects.featured.map((item) =>
                                      item.id === project.id ? { ...item, year: e.target.value } : item,
                                    ),
                                  },
                                }))
                              }
                              placeholder="2024"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Kategori ({currentLanguage.toUpperCase()})</Label>
                            <Input
                              value={project.category[currentLanguage]}
                              onChange={(e) =>
                                setContent((prev) => ({
                                  ...prev,
                                  projects: {
                                    ...prev.projects,
                                    featured: prev.projects.featured.map((item) =>
                                      item.id === project.id
                                        ? { ...item, category: { ...item.category, [currentLanguage]: e.target.value } }
                                        : item,
                                    ),
                                  },
                                }))
                              }
                              placeholder="Banyo Tasarımı"
                            />
                          </div>

                          <div>
                            <Label>Slug</Label>
                            <Input
                              value={project.slug}
                              onChange={(e) =>
                                setContent((prev) => ({
                                  ...prev,
                                  projects: {
                                    ...prev.projects,
                                    featured: prev.projects.featured.map((item) =>
                                      item.id === project.id ? { ...item, slug: e.target.value } : item,
                                    ),
                                  },
                                }))
                              }
                              placeholder="banyo-tasarimi"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                          <Textarea
                            value={project.description[currentLanguage]}
                            onChange={(e) =>
                              setContent((prev) => ({
                                ...prev,
                                projects: {
                                  ...prev.projects,
                                  featured: prev.projects.featured.map((item) =>
                                    item.id === project.id
                                      ? {
                                          ...item,
                                          description: { ...item.description, [currentLanguage]: e.target.value },
                                        }
                                      : item,
                                  ),
                                },
                              }))
                            }
                            placeholder="Proje açıklaması"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Proje Görseli</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          {project.image ? (
                            <div className="relative">
                              <div className="relative h-24 w-full">
                                <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title[currentLanguage]}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1"
                                onClick={() =>
                                  setContent((prev) => ({
                                    ...prev,
                                    projects: {
                                      ...prev.projects,
                                      featured: prev.projects.featured.map((item) =>
                                        item.id === project.id ? { ...item, image: "" } : item,
                                      ),
                                    },
                                  }))
                                }
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-1 text-xs text-gray-600">Görsel yükle</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleImageUpload(file, "project", project.id)
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Projeler")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Projeler Bölümünü Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Second Gallery Section */}
        <TabsContent value="second-gallery">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>İkinci Galeri</CardTitle>
                  <CardDescription>İkinci galeri bölümünü yönetin</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    const newImage = {
                      id: Date.now().toString(),
                      url: "/placeholder.svg",
                      alt: { tr: "Yeni Görsel", en: "New Image" },
                      order: content.secondGallery.images.length + 1,
                    }
                    setContent((prev) => ({
                      ...prev,
                      secondGallery: {
                        ...prev.secondGallery,
                        images: [...prev.secondGallery.images, newImage],
                      },
                    }))
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Görsel Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Galeri Başlığı ({currentLanguage.toUpperCase()})</Label>
                <Input
                  value={content.secondGallery.title[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      secondGallery: {
                        ...prev.secondGallery,
                        title: { ...prev.secondGallery.title, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="Tasarım Süreci"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {content.secondGallery.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="relative h-32 w-full">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt[currentLanguage]}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const input = document.createElement("input")
                            input.type = "file"
                            input.accept = "image/*"
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                const url = URL.createObjectURL(file)
                                setContent((prev) => ({
                                  ...prev,
                                  secondGallery: {
                                    ...prev.secondGallery,
                                    images: prev.secondGallery.images.map((img) =>
                                      img.id === image.id ? { ...img, url } : img,
                                    ),
                                  },
                                }))
                              }
                            }
                            input.click()
                          }}
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setContent((prev) => ({
                              ...prev,
                              secondGallery: {
                                ...prev.secondGallery,
                                images: prev.secondGallery.images.filter((img) => img.id !== image.id),
                              },
                            }))
                          }
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Input
                        placeholder="Alt metin"
                        value={image.alt[currentLanguage]}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            secondGallery: {
                              ...prev.secondGallery,
                              images: prev.secondGallery.images.map((img) =>
                                img.id === image.id
                                  ? { ...img, alt: { ...img.alt, [currentLanguage]: e.target.value } }
                                  : img,
                              ),
                            },
                          }))
                        }
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("İkinci Galeri")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  İkinci Galeri Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instagram Section */}
        <TabsContent value="instagram">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Instagram Bölümü</CardTitle>
                  <CardDescription>Instagram takip bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Ana sayfada göster:</Label>
                  <input
                    type="checkbox"
                    checked={content.instagram.showOnHomepage}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        instagram: { ...prev.instagram, showOnHomepage: e.target.checked },
                      }))
                    }
                    className="rounded"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.instagram.title[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        instagram: {
                          ...prev.instagram,
                          title: { ...prev.instagram.title, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Instagram'da Bizi Takip Edin"
                  />
                </div>

                <div>
                  <Label>Buton Metni ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={content.instagram.buttonText[currentLanguage]}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        instagram: {
                          ...prev.instagram,
                          buttonText: { ...prev.instagram.buttonText, [currentLanguage]: e.target.value },
                        },
                      }))
                    }
                    placeholder="Takip Et"
                  />
                </div>
              </div>

              <div>
                <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={content.instagram.description[currentLanguage]}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      instagram: {
                        ...prev.instagram,
                        description: { ...prev.instagram.description, [currentLanguage]: e.target.value },
                      },
                    }))
                  }
                  placeholder="Instagram açıklaması..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Instagram Profil URL</Label>
                <Input
                  value={content.instagram.profileUrl}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      instagram: { ...prev.instagram, profileUrl: e.target.value },
                    }))
                  }
                  placeholder="https://www.instagram.com/icm.selin"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Instagram")} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Instagram Bölümünü Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
