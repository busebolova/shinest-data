import { githubAPI } from "./github-api"

// Cache for client-side data
let projectsCache: any[] | null = null
let contentCache: any = {}

// Projects
export async function getProjects() {
  try {
    if (typeof window !== "undefined" && projectsCache) {
      return projectsCache
    }

    const projects = await githubAPI.getProjects()

    if (typeof window !== "undefined") {
      projectsCache = projects
    }

    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProject(slug: string) {
  try {
    const projects = await getProjects()
    return projects.find((p: any) => p.slug === slug) || null
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

export async function createProject(project: any) {
  try {
    await githubAPI.createProject(project)
    clearProjectsCache()
    return project
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

export async function updateProject(id: string, updates: any) {
  try {
    await githubAPI.updateProject(id, updates)
    clearProjectsCache()
    return updates
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

export async function deleteProject(id: string) {
  try {
    await githubAPI.deleteProject(id)
    clearProjectsCache()
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Content
export async function getContent(type = "home") {
  try {
    if (typeof window !== "undefined" && contentCache[type]) {
      return contentCache[type]
    }

    const content = await githubAPI.getPageContent(type)

    if (typeof window !== "undefined") {
      contentCache[type] = content
    }

    return content
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error)
    return null
  }
}

export async function saveContent(type: string, content: any) {
  try {
    await githubAPI.savePageContent(type, content)
    clearContentCache(type)
    return content
  } catch (error) {
    console.error(`Error saving ${type} content:`, error)
    throw error
  }
}

// Blog
export async function getBlogPosts() {
  try {
    return await githubAPI.getBlogPosts()
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(id: string) {
  try {
    return await githubAPI.getBlogPost(id)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function createBlogPost(post: any) {
  try {
    await githubAPI.createBlogPost(post)
    return post
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

export async function updateBlogPost(id: string, updates: any) {
  try {
    await githubAPI.updateBlogPost(id, updates)
    return updates
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw error
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await githubAPI.deleteBlogPost(id)
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }
}

// Services (static for now, can be moved to GitHub later)
export const services = [
  {
    id: 1,
    title: "Danışmanlık",
    slug: "consulting",
    description: "Profesyonel iç mimarlık danışmanlığı hizmeti",
    image: "/images/consulting-service.png",
    features: ["Mekan Analizi", "Konsept Geliştirme", "Bütçe Planlama", "Proje Yönetimi"],
    fullDescription:
      "Uzman ekibimizle birlikte mekanınızın potansiyelini keşfedin. Profesyonel danışmanlık hizmetimiz ile hayalinizdeki yaşam alanını gerçeğe dönüştürün.",
    process: ["İlk Görüşme", "Mekan İncelemesi", "Konsept Sunumu", "Detay Planlama"],
  },
  {
    id: 2,
    title: "Tasarım",
    slug: "design",
    description: "Yaratıcı ve işlevsel tasarım çözümleri",
    image: "/images/design-service.png",
    features: ["3D Görselleştirme", "Teknik Çizimler", "Malzeme Seçimi", "Renk Paleti"],
    fullDescription:
      "Özgün tasarım yaklaşımımızla mekanlarınıza kişilik katıyoruz. Her detayı özenle planlanan tasarımlarımız ile fark yaratın.",
    process: ["Konsept Geliştirme", "3D Modelleme", "Malzeme Seçimi", "Final Tasarım"],
  },
  {
    id: 3,
    title: "Uygulama",
    slug: "implementation",
    description: "Tasarımdan gerçeğe dönüşüm süreci",
    image: "/images/implementation-service.png",
    features: ["Uygulama Takibi", "Kalite Kontrolü", "Zaman Yönetimi", "Son Kontrol"],
    fullDescription:
      "Tasarımlarınızı en yüksek kalite standartlarında hayata geçiriyoruz. Deneyimli uygulama ekibimiz ile mükemmel sonuçlar elde edin.",
    process: ["Uygulama Planı", "Malzeme Temini", "İnşaat Süreci", "Teslim"],
  },
]

export function getServices() {
  return services
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug) || null
}

// Blog posts (static for now)
export const blogPosts = [
  {
    id: 1,
    title: "Modern İç Mimarlık Trendleri 2024",
    slug: "modern-ic-mimarlik-trendleri-2024",
    excerpt: "2024 yılının en popüler iç mimarlık trendlerini keşfedin",
    image: "/modern-interior-2024.png",
    date: "2024-01-15",
    content:
      "Modern iç mimarlık dünyasında 2024 yılı birçok yenilik getiriyor. Sürdürülebilir malzemeler, akıllı ev teknolojileri ve minimalist tasarım anlayışı öne çıkıyor.",
  },
  {
    id: 2,
    title: "Küçük Mekanlar İçin Büyük Fikirler",
    slug: "kucuk-mekanlar-icin-buyuk-fikirler",
    excerpt: "Sınırlı alanlarda maksimum verimlilik nasıl sağlanır?",
    image: "/small-space-interior.png",
    date: "2024-01-10",
    content:
      "Küçük mekanları büyük göstermenin sırları: Doğru renk seçimi, akıllı depolama çözümleri ve çok fonksiyonlu mobilyalar.",
  },
  {
    id: 3,
    title: "Sürdürülebilir İç Mimarlık",
    slug: "surdurulebilir-ic-mimarlik",
    excerpt: "Çevre dostu tasarım yaklaşımları ve malzemeler",
    image: "/sustainable-interior.png",
    date: "2024-01-05",
    content:
      "Sürdürülebilir tasarım prensipleri ve çevre dostu malzemelerle hem doğayı koruyun hem de sağlıklı yaşam alanları yaratın.",
  },
]

// Form işlemleri
export function createFormSubmission(type: string, data: any) {
  console.log("Form submission:", { type, data })
  return Promise.resolve({ success: true, message: "Form başarıyla gönderildi!" })
}

export function subscribeNewsletter(email: string, name?: string) {
  console.log("Newsletter subscription:", { email, name })
  return Promise.resolve({ success: true, message: "Bültene başarıyla kaydoldunuz!" })
}

// Clear cache functions
export function clearProjectsCache() {
  projectsCache = null
}

export function clearContentCache(type?: string) {
  if (type) {
    delete contentCache[type]
  } else {
    contentCache = {}
  }
}
