"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface AboutContent {
  hero: {
    title: string
    subtitle: string
    description: string
    image: string
    isVisible: boolean
  }
  company: {
    title: string
    description: string
    vision: string
    mission: string
    values: string[]
    isVisible: boolean
  }
  team: {
    title: string
    description: string
    members: Array<{
      name: string
      position: string
      description: string
      image: string
    }>
    isVisible: boolean
  }
  experience: {
    title: string
    years: string
    description: string
    achievements: string[]
    isVisible: boolean
  }
}

export default function AboutContentPage() {
  const [content, setContent] = useState<AboutContent>({
    hero: {
      title: "Hakkımızda",
      subtitle: "SHINEST İç Mimarlık",
      description: "15 yıllık deneyimimizle modern ve fonksiyonel yaşam alanları tasarlıyoruz.",
      image: "/images/about-hero.jpg",
      isVisible: true,
    },
    company: {
      title: "Şirketimiz",
      description:
        "Shinest İç Mimarlık olarak yenilikçi ve fonksiyonel iç mekan çözümleri sunarak, danışanlarımızın yaşam alanlarına değer katmayı hedefleyen bir tasarım firmasıyız.",
      vision: "İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak",
      mission:
        "Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik mekanlar tasarlamak",
      values: [
        "Yenilikçilik ve yaratıcılık",
        "Kalite ve mükemmellik",
        "Sürdürülebilirlik",
        "Müşteri memnuniyeti",
        "Profesyonellik",
      ],
      isVisible: true,
    },
    team: {
      title: "Ekibimiz",
      description: "Deneyimli ve yaratıcı ekibimizle projelerinizi hayata geçiriyoruz.",
      members: [
        {
          name: "Selin Tutar",
          position: "Kurucu & Baş İç Mimar",
          description: "15 yıllık deneyimi ile iç mimarlık alanında uzman",
          image: "/images/team-selin.jpg",
        },
      ],
      isVisible: true,
    },
    experience: {
      title: "Deneyimimiz",
      years: "15+",
      description: "15 yılı aşkın deneyimimizle yüzlerce projeyi başarıyla tamamladık.",
      achievements: [
        "200+ tamamlanan proje",
        "50+ mutlu müşteri",
        "15+ yıl deneyim",
        "Ulusal ve uluslararası projeler",
      ],
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
      const response = await fetch("/api/content/about")
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
      const response = await fetch("/api/content/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        setLastSaved(new Date())
        toast.success("Hakkımızda sayfası başarıyla kaydedildi!")
      } else {
        throw new Error("Kaydetme başarısız")
      }
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof AboutContent, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateArrayField = (section: keyof AboutContent, field: string, index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item: any, i: number) => (i === index ? value : item)),
      },
    }))
  }

  const addArrayItem = (section: keyof AboutContent, field: string, defaultValue: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], defaultValue],
      },
    }))
  }

  const removeArrayItem = (section: keyof AboutContent, field: string, index: number) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_: any, i: number) => i !== index),
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hakkımızda Sayfası</h1>
          <p className="text-gray-600">Hakkımızda sayfası içeriklerini düzenleyin</p>
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
                placeholder="Hakkımızda"
              />
            </div>
            <div>
              <Label>Alt Başlık</Label>
              <Input
                value={content.hero.subtitle}
                onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                placeholder="SHINEST İç Mimarlık"
              />
            </div>
          </div>
          <div>
            <Label>Açıklama</Label>
            <Textarea
              value={content.hero.description}
              onChange={(e) => updateContent("hero", "description", e.target.value)}
              placeholder="15 yıllık deneyimimizle..."
              rows={3}
            />
          </div>
          <div>
            <Label>Görsel URL</Label>
            <Input
              value={content.hero.image}
              onChange={(e) => updateContent("hero", "image", e.target.value)}
              placeholder="/images/about-hero.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Şirket Bilgileri</CardTitle>
              <CardDescription>Şirket hakkında genel bilgiler</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={content.company.isVisible}
                onCheckedChange={(checked) => updateContent("company", "isVisible", checked)}
              />
              <span className="text-sm text-gray-600">{content.company.isVisible ? "Görünür" : "Gizli"}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Bölüm Başlığı</Label>
            <Input
              value={content.company.title}
              onChange={(e) => updateContent("company", "title", e.target.value)}
              placeholder="Şirketimiz"
            />
          </div>
          <div>
            <Label>Şirket Açıklaması</Label>
            <Textarea
              value={content.company.description}
              onChange={(e) => updateContent("company", "description", e.target.value)}
              placeholder="Shinest İç Mimarlık olarak..."
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Vizyon</Label>
              <Textarea
                value={content.company.vision}
                onChange={(e) => updateContent("company", "vision", e.target.value)}
                placeholder="İç mimarlık alanında..."
                rows={3}
              />
            </div>
            <div>
              <Label>Misyon</Label>
              <Textarea
                value={content.company.mission}
                onChange={(e) => updateContent("company", "mission", e.target.value)}
                placeholder="Müşterilerimizin hayallerini..."
                rows={3}
              />
            </div>
          </div>
          <div>
            <Label>Değerlerimiz</Label>
            <div className="space-y-2">
              {content.company.values.map((value, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={value}
                    onChange={(e) => updateArrayField("company", "values", index, e.target.value)}
                    placeholder="Değer"
                  />
                  <Button variant="outline" size="sm" onClick={() => removeArrayItem("company", "values", index)}>
                    Sil
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem("company", "values", "Yeni değer")}>
                Değer Ekle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Deneyim Bölümü</CardTitle>
              <CardDescription>Deneyim ve başarılar</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={content.experience.isVisible}
                onCheckedChange={(checked) => updateContent("experience", "isVisible", checked)}
              />
              <span className="text-sm text-gray-600">{content.experience.isVisible ? "Görünür" : "Gizli"}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Bölüm Başlığı</Label>
              <Input
                value={content.experience.title}
                onChange={(e) => updateContent("experience", "title", e.target.value)}
                placeholder="Deneyimimiz"
              />
            </div>
            <div>
              <Label>Yıl Sayısı</Label>
              <Input
                value={content.experience.years}
                onChange={(e) => updateContent("experience", "years", e.target.value)}
                placeholder="15+"
              />
            </div>
          </div>
          <div>
            <Label>Açıklama</Label>
            <Textarea
              value={content.experience.description}
              onChange={(e) => updateContent("experience", "description", e.target.value)}
              placeholder="15 yılı aşkın deneyimimizle..."
              rows={3}
            />
          </div>
          <div>
            <Label>Başarılar</Label>
            <div className="space-y-2">
              {content.experience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateArrayField("experience", "achievements", index, e.target.value)}
                    placeholder="Başarı"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("experience", "achievements", index)}
                  >
                    Sil
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("experience", "achievements", "Yeni başarı")}
              >
                Başarı Ekle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
