"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, Globe, Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from "lucide-react"
import { toast } from "sonner"

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    site: {
      name: "SHINEST İç Mimarlık",
      description: "Profesyonel iç mimarlık ve tasarım hizmetleri",
      logo: "/images/logo1.png",
      favicon: "/favicon.ico",
      language: "tr",
      timezone: "Europe/Istanbul",
    },
    contact: {
      email: "iletisim@shinesticmimarlik.com",
      phone: "0 552 179 87 35",
      address: "İzmir, Türkiye",
      workingHours: {
        weekdays: "Pazartesi - Cuma: 09:00 - 18:00",
        saturday: "Cumartesi: 10:00 - 16:00",
        sunday: "Pazar: Kapalı",
      },
    },
    social: {
      instagram: "https://www.instagram.com/icm.selin",
      youtube: "https://www.youtube.com/@ShinestIcMimarlikk",
      linkedin: "https://www.linkedin.com/company/shinesticmimarlik",
      facebook: "",
      twitter: "",
    },
    seo: {
      metaTitle: "SHINEST İç Mimarlık - Profesyonel İç Mimarlık Hizmetleri",
      metaDescription:
        "Modern ve fonksiyonel tasarımlarla yaşam alanlarınızı dönüştürüyoruz. Profesyonel iç mimarlık hizmetleri için SHINEST İç Mimarlık.",
      keywords: "iç mimarlık, tasarım, dekorasyon, mimarlık, İzmir",
      googleAnalytics: "",
      googleTagManager: "",
    },
    email: {
      smtpHost: "",
      smtpPort: "587",
      smtpUser: "",
      smtpPassword: "",
      fromEmail: "noreply@shinesticmimarlik.com",
      fromName: "SHINEST İç Mimarlık",
    },
    security: {
      enableTwoFactor: false,
      sessionTimeout: 60,
      maxLoginAttempts: 5,
      enableCaptcha: false,
    },
  })

  const handleSave = async (section: string) => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage for demo
      localStorage.setItem(`settings_${section}`, JSON.stringify(settings[section]))
      localStorage.setItem("settings_all", JSON.stringify(settings))

      toast.success(`${section} ayarları kaydedildi!`)
    } catch (error) {
      toast.error("Kaydetme sırasında hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Save all settings
      localStorage.setItem("settings_all", JSON.stringify(settings))

      toast.success("Tüm ayarlar kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedSetting = (section: string, parent: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
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
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600">Site ayarlarını yönetin ve yapılandırın</p>
        </div>
        <Button onClick={handleSaveAll} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
          <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="email">E-posta</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
        </TabsList>

        {/* Site Settings */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Ayarları
              </CardTitle>
              <CardDescription>Genel site ayarlarını yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Site Adı</Label>
                    <Input
                      value={settings.site.name}
                      onChange={(e) => updateSetting("site", "name", e.target.value)}
                      placeholder="SHINEST İç Mimarlık"
                    />
                  </div>
                  <div>
                    <Label>Site Açıklaması</Label>
                    <Textarea
                      value={settings.site.description}
                      onChange={(e) => updateSetting("site", "description", e.target.value)}
                      placeholder="Site açıklaması"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Varsayılan Dil</Label>
                    <select
                      value={settings.site.language}
                      onChange={(e) => updateSetting("site", "language", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <Label>Zaman Dilimi</Label>
                    <select
                      value={settings.site.timezone}
                      onChange={(e) => updateSetting("site", "timezone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Europe/Istanbul">Europe/Istanbul</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Site Logosu</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <img
                        src={settings.site.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="mx-auto h-16 w-auto mb-4"
                      />
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Logo yüklemek için tıklayın</p>
                      <Button variant="outline" size="sm">
                        Logo Seç
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <img
                        src={settings.site.favicon || "/favicon.ico"}
                        alt="Favicon"
                        className="mx-auto h-8 w-8 mb-2"
                      />
                      <Button variant="outline" size="sm">
                        Favicon Seç
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("site")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Site Ayarları Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                İletişim Bilgileri
              </CardTitle>
              <CardDescription>İletişim bilgilerini yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-posta
                    </Label>
                    <Input
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => updateSetting("contact", "email", e.target.value)}
                      placeholder="iletisim@shinesticmimarlik.com"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefon
                    </Label>
                    <Input
                      value={settings.contact.phone}
                      onChange={(e) => updateSetting("contact", "phone", e.target.value)}
                      placeholder="0 552 179 87 35"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Adres
                    </Label>
                    <Textarea
                      value={settings.contact.address}
                      onChange={(e) => updateSetting("contact", "address", e.target.value)}
                      placeholder="İzmir, Türkiye"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Çalışma Saatleri - Hafta İçi</Label>
                    <Input
                      value={settings.contact.workingHours.weekdays}
                      onChange={(e) => updateNestedSetting("contact", "workingHours", "weekdays", e.target.value)}
                      placeholder="Pazartesi - Cuma: 09:00 - 18:00"
                    />
                  </div>
                  <div>
                    <Label>Çalışma Saatleri - Cumartesi</Label>
                    <Input
                      value={settings.contact.workingHours.saturday}
                      onChange={(e) => updateNestedSetting("contact", "workingHours", "saturday", e.target.value)}
                      placeholder="Cumartesi: 10:00 - 16:00"
                    />
                  </div>
                  <div>
                    <Label>Çalışma Saatleri - Pazar</Label>
                    <Input
                      value={settings.contact.workingHours.sunday}
                      onChange={(e) => updateNestedSetting("contact", "workingHours", "sunday", e.target.value)}
                      placeholder="Pazar: Kapalı"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("contact")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  İletişim Bilgileri Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Hesapları</CardTitle>
              <CardDescription>Sosyal medya hesap linklerini yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Label>
                    <Input
                      value={settings.social.instagram}
                      onChange={(e) => updateSetting("social", "instagram", e.target.value)}
                      placeholder="https://www.instagram.com/icm.selin"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </Label>
                    <Input
                      value={settings.social.youtube}
                      onChange={(e) => updateSetting("social", "youtube", e.target.value)}
                      placeholder="https://www.youtube.com/@ShinestIcMimarlikk"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Label>
                    <Input
                      value={settings.social.linkedin}
                      onChange={(e) => updateSetting("social", "linkedin", e.target.value)}
                      placeholder="https://www.linkedin.com/company/shinesticmimarlik"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      value={settings.social.facebook}
                      onChange={(e) => updateSetting("social", "facebook", e.target.value)}
                      placeholder="https://www.facebook.com/..."
                    />
                  </div>
                  <div>
                    <Label>Twitter</Label>
                    <Input
                      value={settings.social.twitter}
                      onChange={(e) => updateSetting("social", "twitter", e.target.value)}
                      placeholder="https://www.twitter.com/..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("social")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Sosyal Medya Kaydet
                </Button>
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
              <div className="space-y-4">
                <div>
                  <Label>Meta Başlık</Label>
                  <Input
                    value={settings.seo.metaTitle}
                    onChange={(e) => updateSetting("seo", "metaTitle", e.target.value)}
                    placeholder="SHINEST İç Mimarlık - Profesyonel İç Mimarlık Hizmetleri"
                  />
                  <p className="text-xs text-gray-500 mt-1">Önerilen uzunluk: 50-60 karakter</p>
                </div>
                <div>
                  <Label>Meta Açıklama</Label>
                  <Textarea
                    value={settings.seo.metaDescription}
                    onChange={(e) => updateSetting("seo", "metaDescription", e.target.value)}
                    placeholder="Modern ve fonksiyonel tasarımlarla yaşam alanlarınızı dönüştürüyoruz..."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Önerilen uzunluk: 150-160 karakter</p>
                </div>
                <div>
                  <Label>Anahtar Kelimeler</Label>
                  <Input
                    value={settings.seo.keywords}
                    onChange={(e) => updateSetting("seo", "keywords", e.target.value)}
                    placeholder="iç mimarlık, tasarım, dekorasyon, mimarlık, İzmir"
                  />
                  <p className="text-xs text-gray-500 mt-1">Virgülle ayırarak yazın</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Google Analytics ID</Label>
                    <Input
                      value={settings.seo.googleAnalytics}
                      onChange={(e) => updateSetting("seo", "googleAnalytics", e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label>Google Tag Manager ID</Label>
                    <Input
                      value={settings.seo.googleTagManager}
                      onChange={(e) => updateSetting("seo", "googleTagManager", e.target.value)}
                      placeholder="GTM-XXXXXXX"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("seo")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  SEO Ayarları Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>E-posta Ayarları</CardTitle>
              <CardDescription>SMTP ve e-posta ayarlarını yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>SMTP Host</Label>
                    <Input
                      value={settings.email.smtpHost}
                      onChange={(e) => updateSetting("email", "smtpHost", e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label>SMTP Port</Label>
                    <Input
                      value={settings.email.smtpPort}
                      onChange={(e) => updateSetting("email", "smtpPort", e.target.value)}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label>SMTP Kullanıcı Adı</Label>
                    <Input
                      value={settings.email.smtpUser}
                      onChange={(e) => updateSetting("email", "smtpUser", e.target.value)}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>SMTP Şifre</Label>
                    <Input
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={(e) => updateSetting("email", "smtpPassword", e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label>Gönderen E-posta</Label>
                    <Input
                      value={settings.email.fromEmail}
                      onChange={(e) => updateSetting("email", "fromEmail", e.target.value)}
                      placeholder="noreply@shinesticmimarlik.com"
                    />
                  </div>
                  <div>
                    <Label>Gönderen Adı</Label>
                    <Input
                      value={settings.email.fromName}
                      onChange={(e) => updateSetting("email", "fromName", e.target.value)}
                      placeholder="SHINEST İç Mimarlık"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("email")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  E-posta Ayarları Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>Güvenlik ve erişim ayarlarını yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>İki Faktörlü Kimlik Doğrulama</Label>
                    <p className="text-sm text-gray-500">Hesap güvenliği için ek koruma katmanı</p>
                  </div>
                  <Switch
                    checked={settings.security.enableTwoFactor}
                    onCheckedChange={(checked) => updateSetting("security", "enableTwoFactor", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>CAPTCHA Koruması</Label>
                    <p className="text-sm text-gray-500">Otomatik saldırılara karşı koruma</p>
                  </div>
                  <Switch
                    checked={settings.security.enableCaptcha}
                    onCheckedChange={(checked) => updateSetting("security", "enableCaptcha", checked)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Oturum Zaman Aşımı (dakika)</Label>
                    <Input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting("security", "sessionTimeout", Number.parseInt(e.target.value))}
                      placeholder="60"
                    />
                  </div>
                  <div>
                    <Label>Maksimum Giriş Denemesi</Label>
                    <Input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("security")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Güvenlik Ayarları Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
