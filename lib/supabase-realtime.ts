import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern for client-side Supabase client
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  }
  return supabaseClient
}

// Server-side client
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Project types
export interface Project {
  id: string
  title: {
    tr: string
    en?: string
    de?: string
    fr?: string
    it?: string
    ru?: string
    ar?: string
  }
  slug: string
  category: string
  location: string | null
  year: string | null
  status: "draft" | "published" | "archived"
  featured_image: string | null
  images: string[]
  description: {
    tr: string
    en?: string
    de?: string
    fr?: string
    it?: string
    ru?: string
    ar?: string
  }
  full_description: {
    tr: string
    en?: string
    de?: string
    fr?: string
    it?: string
    ru?: string
    ar?: string
  }
  client: string | null
  area: string | null
  duration: string | null
  tags: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

// Mock data for development when Supabase is not available
const mockProjects: Project[] = [
  {
    id: "1",
    title: { tr: "Modern Ev Tasarımı", en: "Modern House Design" },
    slug: "modern-ev-tasarimi",
    category: "Residential",
    location: "İstanbul",
    year: "2024",
    status: "published",
    featured_image: "/images/modern-architecture.jpg",
    images: ["/images/modern-architecture.jpg", "/images/shinest-interior.jpg"],
    description: { tr: "Modern ve şık ev tasarımı", en: "Modern and elegant house design" },
    full_description: { tr: "Detaylı modern ev tasarımı açıklaması", en: "Detailed modern house design description" },
    client: "Özel Müşteri",
    area: "250m²",
    duration: "6 ay",
    tags: ["modern", "residential", "luxury"],
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: { tr: "Ofis İç Mekan", en: "Office Interior" },
    slug: "ofis-ic-mekan",
    category: "Commercial",
    location: "Ankara",
    year: "2023",
    status: "published",
    featured_image: "/images/modern-living-room.jpeg",
    images: ["/images/modern-living-room.jpeg"],
    description: { tr: "Profesyonel ofis iç mekan tasarımı", en: "Professional office interior design" },
    full_description: { tr: "Detaylı ofis tasarımı açıklaması", en: "Detailed office design description" },
    client: "ABC Şirketi",
    area: "500m²",
    duration: "4 ay",
    tags: ["office", "commercial", "professional"],
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Real-time project operations
export class ProjectService {
  private supabase = getSupabaseClient()

  // Get all projects with real-time subscription
  async getProjects(status?: "draft" | "published" | "archived"): Promise<Project[]> {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, using mock data")
        return mockProjects.filter((p) => !status || p.status === status)
      }

      let query = this.supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (status) {
        query = query.eq("status", status)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching projects:", error)
        // Return mock data on error
        return mockProjects.filter((p) => !status || p.status === status)
      }

      return (data as Project[]) || []
    } catch (error) {
      console.error("Error in getProjects:", error)
      // Return mock data on error
      return mockProjects.filter((p) => !status || p.status === status)
    }
  }

  // Get single project
  async getProject(slug: string): Promise<Project | null> {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, using mock data")
        return mockProjects.find((p) => p.slug === slug) || null
      }

      const { data, error } = await this.supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

      if (error) {
        console.error("Error fetching project:", error)
        // Return mock data on error
        return mockProjects.find((p) => p.slug === slug) || null
      }

      return data as Project
    } catch (error) {
      console.error("Error in getProject:", error)
      // Return mock data on error
      return mockProjects.find((p) => p.slug === slug) || null
    }
  }

  // Create project
  async createProject(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project> {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, simulating project creation")
        const newProject: Project = {
          ...project,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        mockProjects.unshift(newProject)
        return newProject
      }

      const { data, error } = await this.supabase.from("projects").insert([project]).select().single()

      if (error) {
        console.error("Error creating project:", error)
        throw error
      }

      return data as Project
    } catch (error) {
      console.error("Error in createProject:", error)
      throw error
    }
  }

  // Update project
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, simulating project update")
        const projectIndex = mockProjects.findIndex((p) => p.id === id)
        if (projectIndex !== -1) {
          mockProjects[projectIndex] = {
            ...mockProjects[projectIndex],
            ...updates,
            updated_at: new Date().toISOString(),
          }
          return mockProjects[projectIndex]
        }
        throw new Error("Project not found")
      }

      const { data, error } = await this.supabase.from("projects").update(updates).eq("id", id).select().single()

      if (error) {
        console.error("Error updating project:", error)
        throw error
      }

      return data as Project
    } catch (error) {
      console.error("Error in updateProject:", error)
      throw error
    }
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, simulating project deletion")
        const projectIndex = mockProjects.findIndex((p) => p.id === id)
        if (projectIndex !== -1) {
          mockProjects.splice(projectIndex, 1)
        }
        return
      }

      const { error } = await this.supabase.from("projects").delete().eq("id", id)

      if (error) {
        console.error("Error deleting project:", error)
        throw error
      }
    } catch (error) {
      console.error("Error in deleteProject:", error)
      throw error
    }
  }

  // Subscribe to real-time changes
  subscribeToProjects(callback: (payload: any) => void) {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, real-time subscription disabled")
        return { unsubscribe: () => {} }
      }

      return this.supabase
        .channel("projects-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "projects",
          },
          callback,
        )
        .subscribe()
    } catch (error) {
      console.error("Error in subscribeToProjects:", error)
      return { unsubscribe: () => {} }
    }
  }

  // Subscribe to specific project changes
  subscribeToProject(slug: string, callback: (payload: any) => void) {
    try {
      // Check if Supabase is properly configured
      if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl.includes("your-project") ||
        supabaseAnonKey.includes("your-anon-key")
      ) {
        console.warn("Supabase not configured, real-time subscription disabled")
        return { unsubscribe: () => {} }
      }

      return this.supabase
        .channel(`project-${slug}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "projects",
            filter: `slug=eq.${slug}`,
          },
          callback,
        )
        .subscribe()
    } catch (error) {
      console.error("Error in subscribeToProject:", error)
      return { unsubscribe: () => {} }
    }
  }
}

export const projectService = new ProjectService()
