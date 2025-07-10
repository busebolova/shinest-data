interface GitHubProject {
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

interface GitHubBlogPost {
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

interface GitHubPageContent {
  page: string
  content: any
  updatedAt: string
}

interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
}

interface GitHubRepository {
  name: string
  full_name: string
  html_url: string
  updated_at: string
}

class GitHubAPI {
  private baseUrl = "https://api.github.com"
  private owner: string
  private repo: string
  private token: string | undefined

  constructor() {
    // Only access environment variables on server side
    if (typeof window === "undefined") {
      this.owner = process.env.GITHUB_OWNER || "shinest-architecture"
      this.repo = process.env.GITHUB_REPO || "content"
      this.token = process.env.GITHUB_TOKEN
    } else {
      // Client side fallback
      this.owner = "shinest-architecture"
      this.repo = "content"
      this.token = undefined
    }
  }

  // Check if GitHub API is properly configured
  isConfigured(): boolean {
    return !!(this.token && this.owner && this.repo)
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    if (!this.isConfigured()) {
      throw new Error("GitHub API is not configured. Please check your environment variables.")
    }

    const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Repository info
  async getRepositoryInfo(): Promise<GitHubRepository> {
    try {
      const data = await this.request("")
      return {
        name: data.name,
        full_name: data.full_name,
        html_url: data.html_url,
        updated_at: data.updated_at,
      }
    } catch (error) {
      console.error("Error fetching repository info:", error)
      throw error
    }
  }

  // Commits
  async getCommits(limit = 10): Promise<GitHubCommit[]> {
    try {
      const data = await this.request(`commits?per_page=${limit}`)
      return data.map((commit: any) => ({
        sha: commit.sha,
        commit: {
          author: {
            name: commit.commit.author.name,
            email: commit.commit.author.email,
            date: commit.commit.author.date,
          },
          message: commit.commit.message,
        },
        html_url: commit.html_url,
      }))
    } catch (error) {
      console.error("Error fetching commits:", error)
      return []
    }
  }

  async getLatestCommit(): Promise<GitHubCommit> {
    const commits = await this.getCommits(1)
    if (commits.length === 0) {
      throw new Error("No commits found")
    }
    return commits[0]
  }

  // Projects
  async getProjects(): Promise<GitHubProject[]> {
    try {
      const data = await this.request("contents/data/projects.json")
      const content = JSON.parse(Buffer.from(data.content, "base64").toString())
      return content.projects || []
    } catch (error) {
      console.error("Error fetching projects:", error)
      return this.getFallbackProjects()
    }
  }

  async getProject(id: string): Promise<GitHubProject | null> {
    const projects = await this.getProjects()
    return projects.find((p) => p.id === id) || null
  }

  async createProject(project: Omit<GitHubProject, "id" | "createdAt" | "updatedAt">): Promise<GitHubProject> {
    const projects = await this.getProjects()
    const newProject: GitHubProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedProjects = [newProject, ...projects]
    await this.saveProjects(updatedProjects)
    return newProject
  }

  async updateProject(id: string, updates: Partial<GitHubProject>): Promise<GitHubProject> {
    const projects = await this.getProjects()
    const index = projects.findIndex((p) => p.id === id)

    if (index === -1) {
      throw new Error("Project not found")
    }

    const updatedProject = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    projects[index] = updatedProject
    await this.saveProjects(projects)
    return updatedProject
  }

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects()
    const filteredProjects = projects.filter((p) => p.id !== id)
    await this.saveProjects(filteredProjects)
  }

  private async saveProjects(projects: GitHubProject[]): Promise<void> {
    try {
      const data = await this.request("contents/data/projects.json")
      const content = JSON.stringify({ projects }, null, 2)

      await this.request("contents/data/projects.json", {
        method: "PUT",
        body: JSON.stringify({
          message: "Update projects data",
          content: Buffer.from(content).toString("base64"),
          sha: data.sha,
        }),
      })
    } catch (error) {
      console.error("Error saving projects:", error)
      throw error
    }
  }

  // Blog Posts
  async getBlogPosts(): Promise<GitHubBlogPost[]> {
    try {
      const data = await this.request("contents/data/blog.json")
      const content = JSON.parse(Buffer.from(data.content, "base64").toString())
      return content.posts || []
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      return this.getFallbackBlogPosts()
    }
  }

  async createBlogPost(post: Omit<GitHubBlogPost, "id" | "createdAt" | "updatedAt">): Promise<GitHubBlogPost> {
    const posts = await this.getBlogPosts()
    const newPost: GitHubBlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedPosts = [newPost, ...posts]
    await this.saveBlogPosts(updatedPosts)
    return newPost
  }

  private async saveBlogPosts(posts: GitHubBlogPost[]): Promise<void> {
    try {
      const data = await this.request("contents/data/blog.json")
      const content = JSON.stringify({ posts }, null, 2)

      await this.request("contents/data/blog.json", {
        method: "PUT",
        body: JSON.stringify({
          message: "Update blog posts data",
          content: Buffer.from(content).toString("base64"),
          sha: data.sha,
        }),
      })
    } catch (error) {
      console.error("Error saving blog posts:", error)
      throw error
    }
  }

  // Page Content
  async getPageContent(page: string): Promise<any> {
    try {
      const data = await this.request(`contents/data/pages/${page}.json`)
      const content = JSON.parse(Buffer.from(data.content, "base64").toString())
      return content
    } catch (error) {
      console.error(`Error fetching page content for ${page}:`, error)
      return this.getFallbackPageContent(page)
    }
  }

  async savePageContent(page: string, content: any): Promise<void> {
    try {
      let sha: string | undefined

      try {
        const existingData = await this.request(`contents/data/pages/${page}.json`)
        sha = existingData.sha
      } catch (error) {
        // File doesn't exist, will create new
      }

      const contentString = JSON.stringify(content, null, 2)

      await this.request(`contents/data/pages/${page}.json`, {
        method: "PUT",
        body: JSON.stringify({
          message: `Update ${page} page content`,
          content: Buffer.from(contentString).toString("base64"),
          ...(sha && { sha }),
        }),
      })
    } catch (error) {
      console.error(`Error saving page content for ${page}:`, error)
      throw error
    }
  }

  // Fallback data methods
  private getFallbackProjects(): GitHubProject[] {
    return [
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
    ]
  }

  private getFallbackBlogPosts(): GitHubBlogPost[] {
    return [
      {
        id: "1",
        title: { tr: "Modern İç Mimarlık Trendleri", en: "Modern Interior Design Trends" },
        content: { tr: "2024 yılının en popüler trendleri...", en: "The most popular trends of 2024..." },
        excerpt: { tr: "Bu yıl öne çıkan tasarım trendleri", en: "Design trends that stand out this year" },
        image: "/images/modern-interior-2024.png",
        status: "published",
        publishedAt: "2024-01-15T10:00:00Z",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
    ]
  }

  private getFallbackPageContent(page: string): any {
    const fallbackContent = {
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
    }

    return fallbackContent[page] || {}
  }
}

// Create and export the instance
export const githubAPI = new GitHubAPI()
export const githubApi = githubAPI // Named export for compatibility

export type { GitHubProject, GitHubBlogPost, GitHubPageContent, GitHubCommit, GitHubRepository }

// GitHub API functions - server-side only
export async function getGitHubProjects() {
  // Only run on server-side
  if (typeof window !== "undefined") {
    return []
  }

  try {
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const token = process.env.GITHUB_TOKEN

    if (!owner || !repo || !token) {
      console.log("GitHub credentials not configured, using fallback data")
      return []
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data/projects.json`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    const content = Buffer.from(data.content, "base64").toString("utf-8")
    return JSON.parse(content)
  } catch (error) {
    console.error("GitHub API error:", error)
    return []
  }
}

export async function updateGitHubProjects(projects: any[]) {
  if (typeof window !== "undefined") {
    return false
  }

  try {
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const token = process.env.GITHUB_TOKEN

    if (!owner || !repo || !token) {
      return false
    }

    // Get current file SHA
    const getResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data/projects.json`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    let sha = ""
    if (getResponse.ok) {
      const currentData = await getResponse.json()
      sha = currentData.sha
    }

    // Update file
    const content = Buffer.from(JSON.stringify(projects, null, 2)).toString("base64")

    const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data/projects.json`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update projects data",
        content,
        sha,
      }),
    })

    return updateResponse.ok
  } catch (error) {
    console.error("GitHub update error:", error)
    return false
  }
}
