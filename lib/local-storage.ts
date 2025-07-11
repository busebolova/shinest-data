interface LocalStorageData {
  projects: any[]
  blogPosts: any[]
  pageContent: Record<string, any>
  lastUpdated: string
}

class LocalStorage {
  private static isClientSide(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  }

  private static getDefaultData(): LocalStorageData {
    return {
      projects: [
        {
          id: "1",
          title: { tr: "Modern Banyo Tasarımı", en: "Modern Bathroom Design" },
          description: { tr: "Lüks ve modern banyo tasarımı", en: "Luxury modern bathroom design" },
          category: "Banyo",
          location: "İstanbul",
          year: "2024",
          status: "published",
          featured: true,
          images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
          slug: "modern-banyo-tasarimi",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          title: { tr: "Kafe İç Mekan", en: "Cafe Interior" },
          description: { tr: "Sıcak ve davetkar kafe tasarımı", en: "Warm and inviting cafe design" },
          category: "Ticari",
          location: "Ankara",
          year: "2024",
          status: "published",
          featured: false,
          images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
          slug: "kafe-ic-mekan",
          createdAt: "2024-01-10T10:00:00Z",
          updatedAt: "2024-01-10T10:00:00Z",
        },
        {
          id: "3",
          title: { tr: "Kış Bahçesi", en: "Winter Garden" },
          description: { tr: "Doğal ışık alan kış bahçesi tasarımı", en: "Natural light winter garden design" },
          category: "Konut",
          location: "İzmir",
          year: "2024",
          status: "published",
          featured: true,
          images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
          slug: "kis-bahcesi",
          createdAt: "2024-01-05T10:00:00Z",
          updatedAt: "2024-01-05T10:00:00Z",
        },
      ],
      blogPosts: [
        {
          id: "1",
          title: { tr: "2024 İç Mimarlık Trendleri", en: "2024 Interior Design Trends" },
          content: {
            tr: "Bu yılın en popüler iç mimarlık trendleri...",
            en: "This year's most popular interior design trends...",
          },
          excerpt: { tr: "2024 yılında öne çıkan tasarım trendleri", en: "Design trends that stand out in 2024" },
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
            tr: "Küçük mekanları büyük göstermenin yolları...",
            en: "Ways to make small spaces look bigger...",
          },
          excerpt: {
            tr: "Küçük alanları verimli kullanma teknikleri",
            en: "Techniques for efficient use of small areas",
          },
          image: "/small-space-interior.png",
          status: "published",
          publishedAt: "2024-01-10T10:00:00Z",
          createdAt: "2024-01-10T10:00:00Z",
          updatedAt: "2024-01-10T10:00:00Z",
        },
      ],
      pageContent: {
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
          hero: {
            title: "Hakkımızda",
            subtitle: "SHINEST İÇ MİMARLIK",
            description: "Yaratıcılık ve fonksiyonelliği bir araya getiren tasarım anlayışımızla...",
          },
          content: {
            text: "SHINEST İç Mimarlık olarak, her projeyi benzersiz bir sanat eseri olarak görüyoruz...",
          },
        },
        services: {
          hero: {
            title: "Hizmetlerimiz",
            subtitle: "PROFESYONEL ÇÖZÜMLER",
            description: "İhtiyaçlarınıza özel tasarım ve uygulama hizmetleri",
          },
          services: [
            {
              title: "İç Mimarlık Danışmanlığı",
              description: "Uzman ekibimizle profesyonel danışmanlık hizmeti",
              features: ["Mekan analizi", "Tasarım önerileri", "Malzeme seçimi"],
            },
            {
              title: "3D Tasarım ve Görselleştirme",
              description: "Projenizi gerçeğe en yakın şekilde görselleştiriyoruz",
              features: ["3D modelleme", "Fotorealistik render", "Sanal tur"],
            },
            {
              title: "Proje Yönetimi ve Uygulama",
              description: "Tasarımdan uygulamaya kadar tüm süreçleri yönetiyoruz",
              features: ["Proje takibi", "Kalite kontrolü", "Zamanında teslimat"],
            },
          ],
        },
      },
      lastUpdated: new Date().toISOString(),
    }
  }

  static getProjects(): any[] {
    if (!this.isClientSide()) {
      return this.getDefaultData().projects
    }

    try {
      const data = localStorage.getItem("shinest_projects")
      if (data) {
        return JSON.parse(data)
      }
      return this.getDefaultData().projects
    } catch (error) {
      console.error("Error reading projects from localStorage:", error)
      return this.getDefaultData().projects
    }
  }

  static saveProjects(projects: any[]): void {
    if (!this.isClientSide()) {
      console.warn("Cannot save projects on server side")
      return
    }

    try {
      localStorage.setItem("shinest_projects", JSON.stringify(projects))
      localStorage.setItem("shinest_projects_updated", new Date().toISOString())
    } catch (error) {
      console.error("Error saving projects to localStorage:", error)
    }
  }

  static getBlogPosts(): any[] {
    if (!this.isClientSide()) {
      return this.getDefaultData().blogPosts
    }

    try {
      const data = localStorage.getItem("shinest_blog_posts")
      if (data) {
        return JSON.parse(data)
      }
      return this.getDefaultData().blogPosts
    } catch (error) {
      console.error("Error reading blog posts from localStorage:", error)
      return this.getDefaultData().blogPosts
    }
  }

  static saveBlogPosts(posts: any[]): void {
    if (!this.isClientSide()) {
      console.warn("Cannot save blog posts on server side")
      return
    }

    try {
      localStorage.setItem("shinest_blog_posts", JSON.stringify(posts))
      localStorage.setItem("shinest_blog_posts_updated", new Date().toISOString())
    } catch (error) {
      console.error("Error saving blog posts to localStorage:", error)
    }
  }

  static getPageContent(page: string): any {
    if (!this.isClientSide()) {
      const defaultData = this.getDefaultData()
      return defaultData.pageContent[page] || {}
    }

    try {
      const data = localStorage.getItem(`shinest_page_${page}`)
      if (data) {
        return JSON.parse(data)
      }
      const defaultData = this.getDefaultData()
      return defaultData.pageContent[page] || {}
    } catch (error) {
      console.error(`Error reading page content for ${page} from localStorage:`, error)
      const defaultData = this.getDefaultData()
      return defaultData.pageContent[page] || {}
    }
  }

  static savePageContent(page: string, content: any): void {
    if (!this.isClientSide()) {
      console.warn(`Cannot save page content for ${page} on server side`)
      return
    }

    try {
      localStorage.setItem(`shinest_page_${page}`, JSON.stringify(content))
      localStorage.setItem(`shinest_page_${page}_updated`, new Date().toISOString())
    } catch (error) {
      console.error(`Error saving page content for ${page} to localStorage:`, error)
    }
  }

  static clearAll(): void {
    if (!this.isClientSide()) {
      console.warn("Cannot clear localStorage on server side")
      return
    }

    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith("shinest_"))
      keys.forEach((key) => localStorage.removeItem(key))
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }

  static getLastUpdated(type: string): string | null {
    if (!this.isClientSide()) {
      return null
    }

    try {
      return localStorage.getItem(`shinest_${type}_updated`)
    } catch (error) {
      console.error(`Error getting last updated for ${type}:`, error)
      return null
    }
  }
}

export default LocalStorage
