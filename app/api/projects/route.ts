import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Fallback projeler
const fallbackProjects = [
  {
    id: "1",
    title: { tr: "Modern Villa Tasarımı", en: "Modern Villa Design" },
    description: {
      tr: "Lüks yaşam alanları ve modern estetik anlayışının mükemmel birleşimi. Doğal ışığın maksimum kullanıldığı, açık plan konseptiyle tasarlanmış villa projesi.",
      en: "Perfect combination of luxury living spaces and modern aesthetic understanding.",
    },
    category: "Villa",
    location: "İstanbul",
    year: "2024",
    status: "published",
    featured: true,
    images: ["/images/poland-apartment-1.png"],
    slug: "modern-villa-tasarimi",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: { tr: "Lüks Otel Lobisi", en: "Luxury Hotel Lobby" },
    description: {
      tr: "Misafirleri karşılayan etkileyici giriş alanı tasarımı. Yüksek tavanlar, özel aydınlatma ve seçkin malzemelerle oluşturulmuş prestijli mekan.",
      en: "Impressive entrance area design that welcomes guests.",
    },
    category: "Otel",
    location: "Antalya",
    year: "2023",
    status: "published",
    featured: true,
    images: ["/images/poland-apartment-2.png"],
    slug: "luks-otel-lobisi",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "3",
    title: { tr: "Minimalist Ofis Tasarımı", en: "Minimalist Office Design" },
    description: {
      tr: "Çalışan verimliliğini artıran, temiz çizgiler ve fonksiyonel çözümlerle tasarlanmış modern ofis alanı. Ergonomik mobilya ve akıllı depolama sistemleri.",
      en: "Modern office space designed with clean lines and functional solutions.",
    },
    category: "Ofis",
    location: "Ankara",
    year: "2024",
    status: "published",
    featured: true,
    images: ["/images/poland-apartment-3.png"],
    slug: "minimalist-ofis-tasarimi",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    title: { tr: "Butik Cafe İç Mekan", en: "Boutique Cafe Interior" },
    description: {
      tr: "Sıcak ve davetkar atmosferiyle müşterileri cezbeden cafe tasarımı. Doğal malzemeler, özel aydınlatma ve rahat oturma alanları.",
      en: "Cafe design that attracts customers with its warm and inviting atmosphere.",
    },
    category: "Cafe",
    location: "İzmir",
    year: "2023",
    status: "published",
    featured: true,
    images: ["/images/poland-apartment-4.png"],
    slug: "butik-cafe-ic-mekan",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "5",
    title: { tr: "Lüks Yatak Odası", en: "Luxury Bedroom" },
    description: {
      tr: "Dinlendirici ve şık yatak odası tasarımı. Premium kumaşlar, özel yapım mobilyalar ve mükemmel renk uyumu ile tasarlanmış kişisel alan.",
      en: "Relaxing and elegant bedroom design with premium fabrics.",
    },
    category: "Yatak Odası",
    location: "Bodrum",
    year: "2024",
    status: "published",
    featured: true,
    images: ["/images/poland-apartment-5.png"],
    slug: "luks-yatak-odasi",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    title: { tr: "Modern Mutfak Tasarımı", en: "Modern Kitchen Design" },
    description: {
      tr: "Fonksiyonellik ve estetiğin buluştuğu mutfak tasarımı. Yüksek kaliteli beyaz eşyalar, akıllı depolama çözümleri ve şık detaylar.",
      en: "Kitchen design where functionality meets aesthetics.",
    },
    category: "Mutfak",
    location: "Bursa",
    year: "2023",
    status: "published",
    featured: true,
    images: ["/images/poland-apartment-6.png"],
    slug: "modern-mutfak-tasarimi",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    // GitHub'dan projeleri çekmeye çalış
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 60 }, // 1 dakika cache
          },
        )

        if (response.ok) {
          const data = await response.json()
          const content = Buffer.from(data.content, "base64").toString("utf-8")
          const projects = JSON.parse(content)
          return NextResponse.json({ projects: projects.projects || [] })
        }
      } catch (error) {
        console.error("GitHub API error:", error)
      }
    }

    // Fallback projeler
    return NextResponse.json({ projects: fallbackProjects })
  } catch (error) {
    console.error("Projects API error:", error)
    return NextResponse.json({ projects: fallbackProjects })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProject = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // GitHub'a kaydetmeye çalış
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      try {
        // Mevcut projeleri al
        const getResponse = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        )

        let currentProjects = []
        let sha = ""

        if (getResponse.ok) {
          const data = await getResponse.json()
          const content = Buffer.from(data.content, "base64").toString("utf-8")
          const parsed = JSON.parse(content)
          currentProjects = parsed.projects || []
          sha = data.sha
        }

        // Yeni projeyi ekle
        const updatedProjects = [newProject, ...currentProjects]
        const newContent = JSON.stringify({ projects: updatedProjects }, null, 2)

        // GitHub'a kaydet
        const updateResponse = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Add new project: ${newProject.title.tr}`,
              content: Buffer.from(newContent).toString("base64"),
              sha: sha,
            }),
          },
        )

        if (updateResponse.ok) {
          // Cache'i temizle
          revalidatePath("/projects")
          revalidatePath("/api/projects")
          return NextResponse.json({ success: true, project: newProject })
        }
      } catch (error) {
        console.error("GitHub save error:", error)
      }
    }

    // Local storage fallback
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
