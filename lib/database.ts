// Simple in-memory database for demo purposes
// In production, this would connect to a real database

interface DatabaseTable {
  [key: string]: any[]
}

class SimpleDatabase {
  private data: DatabaseTable = {
    projects: [],
    blog_posts: [],
    page_contents: [],
    media_files: [],
  }

  // Projects
  async getProjects() {
    return this.data.projects || []
  }

  async createProject(project: any) {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    this.data.projects.push(newProject)
    return newProject
  }

  async updateProject(id: string, updates: any) {
    const index = this.data.projects.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.data.projects[index] = {
        ...this.data.projects[index],
        ...updates,
        updated_at: new Date().toISOString(),
      }
      return this.data.projects[index]
    }
    return null
  }

  async deleteProject(id: string) {
    this.data.projects = this.data.projects.filter((p) => p.id !== id)
    return true
  }

  // Blog posts
  async getBlogPosts() {
    return this.data.blog_posts || []
  }

  async createBlogPost(post: any) {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    this.data.blog_posts.push(newPost)
    return newPost
  }

  async updateBlogPost(id: string, updates: any) {
    const index = this.data.blog_posts.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.data.blog_posts[index] = {
        ...this.data.blog_posts[index],
        ...updates,
        updated_at: new Date().toISOString(),
      }
      return this.data.blog_posts[index]
    }
    return null
  }

  async deleteBlogPost(id: string) {
    this.data.blog_posts = this.data.blog_posts.filter((p) => p.id !== id)
    return true
  }

  // Page contents
  async getPageContent(page: string) {
    return this.data.page_contents.find((p) => p.page === page) || null
  }

  async savePageContent(page: string, content: any) {
    const existingIndex = this.data.page_contents.findIndex((p) => p.page === page)
    const pageContent = {
      page,
      content,
      updated_at: new Date().toISOString(),
    }

    if (existingIndex !== -1) {
      this.data.page_contents[existingIndex] = pageContent
    } else {
      this.data.page_contents.push(pageContent)
    }

    return pageContent
  }

  // Media files
  async getMediaFiles() {
    return this.data.media_files || []
  }

  async saveMediaFile(file: any) {
    const newFile = {
      ...file,
      id: Date.now().toString(),
      uploaded_at: new Date().toISOString(),
    }
    this.data.media_files.push(newFile)
    return newFile
  }

  async deleteMediaFile(id: string) {
    this.data.media_files = this.data.media_files.filter((f) => f.id !== id)
    return true
  }
}

export const db = new SimpleDatabase()
