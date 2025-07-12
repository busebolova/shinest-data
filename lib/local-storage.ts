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

export class LocalStorage {
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

  private pageContents: { [key: string]: any } = {
    home: {
      hero: {
        title: "SHINEST",
        subtitle: "İÇ MİMARLIK",
        description: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz",
        image: "/images/hero-image.png",
      },
      bigText: {
        line1: "MEKANLARINIZ",
        line2: "YAŞAMINIZA",
        line3: "IŞIK TUTAR!",
      },
      gallery: {
        images: [
          "/images/gallery-1.png",
          "/images/gallery-2.png",
          "/images/gallery-3.png",
          "/images/gallery-4.png",
          "/images/gallery-5.png",
        ],
      },
      services: {
        title: "Hizmetlerimiz",
        items: [
          {
            title: "Danışmanlık",
            description: "Profesyonel iç mimarlık danışmanlığı",
            image: "/images/consulting-service.png",
          },
          {
            title: "Tasarım",
            description: "Yaratıcı ve fonksiyonel tasarım çözümleri",
            image: "/images/design-service.png",
          },
          {
            title: "Uygulama",
            description: "Tasarımdan uygulamaya kadar tüm süreçler",
            image: "/images/implementation-service.png",
          },
        ],
      },
    },
    about: {
      title: "Hakkımızda",
      description: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz.",
      content: "Modern tasarım anlayışı ile fonksiyonel ve estetik mekanlar yaratıyoruz.",
    },
    services: {
      title: "Hizmetlerimiz",
      description: "Profesyonel iç mimarlık hizmetleri",
      services: [
        {
          title: "Danışmanlık",
          description: "Profesyonel iç mimarlık danışmanlığı",
          image: "/images/consulting-service.png",
        },
        {
          title: "Tasarım",
          description: "Yaratıcı ve fonksiyonel tasarım çözümleri",
          image: "/images/design-service.png",
        },
        {
          title: "Uygulama",
          description: "Tasarımdan uygulamaya kadar tüm süreçler",
          image: "/images/implementation-service.png",
        },
      ],
    },
  }

  // Projects
  getProjects(): LocalProject[] {
    return [...this.projects]
  }

  getProject(id: string): LocalProject | null {
    return this.projects.find((p) => p.id === id) || null
  }

  createProject(project: Omit<LocalProject, "id" | "createdAt" | "updatedAt">): LocalProject {
    const newProject: LocalProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.projects.unshift(newProject)
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
      updatedAt: new Date().toISOString(),
    }

    this.projects[index] = updatedProject
    return updatedProject
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter((p) => p.id !== id)
  }

  // Blog Posts
  getBlogPosts(): LocalBlogPost[] {
    return [...this.blogPosts]
  }

  getBlogPost(id: string): LocalBlogPost | null {
    return this.blogPosts.find((p) => p.id === id) || null
  }

  createBlogPost(post: Omit<LocalBlogPost, "id" | "createdAt" | "updatedAt">): LocalBlogPost {
    const newPost: LocalBlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.blogPosts.unshift(newPost)
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
    return updatedPost
  }

  deleteBlogPost(id: string): void {
    this.blogPosts = this.blogPosts.filter((p) => p.id !== id)
  }

  // Page Content
  getPageContent(page: string): any {
    return this.pageContents[page] || {}
  }

  savePageContent(page: string, content: any): void {
    this.pageContents[page] = {
      ...content,
      updatedAt: new Date().toISOString(),
    }
  }
}

export const localStorage = new LocalStorage()
export type { LocalProject, LocalBlogPost }
