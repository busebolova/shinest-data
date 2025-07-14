import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Default global content
    const content = {
      header: {
        logo: "/images/logo1.png",
        navigation: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hakkımızda", href: "/about" },
          { name: "Hizmetler", href: "/services" },
          { name: "Projeler", href: "/projects" },
          { name: "Blog", href: "/blog" },
          { name: "İletişim", href: "/contact" },
        ],
        socialMedia: {
          instagram: "https://www.instagram.com/icm.selin",
          youtube: "https://www.youtube.com/@ShinestIcMimarlikk",
          linkedin: "https://www.linkedin.com/company/shinesticmimarlik",
        },
      },
      footer: {
        companyName: "SHINEST İç Mimarlık",
        description: "Yenilikçi ve fonksiyonel iç mekan çözümleri",
        address: "İstanbul, Türkiye",
        phone: "+90 XXX XXX XX XX",
        email: "info@shinest.com",
        socialMedia: {
          instagram: "https://www.instagram.com/icm.selin",
          youtube: "https://www.youtube.com/@ShinestIcMimarlikk",
          linkedin: "https://www.linkedin.com/company/shinesticmimarlik",
        },
      },
    }

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error in /api/content/global:", error)
    return NextResponse.json({ error: "Failed to fetch global content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Here you would typically save to database
    // For now, just return success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating global content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
