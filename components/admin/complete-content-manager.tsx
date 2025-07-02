"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload } from "lucide-react"

interface CompleteContentManagerProps {
  initialContent: any
  onSave: (section: string, content: any) => Promise<void>
}

export default function CompleteContentManager({ initialContent, onSave }: CompleteContentManagerProps) {
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Tüm site içerikleri
  const [siteContent, setSiteContent] = useState({
    // Ana sayfa bölümleri
    hero: {
      title: {
        tr: "SHINEST",
        en: "SHINEST",
        de: "SHINEST",
        fr: "SHINEST",
        it: "SHINEST",
        ru: "SHINEST",
        ar: "SHINEST",
      },
      subtitle: {
        tr: "İÇ MİMARLIK",
        en: "INTERIOR ARCHITECTURE",
        de: "INNENARCHITEKTUR",
        fr: "ARCHITECTURE INTÉRIEURE",
        it: "ARCHITETTURA D'INTERNI",
        ru: "ДИЗАЙН ИНТЕРЬЕРА",
        ar: "التصميم الداخلي",
      },
      description: {
        tr: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
        en: "We turn your dream spaces into reality",
      },
      backgroundImage: "/images/hero-image.png",
      buttonText: { tr: "Keşfet", en: "Explore" },
      buttonLink: "/projects",
      showAnimation: true,
    },
    textSection: {
      mainText1: {
        tr: "MEKANLARINIZ",
        en: "YOUR SPACES",
        de: "IHRE RÄUME",
        fr: "VOS ESPACES",
        it: "I VOSTRI SPAZI",
        ru: "ВАШИ ПРОСТРАНСТВА",
        ar: "مساحاتكم",
      },
      mainText2: {
        tr: "YAŞAMINIZA",
        en: "BRING LIGHT TO",
        de: "BRINGEN LICHT IN",
        fr: "APPORTENT DE LA LUMIÈRE À",
        it: "PORTANO LUCE ALLA",
        ru: "ПРИНОСЯТ СВЕТ В",
        ar: "تجلب النور إلى",
      },
      handwritingText: {
        tr: "ışık tutar!",
        en: "your life!",
        de: "Ihr Leben!",
        fr: "votre vie!",
        it: "la vostra vita!",
        ru: "вашу жизнь!",
        ar: "حياتكم!",
      },
      description: {
        tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz.",
        en: "As SHINEST Interior Architecture, we transform your living spaces into works of art. With our modern design approach and experienced team, we carefully bring each project to life.",
      },
      backgroundColor: "#ffffff",
    },
    gallerySection: {
      title: { tr: "Projelerimizden", en: "From Our Projects" },
      images: [
        { id: 1, url: "/images/gallery-1.png", alt: { tr: "Modern Salon", en: "Modern Living Room" }, order: 1 },
        { id: 2, url: "/images/gallery-2.png", alt: { tr: "Lüks Banyo", en: "Luxury Bathroom" }, order: 2 },
        { id: 3, url: "/images/gallery-3.png", alt: { tr: "Kafe Tasarımı", en: "Cafe Design" }, order: 3 },
        { id: 4, url: "/images/gallery-4.png", alt: { tr: "Yatak Odası", en: "Bedroom" }, order: 4 },
        { id: 5, url: "/images/gallery-5.png", alt: { tr: "Mutfak Tasarımı", en: "Kitchen Design" }, order: 5 },
      ],
    },
    aboutSection: {
      title: { tr: "Hakkımızda", en: "About Us" },
      subtitle: { tr: "Tasarım Felsefemiz", en: "Our Design Philosophy" },
      description: {
        tr: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır.",
        en: "We transform your living spaces into works of art. Each project tells a unique story that turns our clients' dreams into reality.",
      },
      newsletterTitle: { tr: "İlham Bülteni", en: "Inspiration Newsletter" },
      newsletterDescription: {
        tr: "Yeni projeler, tasarım trendleri ve özel içerikler için bültenimize katılın",
        en: "Join our newsletter for new projects, design trends and exclusive content",
      },
      showNewsletter: true,
    },
    servicesSection: {
      title: { tr: "Hizmetlerimiz", en: "Our Services" },
      subtitle: {
        tr: "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
        en: "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers.",
      },
      services: [
        {
          id: 1,
          title: { tr: "Danışmanlık", en: "Consulting" },
          description: {
            tr: "Profesyonel iç mimarlık danışmanlığı hizmeti",
            en: "Professional interior architecture consulting service",
          },
          image: "/images/consulting-service.png",
        },
        {
          id: 2,
          title: { tr: "Tasarım", en: "Design" },
          description: { tr: "Yaratıcı ve işlevsel tasarım çözümleri", en: "Creative and functional design solutions" },
          image: "/images/design-service.png",
        },
        {
          id: 3,
          title: { tr: "Uygulama", en: "Implementation" },
          description: { tr: "Tasarımdan gerçeğe dönüşüm süreci", en: "Design to reality transformation process" },
          image: "/images/implementation-service.png",
        },
      ],
      quoteButtonText: { tr: "Teklif Al", en: "Get Quote" },
    },
    projectsSection: {
      title: { tr: "Projelerimiz", en: "Our Projects" },
      description: {
        tr: "Gerçekleştirdiğimiz projelerden örnekler ve tasarım hikayelerimiz",
        en: "Examples from our completed projects and our design stories",
      },
      displayCount: 6,
      buttonText: { tr: "Tüm Projeler", en: "All Projects" },
      show: true,
    },
    instagramSection: {
      title: { tr: "Instagram'da Bizi Takip Edin", en: "Follow Us on Instagram" },
      description: {
        tr: "En son projelerimizi ve tasarım ilhamlarımızı Instagram'da paylaşıyoruz.",
        en: "We share our latest projects and design inspirations on Instagram.",
      },
      profileUrl: "https://www.instagram.com/icm.selin",
      buttonText: { tr: "Takip Et", en: "Follow" },
      show: true,
    },
    secondGallery: {
      title: { tr: "Tasarım Süreci", en: "Design Process" },
      images: [
        {
          id: 1,
          url: "/images/second-gallery-1.png",
          alt: { tr: "Tasarım Danışmanlığı", en: "Design Consultation" },
          order: 1,
        },
        {
          id: 2,
          url: "/images/second-gallery-2.png",
          alt: { tr: "Proje Uygulaması", en: "Project Implementation" },
          order: 2,
        },
      ],
    },
    // Header & Footer
    header: {
      logo: "/images/logo1.png",
      logoWhite: "/images/logo2.png",
      navigation: {
        home: {
          tr: "Ana Sayfa",
          en: "Home",
          de: "Startseite",
          fr: "Accueil",
          it: "Home",
          ru: "Главная",
          ar: "الرئيسية",
        },
        about: {
          tr: "Hakkımızda",
          en: "About",
          de: "Über uns",
          fr: "À propos",
          it: "Chi siamo",
          ru: "О нас",
          ar: "من نحن",
        },
        services: {
          tr: "Hizmetler",
          en: "Services",
          de: "Dienstleistungen",
          fr: "Services",
          it: "Servizi",
          ru: "Услуги",
          ar: "الخدمات",
        },
        projects: {
          tr: "Projeler",
          en: "Projects",
          de: "Projekte",
          fr: "Projets",
          it: "Progetti",
          ru: "Проекты",
          ar: "المشاريع",
        },
        blog: { tr: "Blog", en: "Blog", de: "Blog", fr: "Blog", it: "Blog", ru: "Блог", ar: "المدونة" },
        contact: {
          tr: "İletişim",
          en: "Contact",
          de: "Kontakt",
          fr: "Contact",
          it: "Contatto",
          ru: "Контакты",
          ar: "اتصل بنا",
        },
      },
      socialMedia: {
        instagram: "https://www.instagram.com/icm.selin",
        youtube: "https://www.youtube.com/@ShinestIcMimarlikk",
        linkedin: "https://www.linkedin.com/company/shinesticmimarlik",
      },
    },
    footer: {
      companyName: { tr: "SHINEST İÇ MİMARLIK", en: "SHINEST INTERIOR ARCHITECTURE" },
      description: {
        tr: "Modern ve fonksiyonel tasarımlarla yaşam alanlarınızı dönüştürüyoruz.",
        en: "We transform your living spaces with modern and functional designs.",
      },
      contact: {
        email: "iletisim@shinesticmimarlik.com",
        phone: "0 552 179 87 35",
        location: { tr: "İzmir, Türkiye", en: "Izmir, Turkey" },
      },
      quickLinks: { tr: "Hızlı Linkler", en: "Quick Links" },
      servicesTitle: { tr: "Hizmetlerimiz", en: "Our Services" },
      contactTitle: { tr: "İletişim", en: "Contact" },
      copyright: "© 2025 SHINEST İÇ MİMARLIK. Tüm hakları saklıdır.",
      designCredit: "Tasarım ve Yazılım: www.rettocreative.com",
    },
    // Sayfa içerikleri
    pages: {
      services: {
        title: { tr: "Hizmetlerimiz", en: "Our Services" },
        subtitle: { tr: "Profesyonel İç Mimarlık Hizmetleri", en: "Professional Interior Architecture Services" },
        description: {
          tr: "SHINEST İç Mimarlık olarak, her projeye özel yaklaşım sergileyerek müşterilerimizin hayallerini gerçeğe dönüştürüyoruz.",
          en: "As SHINEST Interior Architecture, we turn our customers' dreams into reality by taking a special approach to each project.",
        },
        heroImage: "/images/services-hero.png",
        sections: [
          {
            id: 1,
            title: { tr: "Neden SHINEST?", en: "Why SHINEST?" },
            content: {
              tr: "Uzman ekibimiz, modern tasarım anlayışı ve müşteri odaklı yaklaşımımızla fark yaratıyoruz.",
              en: "We make a difference with our expert team, modern design approach and customer-oriented approach.",
            },
            image: "/images/why-shinest.png",
          },
        ],
        cta: {
          title: { tr: "Projenizi Konuşalım", en: "Let's Discuss Your Project" },
          description: {
            tr: "Hayalinizdeki mekanı birlikte tasarlayalım",
            en: "Let's design your dream space together",
          },
          buttonText: { tr: "İletişime Geç", en: "Get In Touch" },
        },
      },
      about: {
        title: { tr: "Hakkımızda", en: "About Us" },
        subtitle: { tr: "SHINEST İç Mimarlık", en: "SHINEST Interior Architecture" },
        description: {
          tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürme misyonuyla yola çıktık.",
          en: "As SHINEST Interior Architecture, we set out with the mission of transforming your living spaces into works of art.",
        },
        heroImage: "/images/about-hero.png",
        mainContent: {
          tr: "Shinest İç Mimarlık olarak yenilikçi ve fonksiyonel iç mekan çözümleri sunarak, danışanlarımızın yaşam alanlarınıza değer katmayı hedefleyen bir tasarım firmasıyız.",
          en: "As Shinest Interior Architecture, we are a design company that aims to add value to our clients' living spaces by offering innovative and functional interior solutions.",
        },
        vision: {
          title: { tr: "Vizyonumuz", en: "Our Vision" },
          content: {
            tr: "İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak, her projede mükemmelliği hedefleyerek sektörde fark yaratan bir marka olmak.",
            en: "To be a pioneer with innovative and sustainable solutions in the field of interior architecture, to be a brand that makes a difference in the sector by aiming for excellence in every project.",
          },
        },
        mission: {
          title: { tr: "Misyonumuz", en: "Our Mission" },
          content: {
            tr: "Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik mekanlar tasarlamak.",
            en: "To turn our customers' dreams into reality, to design functional and aesthetic spaces that improve their quality of life.",
          },
        },
        values: {
          title: { tr: "Değerlerimiz", en: "Our Values" },
          items: [
            {
              icon: "Lightbulb",
              title: { tr: "Yenilikçilik", en: "Innovation" },
              description: {
                tr: "Sürekli gelişen teknoloji ve tasarım trendlerini takip ederek yenilikçi çözümler sunuyoruz.",
                en: "We offer innovative solutions by following constantly evolving technology and design trends.",
              },
            },
            {
              icon: "Award",
              title: { tr: "Kalite", en: "Quality" },
              description: {
                tr: "Her projede en yüksek kalite standartlarını uygulayarak mükemmel sonuçlar elde ediyoruz.",
                en: "We achieve excellent results by applying the highest quality standards in every project.",
              },
            },
            {
              icon: "Leaf",
              title: { tr: "Sürdürülebilirlik", en: "Sustainability" },
              description: {
                tr: "Çevre dostu malzemeler ve sürdürülebilir tasarım anlayışıyla geleceği düşünüyoruz.",
                en: "We think about the future with environmentally friendly materials and sustainable design approach.",
              },
            },
          ],
        },
        team: {
          title: { tr: "Ekibimiz", en: "Our Team" },
          description: {
            tr: "Deneyimli ve yaratıcı ekibimizle projelerinizi hayata geçiriyoruz.",
            en: "We bring your projects to life with our experienced and creative team.",
          },
          members: [
            {
              id: 1,
              name: "Selin Yılmaz",
              position: { tr: "Kurucu & Baş Tasarımcı", en: "Founder & Lead Designer" },
              image: "/images/team-selin.png",
              bio: {
                tr: "10 yıllık deneyimi ile iç mimarlık alanında uzman.",
                en: "Expert in interior architecture with 10 years of experience.",
              },
            },
          ],
        },
        cta: {
          title: { tr: "Birlikte Çalışalım", en: "Let's Work Together" },
          description: {
            tr: "Hayalinizdeki mekanı birlikte tasarlayalım. SHINEST İç Mimarlık olarak, size özel çözümler sunmak için buradayız.",
            en: "Let's design your dream space together. As SHINEST Interior Architecture, we are here to offer you special solutions.",
          },
          buttonText: { tr: "İletişime Geç", en: "Get In Touch" },
        },
      },
      contact: {
        title: { tr: "İletişim", en: "Contact" },
        subtitle: { tr: "Bizimle İletişime Geçin", en: "Get In Touch With Us" },
        description: {
          tr: "Projeleriniz hakkında konuşmak ve size nasıl yardımcı olabileceğimizi öğrenmek için bizimle iletişime geçin.",
          en: "Contact us to discuss your projects and learn how we can help you.",
        },
        heroImage: "/images/contact-hero.png",
        contactInfo: {
          email: {
            title: { tr: "E-posta", en: "Email" },
            value: "iletisim@shinesticmimarlik.com",
            description: {
              tr: "Projeleriniz hakkında detaylı bilgi almak için",
              en: "For detailed information about your projects",
            },
          },
          phone: {
            title: { tr: "Telefon", en: "Phone" },
            value: "0 552 179 87 35",
            description: {
              tr: "Hızlı iletişim için bizi arayın",
              en: "Call us for quick communication",
            },
          },
          location: {
            title: { tr: "Şehir", en: "City" },
            value: { tr: "İzmir", en: "Izmir" },
            description: {
              tr: "Türkiye'nin en güzel şehirlerinden birinde hizmet veriyoruz",
              en: "We serve in one of the most beautiful cities of Turkey",
            },
          },
          workingHours: {
            title: { tr: "Çalışma Saatleri", en: "Working Hours" },
            weekdays: { tr: "Pazartesi - Cuma: 09:00 - 18:00", en: "Monday - Friday: 09:00 - 18:00" },
            weekend: { tr: "Cumartesi: 10:00 - 16:00", en: "Saturday: 10:00 - 16:00" },
            sunday: { tr: "Pazar: Kapalı", en: "Sunday: Closed" },
          },
        },
        form: {
          title: { tr: "Mesaj Gönderin", en: "Send Message" },
          description: {
            tr: "Formu doldurarak bizimle iletişime geçebilirsiniz",
            en: "You can contact us by filling out the form",
          },
          fields: {
            name: { tr: "Ad Soyad", en: "Full Name" },
            email: { tr: "E-posta", en: "Email" },
            phone: { tr: "Telefon", en: "Phone" },
            subject: { tr: "Konu", en: "Subject" },
            message: { tr: "Mesaj", en: "Message" },
            submit: { tr: "Gönder", en: "Send" },
          },
        },
        map: {
          title: { tr: "Konum", en: "Location" },
          description: {
            tr: "İzmir merkezinde yer alan ofisimizde sizleri ağırlamaktan mutluluk duyarız",
            en: "We would be happy to welcome you to our office located in the center of Izmir",
          },
          embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.5...",
        },
      },
      blog: {
        title: { tr: "Blog", en: "Blog" },
        subtitle: { tr: "Tasarım İlhamı", en: "Design Inspiration" },
        description: {
          tr: "İç mimarlık dünyasından son trendler, ipuçları ve projelerimizden ilham verici hikayeler.",
          en: "Latest trends from the world of interior architecture, tips and inspiring stories from our projects.",
        },
        heroImage: "/images/blog-hero.png",
        categories: [
          { id: 1, name: { tr: "Tasarım Trendleri", en: "Design Trends" }, slug: "design-trends" },
          { id: 2, name: { tr: "Proje Hikayeleri", en: "Project Stories" }, slug: "project-stories" },
          { id: 3, name: { tr: "İpuçları", en: "Tips" }, slug: "tips" },
          { id: 4, name: { tr: "Malzeme Rehberi", en: "Material Guide" }, slug: "material-guide" },
        ],
        featured: {
          title: { tr: "Öne Çıkan Yazılar", en: "Featured Posts" },
          description: {
            tr: "En popüler ve güncel içeriklerimizi keşfedin",
            en: "Discover our most popular and current content",
          },
        },
      },
    },
  })

  const availableLanguages = [
    { code: "TR", name: "Türkçe" },
    { code: "EN", name: "English" },
    { code: "DE", name: "Deutsch" },
    { code: "FR", name: "Français" },
    { code: "IT", name: "Italiano" },
    { code: "RU", name: "Русский" },
    { code: "AR", name: "العربية" },
  ]

  const handleSave = async (section: string) => {
    setSaving(true)
    try {
      await onSave(section, siteContent[section])
      // Success feedback
    } catch (error) {
      // Error feedback
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (file: File, section: string, index?: number) => {
    // Handle image upload logic
    const url = URL.createObjectURL(file)
    // Update the appropriate section with new image URL
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tam İçerik Yönetimi</CardTitle>
          <CardDescription>Sitenin tüm içeriklerini tek yerden yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="homepage">Ana Sayfa</TabsTrigger>
              <TabsTrigger value="pages">Sayfalar</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="media">Medya</TabsTrigger>
            </TabsList>

            {/* Ana Sayfa İçerikleri */}
            <TabsContent value="homepage" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hero Bölümü */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Bölümü</CardTitle>
                    <CardDescription>Ana sayfa hero bölümünü düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ana Başlık (TR)</Label>
                      <Input
                        value={siteContent.hero.title.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, title: { ...prev.hero.title, tr: e.target.value } },
                          }))
                        }
                        placeholder="SHINEST"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ana Başlık (EN)</Label>
                      <Input
                        value={siteContent.hero.title.en}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, title: { ...prev.hero.title, en: e.target.value } },
                          }))
                        }
                        placeholder="SHINEST"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hero Görseli</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="text-center">
                          <img
                            src={siteContent.hero.backgroundImage || "/placeholder.svg"}
                            alt="Hero"
                            className="mx-auto h-24 w-auto object-cover rounded mb-2"
                          />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "hero")
                            }}
                            className="max-w-xs"
                          />
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleSave("hero")} disabled={saving} className="w-full">
                      {saving ? "Kaydediliyor..." : "Hero Kaydet"}
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Metin Bölümü */}
                <Card>
                  <CardHeader>
                    <CardTitle>Büyük Metin Bölümü</CardTitle>
                    <CardDescription>Ana sayfa metin bölümünü düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ana Metin 1 (TR)</Label>
                      <Input
                        value={siteContent.textSection.mainText1.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            textSection: {
                              ...prev.textSection,
                              mainText1: { ...prev.textSection.mainText1, tr: e.target.value },
                            },
                          }))
                        }
                        placeholder="MEKANLARINIZ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ana Metin 2 (TR)</Label>
                      <Input
                        value={siteContent.textSection.mainText2.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            textSection: {
                              ...prev.textSection,
                              mainText2: { ...prev.textSection.mainText2, tr: e.target.value },
                            },
                          }))
                        }
                        placeholder="YAŞAMINIZA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>El Yazısı Metin (TR)</Label>
                      <Input
                        value={siteContent.textSection.handwritingText.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            textSection: {
                              ...prev.textSection,
                              handwritingText: { ...prev.textSection.handwritingText, tr: e.target.value },
                            },
                          }))
                        }
                        placeholder="ışık tutar!"
                      />
                    </div>
                    <Button onClick={() => handleSave("textSection")} disabled={saving} className="w-full">
                      {saving ? "Kaydediliyor..." : "Metin Bölümü Kaydet"}
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Galeri Bölümü */}
              <Card>
                <CardHeader>
                  <CardTitle>Ana Galeri</CardTitle>
                  <CardDescription>Scroll galeri görsellerini yönetin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {siteContent.gallerySection.images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt.tr}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "gallery", index)
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => handleSave("gallerySection")} disabled={saving} className="w-full mt-4">
                    {saving ? "Kaydediliyor..." : "Galeri Kaydet"}
                    <Save className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sayfalar İçerikleri */}
            <TabsContent value="pages" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hizmetler Sayfası */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hizmetler Sayfası</CardTitle>
                    <CardDescription>Hizmetler sayfası içeriklerini düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Sayfa Başlığı (TR)</Label>
                      <Input
                        value={siteContent.pages.services.title.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            pages: {
                              ...prev.pages,
                              services: {
                                ...prev.pages.services,
                                title: { ...prev.pages.services.title, tr: e.target.value },
                              },
                            },
                          }))
                        }
                        placeholder="Hizmetlerimiz"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sayfa Açıklaması (TR)</Label>
                      <Textarea
                        value={siteContent.pages.services.description.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            pages: {
                              ...prev.pages,
                              services: {
                                ...prev.pages.services,
                                description: { ...prev.pages.services.description, tr: e.target.value },
                              },
                            },
                          }))
                        }
                        rows={3}
                        placeholder="Hizmetler sayfası açıklaması..."
                      />
                    </div>
                    <Button onClick={() => handleSave("servicesPage")} disabled={saving} className="w-full">
                      {saving ? "Kaydediliyor..." : "Hizmetler Sayfası Kaydet"}
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Hakkımızda Sayfası */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hakkımızda Sayfası</CardTitle>
                    <CardDescription>Hakkımızda sayfası içeriklerini düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Sayfa Başlığı (TR)</Label>
                      <Input
                        value={siteContent.pages.about.title.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            pages: {
                              ...prev.pages,
                              about: {
                                ...prev.pages.about,
                                title: { ...prev.pages.about.title, tr: e.target.value },
                              },
                            },
                          }))
                        }
                        placeholder="Hakkımızda"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ana İçerik (TR)</Label>
                      <Textarea
                        value={siteContent.pages.about.mainContent.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            pages: {
                              ...prev.pages,
                              about: {
                                ...prev.pages.about,
                                mainContent: { ...prev.pages.about.mainContent, tr: e.target.value },
                              },
                            },
                          }))
                        }
                        rows={4}
                        placeholder="Hakkımızda ana içerik..."
                      />
                    </div>
                    <Button onClick={() => handleSave("aboutPage")} disabled={saving} className="w-full">
                      {saving ? "Kaydediliyor..." : "Hakkımızda Sayfası Kaydet"}
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Global İçerikler */}
            <TabsContent value="global" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Header */}
                <Card>
                  <CardHeader>
                    <CardTitle>Header İçerikleri</CardTitle>
                    <CardDescription>Site header'ını düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="text-center">
                          <img
                            src={siteContent.header.logo || "/placeholder.svg"}
                            alt="Logo"
                            className="mx-auto h-12 w-auto mb-2"
                          />
                          <Input type="file" accept="image/*" className="max-w-xs" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Instagram URL</Label>
                      <Input
                        value={siteContent.header.socialMedia.instagram}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              socialMedia: { ...prev.header.socialMedia, instagram: e.target.value },
                            },
                          }))
                        }
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <Button onClick={() => handleSave("header")} disabled={saving} className="w-full">
                      {saving ? "Kaydediliyor..." : "Header Kaydet"}
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Footer */}
                <Card>
                  <CardHeader>
                    <CardTitle>Footer İçerikleri</CardTitle>
                    <CardDescription>Site footer'ını düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Şirket Adı (TR)</Label>
                      <Input
                        value={siteContent.footer.companyName.tr}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              companyName: { ...prev.footer.companyName, tr: e.target.value },
                            },
                          }))
                        }
                        placeholder="SHINEST İÇ MİMARLIK"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>E-posta</Label>
                      <Input
                        value={siteContent.footer.contact.email}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              contact: { ...prev.footer.contact, email: e.target.value },
                            },
                          }))
                        }
                        placeholder="iletisim@shinesticmimarlik.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <Input
                        value={siteContent.footer.contact.phone}
                        onChange={(e) =>
                          setSiteContent((prev) => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              contact: { ...prev.footer.contact, phone: e.target.value },
                            },
                          }))
                        }
                        placeholder="0 552 179 87 35"
                      />
                    </div>
                    <Button onClick={() => handleSave("footer")} disabled={saving} className="w-full">
                      {saving ? "Kaydediliyor..." : "Footer Kaydet"}
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Medya Yönetimi */}
            <TabsContent value="media" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Medya Kütüphanesi</CardTitle>
                  <CardDescription>Tüm site görsellerini yönetin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Görsel Yükle</h3>
                      <p className="text-gray-600 mb-4">Görselleri buraya sürükleyin veya seçin</p>
                      <Input type="file" accept="image/*" multiple className="max-w-xs" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
