import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (singleton pattern)
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return supabaseClient
}

// Server-side Supabase client
export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Database types
export interface Project {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured_image: string
  status: "draft" | "published"
  created_at: string
  updated_at: string
  slug: string
  tags: string[]
  client?: string
  location?: string
  year?: number
  area?: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  featured_image: string
  status: "draft" | "published"
  created_at: string
  updated_at: string
  slug: string
  tags: string[]
  author: string
  read_time: number
}

export interface PageContent {
  id: string
  page: string
  section: string
  content: any
  language: string
  updated_at: string
}

export interface MediaFile {
  id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  url: string
  alt_text?: string
  created_at: string
  folder?: string
}

// Helper functions
export async function uploadFile(file: File, folder = "uploads"): Promise<string> {
  const supabase = getSupabaseClient()
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage.from("media").upload(filePath, file)

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filePath)

  return publicUrl
}

export async function deleteFile(path: string): Promise<void> {
  const supabase = getSupabaseClient()

  const { error } = await supabase.storage.from("media").remove([path])

  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}

export async function getProjects(limit?: number, category?: string): Promise<Project[]> {
  const supabase = getSupabaseClient()

  let query = supabase.from("projects").select("*").eq("status", "published").order("created_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return data || []
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const supabase = getSupabaseClient()

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch blog posts: ${error.message}`)
  }

  return data || []
}

export async function getPageContent(page: string, language = "tr"): Promise<PageContent[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.from("page_contents").select("*").eq("page", page).eq("language", language)

  if (error) {
    throw new Error(`Failed to fetch page content: ${error.message}`)
  }

  return data || []
}

export async function savePageContent(page: string, section: string, content: any, language = "tr"): Promise<void> {
  const supabase = getSupabaseClient()

  const { error } = await supabase.from("page_contents").upsert(
    {
      page,
      section,
      content,
      language,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "page,section,language",
    },
  )

  if (error) {
    throw new Error(`Failed to save page content: ${error.message}`)
  }
}

// Default export
export default getSupabaseClient
