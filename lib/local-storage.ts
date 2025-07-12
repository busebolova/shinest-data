interface LocalProject {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: string
  location: string
  year: string
  status: "published" | "draft" | "archived"
  featured: boolean
  images: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

interface LocalBlogPost {
  id: string
  title: { tr: string; en: string }
  content: { tr: string; en: string }
  excerpt: { tr: string; en: string }
  image: string
  status: "published" | "draft"
  publishedAt: string
  createdAt: string
  updatedAt: string
}

interface LocalPageContent {
  sections: Array<{
    id: string
    type: string
    title: string
    content: any
    order: number
  }>
}

interface LocalAdminSettings {
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

class LocalStorageManager {
  private projects: LocalProject[] = [
    {
      id: "1",
      title: { tr: "Modern Banyo Tasarımı", en: "Modern Bathroom Design" },
      description: { tr: "Lüks ve modern banyo tasarımı projesi", en: "Luxury modern bathroom design project" },
      category: "Banyo",
      location: "İstanbul",
      year: "2024",
      status: "published",
      featured: true,
      images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png", "/images/bathroom-design-3.png"],
      slug: "modern-banyo-tasarimi",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: { tr: "Kafe İç Mekan Tasarımı", en: "Cafe Interior Design" },
      description: { tr: "Sıcak ve davetkar kafe iç mekan tasarımı", en: "Warm and inviting cafe interior design" },
      category: "Ticari",
      location: "Ankara",
      year: "2024",
      status: "published",
      featured: false,
      images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
      slug: "kafe-ic-mekan-tasarimi",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "3",
      title: { tr: "Kış Bahçesi Tasarımı", en: "Winter Garden Design" },
      description: {
        tr: "Doğal ışık alan modern kış bahçesi tasarımı",
        en: "Modern winter garden design with natural light",
      },
      category: "Konut",
      location: "İzmir",
      year: "2024",
      status: "published",
      featured: true,
      images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
      slug: "kis-bahcesi-tasarimi",
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-05T10:00:00Z",
    },
    {
      id: "4",
      title: { tr: "Oturma Odası Tasarımı", en: "Living Room Design" },
      description: { tr: "Modern ve konforlu oturma odası tasarımı", en: "Modern and comfortable living room design" },
      category: "Konut",
      location: "Bursa",
      year: "2024",
      status: "published",
      featured: false,
      images: ["/images/living-room-design-1.png", "/images/living-room-design-2.png"],
      slug: "oturma-odasi-tasarimi",
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
    },
    {
      id: "5",
      title: { tr: "Yatak Odası Tasarımı", en: "Bedroom Design" },
      description: { tr: "Huzurlu ve şık yatak odası tasarımı", en: "Peaceful and elegant bedroom design" },
      category: "Konut",
      location: "Antalya",
      year: "2023",
      status: "published",
      featured: true,
      images: [
        "/images/bedroom-design-1.png",
        "/images/bedroom-design-2.png",
        "/images/bedroom-design-3.png",
        "/images/bedroom-design-4.png",
      ],
      slug: "yatak-odasi-tasarimi",
      createdAt: "2023-12-20T10:00:00Z",
      updatedAt: "2023-12-20T10:00:00Z",
    },
    {
      id: "6",
      title: { tr: "Polonya Daire Projesi", en: "Poland Apartment Project" },
      description: {
        tr: "Polonya'da modern daire iç mekan tasarımı",
        en: "Modern apartment interior design in Poland",
      },
      category: "Konut",
      location: "Polonya",
      year: "2023",
      status: "published",
      featured: true,
      images: [
        "/images/poland-apartment-1.png",
        "/images/poland-apartment-2.png",
        "/images/poland-apartment-3.png",
        "/images/poland-apartment-4.png",
        "/images/poland-apartment-5.png",
        "/images/poland-apartment-6.png",
        "/images/poland-apartment-7.png",
        "/images/poland-apartment-8.png",
        "/images/poland-apartment-9.png",
        "/images/poland-apartment-10.png",
      ],
      slug: "polonya-daire-projesi",
      createdAt: "2023-11-15T10:00:00Z",
      updatedAt: "2023-11-15T10:00:00Z",
    },
  ]

  private blogPosts: LocalBlogPost[] = [
    {
      id: "1",
      title: { tr: "2024 İç Mimarlık Trendleri", en: "2024 Interior Design Trends" },
      content: {
        tr: "2024 yılında iç mimarlık dünyasında öne çıkan trendler ve yenilikler hakkında detaylı bilgiler...",
        en: "Detailed information about the trends and innovations that stand out in the interior design world in 2024...",
      },
      excerpt: {
        tr: "Bu yıl öne çıkan tasarım trendleri ve yenilikleri keşfedin",
        en: "Discover the design trends and innovations that stand out this year",
      },
      image: "/modern-interior-2024.png",
      status: "published",
      publishedAt: "2024-01-15T10:00:00Z",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: { tr: "Küçük Mekanlar İçin Tasarım İpuçları", en: "Design Tips for Small Spaces" },
      content: {
        tr: "Küçük mekanları daha büyük ve fonksiyonel göstermek için pratik tasarım önerileri...",
        en: "Practical design suggestions to make small spaces look bigger and more functional...",
      },
      excerpt: {
        tr: "Küçük mekanları maksimum verimlilikle kullanmanın yolları",
        en: "Ways to use small spaces with maximum efficiency",
      },
      image: "/small-space-interior.png",
      status: "published",
      publishedAt: "2024-01-10T10:00:00Z",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
  ]

  // This structure should match what ContentEditor expects
  private pageContents: { [key: string]: LocalPageContent } = {
    home: {
      sections: [
        {
          id: "hero-home",
          type: "hero",
          title: "Ana Sayfa Hero",
          content: {
            title: { tr: "SHINEST", en: "SHINEST" },
            subtitle: { tr: "İÇ MİMARLIK", en: "INTERIOR ARCHITECTURE" },
            description: {
              tr: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
              en: "We turn your dream spaces into reality",
            },
            buttonText: { tr: "Keşfet", en: "Explore" },
            backgroundImage: "/images/hero-image.png",
            showAnimation: true,
            isVisible: true,
          },
          order: 0,
        },
        {
          id: "text-home",
          type: "text",
          title: "Büyük Metin Bölümü",
          content: {
            mainText1: { tr: "MEKANLARINIZ", en: "YOUR SPACES" },
            mainText2: { tr: "YAŞAMINIZA", en: "BRING LIGHT TO" },
            handwritingText: { tr: "ışık tutar!", en: "your life!" },
            description: {
              tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz.",
              en: "As SHINEST Interior Architecture, we transform your living spaces into works of art. With our modern design approach and experienced team, we carefully bring each project to life.",
            },
            isVisible: true,
          },
          order: 1,
        },
        {
          id: "about-home",
          type: "text", // Using text type for about section for simplicity in ContentEditor
          title: "Hakkımızda Bölümü",
          content: {
            title: { tr: "Hakkımızda", en: "About Us" },
            subtitle: { tr: "Tasarım Felsefemiz", en: "Our Design Philosophy" },
            text: {
              tr: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır.",
              en: "We transform your living spaces into works of art. Each project tells a unique story that turns our clients' dreams into reality.",
            },
            isVisible: true,
          },
          order: 2,
        },
        {
          id: "services-home",
          type: "services",
          title: "Hizmetler Bölümü",
          content: {
            title: { tr: "Hizmetlerimiz", en: "Our Services" },
            subtitle: {
              tr: "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
              en: "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers.",
            },
            services: [
              {
                id: "s1",
                title: { tr: "Danışmanlık", en: "Consulting" },
                description: {
                  tr: "Profesyonel iç mimarlık danışmanlığı hizmeti",
                  en: "Professional interior architecture consulting service",
                },
                image: "/images/consulting-service.png",
              },
              {
                id: "s2",
                title: { tr: "Tasarım", en: "Design" },
                description: {
                  tr: "Yaratıcı ve işlevsel tasarım çözümleri",
                  en: "Creative and functional design solutions",
                },
                image: "/images/design-service.png",
              },
              {
                id: "s3",
                title: { tr: "Uygulama", en: "Implementation" },
                description: {
                  tr: "Tasarımdan gerçeğe dönüşüm süreci",
                  en: "Design to reality transformation process",
                },
                image: "/images/implementation-service.png",
              },
            ],
            isVisible: true,
          },
          order: 3,
        },
        {
          id: "gallery-home",
          type: "gallery",
          title: "Galeri Bölümü",
          content: {
            title: { tr: "Projelerimizden", en: "From Our Projects" },
            images: [
              { id: "g1", url: "/images/gallery-1.png", alt: { tr: "Modern Salon", en: "Modern Living Room" } },
              { id: "g2", url: "/images/gallery-2.png", alt: { tr: "Lüks Banyo", en: "Luxury Bathroom" } },
              { id: "g3", url: "/images/gallery-3.png", alt: { tr: "Kafe Tasarımı", en: "Cafe Design" } },
              { id: "g4", url: "/images/gallery-4.png", alt: { tr: "Yatak Odası", en: "Bedroom" } },
              { id: "g5", url: "/images/gallery-5.png", alt: { tr: "Mutfak Tasarımı", en: "Kitchen Design" } },
            ],
            isVisible: true,
          },
          order: 4,
        },
      ],
    },
    about: {
      sections: [
        {
          id: "about-page-main",
          type: "text",
          title: "Hakkımızda Sayfası",
          content: {
            title: { tr: "Hakkımızda", en: "About Us" },
            text: {
              tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz. Müşteri memnuniyeti odaklı çalışarak, estetik ve fonksiyonelliği bir araya getiren benzersiz mekanlar yaratıyoruz.",
              en: "As SHINEST Interior Architecture, we transform your living spaces into works of art. With our modern design approach and experienced team, we carefully bring each project to life. By working with a focus on customer satisfaction, we create unique spaces that combine aesthetics and functionality.",
            },
            isVisible: true,
          },
          order: 0,
        },
      ],
    },
    services: {
      sections: [
        {
          id: "services-page-main",
          type: "services",
          title: "Hizmetler Sayfası",
          content: {
            title: { tr: "Hizmetlerimiz", en: "Our Services" },
            subtitle: {
              tr: "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
              en: "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers.",
            },
            services: [
              {
                id: "s1",
                title: { tr: "Danışmanlık", en: "Consulting" },
                description: {
                  tr: "Profesyonel iç mimarlık danışmanlığı hizmeti",
                  en: "Professional interior architecture consulting service",
                },
                image: "/images/consulting-service.png",
              },
              {
                id: "s2",
                title: { tr: "Tasarım", en: "Design" },
                description: {
                  tr: "Yaratıcı ve işlevsel tasarım çözümleri",
                  en: "Creative and functional design solutions",
                },
                image: "/images/design-service.png",
              },
              {
                id: "s3",
                title: { tr: "Uygulama", en: "Implementation" },
                description: {
                  tr: "Tasarımdan gerçeğe dönüşüm süreci",
                  en: "Design to reality transformation process",
                },
                image: "/images/implementation-service.png",
              },
            ],
            isVisible: true,
          },
          order: 0,
        },
      ],
    },
  }

  private adminSettings: LocalAdminSettings = {
    company: {
      name: "SHINEST İç Mimarlık",
      nameEn: "SHINEST Interior Architecture",
      logo: "/images/shinest-logo.png",
      phone: "+90 555 123 4567",
      email: "info@shinest.com",
      address: "İstanbul, Türkiye",
      addressEn: "Istanbul, Turkey",
    },
    social: {
      instagram: "https://instagram.com/shinest",
      facebook: "https://facebook.com/shinest",
      linkedin: "https://linkedin.com/company/shinest",
      youtube: "https://youtube.com/shinest",
    },
    seo: {
      title: "SHINEST İç Mimarlık - Lüks İç Mekan Tasarımı",
      titleEn: "SHINEST Interior Architecture - Luxury Interior Design",
      description: "Profesyonel iç mimarlık hizmetleri ile yaşam alanlarınızı sanat eserine dönüştürüyoruz.",
      descriptionEn:
        "We transform your living spaces into works of art with professional interior architecture services.",
      keywords: "iç mimarlık, interior design, lüks tasarım, ev dekorasyonu",
      keywordsEn: "interior architecture, luxury design, home decoration, interior design",
    },
    contact: {
      workingHours: "Pazartesi - Cuma: 09:00 - 18:00",
      workingHoursEn: "Monday - Friday: 09:00 - 18:00",
      whatsapp: "+90 555 123 4567",
    },
    security: {
      twoFactorAuth: false,
      captchaEnabled: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
    },
  }

  // Projects
  getProjects(): LocalProject[] {
    // In a real app, you'd load from localStorage if available, otherwise use initial data
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("shinest_projects")
      return storedProjects ? JSON.parse(storedProjects) : [...this.projects]
    }
    return [...this.projects]
  }

  getProject(id: string): LocalProject | null {
    return this.getProjects().find((p) => p.id === id) || null
  }

  createProject(project: Omit<LocalProject, "id" | "createdAt" | "updatedAt" | "slug">): LocalProject {
    const newProject: LocalProject = {
      ...project,
      id: Date.now().toString(),
      slug: this.generateSlug(project.title.tr || project.title.en),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.projects.unshift(newProject)
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_projects", JSON.stringify(this.projects))
    }
    return newProject
  }

  updateProject(id: string, updates: Partial<LocalProject>): LocalProject {
    const index = this.projects.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error("Project not found")
    }

    const updatedProject = {
      ...this.projects[index],
      ...updates,
      slug:
        updates.title?.tr || updates.title?.en
          ? this.generateSlug(updates.title.tr || updates.title.en)
          : this.projects[index].slug,
      updatedAt: new Date().toISOString(),
    }

    this.projects[index] = updatedProject
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_projects", JSON.stringify(this.projects))
    }
    return updatedProject
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter((p) => p.id !== id)
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_projects", JSON.stringify(this.projects))
    }
  }

  // Blog Posts
  getBlogPosts(): LocalBlogPost[] {
    if (typeof window !== "undefined") {
      const storedBlogs = localStorage.getItem("shinest_blogs")
      return storedBlogs ? JSON.parse(storedBlogs) : [...this.blogPosts]
    }
    return [...this.blogPosts]
  }

  getBlogPost(id: string): LocalBlogPost | null {
    return this.getBlogPosts().find((p) => p.id === id) || null
  }

  createBlogPost(post: Omit<LocalBlogPost, "id" | "createdAt" | "updatedAt">): LocalBlogPost {
    const newPost: LocalBlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.blogPosts.unshift(newPost)
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_blogs", JSON.stringify(this.blogPosts))
    }
    return newPost
  }

  updateBlogPost(id: string, updates: Partial<LocalBlogPost>): LocalBlogPost {
    const index = this.blogPosts.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error("Blog post not found")
    }

    const updatedPost = {
      ...this.blogPosts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.blogPosts[index] = updatedPost
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_blogs", JSON.stringify(this.blogPosts))
    }
    return updatedPost
  }

  deleteBlogPost(id: string): void {
    this.blogPosts = this.blogPosts.filter((p) => p.id !== id)
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_blogs", JSON.stringify(this.blogPosts))
    }
  }

  // Page Content
  getPageContent(page: string): LocalPageContent | null {
    if (typeof window !== "undefined") {
      const storedContent = localStorage.getItem(`shinest_page_content_${page}`)
      return storedContent ? JSON.parse(storedContent) : this.pageContents[page] || null
    }
    return this.pageContents[page] || null
  }

  savePageContent(page: string, content: LocalPageContent): void {
    this.pageContents[page] = {
      ...content,
      updatedAt: new Date().toISOString(), // Add updatedAt for consistency
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(`shinest_page_content_${page}`, JSON.stringify(this.pageContents[page]))
    }
  }

  // Admin Settings
  getAdminSettings(): LocalAdminSettings {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("shinest_admin_settings")
      return storedSettings ? JSON.parse(storedSettings) : this.adminSettings
    }
    return this.adminSettings
  }

  saveAdminSettings(settings: LocalAdminSettings): void {
    this.adminSettings = settings
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest_admin_settings", JSON.stringify(this.adminSettings))
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-ğüşöçİı]/g, "") // Remove non-alphanumeric chars except spaces and Turkish chars
      .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single dash
      .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/i/g, "i") // Ensure 'i' is handled correctly if it was capitalized
  }
}

export const localStorageManager = new LocalStorageManager()
