export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: Json
          slug: string
          category: string
          location: string | null
          year: string | null
          status: "draft" | "published" | "archived"
          featured_image: string | null
          images: Json
          description: Json
          full_description: Json
          client: string | null
          area: string | null
          duration: string | null
          tags: Json
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: Json
          slug: string
          category: string
          location?: string | null
          year?: string | null
          status?: "draft" | "published" | "archived"
          featured_image?: string | null
          images?: Json
          description?: Json
          full_description?: Json
          client?: string | null
          area?: string | null
          duration?: string | null
          tags?: Json
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: Json
          slug?: string
          category?: string
          location?: string | null
          year?: string | null
          status?: "draft" | "published" | "archived"
          featured_image?: string | null
          images?: Json
          description?: Json
          full_description?: Json
          client?: string | null
          area?: string | null
          duration?: string | null
          tags?: Json
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      page_contents: {
        Row: {
          id: string
          page: string
          section: string
          content: Json
          language: string
          updated_at: string
        }
        Insert: {
          id?: string
          page: string
          section: string
          content: Json
          language?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page?: string
          section?: string
          content?: Json
          language?: string
          updated_at?: string
        }
      }
    }
    Views: {
      // No views are relevant to the current implementation.
    }
    Functions: {
      // No functions are relevant to the current implementation.
    }
    Enums: {
      // No enums are relevant to the current implementation.
    }
  }
}
