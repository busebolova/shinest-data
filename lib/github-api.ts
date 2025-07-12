// lib/github-api.ts
import { Octokit } from "@octokit/core"
import { Buffer } from "buffer" // Node.js Buffer for base64 encoding/decoding

// Environment variables are only available on the server side by default.
// For client-side code (like github-realtime.ts) to use these, they must be prefixed with NEXT_PUBLIC_.
// However, GITHUB_TOKEN should NEVER be exposed to the client for security reasons.
// Therefore, client-side reads will primarily rely on localStorage or server-side API routes.
// Server-side API routes will use the non-public GITHUB_TOKEN.

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || "ShinestArchitecture" // Default or fallback
const GITHUB_REPO = process.env.GITHUB_REPO || "shinest-app" // Default or fallback

class GitHubAPI {
  private octokit: Octokit | null = null
  private owner: string
  private repo: string

  constructor() {
    this.owner = GITHUB_OWNER
    this.repo = GITHUB_REPO

    if (GITHUB_TOKEN) {
      this.octokit = new Octokit({ auth: GITHUB_TOKEN })
    } else {
      console.warn("GITHUB_TOKEN is not set. GitHub API functionality will be limited to mock data or fail.")
    }
  }

  isConfigured(): boolean {
    // This check is primarily for server-side usage.
    // On the client, GITHUB_TOKEN will be undefined, so this will return false.
    return !!this.octokit && !!this.owner && !!this.repo
  }

  async getFileSha(path: string): Promise<string | null> {
    if (!this.octokit) throw new Error("GitHub API is not configured.")
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: this.owner,
        repo: this.repo,
        path,
        ref: "main", // Assuming 'main' branch
      })
      if (response.data && "sha" in response.data) {
        return response.data.sha as string
      }
      return null
    } catch (error: any) {
      if (error.status === 404) {
        return null // File not found, which is fine for initial creation
      }
      console.error(`Error fetching SHA for ${path}:`, error)
      throw error
    }
  }

  async updateFile(path: string, content: string, message: string): Promise<any> {
    if (!this.octokit) throw new Error("GitHub API is not configured.")
    try {
      const sha = await this.getFileSha(path)

      const encodedContent = Buffer.from(content).toString("base64")

      const requestOptions = {
        owner: this.owner,
        repo: this.repo,
        path,
        message,
        content: encodedContent,
        branch: "main", // Assuming 'main' branch
        sha: sha || undefined, // Include SHA only if updating an existing file
      }

      const response = await this.octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", requestOptions)
      return response.data
    } catch (error) {
      console.error(`Error updating file ${path} on GitHub:`, error)
      throw error
    }
  }

  async getProjects() {
    if (!this.octokit) return { projects: this.getMockProjects() }
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/contents/data/projects.json", {
        owner: this.owner,
        repo: this.repo,
        ref: "main",
      })
      if (response.data && "content" in response.data) {
        const content = Buffer.from(response.data.content as string, "base64").toString("utf8")
        return JSON.parse(content)
      }
      return { projects: [] }
    } catch (error) {
      console.error("Error fetching projects from GitHub:", error)
      return { projects: this.getMockProjects() }
    }
  }

  async getBlogPosts() {
    if (!this.octokit) return { posts: this.getMockBlogPosts() }
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/contents/data/blog.json", {
        owner: this.owner,
        repo: this.repo,
        ref: "main",
      })
      if (response.data && "content" in response.data) {
        const content = Buffer.from(response.data.content as string, "base64").toString("utf8")
        return JSON.parse(content)
      }
      return { posts: [] }
    } catch (error) {
      console.error("Error fetching blog posts from GitHub:", error)
      return { posts: this.getMockBlogPosts() }
    }
  }

  async getPageContent(page: string) {
    if (!this.octokit) return this.getMockPageContent(page)
    try {
      const response = await this.octokit.request(`GET /repos/{owner}/{repo}/contents/data/pages/${page}.json`, {
        owner: this.owner,
        repo: this.repo,
        ref: "main",
      })
      if (response.data && "content" in response.data) {
        const content = Buffer.from(response.data.content as string, "base64").toString("utf8")
        return JSON.parse(content)
      }
      return this.getMockPageContent(page)
    } catch (error: any) {
      if (error.status === 404) {
        console.warn(`Page content for ${page}.json not found on GitHub, returning mock data.`)
        return this.getMockPageContent(page)
      }
      console.error(`Error fetching page content for ${page} from GitHub:`, error)
      return this.getMockPageContent(page)
    }
  }

  async getAdminSettings() {
    if (!this.octokit) return this.getMockAdminSettings()
    try {
      const response = await this.octokit.request(`GET /repos/{owner}/{repo}/contents/data/settings.json`, {
        owner: this.owner,
        repo: this.repo,
        ref: "main",
      })
      if (response.data && "content" in response.data) {
        const content = Buffer.from(response.data.content as string, "base64").toString("utf8")
        return JSON.parse(content)
      }
      return this.getMockAdminSettings()
    } catch (error: any) {
      if (error.status === 404) {
        console.warn(`Admin settings (settings.json) not found on GitHub, returning mock data.`)
        return this.getMockAdminSettings()
      }
      console.error(`Error fetching admin settings from GitHub:`, error)
      return this.getMockAdminSettings()
    }
  }

  async getCommits(count = 5) {
    if (!this.octokit) return []
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: this.owner,
        repo: this.repo,
        per_page: count,
      })
      return response.data
    } catch (error) {
      console.error("Error fetching commits from GitHub:", error)
      return []
    }
  }

  // Mock data for development/when GitHub API is not configured
  private getMockProjects() {
    return [
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
        description: {
          tr: "Modern ve konforlu oturma odası tasarımı",
          en: "Modern and comfortable living room design",
        },
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
  }

  private getMockBlogPosts() {
    return [
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
  }

  private getMockPageContent(page: string) {
    // This mock data should match the structure expected by ContentEditor
    const defaultContent = {
      sections: [
        {
          id: "hero-default",
          type: "hero",
          title: "Varsayılan Hero Bölümü",
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
          id: "text-default",
          type: "text",
          title: "Varsayılan Metin Bölümü",
          content: {
            title: { tr: "Hakkımızda", en: "About Us" },
            text: {
              tr: "Bu varsayılan bir metin bölümüdür. İçeriği düzenleyebilirsiniz.",
              en: "This is a default text section. You can edit its content.",
            },
            isVisible: true,
          },
          order: 1,
        },
      ],
    }

    switch (page) {
      case "home":
        return {
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
        }
      case "about":
        return {
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
        }
      case "services":
        return {
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
        }
      default:
        return defaultContent
    }
  }

  private getMockAdminSettings() {
    return {
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
  }
}

export const githubAPI = new GitHubAPI()
