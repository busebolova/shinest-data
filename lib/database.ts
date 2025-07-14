// GitHub-based database operations
import { githubAPI } from "./github-api"

export interface Project {
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

export interface BlogPost {
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

export interface PageContent {
  page: string
  content: any
  updatedAt: string
}

// Local database fallback
class LocalDatabase {
  private projects: Project[] = []
  private blogPosts: BlogPost[] = []
  private pageContents: Map<string, any> = new Map()

  // Project operations
  async getProjects(): Promise<Project[]> {
    try {
      return await githubAPI.getProjects()
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      return this.projects
    }
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      return await githubAPI.getProject(id)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      return this.projects.find((p) => p.id === id) || null
    }
  }

  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    try {
      return await githubAPI.createProject(project)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.projects.unshift(newProject)
      return newProject
    }
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
      return await githubAPI.updateProject(id, updates)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      const index = this.projects.findIndex((p) => p.id === id)
      if (index === -1) {
        throw new Error("Project not found")
      }
      const updatedProject = {
        ...this.projects[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      this.projects[index] = updatedProject
      return updatedProject
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await githubAPI.deleteProject(id)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      this.projects = this.projects.filter((p) => p.id !== id)
    }
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      return await githubAPI.getBlogPosts()
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      return this.blogPosts
    }
  }

  async createBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    try {
      return await githubAPI.createBlogPost(post)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.blogPosts.unshift(newPost)
      return newPost
    }
  }

  // Page content operations
  async getPageContent(page: string): Promise<any> {
    try {
      return await githubAPI.getPageContent(page)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      return this.pageContents.get(page) || {}
    }
  }

  async savePageContent(page: string, content: any): Promise<void> {
    try {
      await githubAPI.savePageContent(page, content)
    } catch (error) {
      console.error("GitHub API error, using local fallback:", error)
      this.pageContents.set(page, content)
    }
  }
}

// Create local database instance
const localDatabase = new LocalDatabase()

// Project operations
export async function getProjects(): Promise<Project[]> {
  return await localDatabase.getProjects()
}

export async function getProject(id: string): Promise<Project | null> {
  return await localDatabase.getProject(id)
}

export async function createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  return await localDatabase.createProject(project)
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  return await localDatabase.updateProject(id, updates)
}

export async function deleteProject(id: string): Promise<void> {
  return await localDatabase.deleteProject(id)
}

// Blog operations
export async function getBlogPosts(): Promise<BlogPost[]> {
  return await localDatabase.getBlogPosts()
}

export async function createBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
  return await localDatabase.createBlogPost(post)
}

// Page content operations
export async function getPageContent(page: string): Promise<any> {
  return await localDatabase.getPageContent(page)
}

export async function savePageContent(page: string, content: any): Promise<void> {
  return await localDatabase.savePageContent(page, content)
}

// Dashboard stats
export async function getDashboardStats() {
  const projects = await getProjects()
  const blogPosts = await getBlogPosts()

  return {
    totalProjects: projects.length,
    publishedProjects: projects.filter((p) => p.status === "published").length,
    draftProjects: projects.filter((p) => p.status === "draft").length,
    featuredProjects: projects.filter((p) => p.featured).length,
    totalBlogPosts: blogPosts.length,
    publishedBlogPosts: blogPosts.filter((p) => p.status === "published").length,
    draftBlogPosts: blogPosts.filter((p) => p.status === "draft").length,
  }
}

// Export local database instance
export const localDb = localDatabase
