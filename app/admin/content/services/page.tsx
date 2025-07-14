"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  image: string
  price: string
  duration: string
  isActive: boolean
}

interface ServicesContent {
  hero: {
    title: string
    subtitle: string
    description: string
    image: string
    isVisible: boolean
  }
  services: Service[]
  process: {
    title: string
    description: string
    steps: Array<{
      title: string
      description: string
      icon: string
    }>
    isVisible: boolean
  }
  cta: {
    title: string
    description: string
    buttonText: string
    isVisible: boolean
  }
}

export default function ServicesContentPage() {
  const [content, setContent] = useState<ServicesContent>({
    hero: {
      title: "Hizmetlerimiz",
      subtitle: "Profesyonel İç Mimarlık Hizmetleri",
      description:
        "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
      image: "/images/services-hero.jpg",
      isVisible: true,
    },
    services: [
      {
        id: "1",
        title: "İç Mimarlık Danışmanlığı",
        description: "Profesyonel iç mimarlık danışmanlığı hizmeti ile projelerinizi planlayın ve hayata geçirin.",
        features: [
          "Mekan analizi ve planlama",
          "Renk ve malzeme seçimi",
          "Mobilya ve aksesuar önerileri",
          "Bütçe planlama",
        ],
        image: "/images/consulting-service.png",
        price: "Proje bazında",
        duration: "1-2 hafta",
        isActive: true,
      },
      {
        id: "2",
        title: "İç Mekan Tasarımı",
        description: "Yaratıcı ve işlevsel tasarım çözümleri ile hayalinizdeki mekanları oluşturun.",
        features: ["3D görselleştirme", "Teknik çizimler", "Malzeme listesi", "Uygulama detayları"],
        image: "/images/design-service.png",
        price: "m² başına",
        duration: "2-4 hafta",
        isActive: true,
      },
      {
        id: "3",
        title: "Proje Uygulama",
        description: "Tasarımdan gerçeğe dönüşüm sürecinde profesyonel uygulama hizmeti.",
        features: ["Şantiye yönetimi", "Kalite kontrol", "Zaman planlaması", "Teslim sonrası destek"],
        image: "/images/implementation-service.png",
        price: "Proje bazında",
        duration: "4-12 hafta",
        isActive: true,
      },
    ],
    process: {
      title: "Çalışma Sürecimiz",
      description: "Projelerinizi 4 aşamada profesyonelce yönetiyoruz",
      steps: [
        {
          title: "Keşif ve Analiz",
          description: "Mekanınızı inceleyip ihtiyaçlarınızı belirliyoruz",
          icon: "search",
        },
        {
          title: "Tasarım ve Planlama",
          description: "Size özel tasarım çözümleri geliştiriyoruz",
          icon: "design",
        },
        {
          title: "Sunum ve Onay",
          description: "3D görsellerle tasarımı sunup onayınızı alıyoruz",
          icon: "presentation",
        },
        {
          title: "Uygulama",
          description: "Projeyi titizlikle hayata geçiriyoruz",
          icon: "implementation",
        },
      ],
      isVisible: true,
    },
    cta: {
      title: "Projeniz İçin Teklif Alın",
      description: "Hayalinizdeki mekanları gerçeğe dönüştürmek için bizimle iletişime geçin.",
      buttonText: "Ücretsiz Teklif Al",
      isVisible: true,
    },
  })

  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch("/api/content/services")
      if (response.ok) {
        const data = await response.json()
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      }
    } catch (error) {
      console.error("Error loading content:", error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/content/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        setLastSaved(new Date())
        toast.success("Hizmetler sayfası başarıyla kaydedildi!")
      } else {
        throw new Error("Kaydetme başarısız")
      }
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof ServicesContent, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateService = (serviceId: string, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service) => (service.id === serviceId ? { ...service, [field]: value } : service)),
    }))
  }

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "Yeni Hizmet",
      description: "Hizmet açıklaması",
      features: ["Özellik 1", "Özellik 2"],
      image: "/images/service-placeholder.jpg",
      price: "Proje bazında",
      duration: "1-2 hafta",
      isActive: true,
    }

    setContent((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }))
  }

  const removeService = (serviceId: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== serviceId),
    }))
  }

  const updateServiceFeature = (serviceId: string, featureIndex: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              features: service.features.map((feature, index) => (index === featureIndex ? value : feature)),
            }
          : service,
      ),
    }))
  }

  const addServiceFeature = (serviceId: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === serviceId ? { ...service, features: [...service.features, "Yeni özellik"] } : service,
      ),
    }))
  }

  const removeServiceFeature = (serviceId: string, featureIndex: number) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              features: service.features.filter((_, index) => index !== featureIndex),
            }
          : service,
      ),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmetler Sayfası</h1>
          <p className="text-gray-600">Hizmetler sayfası içeriklerini düzenleyin</p>
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

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hero Bölümü</CardTitle>
              <CardDescription>Sayfa başlığı ve ana görsel</CardDescription>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Başlık</Label>
              <Input
                value={content.hero.title}
                onChange={(e) => updateContent("hero", "title", e.target.value)}
                placeholder="Hizmetlerimiz"
              />
            </div>
            <div>
              <Label>Alt Başlık</Label>
              <Input
                value={content.hero.subtitle}
                onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                placeholder="Profesyonel İç Mimarlık Hizmetleri"
              />
            </div>
          </div>
          <div>
            <Label>Açıklama</Label>
            <Textarea
              value={content.hero.description}
              onChange={(e) => updateContent("hero", "description", e.target.value)}
              placeholder="SHINEST İç Mimarlık olarak..."
              rows={3}
            />
          </div>
          <div>
            <Label>Görsel URL</Label>
            <Input
              value={content.hero.image}
              onChange={(e) => updateContent("hero", "image", e.target.value)}
              placeholder="/images/services-hero.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hizmetler</CardTitle>
              <CardDescription>Sunduğunuz hizmetleri düzenleyin</CardDescription>
            </div>
            <Button onClick={addService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Hizmet Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.services.map((service, index) => (
            <Card key={service.id} className="border-l-4 border-l-[#c4975a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Hizmet {index + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={(checked) => updateService(service.id, "isActive", checked)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeService(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Hizmet Adı</Label>
                    <Input
                      value={service.title}
                      onChange={(e) => updateService(service.id, "title", e.target.value)}
                      placeholder="Hizmet adı"
                    />
                  </div>
                  <div>
                    <Label>Görsel URL</Label>
                    <Input
                      value={service.image}
                      onChange={(e) => updateService(service.id, "image", e.target.value)}
                      placeholder="/images/service.jpg"
                    />
                  </div>
                </div>
                <div>
                  <Label>Açıklama</Label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateService(service.id, "description", e.target.value)}
                    placeholder="Hizmet açıklaması"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Fiyat</Label>
                    <Input
                      value={service.price}
                      onChange={(e) => updateService(service.id, "price", e.target.value)}
                      placeholder="Proje bazında"
                    />
                  </div>
                  <div>
                    <Label>Süre</Label>
                    <Input
                      value={service.duration}
                      onChange={(e) => updateService(service.id, "duration", e.target.value)}
                      placeholder="1-2 hafta"
                    />
                  </div>
                </div>
                <div>
                  <Label>Özellikler</Label>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateServiceFeature(service.id, featureIndex, e.target.value)}
                          placeholder="Özellik"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeServiceFeature(service.id, featureIndex)}
                        >
                          Sil
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addServiceFeature(service.id)}>
                      Özellik Ekle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Çağrı Bölümü</CardTitle>
              <CardDescription>Müşteri çağrısı ve iletişim</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={content.cta.isVisible}
                onCheckedChange={(checked) => updateContent("cta", "isVisible", checked)}
              />
              <span className="text-sm text-gray-600">{content.cta.isVisible ? "Görünür" : "Gizli"}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Başlık</Label>
            <Input
              value={content.cta.title}
              onChange={(e) => updateContent("cta", "title", e.target.value)}
              placeholder="Projeniz İçin Teklif Alın"
            />
          </div>
          <div>
            <Label>Açıklama</Label>
            <Textarea
              value={content.cta.description}
              onChange={(e) => updateContent("cta", "description", e.target.value)}
              placeholder="Hayalinizdeki mekanları gerçeğe dönüştürmek için..."
              rows={3}
            />
          </div>
          <div>
            <Label>Buton Metni</Label>
            <Input
              value={content.cta.buttonText}
              onChange={(e) => updateContent("cta", "buttonText", e.target.value)}
              placeholder="Ücretsiz Teklif Al"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
