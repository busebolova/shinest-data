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
      throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    return response.json()
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
      const file = await this.getFile("data/projects.json")
      if (file.content) {
        const content = Buffer.from(file.content, "base64").toString("utf-8")
        const data = JSON.parse(content)
        return data.projects || []
      }
      return this.getDefaultProjects()
    } catch (error) {
      console.log("Projects file not found, using defaults")
      return this.getDefaultProjects()
    }
  }

  private getDefaultProjects(): GitHubProject[] {
    return [
      {
        id: "1",
        title: "Modern Living Room",
        description: "Contemporary living space with minimalist design",
        category: "residential",
        images: ["/images/living-room-design-1.png"],
        featured: true,
        year: "2024",
        location: "Istanbul",
        area: "120m²",
        status: "completed",
        tags: ["modern", "minimalist", "living room"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Luxury Hotel Lobby",
        description: "Elegant hotel lobby with premium finishes",
        category: "hospitality",
        images: ["/images/cafe-design-1.png"],
        featured: false,
        year: "2024",
        location: "Ankara",
        area: "300m²",
        status: "in-progress",
        tags: ["luxury", "hotel", "lobby"],
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
        title: "Interior Design Trends 2024",
        slug: "interior-design-trends-2024",
        content: "Discover the latest trends in interior design for 2024...",
        excerpt: "Explore the most popular interior design trends this year",
        author: "Shinest Team",
        date: new Date().toISOString(),
        tags: ["trends", "2024", "interior design"],
        featured: true,
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
    const path = `data/pages/${page}.json`
    const jsonContent = JSON.stringify(content, null, 2)
    const message = `Update ${page} page content`
    await this.createOrUpdateFile(path, jsonContent, message)
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const base64Content = Buffer.from(arrayBuffer).toString("base64")
    const message = `Upload image: ${file.name}`
    await this.createOrUpdateFile(path, base64Content, message)
    return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${path}`
  }

  async getContent(path: string): Promise<string> {
    try {
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
    await this.createOrUpdateFile(path, content, message)
  }

  async getRepositoryInfo(): Promise<any> {
    try {
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
      const commits = await this.getCommits(1)
      if (commits.length > 0) {
        return commits[0]
      }
    } catch (error) {
      console.error("Error getting latest commit:", error)
    }

    // Return default commit if none found
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
    return !!(this.owner && this.repo && this.token)
  }
}

const githubAPIInstance = new GitHubAPI()

export const githubAPI = githubAPIInstance
export const githubApi = githubAPIInstance
export const getGitHubApi = () => githubAPIInstance

export default GitHubAPI
export type { GitHubFile, GitHubCommit, GitHubProject, GitHubBlogPost }
