// Mock Prisma client for development
// In production, replace with actual Prisma setup

interface Project {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured_image: string
  status: "draft" | "published"
  created_at: Date
  updated_at: Date
  slug: string
  tags: string[]
  client?: string
  location?: string
  year?: number
  area?: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  featured_image: string
  status: "draft" | "published"
  created_at: Date
  updated_at: Date
  slug: string
  tags: string[]
  author: string
  read_time: number
}

interface PageContent {
  id: string
  page: string
  section: string
  content: any
  language: string
  updated_at: Date
}

// Mock data store
const mockData = {
  projects: [] as Project[],
  blogPosts: [] as BlogPost[],
  pageContents: [] as PageContent[],
}

// Mock Prisma client
export const prisma = {
  project: {
    findMany: async (options?: any) => {
      let projects = [...mockData.projects]

      if (options?.where?.status) {
        projects = projects.filter((p) => p.status === options.where.status)
      }

      if (options?.where?.category) {
        projects = projects.filter((p) => p.category === options.where.category)
      }

      if (options?.orderBy) {
        projects.sort((a, b) => {
          const field = Object.keys(options.orderBy)[0]
          const order = options.orderBy[field]
          if (order === "desc") {
            return (
              new Date(b[field as keyof Project] as string).getTime() -
              new Date(a[field as keyof Project] as string).getTime()
            )
          }
          return (
            new Date(a[field as keyof Project] as string).getTime() -
            new Date(b[field as keyof Project] as string).getTime()
          )
        })
      }

      if (options?.take) {
        projects = projects.slice(0, options.take)
      }

      return projects
    },

    findUnique: async (options: { where: { id?: string; slug?: string } }) => {
      return mockData.projects.find((p) => p.id === options.where.id || p.slug === options.where.slug) || null
    },

    create: async (options: { data: Omit<Project, "id" | "created_at" | "updated_at"> }) => {
      const project: Project = {
        ...options.data,
        id: Date.now().toString(),
        created_at: new Date(),
        updated_at: new Date(),
      }
      mockData.projects.push(project)
      return project
    },

    update: async (options: { where: { id: string }; data: Partial<Project> }) => {
      const index = mockData.projects.findIndex((p) => p.id === options.where.id)
      if (index !== -1) {
        mockData.projects[index] = {
          ...mockData.projects[index],
          ...options.data,
          updated_at: new Date(),
        }
        return mockData.projects[index]
      }
      throw new Error("Project not found")
    },

    delete: async (options: { where: { id: string } }) => {
      const index = mockData.projects.findIndex((p) => p.id === options.where.id)
      if (index !== -1) {
        const deleted = mockData.projects.splice(index, 1)[0]
        return deleted
      }
      throw new Error("Project not found")
    },
  },

  blogPost: {
    findMany: async (options?: any) => {
      let posts = [...mockData.blogPosts]

      if (options?.where?.status) {
        posts = posts.filter((p) => p.status === options.where.status)
      }

      if (options?.orderBy) {
        posts.sort((a, b) => {
          const field = Object.keys(options.orderBy)[0]
          const order = options.orderBy[field]
          if (order === "desc") {
            return (
              new Date(b[field as keyof BlogPost] as string).getTime() -
              new Date(a[field as keyof BlogPost] as string).getTime()
            )
          }
          return (
            new Date(a[field as keyof BlogPost] as string).getTime() -
            new Date(b[field as keyof BlogPost] as string).getTime()
          )
        })
      }

      if (options?.take) {
        posts = posts.slice(0, options.take)
      }

      return posts
    },

    findUnique: async (options: { where: { id?: string; slug?: string } }) => {
      return mockData.blogPosts.find((p) => p.id === options.where.id || p.slug === options.where.slug) || null
    },

    create: async (options: { data: Omit<BlogPost, "id" | "created_at" | "updated_at"> }) => {
      const post: BlogPost = {
        ...options.data,
        id: Date.now().toString(),
        created_at: new Date(),
        updated_at: new Date(),
      }
      mockData.blogPosts.push(post)
      return post
    },

    update: async (options: { where: { id: string }; data: Partial<BlogPost> }) => {
      const index = mockData.blogPosts.findIndex((p) => p.id === options.where.id)
      if (index !== -1) {
        mockData.blogPosts[index] = {
          ...mockData.blogPosts[index],
          ...options.data,
          updated_at: new Date(),
        }
        return mockData.blogPosts[index]
      }
      throw new Error("Blog post not found")
    },

    delete: async (options: { where: { id: string } }) => {
      const index = mockData.blogPosts.findIndex((p) => p.id === options.where.id)
      if (index !== -1) {
        const deleted = mockData.blogPosts.splice(index, 1)[0]
        return deleted
      }
      throw new Error("Blog post not found")
    },
  },

  pageContent: {
    findMany: async (options?: any) => {
      let contents = [...mockData.pageContents]

      if (options?.where?.page) {
        contents = contents.filter((c) => c.page === options.where.page)
      }

      if (options?.where?.language) {
        contents = contents.filter((c) => c.language === options.where.language)
      }

      return contents
    },

    upsert: async (options: {
      where: { page_section_language: { page: string; section: string; language: string } }
      create: PageContent
      update: Partial<PageContent>
    }) => {
      const existing = mockData.pageContents.find(
        (c) =>
          c.page === options.where.page_section_language.page &&
          c.section === options.where.page_section_language.section &&
          c.language === options.where.page_section_language.language,
      )

      if (existing) {
        Object.assign(existing, options.update, { updated_at: new Date() })
        return existing
      } else {
        const newContent: PageContent = {
          ...options.create,
          id: Date.now().toString(),
          updated_at: new Date(),
        }
        mockData.pageContents.push(newContent)
        return newContent
      }
    },
  },
}

export default prisma
