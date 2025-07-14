export interface Project {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: { tr: string; en: string }
  location: string
  year: string
  status: "published" | "draft" | "archived"
  featured: boolean
  images: string[]
  slug: string
  features?: { tr: string[]; en: string[] }
  createdAt: string
  updatedAt: string
}
