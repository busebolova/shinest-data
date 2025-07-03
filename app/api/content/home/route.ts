import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// In-memory storage for demo (in production, use database)
let homeContent = {
  hero: {
    title: "SHINEST",
    subtitle: "İÇ MİMARLIK",
    description: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
    image: "/images/hero-image.png",
  },
  about: {
    title: "Hakkımızda",
    description: "Modern ve şık tasarımlarla yaşam alanlarınızı dönüştürüyoruz.",
    image: "/images/about-image.png",
  },
  services: [
    {
      id: 1,
      title: "Danışmanlık",
      description: "Profesyonel iç mimarlık danışmanlığı",
      image: "/images/consulting-service.png",
    },
    {
      id: 2,
      title: "Tasarım",
      description: "Özel tasarım çözümleri",
      image: "/images/design-service.png",
    },
    {
      id: 3,
      title: "Uygulama",
      description: "Projelerinizi hayata geçiriyoruz",
      image: "/images/implementation-service.png",
    },
  ],
  gallery: [
    { id: 1, image: "/images/gallery-1.png", title: "Modern Salon" },
    { id: 2, image: "/images/gallery-2.png", title: "Lüks Yatak Odası" },
    { id: 3, image: "/images/gallery-3.png", title: "Şık Mutfak" },
    { id: 4, image: "/images/gallery-4.png", title: "Çalışma Odası" },
    { id: 5, image: "/images/gallery-5.png", title: "Banyo Tasarımı" },
  ],
}

export async function GET() {
  try {
    return NextResponse.json(homeContent)
  } catch (error) {
    console.error("Error fetching home content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Update the content
    homeContent = { ...homeContent, ...body }

    // Revalidate the home page to update the cache
    revalidatePath("/")
    revalidatePath("/admin/content/home")

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      data: homeContent,
    })
  } catch (error) {
    console.error("Error updating home content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, data } = body

    if (section && homeContent[section as keyof typeof homeContent]) {
      homeContent[section as keyof typeof homeContent] = data
    } else {
      homeContent = { ...homeContent, ...body }
    }

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/content/home")

    return NextResponse.json({
      success: true,
      message: `${section || "Content"} updated successfully`,
      data: homeContent,
    })
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
