import { githubAPI } from "./github-api"
import { localStorageManager } from "./local-storage" // Renamed to avoid conflict with global localStorage

// This class acts as an abstraction layer for data access.
// It tries to use GitHub API if configured, otherwise falls back to localStorage.
// For write operations, it will attempt to write to GitHub and then update localStorage.
// For read operations, it will prioritize GitHub if configured, otherwise read from localStorage.

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

interface PageContent {
  sections: Array<{
    id: string
    type: string
    title: string
    content: any
    order: number
  }>
}

interface AdminSettings {
  company: {
    name: string
    nameEn: string
    logo: string
    phone: string
    email: string
    address: string
    addressEn: string
  }
  social: {
    instagram: string
    facebook: string
    linkedin: string
    youtube: string
  }
  seo: {
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    keywords: string
    keywordsEn: string
  }
  contact: {
    workingHours: string
    workingHoursEn: string
    whatsapp: string
  }
  security: {
    twoFactorAuth: boolean
    captchaEnabled: boolean
    sessionTimeout: number
    maxLoginAttempts: number
  }
}

class DataManager {
  // Projects
  async getProjects(): Promise<Project[]> {
    if (githubAPI.isConfigured()) {
      try {
        const { projects } = await githubAPI.getProjects()
        localStorageManager.saveProjects(projects) // Sync to local storage
        return projects
      } catch (error) {
        console.warn("Failed to fetch projects from GitHub, falling back to local storage:", error)
        return localStorageManager.getProjects()
      }
    }
    return localStorageManager.getProjects()
  }

  async getProject(id: string): Promise<Project | null> {
    if (githubAPI.isConfigured()) {
      try {
        const { projects } = await githubAPI.getProjects() // Fetch all and find
        const project = projects.find((p: Project) => p.id === id)
        if (project) {
          localStorageManager.saveProjects(projects) // Sync to local storage
          return project
        }
      } catch (error) {
        console.warn("Failed to fetch project from GitHub, falling back to local storage:", error)
      }
    }
    return localStorageManager.getProject(id)
  }

