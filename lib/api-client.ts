interface Project {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: string
  location: string
  year: number
  images: string[]
  status: "draft" | "published"
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface BlogPost {
  id: string
  title: { tr: string; en: string }
  content: { tr: string; en: string }
  excerpt: { tr: string; en: string }
  image: string
  status: "draft" | "published"
  publishedAt: string
  createdAt: string
  updatedAt: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  }

  async getProjects(): Promise<Project[]> {
    try {
      // For server-side rendering, return fallback data directly
      if (typeof window === "undefined") {
        return this.getFallbackProjects()
      }

      const response = await fetch(`${this.baseUrl}/api/projects`)
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await response.json()
      return data.projects || data || []
    } catch (error) {
      console.error("Error fetching projects:", error)
      return this.getFallbackProjects()
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      if (typeof window === "undefined") {
        return this.getFallbackBlogPosts()
      }

      const response = await fetch(`${this.baseUrl}/api/blog`)
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts")
      }
      const data = await response.json()
      return data.posts || data || []
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      return this.getFallbackBlogPosts()
    }
  }

  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })

    if (!response.ok) {
      throw new Error("Failed to create project")
    }

    const data = await response.json()
    return data.project || data
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })

    if (!response.ok) {
      throw new Error("Failed to update project")
    }

    const data = await response.json()
    return data.project || data
  }

  async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/projects/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete project")
    }
  }

  private getFallbackProjects(): Project[] {
    return [
      {
        id: "1",
        title: { tr: "Modern Banyo Tasarımı", en: "Modern Bathroom Design" },
        description: { tr: "Şık ve fonksiyonel banyo tasarımı", en: "Elegant and functional bathroom design" },
        category: "Banyo",
        location: "İstanbul",
        year: 2024,
        images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
        status: "published",
        featured: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        title: { tr: "Kafe İç Mekan", en: "Cafe Interior" },
        description: { tr: "Sıcak ve davetkar kafe tasarımı", en: "Warm and inviting cafe design" },
        category: "Ticari",
        location: "Ankara",
        year: 2024,
        images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
        status: "published",
        featured: false,
        createdAt: "2024-01-02T00:00:00.000Z",
        updatedAt: "2024-01-02T00:00:00.000Z",
      },
      {
        id: "3",
        title: { tr: "Kış Bahçesi", en: "Winter Garden" },
        description: { tr: "Doğayla iç içe kış bahçesi", en: "Winter garden integrated with nature" },
        category: "Konut",
        location: "İzmir",
        year: 2023,
        images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
        status: "published",
        featured: true,
        createdAt: "2024-01-03T00:00:00.000Z",
        updatedAt: "2024-01-03T00:00:00.000Z",
      },
      {
        id: "4",
        title: { tr: "Yatak Odası", en: "Bedroom" },
        description: { tr: "Minimalist yatak odası tasarımı", en: "Minimalist bedroom design" },
        category: "Konut",
        location: "Bursa",
        year: 2023,
        images: ["/images/bedroom-design-1.png", "/images/bedroom-design-2.png"],
        status: "draft",
        featured: false,
        createdAt: "2024-01-04T00:00:00.000Z",
        updatedAt: "2024-01-04T00:00:00.000Z",
      },
    ]
  }

  private getFallbackBlogPosts(): BlogPost[] {
    return [
      {
        id: "1",
        title: { tr: "Modern İç Mimarlık Trendleri 2024", en: "Modern Interior Design Trends 2024" },
        content: {
          tr: "2024 yılının en popüler iç mimarlık trendleri hakkında detaylı bilgiler...",
          en: "Detailed information about the most popular interior design trends of 2024...",
        },
        excerpt: { tr: "Bu yıl öne çıkan tasarım trendleri", en: "Design trends that stand out this year" },
        image: "/modern-interior-2024.png",
        status: "published",
        publishedAt: "2024-01-15T00:00:00.000Z",
        createdAt: "2024-01-15T00:00:00.000Z",
        updatedAt: "2024-01-15T00:00:00.000Z",
      },
      {
        id: "2",
        title: { tr: "Küçük Mekanlar İçin Tasarım İpuçları", en: "Design Tips for Small Spaces" },
        content: {
          tr: "Küçük mekanları büyük göstermenin yolları ve pratik çözümler...",
          en: "Ways to make small spaces look bigger and practical solutions...",
        },
        excerpt: { tr: "Küçük mekanları verimli kullanma", en: "Efficient use of small spaces" },
        image: "/small-space-interior.png",
        status: "published",
        publishedAt: "2024-01-10T00:00:00.000Z",
        createdAt: "2024-01-10T00:00:00.000Z",
        updatedAt: "2024-01-10T00:00:00.000Z",
      },
      {
        id: "3",
        title: { tr: "Sürdürülebilir İç Mimarlık", en: "Sustainable Interior Design" },
        content: {
          tr: "Çevre dostu tasarım yaklaşımları ve sürdürülebilir malzemeler...",
          en: "Environmentally friendly design approaches and sustainable materials...",
        },
        excerpt: { tr: "Doğa dostu tasarım çözümleri", en: "Nature-friendly design solutions" },
        image: "/sustainable-interior.png",
        status: "published",
        publishedAt: "2024-01-05T00:00:00.000Z",
        createdAt: "2024-01-05T00:00:00.000Z",
        updatedAt: "2024-01-05T00:00:00.000Z",
      },
    ]
  }
}

export const apiClient = new ApiClient()
