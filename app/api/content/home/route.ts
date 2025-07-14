import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    const content = await dataManager.getPageContent("home")
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching home content:", error)

    // Return fallback content
    const fallbackContent = {
      hero: {
        title: "SHINEST",
        subtitle: "İÇ MİMARLIK",
        description: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz",
        image: "/images/hero-image.png",
      },
      bigText: {
        line1: "MEKANLARINIZ",
        line2: "YAŞAMINIZA",
        line3: "IŞIK TUTAR!",
      },
      gallery: {
        images: [
          "/images/gallery-1.png",
          "/images/gallery-2.png",
          "/images/gallery-3.png",
          "/images/gallery-4.png",
          "/images/gallery-5.png",
        ],
      },
      services: {
        title: "Hizmetlerimiz",
        items: [
          {
            title: "Danışmanlık",
            description: "Profesyonel iç mimarlık danışmanlığı",
            image: "/images/consulting-service.png",
          },
          {
            title: "Tasarım",
            description: "Yaratıcı ve fonksiyonel tasarım çözümleri",
            image: "/images/design-service.png",
          },
          {
            title: "Uygulama",
            description: "Tasarımdan uygulamaya kadar tüm süreçler",
            image: "/images/implementation-service.png",
          },
        ],
      },
    }

    return NextResponse.json(fallbackContent)
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json()
    await dataManager.savePageContent("home", content)

    // Revalidate home page and admin page
    revalidatePath("/")
    revalidatePath("/admin/content/home")

    return NextResponse.json({
      success: true,
      message: "Ana sayfa içeriği başarıyla güncellendi",
    })
  } catch (error) {
    console.error("Error updating home content:", error)
    return NextResponse.json(
      {
        success: false,
        message: "İçerik güncellenirken hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
