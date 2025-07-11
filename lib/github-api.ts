interface Project {
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

interface BlogPost {
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

class GitHubAPI {
  private token: string | null = null
  private owner: string | null = null
  private repo: string | null = null
  private branch: string | null = null

  constructor() {
    this.initializeFromEnv()
  }

  private initializeFromEnv() {
    if (typeof process !== "undefined" && process.env) {
      this.token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || null
      this.owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || null
      this.repo = process.env.NEXT_PUBLIC_GITHUB_REPO || null
      this.branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main"
    } else if (typeof window !== "undefined") {
      // Client-side environment variables
      this.token = (window as any).__env?.NEXT_PUBLIC_GITHUB_TOKEN || null
      this.owner = (window as any).__env?.NEXT_PUBLIC_GITHUB_OWNER || null
      this.repo = (window as any).__env?.NEXT_PUBLIC_GITHUB_REPO || null
      this.branch = (window as any).__env?.NEXT_PUBLIC_GITHUB_BRANCH || "main"
    }
  }

  isConfigured(): boolean {
    return Boolean(this.token && this.owner && this.repo)
  }

  private getHeaders(): HeadersInit {
    return {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    }
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.isConfigured()) {
      throw new Error("GitHub API is not configured")
    }

    const headers = this.getHeaders()
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    return response
  }

  private async getFileContent(path: string): Promise<any> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`

    try {
      const response = await this.fetchWithAuth(url)
      const data = await response.json()

      // GitHub API returns content as base64 encoded
      const content = atob(data.content)
      return JSON.parse(content)
    } catch (error) {
      console.error(`Error fetching file content from GitHub: ${path}`, error)
      throw error
    }
  }

  private async updateFileContent(path: string, content: any): Promise<void> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`

    try {
      // First, get the current file to get its SHA
      const currentFileResponse = await this.fetchWithAuth(url)
      const currentFile = await currentFileResponse.json()

      // Prepare the update
      const contentStr = JSON.stringify(content, null, 2)
      const contentBase64 = btoa(contentStr)

      const updateData = {
        message: `Update ${path}`,
        content: contentBase64,
        sha: currentFile.sha,
        branch: this.branch,
      }

      // Update the file
      await this.fetchWithAuth(url, {
        method: "PUT",
        body: JSON.stringify(updateData),
      })
    } catch (error) {
      console.error(`Error updating file content on GitHub: ${path}`, error)
      throw error
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      return await this.getFileContent("data/projects.json")
    } catch (error) {
      console.error("Error fetching projects from GitHub:", error)
      throw error
    }
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      const projects = await this.getProjects()
      return projects.find((p) => p.id === id) || null
    } catch (error) {
      console.error(`Error fetching project ${id} from GitHub:`, error)
      throw error
    }
  }

  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    try {
      const projects = await this.getProjects()

      const newProject: Project = {
        ...(project as any),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedProjects = [newProject, ...projects]
      await this.updateFileContent("data/projects.json", updatedProjects)

      return newProject
    } catch (error) {
      console.error("Error creating project on GitHub:", error)
      throw error
    }
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
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
      await this.updateFileContent("data/projects.json", projects)

      return updatedProject
    } catch (error) {
      console.error(`Error updating project ${id} on GitHub:`, error)
      throw error
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      const projects = await this.getProjects()
      const filteredProjects = projects.filter((p) => p.id !== id)

      await this.updateFileContent("data/projects.json", filteredProjects)
    } catch (error) {
      console.error(`Error deleting project ${id} from GitHub:`, error)
      throw error
    }
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      return await this.getFileContent("data/blog.json")
    } catch (error) {
      console.error("Error fetching blog posts from GitHub:", error)
      throw error
    }
  }

  async getBlogPost(id: string): Promise<BlogPost | null> {
    try {
      const posts = await this.getBlogPosts()
      return posts.find((p) => p.id === id) || null
    } catch (error) {
      console.error(`Error fetching blog post ${id} from GitHub:`, error)
      throw error
    }
  }

  async createBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    try {
      const posts = await this.getBlogPosts()

      const newPost: BlogPost = {
        ...(post as any),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedPosts = [newPost, ...posts]
      await this.updateFileContent("data/blog.json", updatedPosts)

      return newPost
    } catch (error) {
      console.error("Error creating blog post on GitHub:", error)
      throw error
    }
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const posts = await this.getBlogPosts()
      const index = posts.findIndex((p) => p.id === id)

      if (index === -1) {
        throw new Error("Blog post not found")
      }

      const updatedPost = {
        ...posts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      posts[index] = updatedPost
      await this.updateFileContent("data/blog.json", posts)

      return updatedPost
    } catch (error) {
      console.error(`Error updating blog post ${id} on GitHub:`, error)
      throw error
    }
  }

  async deleteBlogPost(id: string): Promise<void> {
    try {
      const posts = await this.getBlogPosts()
      const filteredPosts = posts.filter((p) => p.id !== id)

      await this.updateFileContent("data/blog.json", filteredPosts)
    } catch (error) {
      console.error(`Error deleting blog post ${id} from GitHub:`, error)
      throw error
    }
  }

  // Page Content
  async getPageContent(page: string): Promise<any> {
    try {
      return await this.getFileContent(`data/pages/${page}.json`)
    } catch (error) {
      console.error(`Error fetching page content for ${page} from GitHub:`, error)
      throw error
    }
  }

  async savePageContent(page: string, content: any): Promise<void> {
    try {
      const contentWithTimestamp = {
        ...content,
        updatedAt: new Date().toISOString(),
      }

      await this.updateFileContent(`data/pages/${page}.json`, contentWithTimestamp)
    } catch (error) {
      console.error(`Error saving page content for ${page} to GitHub:`, error)
      throw error
    }
  }
}

export const githubApi = new GitHubAPI()
export { GitHubAPI }
export type { Project, BlogPost }
