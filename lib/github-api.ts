// lib/github-api.ts
import { Octokit } from "@octokit/core"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

class GitHubAPI {
  private octokit: Octokit | null = null
  private owner = "ShinestArchitecture" // Replace with your GitHub organization/user name
  private repo = "shinest-app" // Replace with your repository name

  constructor() {
    if (GITHUB_TOKEN) {
      this.octokit = new Octokit({ auth: GITHUB_TOKEN })
    } else {
      console.warn("GITHUB_TOKEN is not set. GitHub API functionality will be limited.")
    }
  }

  isConfigured(): boolean {
    return !!this.octokit
  }

  async getRepositoryInfo() {
    if (!this.octokit) throw new Error("GitHub API is not configured.")
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}", {
        owner: this.owner,
        repo: this.repo,
      })
      return response.data
    } catch (error) {
      console.error("Error fetching repository info:", error)
      throw error
    }
  }

  async getProjects() {
    if (!this.octokit) return this.getMockProjects() // Fallback to mock data if API not configured
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/contents/data/projects.json", {
        owner: this.owner,
        repo: this.repo,
        ref: "main", // or your default branch
      })
      if (Array.isArray(response.data)) {
        // Find the specific file if response.data is an array (directory listing)
        const file = response.data.find((item: any) => item.name === "projects.json")
        if (file && file.type === "file") {
          const contentResponse = await fetch(file.download_url)
          return await contentResponse.json()
        }
      } else if (response.data && "content" in response.data) {
        // If response.data is already the file object
        const content = Buffer.from(response.data.content, "base64").toString("utf8")
        return JSON.parse(content)
      }
      return []
    } catch (error) {
      console.error("Error fetching projects from GitHub:", error)
      return this.getMockProjects() // Fallback on error
    }
  }

  async getBlogPosts() {
    if (!this.octokit) return this.getMockBlogPosts() // Fallback to mock data if API not configured
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/contents/data/blog.json", {
        owner: this.owner,
        repo: this.repo,
        ref: "main", // or your default branch
      })
      if (Array.isArray(response.data)) {
        const file = response.data.find((item: any) => item.name === "blog.json")
        if (file && file.type === "file") {
          const contentResponse = await fetch(file.download_url)
          return await contentResponse.json()
        }
      } else if (response.data && "content" in response.data) {
        const content = Buffer.from(response.data.content, "base64").toString("utf8")
        return JSON.parse(content)
      }
      return []
    } catch (error) {
      console.error("Error fetching blog posts from GitHub:", error)
      return this.getMockBlogPosts() // Fallback on error
    }
  }

  async getCommits(count = 5) {
    if (!this.octokit) return [] // No commits if API not configured
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
        title: "Modern Villa Tasarımı",
        description: "Minimalist çizgilerle lüks yaşam alanı.",
        images: ["/images/modern-architecture.jpg", "/images/living-room-design-1.png"],
        slug: "modern-villa-tasarimi",
      },
      {
        id: "2",
        title: "Şehir Merkezinde Ofis Dizaynı",
        description: "Yaratıcılığı artıran modern çalışma ortamları.",
        images: ["/modern-wooden-office.png", "/images/cafe-design-1.png"],
        slug: "ofis-dizayni",
      },
      {
        id: "3",
        title: "Butik Otel İç Mimarlığı",
        description: "Konfor ve estetiği bir araya getiren özel tasarım.",
        images: ["/luxury-hotel-lobby.png", "/images/bathroom-design-1.png"],
        slug: "butik-otel",
      },
    ]
  }

  private getMockBlogPosts() {
    return [
      {
        id: "1",
        title: "2024 İç Mimarlık Trendleri",
        content: "Bu yılın en popüler iç mimarlık trendleri...",
        author: "Shinest Ekibi",
        date: "2024-07-01T10:00:00Z",
        slug: "2024-ic-mimarlik-trendleri",
      },
      {
        id: "2",
        title: "Küçük Alanlar İçin Akıllı Çözümler",
        content: "Daha küçük yaşam alanlarını optimize etme ipuçları...",
        author: "Shinest Ekibi",
        date: "2024-06-25T14:30:00Z",
        slug: "kucuk-alanlar-icin-cozumler",
      },
    ]
  }
}

export const githubAPI = new GitHubAPI()
