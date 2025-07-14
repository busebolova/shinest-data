interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content?: string
  encoding?: string
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

interface GitHubProject {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
  year: string
  location: string
  area: string
  status: "completed" | "in-progress" | "planned"
  tags: string[]
  client?: string
  duration?: string
  budget?: string
  team?: string[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
  testimonial?: {
    text: string
    author: string
    position: string
  }
  createdAt: string
  updatedAt: string
}

interface GitHubBlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  date: string
  tags: string[]
  featured: boolean
  image?: string
  createdAt: string
  updatedAt: string
}

class GitHubAPI {
  private baseUrl = "https://api.github.com"
  private owner: string
  private repo: string
  private token: string
  private branch: string

  constructor() {
    this.owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || ""
    this.repo = process.env.NEXT_PUBLIC_GITHUB_REPO || ""
    this.token = process.env.GITHUB_TOKEN || ""
    this.branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main"
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`)
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return response.json()
      } else {
        const text = await response.text()
        console.error("Non-JSON response:", text.substring(0, 200))
        throw new Error("Invalid JSON response from GitHub API")
      }
    } catch (error) {
      console.error("GitHub API request failed:", error)
      throw error
    }
  }

  async getFile(path: string): Promise<GitHubFile> {
    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`)
  }

  async createFile(path: string, content: string, message: string): Promise<any> {
    const encodedContent = Buffer.from(content).toString("base64")

    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: encodedContent,
        branch: this.branch,
      }),
    })
  }

  async updateFile(path: string, content: string, message: string, sha: string): Promise<any> {
    const encodedContent = Buffer.from(content).toString("base64")

    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: encodedContent,
        sha,
        branch: this.branch,
      }),
    })
  }

  async deleteFile(path: string, message: string, sha: string): Promise<any> {
    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: "DELETE",
      body: JSON.stringify({
        message,
        sha,
        branch: this.branch,
      }),
    })
  }

  async getCommits(limit = 10): Promise<GitHubCommit[]> {
    try {
      return await this.request(`/repos/${this.owner}/${this.repo}/commits?per_page=${limit}&sha=${this.branch}`)
    } catch (error) {
      console.error("Error loading commits:", error)
      return []
    }
  }

  async createOrUpdateFile(path: string, content: string, message: string): Promise<any> {
    try {
      const existingFile = await this.getFile(path)
      return this.updateFile(path, content, message, existingFile.sha)
    } catch (error) {
      // File doesn't exist, create it
      return this.createFile(path, content, message)
    }
  }

  async getProjects(): Promise<GitHubProject[]> {
    try {
      // Check if GitHub is properly configured
      if (!this.isConfigured()) {
        console.warn("GitHub not configured, using default projects")
        return this.getDefaultProjects()
      }

      const file = await this.getFile("data/projects.json")
      if (file.content) {
        const content = Buffer.from(file.content, "base64").toString("utf-8")
        const data = JSON.parse(content)
        return data.projects || []
      }
      return this.getDefaultProjects()
    } catch (error) {
      console.log("Projects file not found or error occurred, using defaults:", error)
      return this.getDefaultProjects()
    }
  }

  private getDefaultProjects(): GitHubProject[] {
    return [
      {
        id: "1",
        title: "Modern Yaşam Alanı",
        description: "Minimalist tasarım anlayışıyla modern yaşam alanı",
        category: "Residential",
        images: ["/images/living-room-design-1.png", "/images/living-room-design-2.png"],
        featured: true,
        year: "2024",
        location: "İstanbul",
        area: "120m²",
        status: "completed",
        tags: ["modern", "minimalist", "yaşam alanı"],
        client: "Özel Müşteri",
        duration: "3 ay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Lüks Banyo Tasarımı",
        description: "Premium malzemelerle tasarlanmış lüks banyo",
        category: "Residential",
        images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
        featured: true,
        year: "2024",
        location: "Ankara",
        area: "25m²",
        status: "completed",
        tags: ["lüks", "banyo", "premium"],
        client: "Villa Projesi",
        duration: "2 ay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Cafe İç Mekan",
        description: "Sıcak ve davetkar cafe atmosferi",
        category: "Commercial",
        images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
        featured: false,
        year: "2023",
        location: "İzmir",
        area: "80m²",
        status: "completed",
        tags: ["cafe", "ticari", "sıcak"],
        client: "Cafe Zinciri",
        duration: "4 ay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "4",
        title: "Kış Bahçesi",
        description: "Doğayla iç içe kış bahçesi tasarımı",
        category: "Residential",
        images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
        featured: true,
        year: "2023",
        location: "Bursa",
        area: "45m²",
        status: "completed",
        tags: ["kış bahçesi", "doğa", "cam"],
        client: "Villa Projesi",
        duration: "2 ay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "5",
        title: "Yatak Odası Tasarımı",
        description: "Huzurlu ve konforlu yatak odası",
        category: "Residential",
        images: ["/images/bedroom-design-1.png", "/images/bedroom-design-2.png"],
        featured: false,
        year: "2024",
        location: "İstanbul",
        area: "30m²",
        status: "completed",
        tags: ["yatak odası", "huzur", "konfor"],
        client: "Apartman Dairesi",
        duration: "1.5 ay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "6",
        title: "Polonya Apartman Projesi",
        description: "Avrupa tarzı apartman iç mekan tasarımı",
        category: "Residential",
        images: [
          "/images/poland-apartment-1.png",
          "/images/poland-apartment-2.png",
          "/images/poland-apartment-3.png",
          "/images/poland-apartment-4.png",
        ],
        featured: true,
        year: "2023",
        location: "Polonya",
        area: "150m²",
        status: "completed",
        tags: ["avrupa", "apartman", "modern"],
        client: "Uluslararası Proje",
        duration: "6 ay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  async getProject(id: string): Promise<GitHubProject | null> {
    const projects = await this.getProjects()
    return projects.find((project) => project.id === id) || null
  }

  async saveProjects(projects: GitHubProject[]): Promise<void> {
    if (!this.isConfigured()) {
      console.warn("GitHub not configured, cannot save projects")
      return
    }

    const path = "data/projects.json"
    const jsonContent = JSON.stringify({ projects }, null, 2)
    const message = "Update projects data"
    await this.createOrUpdateFile(path, jsonContent, message)
  }

  async createProject(project: Omit<GitHubProject, "id" | "createdAt" | "updatedAt">): Promise<GitHubProject> {
    const newProject: GitHubProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const projects = await this.getProjects()
    projects.push(newProject)
    await this.saveProjects(projects)
    return newProject
  }

  async updateProject(id: string, updatedProject: Partial<GitHubProject>): Promise<GitHubProject> {
    const projects = await this.getProjects()
    const index = projects.findIndex((project) => project.id === id)
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...updatedProject,
        updatedAt: new Date().toISOString(),
      }
      await this.saveProjects(projects)
      return projects[index]
    } else {
      throw new Error(`Project with id ${id} not found`)
    }
  }

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects()
    const filteredProjects = projects.filter((project) => project.id !== id)
    await this.saveProjects(filteredProjects)
  }

  async getBlogPosts(): Promise<GitHubBlogPost[]> {
    try {
      if (!this.isConfigured()) {
        return this.getDefaultBlogPosts()
      }

      const file = await this.getFile("data/blog.json")
      if (file.content) {
        const content = Buffer.from(file.content, "base64").toString("utf-8")
        const data = JSON.parse(content)
        return data.posts || []
      }
      return this.getDefaultBlogPosts()
    } catch (error) {
      console.log("Blog file not found, using defaults")
      return this.getDefaultBlogPosts()
    }
  }

  private getDefaultBlogPosts(): GitHubBlogPost[] {
    return [
      {
        id: "1",
        title: "2024 İç Mimarlık Trendleri",
        slug: "2024-ic-mimarlik-trendleri",
        content: "2024 yılında iç mimarlık dünyasında öne çıkan trendleri keşfedin...",
        excerpt: "Bu yıl öne çıkan iç mimarlık trendleri ve uygulamaları",
        author: "Shinest Ekibi",
        date: new Date().toISOString(),
        tags: ["trendler", "2024", "iç mimarlık"],
        featured: true,
        image: "/images/modern-interior-2024.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Küçük Mekanları Büyük Gösterme Sanatı",
        slug: "kucuk-mekanlari-buyuk-gosterme",
        content: "Küçük alanları daha geniş gösterecek tasarım ipuçları...",
        excerpt: "Küçük mekanları nasıl daha büyük gösterebiliriz?",
        author: "Shinest Ekibi",
        date: new Date().toISOString(),
        tags: ["küçük mekan", "tasarım", "ipuçları"],
        featured: false,
        image: "/images/small-space-interior.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  async getBlogPost(id: string): Promise<GitHubBlogPost | null> {
    const posts = await this.getBlogPosts()
    return posts.find((post) => post.id === id) || null
  }

  async saveBlogPosts(posts: GitHubBlogPost[]): Promise<void> {
    if (!this.isConfigured()) {
      console.warn("GitHub not configured, cannot save blog posts")
      return
    }

    const path = "data/blog.json"
    const jsonContent = JSON.stringify({ posts }, null, 2)
    const message = "Update blog posts data"
    await this.createOrUpdateFile(path, jsonContent, message)
  }

  async createBlogPost(post: Omit<GitHubBlogPost, "id" | "createdAt" | "updatedAt">): Promise<GitHubBlogPost> {
    const newPost: GitHubBlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const posts = await this.getBlogPosts()
    posts.push(newPost)
    await this.saveBlogPosts(posts)
    return newPost
  }

  async updateBlogPost(id: string, updatedPost: Partial<GitHubBlogPost>): Promise<GitHubBlogPost> {
    const posts = await this.getBlogPosts()
    const index = posts.findIndex((post) => post.id === id)
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        ...updatedPost,
        updatedAt: new Date().toISOString(),
      }
      await this.saveBlogPosts(posts)
      return posts[index]
    } else {
      throw new Error(`Blog post with id ${id} not found`)
    }
  }

  async deleteBlogPost(id: string): Promise<void> {
    const posts = await this.getBlogPosts()
    const filteredPosts = posts.filter((post) => post.id !== id)
    await this.saveBlogPosts(filteredPosts)
  }

  async getPageContent(page: string): Promise<any> {
    try {
      if (!this.isConfigured()) {
        return this.getDefaultPageContent(page)
      }

      const file = await this.getFile(`data/pages/${page}.json`)
      if (file.content) {
        const content = Buffer.from(file.content, "base64").toString("utf-8")
        return JSON.parse(content)
      }
    } catch (error) {
      console.log(`Page content file not found for ${page}, using defaults`)
    }
    return this.getDefaultPageContent(page)
  }

  private getDefaultPageContent(page: string): any {
    const defaults: Record<string, any> = {
      home: {
        hero: {
          title: "SHINEST",
          subtitle: "Interior Design Studio",
          description: "Creating beautiful spaces that inspire and delight",
          image: "/images/hero-image.png",
        },
        about: {
          title: "About Us",
          content: "We are passionate about creating beautiful interior spaces.",
        },
        services: {
          title: "Our Services",
          items: [
            {
              title: "Interior Design",
              description: "Complete interior design solutions",
              image: "/images/design-service.png",
            },
          ],
        },
      },
      about: {
        title: "About Shinest",
        content: "We are a leading interior design studio...",
        image: "/images/about-section-reference.png",
      },
      services: {
        title: "Our Services",
        description: "Professional interior design services",
        services: [],
      },
    }
    return defaults[page] || {}
  }

  async savePageContent(page: string, content: any): Promise<void> {
    if (!this.isConfigured()) {
      console.warn("GitHub not configured, cannot save page content")
      return
    }

    const path = `data/pages/${page}.json`
    const jsonContent = JSON.stringify(content, null, 2)
    const message = `Update ${page} page content`
    await this.createOrUpdateFile(path, jsonContent, message)
  }

  async uploadImage(file: File, path: string): Promise<string> {
    if (!this.isConfigured()) {
      console.warn("GitHub not configured, cannot upload image")
      return "/placeholder.svg?height=400&width=600"
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64Content = Buffer.from(arrayBuffer).toString("base64")
    const message = `Upload image: ${file.name}`
    await this.createOrUpdateFile(path, base64Content, message)
    return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${path}`
  }

  async getContent(path: string): Promise<string> {
    try {
      if (!this.isConfigured()) {
        return ""
      }

      const file = await this.getFile(path)
      if (file.content) {
        return Buffer.from(file.content, "base64").toString("utf-8")
      }
      return ""
    } catch (error) {
      console.log(`Content file not found: ${path}`)
      return ""
    }
  }

  async updateContent(path: string, content: string, message: string): Promise<void> {
    if (!this.isConfigured()) {
      console.warn("GitHub not configured, cannot update content")
      return
    }
    await this.createOrUpdateFile(path, content, message)
  }

  async getRepositoryInfo(): Promise<any> {
    try {
      if (!this.isConfigured()) {
        return {
          name: "shinest-demo",
          full_name: "demo/shinest-demo",
          html_url: "https://github.com/demo/shinest-demo",
          updated_at: new Date().toISOString(),
        }
      }

      return await this.request(`/repos/${this.owner}/${this.repo}`)
    } catch (error) {
      console.error("Error getting repository info:", error)
      return {
        name: this.repo,
        full_name: `${this.owner}/${this.repo}`,
        html_url: `https://github.com/${this.owner}/${this.repo}`,
        updated_at: new Date().toISOString(),
      }
    }
  }

  async getLatestCommit(): Promise<GitHubCommit> {
    try {
      if (!this.isConfigured()) {
        return this.getDefaultCommit()
      }

      const commits = await this.getCommits(1)
      if (commits.length > 0) {
        return commits[0]
      }
    } catch (error) {
      console.error("Error getting latest commit:", error)
    }

    return this.getDefaultCommit()
  }

  private getDefaultCommit(): GitHubCommit {
    return {
      sha: "default",
      commit: {
        author: {
          name: "System",
          email: "system@shinest.com",
          date: new Date().toISOString(),
        },
        message: "Initial commit",
      },
      html_url: `https://github.com/${this.owner}/${this.repo}`,
    }
  }

  isConfigured(): boolean {
    return !!(
      this.owner &&
      this.repo &&
      this.token &&
      !this.owner.includes("your-") &&
      !this.repo.includes("your-") &&
      !this.token.includes("your-")
    )
  }
}

const githubAPIInstance = new GitHubAPI()

export const githubAPI = githubAPIInstance
export const githubApi = githubAPIInstance
export const getGitHubApi = () => githubAPIInstance

export default GitHubAPI
export type { GitHubFile, GitHubCommit, GitHubProject, GitHubBlogPost }
