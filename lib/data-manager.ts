import LocalStorage from "./local-storage"
import { githubApi } from "./github-api"

interface DataManagerConfig {
  useGitHub: boolean
  fallbackToLocalStorage: boolean
}

class DataManager {
  private config: DataManagerConfig

  constructor(config: DataManagerConfig = { useGitHub: true, fallbackToLocalStorage: true }) {
    this.config = config
  }

  private async tryGitHub<T>(operation: () => Promise<T>): Promise<T | null> {
    if (!this.config.useGitHub || !githubApi.isConfigured()) {
      return null
    }

    try {
      return await operation()
    } catch (error) {
      console.error("GitHub operation failed:", error)
      return null
    }
  }

  // Projects
  async getProjects(): Promise<any[]> {
    const githubResult = await this.tryGitHub(() => githubApi.getProjects())

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        LocalStorage.saveProjects(githubResult)
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      return LocalStorage.getProjects()
    }

    return []
  }

  async getProject(id: string): Promise<any | null> {
    const githubResult = await this.tryGitHub(() => githubApi.getProject(id))

    if (githubResult) {
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      const projects = LocalStorage.getProjects()
      return projects.find((p) => p.id === id) || null
    }

    return null
  }

  async createProject(project: any): Promise<any> {
    const githubResult = await this.tryGitHub(() => githubApi.createProject(project))

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        const projects = LocalStorage.getProjects()
        LocalStorage.saveProjects([githubResult, ...projects])
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      const newProject = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const projects = LocalStorage.getProjects()
      LocalStorage.saveProjects([newProject, ...projects])
      return newProject
    }

    throw new Error("Unable to create project")
  }

  async updateProject(id: string, updates: any): Promise<any> {
    const githubResult = await this.tryGitHub(() => githubApi.updateProject(id, updates))

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        const projects = LocalStorage.getProjects()
        const index = projects.findIndex((p) => p.id === id)
        if (index !== -1) {
          projects[index] = githubResult
          LocalStorage.saveProjects(projects)
        }
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      const projects = LocalStorage.getProjects()
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
      LocalStorage.saveProjects(projects)
      return updatedProject
    }

    throw new Error("Unable to update project")
  }

  async deleteProject(id: string): Promise<void> {
    const githubSuccess = await this.tryGitHub(() => githubApi.deleteProject(id))

    if (githubSuccess !== null) {
      if (this.config.fallbackToLocalStorage) {
        const projects = LocalStorage.getProjects()
        const filteredProjects = projects.filter((p) => p.id !== id)
        LocalStorage.saveProjects(filteredProjects)
      }
      return
    }

    if (this.config.fallbackToLocalStorage) {
      const projects = LocalStorage.getProjects()
      const filteredProjects = projects.filter((p) => p.id !== id)
      LocalStorage.saveProjects(filteredProjects)
      return
    }

    throw new Error("Unable to delete project")
  }

  // Blog Posts
  async getBlogPosts(): Promise<any[]> {
    const githubResult = await this.tryGitHub(() => githubApi.getBlogPosts())

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        LocalStorage.saveBlogPosts(githubResult)
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      return LocalStorage.getBlogPosts()
    }

    return []
  }

  async getBlogPost(id: string): Promise<any | null> {
    const githubResult = await this.tryGitHub(() => githubApi.getBlogPost(id))

    if (githubResult) {
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      const posts = LocalStorage.getBlogPosts()
      return posts.find((p) => p.id === id) || null
    }

    return null
  }

  async createBlogPost(post: any): Promise<any> {
    const githubResult = await this.tryGitHub(() => githubApi.createBlogPost(post))

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        const posts = LocalStorage.getBlogPosts()
        LocalStorage.saveBlogPosts([githubResult, ...posts])
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      const newPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const posts = LocalStorage.getBlogPosts()
      LocalStorage.saveBlogPosts([newPost, ...posts])
      return newPost
    }

    throw new Error("Unable to create blog post")
  }

  async updateBlogPost(id: string, updates: any): Promise<any> {
    const githubResult = await this.tryGitHub(() => githubApi.updateBlogPost(id, updates))

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        const posts = LocalStorage.getBlogPosts()
        const index = posts.findIndex((p) => p.id === id)
        if (index !== -1) {
          posts[index] = githubResult
          LocalStorage.saveBlogPosts(posts)
        }
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      const posts = LocalStorage.getBlogPosts()
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
      LocalStorage.saveBlogPosts(posts)
      return updatedPost
    }

    throw new Error("Unable to update blog post")
  }

  async deleteBlogPost(id: string): Promise<void> {
    const githubSuccess = await this.tryGitHub(() => githubApi.deleteBlogPost(id))

    if (githubSuccess !== null) {
      if (this.config.fallbackToLocalStorage) {
        const posts = LocalStorage.getBlogPosts()
        const filteredPosts = posts.filter((p) => p.id !== id)
        LocalStorage.saveBlogPosts(filteredPosts)
      }
      return
    }

    if (this.config.fallbackToLocalStorage) {
      const posts = LocalStorage.getBlogPosts()
      const filteredPosts = posts.filter((p) => p.id !== id)
      LocalStorage.saveBlogPosts(filteredPosts)
      return
    }

    throw new Error("Unable to delete blog post")
  }

  // Page Content
  async getPageContent(page: string): Promise<any> {
    const githubResult = await this.tryGitHub(() => githubApi.getPageContent(page))

    if (githubResult) {
      if (this.config.fallbackToLocalStorage) {
        LocalStorage.savePageContent(page, githubResult)
      }
      return githubResult
    }

    if (this.config.fallbackToLocalStorage) {
      return LocalStorage.getPageContent(page)
    }

    return {}
  }

  async savePageContent(page: string, content: any): Promise<void> {
    const githubSuccess = await this.tryGitHub(() => githubApi.savePageContent(page, content))

    if (githubSuccess !== null) {
      if (this.config.fallbackToLocalStorage) {
        LocalStorage.savePageContent(page, content)
      }
      return
    }

    if (this.config.fallbackToLocalStorage) {
      LocalStorage.savePageContent(page, content)
      return
    }

    throw new Error("Unable to save page content")
  }
}

export const dataManager = new DataManager()
export default DataManager
