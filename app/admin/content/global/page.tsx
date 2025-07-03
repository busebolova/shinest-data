"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, Upload } from "lucide-react"
import { toast } from "sonner"

interface GlobalContent {
  header: {
    logo: string
    companyName: string
    navigation: {
      home: string
      about: string
      services: string
      projects: string
      blog: string
      contact: string
    }
    ctaButton: string
    isVisible: boolean
  }
  footer: {
    companyName: string
    description: string
    address: string
    phone: string
    email: string
    socialMedia: {
      facebook: string
      instagram: string
      linkedin: string
      twitter: string
    }
    copyright: string
    isVisible: boolean
  }
  seo: {
    siteTitle: string
    siteDescription: string
    keywords: string
    ogTitle: string
    ogDescription: string
    ogImage: string
  }
}

export default function GlobalContentPage() {
  const [content, setContent] = useState<GlobalContent>({
    header: {
      logo: "/images/shinest-logo.png",
      companyName: "SHINEST İç Mimarlık",
      navigation: {
        home: "Ana Sayfa",
        about: "Hakkımızda",
        services: "Hizmetler",
        projects: "Projeler",
        blog: "Blog",
        contact: "İletişim",
      },
      ctaButton: "Teklif Al",
      isVisible: true,
    },
    footer: {
      companyName: "SHINEST İç Mimarlık",
      description:
        "Modern ve fonksiyonel yaşam alanları tasarlıyoruz. 15 yıllık deneyimimizle hayalinizdeki mekanları gerçeğe dönüştürüyoruz.",
      address: "Alsancak Mahallesi, 1234 Sokak No:56, Konak/İzmir",
      phone: "+90 232 123 45 67",
      email: "info@shinesticmimarlik.com",
      socialMedia: {
        facebook: "https://facebook.com/shinesticmimarlik",
        instagram: "https://instagram.com/shinesticmimarlik",
        linkedin: "https://linkedin.com/company/shinesticmimarlik",
        twitter: "https://twitter.com/shinesticmimarlik",
      },
      copyright: "© 2024 SHINEST İç Mimarlık. Tüm hakları saklıdır.",
      isVisible: true,
    },
    seo: {
      siteTitle: "SHINEST İç Mimarlık - Modern Yaşam Alanları",
      siteDescription:
        "İzmir'in önde gelen iç mimarlık firması. Modern, fonksiyonel ve estetik yaşam alanları tasarlıyoruz. Danışmanlık, tasarım ve uygulama hizmetleri.",
      keywords: "iç mimarlık, interior design, izmir, tasarım, dekorasyon, ev tasarımı, ofis tasarımı",
      ogTitle: "SHINEST İç Mimarlık - Hayalinizdeki Mekanları Gerçeğe Dönüştürüyoruz",
      ogDescription:
        "15 yıllık deneyimimizle modern ve fonksiyonel yaşam alanları tasarlıyoruz. Profesyonel iç mimarlık hizmetleri.",
      ogImage: "/images/og-image.jpg",
    },
  })

  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    // Load content from localStorage on mount
    const savedContent = localStorage.getItem("shinest-global-content")
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
      localStorage.setItem("shinest-global-content", JSON.stringify(content))
      setLastSaved(new Date())

      toast.success("Global içerikler başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof GlobalContent, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedContent = (section: keyof GlobalContent, nestedField: string, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...prev[section][nestedField],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global İçerik Yönetimi</h1>
          <p className="text-gray-600">Header, Footer ve SEO ayarlarını düzenleyin</p>
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
      <Tabs defaultValue="header" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* Header Settings */}
        <TabsContent value="header">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Header Ayarları</CardTitle>
                  <CardDescription>Site header'ını düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.header.isVisible}
                    onCheckedChange={(checked) => updateContent("header", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.header.isVisible ? "Görünür" : "Gizli"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Şirket Adı</Label>
                    <Input
                      value={content.header.companyName}
                      onChange={(e) => updateContent("header", "companyName", e.target.value)}
                      placeholder="SHINEST İç Mimarlık"
                    />
                  </div>
                  <div>
                    <Label>CTA Buton Metni</Label>
                    <Input
                      value={content.header.ctaButton}
                      onChange={(e) => updateContent("header", "ctaButton", e.target.value)}
                      placeholder="Teklif Al"
                    />
                  </div>
                  <div>
                    <Label>Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <img
                        src={content.header.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="mx-auto h-16 w-auto object-contain mb-4"
                      />
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Logo yüklemek için tıklayın</p>
                      <Button variant="outline" size="sm">
                        Logo Seç
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Navigasyon Menüsü</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ana Sayfa</Label>
                      <Input
                        value={content.header.navigation.home}
                        onChange={(e) => updateNestedContent("header", "navigation", "home", e.target.value)}
                        placeholder="Ana Sayfa"
                      />
                    </div>
                    <div>
                      <Label>Hakkımızda</Label>
                      <Input
                        value={content.header.navigation.about}
                        onChange={(e) => updateNestedContent("header", "navigation", "about", e.target.value)}
                        placeholder="Hakkımızda"
                      />
                    </div>
                    <div>
                      <Label>Hizmetler</Label>
                      <Input
                        value={content.header.navigation.services}
                        onChange={(e) => updateNestedContent("header", "navigation", "services", e.target.value)}
                        placeholder="Hizmetler"
                      />
                    </div>
                    <div>
                      <Label>Projeler</Label>
                      <Input
                        value={content.header.navigation.projects}
                        onChange={(e) => updateNestedContent("header", "navigation", "projects", e.target.value)}
                        placeholder="Projeler"
                      />
                    </div>
                    <div>
                      <Label>Blog</Label>
                      <Input
                        value={content.header.navigation.blog}
                        onChange={(e) => updateNestedContent("header", "navigation", "blog", e.target.value)}
                        placeholder="Blog"
                      />
                    </div>
                    <div>
                      <Label>İletişim</Label>
                      <Input
                        value={content.header.navigation.contact}
                        onChange={(e) => updateNestedContent("header", "navigation", "contact", e.target.value)}
                        placeholder="İletişim"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Settings */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Footer Ayarları</CardTitle>
                  <CardDescription>Site footer'ını düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.footer.isVisible}
                    onCheckedChange={(checked) => updateContent("footer", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.footer.isVisible ? "Görünür" : "Gizli"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Şirket Adı</Label>
                    <Input
                      value={content.footer.companyName}
                      onChange={(e) => updateContent("footer", "companyName", e.target.value)}
                      placeholder="SHINEST İç Mimarlık"
                    />
                  </div>
                  <div>
                    <Label>Şirket Açıklaması</Label>
                    <Textarea
                      value={content.footer.description}
                      onChange={(e) => updateContent("footer", "description", e.target.value)}
                      placeholder="Modern ve fonksiyonel yaşam alanları tasarlıyoruz..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Adres</Label>
                    <Textarea
                      value={content.footer.address}
                      onChange={(e) => updateContent("footer", "address", e.target.value)}
                      placeholder="Alsancak Mahallesi..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Telefon</Label>
                    <Input
                      value={content.footer.phone}
                      onChange={(e) => updateContent("footer", "phone", e.target.value)}
                      placeholder="+90 232 123 45 67"
                    />
                  </div>
                  <div>
                    <Label>E-posta</Label>
                    <Input
                      value={content.footer.email}
                      onChange={(e) => updateContent("footer", "email", e.target.value)}
                      placeholder="info@shinesticmimarlik.com"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Sosyal Medya</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Facebook</Label>
                      <Input
                        value={content.footer.socialMedia.facebook}
                        onChange={(e) => updateNestedContent("footer", "socialMedia", "facebook", e.target.value)}
                        placeholder="https://facebook.com/shinesticmimarlik"
                      />
                    </div>
                    <div>
                      <Label>Instagram</Label>
                      <Input
                        value={content.footer.socialMedia.instagram}
                        onChange={(e) => updateNestedContent("footer", "socialMedia", "instagram", e.target.value)}
                        placeholder="https://instagram.com/shinesticmimarlik"
                      />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={content.footer.socialMedia.linkedin}
                        onChange={(e) => updateNestedContent("footer", "socialMedia", "linkedin", e.target.value)}
                        placeholder="https://linkedin.com/company/shinesticmimarlik"
                      />
                    </div>
                    <div>
                      <Label>Twitter</Label>
                      <Input
                        value={content.footer.socialMedia.twitter}
                        onChange={(e) => updateNestedContent("footer", "socialMedia", "twitter", e.target.value)}
                        placeholder="https://twitter.com/shinesticmimarlik"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Telif Hakkı Metni</Label>
                    <Input
                      value={content.footer.copyright}
                      onChange={(e) => updateContent("footer", "copyright", e.target.value)}
                      placeholder="© 2024 SHINEST İç Mimarlık. Tüm hakları saklıdır."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>Site SEO ayarlarını düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Site Başlığı</Label>
                    <Input
                      value={content.seo.siteTitle}
                      onChange={(e) => updateContent("seo", "siteTitle", e.target.value)}
                      placeholder="SHINEST İç Mimarlık - Modern Yaşam Alanları"
                    />
                  </div>
                  <div>
                    <Label>Site Açıklaması</Label>
                    <Textarea
                      value={content.seo.siteDescription}
                      onChange={(e) => updateContent("seo", "siteDescription", e.target.value)}
                      placeholder="İzmir'in önde gelen iç mimarlık firması..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Anahtar Kelimeler</Label>
                    <Textarea
                      value={content.seo.keywords}
                      onChange={(e) => updateContent("seo", "keywords", e.target.value)}
                      placeholder="iç mimarlık, interior design, izmir, tasarım..."
                      rows={2}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Open Graph (Sosyal Medya)</h3>
                  <div>
                    <Label>OG Başlık</Label>
                    <Input
                      value={content.seo.ogTitle}
                      onChange={(e) => updateContent("seo", "ogTitle", e.target.value)}
                      placeholder="SHINEST İç Mimarlık - Hayalinizdeki Mekanları Gerçeğe Dönüştürüyoruz"
                    />
                  </div>
                  <div>
                    <Label>OG Açıklama</Label>
                    <Textarea
                      value={content.seo.ogDescription}
                      onChange={(e) => updateContent("seo", "ogDescription", e.target.value)}
                      placeholder="15 yıllık deneyimimizle modern ve fonksiyonel yaşam alanları tasarlıyoruz..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>OG Görsel</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <img
                        src={content.seo.ogImage || "/placeholder.svg"}
                        alt="OG Image"
                        className="mx-auto h-24 w-auto object-cover rounded mb-4"
                      />
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">OG görsel yüklemek için tıklayın</p>
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
      </Tabs>
    </div>
  )
}
