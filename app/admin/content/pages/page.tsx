"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface PageContent {
  about: {
    title: string
    subtitle: string
    description: string
    companyInfo: string
    vision: string
    mission: string
    values: string
    isVisible: boolean
  }
  services: {
    title: string
    subtitle: string
    description: string
    consultingTitle: string
    consultingDescription: string
    designTitle: string
    designDescription: string
    implementationTitle: string
    implementationDescription: string
    isVisible: boolean
  }
  contact: {
    title: string
    subtitle: string
    description: string
    address: string
    phone: string
    email: string
    workingHours: string
    isVisible: boolean
  }
}

export default function PagesContentPage() {
  const [content, setContent] = useState<PageContent>({
    about: {
      title: "Hakkımızda",
      subtitle: "SHINEST İç Mimarlık",
      description: "15 yıllık deneyimimizle modern ve fonksiyonel yaşam alanları tasarlıyoruz.",
      companyInfo:
        "Shinest İç Mimarlık olarak yenilikçi ve fonksiyonel iç mekan çözümleri sunarak, danışanlarımızın yaşam alanlarına değer katmayı hedefleyen bir tasarım firmasıyız.",
      vision: "İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak",
      mission:
        "Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik mekanlar tasarlamak",
      values:
        "Yenilikçilik, kalite, sürdürülebilirlik ve müşteri memnuniyeti temel değerlerimizdir. Her projede mükemmelliği hedefleyerek sektörde fark yaratıyoruz.",
      isVisible: true,
    },
    services: {
      title: "Hizmetlerimiz",
      subtitle: "Profesyonel İç Mimarlık Hizmetleri",
      description:
        "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
      consultingTitle: "Danışmanlık",
      consultingDescription: "Profesyonel iç mimarlık danışmanlığı hizmeti ile projelerinizi planlayın.",
      designTitle: "Tasarım",
      designDescription: "Yaratıcı ve işlevsel tasarım çözümleri ile hayalinizdeki mekanları oluşturun.",
      implementationTitle: "Uygulama",
      implementationDescription: "Tasarımdan gerçeğe dönüşüm sürecinde profesyonel uygulama hizmeti.",
      isVisible: true,
    },
    contact: {
      title: "İletişim",
      subtitle: "Bizimle İletişime Geçin",
      description: "Projeleriniz için bizimle iletişime geçin. Size en uygun çözümleri sunmak için buradayız.",
      address: "Alsancak Mahallesi, 1234 Sokak No:56, Konak/İzmir",
      phone: "+90 232 123 45 67",
      email: "info@shinesticmimarlik.com",
      workingHours: "Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 09:00 - 14:00",
      isVisible: true,
    },
  })

  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    // Load content from localStorage on mount
    const savedContent = localStorage.getItem("shinest-pages-content")
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
      localStorage.setItem("shinest-pages-content", JSON.stringify(content))
      setLastSaved(new Date())

      toast.success("Sayfa içerikleri başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof PageContent, field: string, value: any) => {
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
          <h1 className="text-3xl font-bold text-gray-900">Sayfa İçerikleri</h1>
          <p className="text-gray-600">Hakkımızda, Hizmetler ve İletişim sayfalarını düzenleyin</p>
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
      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
        </TabsList>

        {/* About Page */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hakkımızda Sayfası</CardTitle>
                  <CardDescription>Hakkımızda sayfası içeriklerini düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.about.isVisible}
                    onCheckedChange={(checked) => updateContent("about", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.about.isVisible ? "Görünür" : "Gizli"}</span>
                  {content.about.isVisible ? (
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
                    <Label>Sayfa Başlığı</Label>
                    <Input
                      value={content.about.title}
                      onChange={(e) => updateContent("about", "title", e.target.value)}
                      placeholder="Hakkımızda"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık</Label>
                    <Input
                      value={content.about.subtitle}
                      onChange={(e) => updateContent("about", "subtitle", e.target.value)}
                      placeholder="SHINEST İç Mimarlık"
                    />
                  </div>
                  <div>
                    <Label>Kısa Açıklama</Label>
                    <Textarea
                      value={content.about.description}
                      onChange={(e) => updateContent("about", "description", e.target.value)}
                      placeholder="15 yıllık deneyimimizle..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Şirket Bilgisi</Label>
                    <Textarea
                      value={content.about.companyInfo}
                      onChange={(e) => updateContent("about", "companyInfo", e.target.value)}
                      placeholder="Shinest İç Mimarlık olarak..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Vizyon</Label>
                    <Textarea
                      value={content.about.vision}
                      onChange={(e) => updateContent("about", "vision", e.target.value)}
                      placeholder="İç mimarlık alanında..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Misyon</Label>
                  <Textarea
                    value={content.about.mission}
                    onChange={(e) => updateContent("about", "mission", e.target.value)}
                    placeholder="Müşterilerimizin hayallerini..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Değerlerimiz</Label>
                  <Textarea
                    value={content.about.values}
                    onChange={(e) => updateContent("about", "values", e.target.value)}
                    placeholder="Yenilikçilik, kalite..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Page */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hizmetler Sayfası</CardTitle>
                  <CardDescription>Hizmetler sayfası içeriklerini düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.services.isVisible}
                    onCheckedChange={(checked) => updateContent("services", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.services.isVisible ? "Görünür" : "Gizli"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Sayfa Başlığı</Label>
                  <Input
                    value={content.services.title}
                    onChange={(e) => updateContent("services", "title", e.target.value)}
                    placeholder="Hizmetlerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık</Label>
                  <Input
                    value={content.services.subtitle}
                    onChange={(e) => updateContent("services", "subtitle", e.target.value)}
                    placeholder="Profesyonel İç Mimarlık Hizmetleri"
                  />
                </div>
              </div>
              <div>
                <Label>Genel Açıklama</Label>
                <Textarea
                  value={content.services.description}
                  onChange={(e) => updateContent("services", "description", e.target.value)}
                  placeholder="SHINEST İç Mimarlık olarak..."
                  rows={3}
                />
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Hizmet Detayları</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Consulting */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Danışmanlık Hizmeti</h4>
                    <div>
                      <Label>Başlık</Label>
                      <Input
                        value={content.services.consultingTitle}
                        onChange={(e) => updateContent("services", "consultingTitle", e.target.value)}
                        placeholder="Danışmanlık"
                      />
                    </div>
                    <div>
                      <Label>Açıklama</Label>
                      <Textarea
                        value={content.services.consultingDescription}
                        onChange={(e) => updateContent("services", "consultingDescription", e.target.value)}
                        placeholder="Profesyonel iç mimarlık danışmanlığı..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Design */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Tasarım Hizmeti</h4>
                    <div>
                      <Label>Başlık</Label>
                      <Input
                        value={content.services.designTitle}
                        onChange={(e) => updateContent("services", "designTitle", e.target.value)}
                        placeholder="Tasarım"
                      />
                    </div>
                    <div>
                      <Label>Açıklama</Label>
                      <Textarea
                        value={content.services.designDescription}
                        onChange={(e) => updateContent("services", "designDescription", e.target.value)}
                        placeholder="Yaratıcı ve işlevsel tasarım..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Implementation */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Uygulama Hizmeti</h4>
                    <div>
                      <Label>Başlık</Label>
                      <Input
                        value={content.services.implementationTitle}
                        onChange={(e) => updateContent("services", "implementationTitle", e.target.value)}
                        placeholder="Uygulama"
                      />
                    </div>
                    <div>
                      <Label>Açıklama</Label>
                      <Textarea
                        value={content.services.implementationDescription}
                        onChange={(e) => updateContent("services", "implementationDescription", e.target.value)}
                        placeholder="Tasarımdan gerçeğe dönüşüm..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Page */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>İletişim Sayfası</CardTitle>
                  <CardDescription>İletişim sayfası içeriklerini düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content.contact.isVisible}
                    onCheckedChange={(checked) => updateContent("contact", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{content.contact.isVisible ? "Görünür" : "Gizli"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Sayfa Başlığı</Label>
                    <Input
                      value={content.contact.title}
                      onChange={(e) => updateContent("contact", "title", e.target.value)}
                      placeholder="İletişim"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık</Label>
                    <Input
                      value={content.contact.subtitle}
                      onChange={(e) => updateContent("contact", "subtitle", e.target.value)}
                      placeholder="Bizimle İletişime Geçin"
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={content.contact.description}
                      onChange={(e) => updateContent("contact", "description", e.target.value)}
                      placeholder="Projeleriniz için bizimle iletişime geçin..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Adres</Label>
                    <Textarea
                      value={content.contact.address}
                      onChange={(e) => updateContent("contact", "address", e.target.value)}
                      placeholder="Alsancak Mahallesi..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Telefon</Label>
                    <Input
                      value={content.contact.phone}
                      onChange={(e) => updateContent("contact", "phone", e.target.value)}
                      placeholder="+90 232 123 45 67"
                    />
                  </div>
                  <div>
                    <Label>E-posta</Label>
                    <Input
                      value={content.contact.email}
                      onChange={(e) => updateContent("contact", "email", e.target.value)}
                      placeholder="info@shinesticmimarlik.com"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label>Çalışma Saatleri</Label>
                <Textarea
                  value={content.contact.workingHours}
                  onChange={(e) => updateContent("contact", "workingHours", e.target.value)}
                  placeholder="Pazartesi - Cuma: 09:00 - 18:00..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
