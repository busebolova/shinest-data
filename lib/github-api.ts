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
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
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
    return this.request(`/repos/${this.owner}/${this.repo}/commits?per_page=${limit}&sha=${this.branch}`)
  }

  async createOrUpdateFile(path: string, content: string, message: string): Promise<any> {
    try {
      const existingFile = await this.getFile(path)
      return this.updateFile(path, content, message, existingFile.sha)
    } catch (error) {
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
      return []
    } catch (error) {
      console.error("Error loading projects:", error)
      return []
    }
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
      return []
    } catch (error) {
      console.error("Error loading blog posts:", error)
      return []
    }
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
      console.error(`Error loading ${page} content:`, error)
    }
    return null
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
      console.error(`Error fetching content from ${path}:`, error)
      return ""
    }
  }

  async updateContent(path: string, content: string, message: string): Promise<void> {
    await this.createOrUpdateFile(path, content, message)
  }

  async getRepositoryInfo(): Promise<any> {
    return this.request(`/repos/${this.owner}/${this.repo}`)
  }

  async getLatestCommit(): Promise<GitHubCommit> {
    const commits = await this.getCommits(1)
    return commits[0]
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
