import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Global content storage
let globalContent = {
  header: {
    logo: "/images/shinest-logo.png",
    navigation: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hakkımızda", href: "/about" },
      { label: "Hizmetler", href: "/services" },
      { label: "Projeler", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "İletişim", href: "/contact" },
    ],
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com/shinest" },
      { platform: "youtube", url: "https://youtube.com/shinest" },
      { platform: "linkedin", url: "https://linkedin.com/company/shinest" },
    ],
  },
  footer: {
    logo: "/images/shinest-logo.png",
    description: "Modern ve şık tasarımlarla yaşam alanlarınızı dönüştürüyoruz.",
    contact: {
      address: "İstanbul, Türkiye",
      phone: "+90 555 123 45 67",
      email: "info@shinest.com",
    },
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com/shinest" },
      { platform: "youtube", url: "https://youtube.com/shinest" },
      { platform: "linkedin", url: "https://linkedin.com/company/shinest" },
    ],
  },
}

export async function GET() {
  try {
    return NextResponse.json(globalContent)
  } catch (error) {
    console.error("Error fetching global content:", error)
    return NextResponse.json({ error: "Failed to fetch global content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Update global content
    globalContent = { ...globalContent, ...body }

    // Revalidate all pages that use global content
    revalidatePath("/")
    revalidatePath("/about")
    revalidatePath("/services")
    revalidatePath("/projects")
    revalidatePath("/blog")
    revalidatePath("/contact")
    revalidatePath("/admin/content/global")

    return NextResponse.json({
      success: true,
      message: "Global content updated successfully",
      data: globalContent,
    })
  } catch (error) {
    console.error("Error updating global content:", error)
    return NextResponse.json({ error: "Failed to update global content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, data } = body

    if (section && globalContent[section as keyof typeof globalContent]) {
      globalContent[section as keyof typeof globalContent] = data
    } else {
      globalContent = { ...globalContent, ...body }
    }

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/about")
    revalidatePath("/services")
    revalidatePath("/projects")
    revalidatePath("/blog")
    revalidatePath("/contact")
    revalidatePath("/admin/content/global")

    return NextResponse.json({
      success: true,
      message: `${section || "Global content"} updated successfully`,
      data: globalContent,
    })
  } catch (error) {
    console.error("Error updating global content:", error)
    return NextResponse.json({ error: "Failed to update global content" }, { status: 500 })
  }
}
