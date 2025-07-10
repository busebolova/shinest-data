import { githubAPI } from "./github-api"
import { localStorage } from "./local-storage"

class DataManager {
  private useGitHub: boolean

  constructor() {
    this.useGitHub = githubAPI.isConfigured()
  }

  // Projects
  async getProjects() {
    try {
      if (this.useGitHub) {
        return await githubAPI.getProjects()
      } else {
        return localStorage.getProjects()
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      return localStorage.getProjects()
    }
  }

  async getProject(id: string) {
    try {
      if (this.useGitHub) {
        return await githubAPI.getProject(id)
      } else {
        return localStorage.getProject(id)
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      return localStorage.getProject(id)
    }
  }

  async createProject(project: any) {
    try {
      if (this.useGitHub) {
        return await githubAPI.createProject(project)
      } else {
        return localStorage.createProject(project)
      }
    } catch (error) {
      console.error("Error creating project:", error)
      return localStorage.createProject(project)
    }
  }

  async updateProject(id: string, updates: any) {
    try {
      if (this.useGitHub) {
        return await githubAPI.updateProject(id, updates)
      } else {
        return localStorage.updateProject(id, updates)
      }
    } catch (error) {
      console.error("Error updating project:", error)
      return localStorage.updateProject(id, updates)
    }
  }

  async deleteProject(id: string) {
    try {
      if (this.useGitHub) {
        await githubAPI.deleteProject(id)
      } else {
        localStorage.deleteProject(id)
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      localStorage.deleteProject(id)
    }
  }

  // Blog
  async getBlogPosts() {
    try {
      if (this.useGitHub) {
        return await githubAPI.getBlogPosts()
      } else {
        return localStorage.getBlogPosts()
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      return localStorage.getBlogPosts()
    }
  }

  async createBlogPost(post: any) {
    try {
      if (this.useGitHub) {
        return await githubAPI.createBlogPost(post)
      } else {
        return localStorage.createBlogPost(post)
      }
    } catch (error) {
      console.error("Error creating blog post:", error)
      return localStorage.createBlogPost(post)
    }
  }

  // Pages
  async getPageContent(page: string) {
    try {
      if (this.useGitHub) {
        return await githubAPI.getPageContent(page)
      } else {
        return localStorage.getPageContent(page)
      }
    } catch (error) {
      console.error("Error fetching page content:", error)
      return localStorage.getPageContent(page)
    }
  }

  async savePageContent(page: string, content: any) {
    try {
      if (this.useGitHub) {
        await githubAPI.savePageContent(page, content)
      } else {
        localStorage.savePageContent(page, content)
      }
    } catch (error) {
      console.error("Error saving page content:", error)
      localStorage.savePageContent(page, content)
    }
  }

  isGitHubConfigured() {
    return this.useGitHub
  }
}

export const dataManager = new DataManager()
