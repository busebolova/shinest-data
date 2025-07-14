// Simple localStorage-based database for client-side operations
// This will be used as a fallback when GitHub API is not available

interface DatabaseItem {
  id: string
  createdAt: string
  updatedAt: string
  [key: string]: any
}

class LocalDatabase {
  private getStorageKey(table: string): string {
    return `shinest_${table}`
  }

  private getTable<T extends DatabaseItem>(table: string): T[] {
    if (typeof window === "undefined") return []

    try {
      const data = localStorage.getItem(this.getStorageKey(table))
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error reading ${table} from localStorage:`, error)
      return []
    }
  }

  private setTable<T extends DatabaseItem>(table: string, data: T[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.getStorageKey(table), JSON.stringify(data))
    } catch (error) {
      console.error(`Error writing ${table} to localStorage:`, error)
    }
  }

  // Generic CRUD operations
  async create<T extends DatabaseItem>(table: string, item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const items = this.getTable<T>(table)
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T

    items.push(newItem)
    this.setTable(table, items)
    return newItem
  }

  async findAll<T extends DatabaseItem>(table: string): Promise<T[]> {
    return this.getTable<T>(table)
  }

  async findById<T extends DatabaseItem>(table: string, id: string): Promise<T | null> {
    const items = this.getTable<T>(table)
    return items.find((item) => item.id === id) || null
  }

  async update<T extends DatabaseItem>(table: string, id: string, updates: Partial<T>): Promise<T | null> {
    const items = this.getTable<T>(table)
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) return null

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.setTable(table, items)
    return items[index]
  }

  async delete(table: string, id: string): Promise<boolean> {
    const items = this.getTable(table)
    const filteredItems = items.filter((item) => item.id !== id)

    if (filteredItems.length === items.length) return false

    this.setTable(table, filteredItems)
    return true
  }

  // Specific methods for different data types
  async getProjects() {
    return this.findAll("projects")
  }

  async createProject(project: any) {
    return this.create("projects", project)
  }

  async updateProject(id: string, updates: any) {
    return this.update("projects", id, updates)
  }

  async deleteProject(id: string) {
    return this.delete("projects", id)
  }

  async getBlogPosts() {
    return this.findAll("blog_posts")
  }

  async createBlogPost(post: any) {
    return this.create("blog_posts", post)
  }

  async updateBlogPost(id: string, updates: any) {
    return this.update("blog_posts", id, updates)
  }

  async deleteBlogPost(id: string) {
    return this.delete("blog_posts", id)
  }

  async getPageContent(page: string) {
    const contents = this.getTable("page_contents")
    const content = contents.find((c: any) => c.page === page)
    return content?.data || null
  }

  async updatePageContent(page: string, data: any) {
    const contents = this.getTable("page_contents")
    const existingIndex = contents.findIndex((c: any) => c.page === page)

    if (existingIndex !== -1) {
      contents[existingIndex] = {
        ...contents[existingIndex],
        data,
        updatedAt: new Date().toISOString(),
      }
    } else {
      contents.push({
        id: Date.now().toString(),
        page,
        data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    this.setTable("page_contents", contents)
    return { page, data }
  }

  // Initialize with sample data
  async initializeSampleData() {
    const projects = await this.getProjects()
    if (projects.length === 0) {
      const sampleProjects = [
        {
          title: "Modern Ev Tasarımı",
          description: "Minimalist ve fonksiyonel ev iç mekan tasarımı",
          category: "Residential",
          status: "completed",
          images: ["/images/gallery-1.png", "/images/gallery-2.png"],
          featured: true,
        },
        {
          title: "Ofis Renovasyonu",
          description: "Kurumsal ofis alanı yenileme projesi",
          category: "Commercial",
          status: "in-progress",
          images: ["/images/gallery-3.png", "/images/gallery-4.png"],
          featured: false,
        },
      ]

      for (const project of sampleProjects) {
        await this.createProject(project)
      }
    }

    const blogPosts = await this.getBlogPosts()
    if (blogPosts.length === 0) {
      const samplePosts = [
        {
          title: "2024 İç Mimarlık Trendleri",
          content: "Bu yıl öne çıkan iç mimarlık trendleri ve uygulamaları...",
          excerpt: "2024 yılında iç mimarlık dünyasında neler değişiyor?",
          status: "published",
          featured: true,
        },
        {
          title: "Küçük Mekanları Büyük Gösterme Sanatı",
          content: "Küçük alanları daha geniş gösterecek tasarım ipuçları...",
          excerpt: "Küçük mekanları nasıl daha büyük gösterebiliriz?",
          status: "published",
          featured: false,
        },
      ]

      for (const post of samplePosts) {
        await this.createBlogPost(post)
      }
    }
  }
}

export const localDb = new LocalDatabase()
export default LocalDatabase