  async createProject(projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "slug">): Promise<Project> {
    const projects = await this.getProjects() // Get current projects (from GitHub or local)
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(), // Simple ID generation
      slug: this.generateSlug(projectData.title.tr || projectData.title.en),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedProjects = [newProject, ...projects]

    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/projects.json",
          JSON.stringify({ projects: updatedProjects }, null, 2),
          `feat: Add new project: ${newProject.title.en}`,
        )
        localStorageManager.saveProjects(updatedProjects) // Sync to local storage
        return newProject
      } catch (error) {
        console.error("Failed to create project on GitHub, saving to local storage only:", error)
        localStorageManager.createProject(projectData) // Fallback to local storage
        throw error // Re-throw to indicate failure to GitHub
      }
    } else {
      localStorageManager.createProject(projectData) // Save to local storage
      return newProject
    }
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = await this.getProjects() // Get current projects (from GitHub or local)
    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error("Project not found")
    }

    const updatedProject = {
      ...projects[index],
      ...updates,
      slug:
        updates.title?.tr || updates.title?.en
          ? this.generateSlug(updates.title.tr || updates.title.en)
          : projects[index].slug,
      updatedAt: new Date().toISOString(),
    }
    projects[index] = updatedProject

    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/projects.json",
          JSON.stringify({ projects: projects }, null, 2),
          `feat: Update project: ${updatedProject.title.en}`,
        )
        localStorageManager.saveProjects(projects) // Sync to local storage
        return updatedProject
      } catch (error) {
        console.error("Failed to update project on GitHub, updating local storage only:", error)
        localStorageManager.updateProject(id, updates) // Fallback to local storage
        throw error // Re-throw to indicate failure to GitHub
      }
    } else {
      localStorageManager.updateProject(id, updates) // Update local storage
      return updatedProject
    }
  }

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects() // Get current projects (from GitHub or local)
    const updatedProjects = projects.filter((p) => p.id !== id)

    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/projects.json",
          JSON.stringify({ projects: updatedProjects }, null, 2),
          `feat: Delete project with ID: ${id}`,
        )
        localStorageManager.saveProjects(updatedProjects) // Sync to local storage
      } catch (error) {
        console.error("Failed to delete project on GitHub, deleting from local storage only:", error)
        localStorageManager.deleteProject(id) // Fallback to local storage
        throw error // Re-throw to indicate failure to GitHub
      }
    } else {
      localStorageManager.deleteProject(id) // Delete from local storage
    }
  }

  // Blog Posts
  async getBlogPosts(): Promise<{ posts: BlogPost[] }> {
    if (githubAPI.isConfigured()) {
      try {
        const data = await githubAPI.getBlogPosts()
        localStorageManager.saveBlogPosts(data.posts) // Sync to local storage
        return data
      } catch (error) {
        console.warn("Failed to fetch blog posts from GitHub, falling back to local storage:", error)
        return { posts: localStorageManager.getBlogPosts() }
      }
    }
    return { posts: localStorageManager.getBlogPosts() }
  }

  async getBlogPost(id: string): Promise<BlogPost | null> {
    if (githubAPI.isConfigured()) {
      try {
        const { posts } = await githubAPI.getBlogPosts()
        const post = posts.find((p: BlogPost) => p.id === id)
        if (post) {
          localStorageManager.saveBlogPosts(posts) // Sync to local storage
          return post
        }
      } catch (error) {
        console.warn("Failed to fetch blog post from GitHub, falling back to local storage:", error)
      }
    }
    return localStorageManager.getBlogPost(id)
  }

  async createBlogPost(postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    const { posts } = await this.getBlogPosts() // Get current posts (from GitHub or local)
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedPosts = [newPost, ...posts]

    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/blog.json",
          JSON.stringify({ posts: updatedPosts }, null, 2),
          `feat: Add new blog post: ${newPost.title.en}`,
        )
        localStorageManager.saveBlogPosts(updatedPosts) // Sync to local storage
        return newPost
      } catch (error) {
        console.error("Failed to create blog post on GitHub, saving to local storage only:", error)
        localStorageManager.createBlogPost(postData) // Fallback to local storage
        throw error
      }
    } else {
      localStorageManager.createBlogPost(postData) // Save to local storage
      return newPost
    }
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { posts } = await this.getBlogPosts() // Get current posts (from GitHub or local)
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

    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/blog.json",
          JSON.stringify({ posts: posts }, null, 2),
          `feat: Update blog post: ${updatedPost.title.en}`,
        )
        localStorageManager.saveBlogPosts(posts) // Sync to local storage
        return updatedPost
      } catch (error) {
        console.error("Failed to update blog post on GitHub, updating local storage only:", error)
        localStorageManager.updateBlogPost(id, updates) // Fallback to local storage
        throw error
      }
    } else {
      localStorageManager.updateBlogPost(id, updates) // Update local storage
      return updatedPost
    }
  }

  async deleteBlogPost(id: string): Promise<void> {
    const { posts } = await this.getBlogPosts() // Get current posts (from GitHub or local)
    const updatedPosts = posts.filter((p) => p.id !== id)

    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/blog.json",
          JSON.stringify({ posts: updatedPosts }, null, 2),
          `feat: Delete blog post with ID: ${id}`,
        )
        localStorageManager.saveBlogPosts(updatedPosts) // Sync to local storage
      } catch (error) {
        console.error("Failed to delete blog post on GitHub, deleting from local storage only:", error)
        localStorageManager.deleteBlogPost(id) // Fallback to local storage
        throw error
      }
    } else {
      localStorageManager.deleteBlogPost(id) // Delete from local storage
    }
  }

  // Page Content
  async getPageContent(page: string): Promise<PageContent | null> {
    if (githubAPI.isConfigured()) {
      try {
        const content = await githubAPI.getPageContent(page)
        localStorageManager.savePageContent(page, content) // Sync to local storage
        return content
      } catch (error) {
        console.warn(`Failed to fetch page content for ${page} from GitHub, falling back to local storage:`, error)
        return localStorageManager.getPageContent(page)
      }
    }
    return localStorageManager.getPageContent(page)
  }

  async savePageContent(page: string, content: PageContent): Promise<void> {
    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          `data/pages/${page}.json`,
          JSON.stringify(content, null, 2),
          `feat: Update content for page: ${page}`,
        )
        localStorageManager.savePageContent(page, content) // Sync to local storage
      } catch (error) {
        console.error(`Failed to save page content for ${page} on GitHub, saving to local storage only:`, error)
        localStorageManager.savePageContent(page, content) // Fallback to local storage
        throw error
      }
    } else {
      localStorageManager.savePageContent(page, content) // Save to local storage
    }
  }

  // Admin Settings
  async getAdminSettings(): Promise<AdminSettings> {
    if (githubAPI.isConfigured()) {
      try {
        const settings = await githubAPI.getAdminSettings()
        localStorageManager.saveAdminSettings(settings) // Sync to local storage
        return settings
      } catch (error) {
        console.warn("Failed to fetch admin settings from GitHub, falling back to local storage:", error)
        return localStorageManager.getAdminSettings()
      }
    }
    return localStorageManager.getAdminSettings()
  }

  async saveAdminSettings(settings: AdminSettings): Promise<void> {
    if (githubAPI.isConfigured()) {
      try {
        await githubAPI.updateFile(
          "data/settings.json",
          JSON.stringify(settings, null, 2),
          `feat: Update admin settings`,
        )
        localStorageManager.saveAdminSettings(settings) // Sync to local storage
      } catch (error) {
        console.error("Failed to save admin settings on GitHub, saving to local storage only:", error)
        localStorageManager.saveAdminSettings(settings) // Fallback to local storage
        throw error
      }
    } else {
      localStorageManager.saveAdminSettings(settings) // Save to local storage
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-ğüşöçİı]/g, "") // Remove non-alphanumeric chars except spaces and Turkish chars
      .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single dash
      .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/i/g, "i") // Ensure 'i' is handled correctly if it was capitalized
  }
}

export const dataManager = new DataManager()
