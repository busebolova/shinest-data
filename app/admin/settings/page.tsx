"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, Settings, Globe, Shield, Phone } from "lucide-react"
import { toast } from "sonner"

interface AdminSettings {
  company: {
    name: string
    nameEn: string
    logo: string
    phone: string
    email: string
    address: string
    addressEn: string
  }
  social: {
    instagram: string
    facebook: string
    linkedin: string
    youtube: string
  }
  seo: {
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    keywords: string
    keywordsEn: string
  }
  contact: {
    workingHours: string
    workingHoursEn: string
    whatsapp: string
  }
  security: {
    twoFactorAuth: boolean
    captchaEnabled: boolean
    sessionTimeout: number
    maxLoginAttempts: number
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast.error("Ayarlar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return

    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success("Ayarlar başarıyla kaydedildi!")
      } else {
        throw new Error("Kaydetme başarısız")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Ayarlar kaydedilirken hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (section: keyof AdminSettings, field: string, value: any) => {
    if (!settings) return

    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c4975a]"></div>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">Ayarlar yüklenemedi</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600">Site ayarlarını yönetin</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#c4975a] hover:bg-[#b8864d]">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Şirket
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            İletişim
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Sosyal Medya
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Güvenlik
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Şirket Bilgileri</CardTitle>
              <CardDescription>Şirket bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Şirket Adı (Türkçe)</Label>
                  <Input
                    id="company-name"
                    value={settings.company.name}
                    onChange={(e) => updateSettings("company", "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="company-name-en">Şirket Adı (İngilizce)</Label>
                  <Input
                    id="company-name-en"
                    value={settings.company.nameEn}
                    onChange={(e) => updateSettings("company", "nameEn", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={settings.company.logo}
                  onChange={(e) => updateSettings("company", "logo", e.target.value)}
                  placeholder="/images/logo.png"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={settings.company.phone}
                    onChange={(e) => updateSettings("company", "phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => updateSettings("company", "email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Adres (Türkçe)</Label>
                  <Textarea
                    id="address"
                    value={settings.company.address}
                    onChange={(e) => updateSettings("company", "address", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="address-en">Adres (İngilizce)</Label>
                  <Textarea
                    id="address-en"
                    value={settings.company.addressEn}
                    onChange={(e) => updateSettings("company", "addressEn", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Ayarları</CardTitle>
              <CardDescription>İletişim bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="working-hours">Çalışma Saatleri (Türkçe)</Label>
                  <Input
                    id="working-hours"
                    value={settings.contact.workingHours}
                    onChange={(e) => updateSettings("contact", "workingHours", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="working-hours-en">Çalışma Saatleri (İngilizce)</Label>
                  <Input
                    id="working-hours-en"
                    value={settings.contact.workingHoursEn}
                    onChange={(e) => updateSettings("contact", "workingHoursEn", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={settings.contact.whatsapp}
                  onChange={(e) => updateSettings("contact", "whatsapp", e.target.value)}
                  placeholder="+90 555 123 4567"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>Arama motoru optimizasyonu ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seo-title">Site Başlığı (Türkçe)</Label>
                  <Input
                    id="seo-title"
                    value={settings.seo.title}
                    onChange={(e) => updateSettings("seo", "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="seo-title-en">Site Başlığı (İngilizce)</Label>
                  <Input
                    id="seo-title-en"
                    value={settings.seo.titleEn}
                    onChange={(e) => updateSettings("seo", "titleEn", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seo-description">Meta Açıklama (Türkçe)</Label>
                  <Textarea
                    id="seo-description"
                    value={settings.seo.description}
                    onChange={(e) => updateSettings("seo", "description", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="seo-description-en">Meta Açıklama (İngilizce)</Label>
                  <Textarea
                    id="seo-description-en"
                    value={settings.seo.descriptionEn}
                    onChange={(e) => updateSettings("seo", "descriptionEn", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seo-keywords">Anahtar Kelimeler (Türkçe)</Label>
                  <Input
                    id="seo-keywords"
                    value={settings.seo.keywords}
                    onChange={(e) => updateSettings("seo", "keywords", e.target.value)}
                    placeholder="iç mimarlık, tasarım, dekorasyon"
                  />
                </div>
                <div>
                  <Label htmlFor="seo-keywords-en">Anahtar Kelimeler (İngilizce)</Label>
                  <Input
                    id="seo-keywords-en"
                    value={settings.seo.keywordsEn}
                    onChange={(e) => updateSettings("seo", "keywordsEn", e.target.value)}
                    placeholder="interior design, architecture, decoration"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya</CardTitle>
              <CardDescription>Sosyal medya hesap bağlantıları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.social.instagram}
                    onChange={(e) => updateSettings("social", "instagram", e.target.value)}
                    placeholder="https://instagram.com/shinest"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.social.facebook}
                    onChange={(e) => updateSettings("social", "facebook", e.target.value)}
                    placeholder="https://facebook.com/shinest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={settings.social.linkedin}
                    onChange={(e) => updateSettings("social", "linkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/shinest"
                  />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={settings.social.youtube}
                    onChange={(e) => updateSettings("social", "youtube", e.target.value)}
                    placeholder="https://youtube.com/shinest"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>Sistem güvenlik ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İki Faktörlü Kimlik Doğrulama</Label>
                  <p className="text-sm text-gray-500">Hesap güvenliği için ek doğrulama katmanı</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => updateSettings("security", "twoFactorAuth", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>CAPTCHA Koruması</Label>
                  <p className="text-sm text-gray-500">Bot saldırılarına karşı koruma</p>
                </div>
                <Switch
                  checked={settings.security.captchaEnabled}
                  onCheckedChange={(checked) => updateSettings("security", "captchaEnabled", checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-timeout">Oturum Zaman Aşımı (dakika)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSettings("security", "sessionTimeout", Number.parseInt(e.target.value))}
                    min="5"
                    max="120"
                  />
                </div>
                <div>
                  <Label htmlFor="max-login-attempts">Maksimum Giriş Denemesi</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSettings("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                    min="3"
                    max="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
