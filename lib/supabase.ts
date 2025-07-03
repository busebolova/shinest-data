import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Admin client for server-side operations
export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Helper functions
export async function getPageContent(page: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("page_contents").select("*").eq("page", page).single()

  if (error) {
    console.error("Error fetching page content:", error)
    return null
  }

  return data
}

export async function savePageContent(page: string, content: any) {
  const { data, error } = await supabaseAdmin.from("page_contents").upsert({
    page,
    content,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error saving page content:", error)
    throw error
  }

  return data
}

export async function getProjects() {
  const supabase = createClient()
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
}

export async function getProject(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

export async function saveProject(project: any) {
  const { data, error } = await supabaseAdmin.from("projects").upsert(project)

  if (error) {
    console.error("Error saving project:", error)
    throw error
  }

  return data
}

export async function deleteProject(id: string) {
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id)

  if (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

export async function getBlogPosts() {
  const supabase = createClient()
  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export async function uploadFile(file: File, bucket: string, path: string) {
  const { data, error } = await supabaseAdmin.storage.from(bucket).upload(path, file)

  if (error) {
    console.error("Error uploading file:", error)
    throw error
  }

  return data
}

export async function getFileUrl(bucket: string, path: string) {
  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}
