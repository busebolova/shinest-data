import { type NextRequest, NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET(request: NextRequest, { params }: { params: { page: string } }) {
  try {
    const { page } = params

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 })
    }

    const content = await dataManager.getPageContent(page)

    return NextResponse.json({
      success: true,
      data: content,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error(`Error fetching page content for ${params.page}:`, error)

    // Return fallback content based on page
    const fallbackContent = getFallbackContent(params.page)

    return NextResponse.json({
      success: true,
      data: fallbackContent,
      fallback: true,
      timestamp: new Date().toISOString(),
    })
  }
}

export async function POST(request: NextRequest, { params }: { params: { page: string } }) {
  try {
    const { page } = params
    const body = await request.json()

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 })
    }

    await dataManager.savePageContent(page, body)

    return NextResponse.json({
      success: true,
      message: `Page content for ${page} saved successfully`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error(`Error saving page content for ${params.page}:`, error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save page content",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function getFallbackContent(page: string): any {
  const fallbackData: Record<string, any> = {
    home: {
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
    },
    about: {
      hero: {
        title: "Hakkımızda",
        subtitle: "SHINEST İÇ MİMARLIK",
        description: "Yaratıcılık ve fonksiyonelliği bir araya getiren tasarım anlayışımızla...",
      },
      content: {
        text: "SHINEST İç Mimarlık olarak, her projeyi benzersiz bir sanat eseri olarak görüyoruz...",
      },
    },
    services: {
      hero: {
        title: "Hizmetlerimiz",
        subtitle: "PROFESYONEL ÇÖZÜMLER",
        description: "İhtiyaçlarınıza özel tasarım ve uygulama hizmetleri",
      },
      services: [
        {
          title: "İç Mimarlık Danışmanlığı",
          description: "Uzman ekibimizle profesyonel danışmanlık hizmeti",
          features: ["Mekan analizi", "Tasarım önerileri", "Malzeme seçimi"],
        },
        {
          title: "3D Tasarım ve Görselleştirme",
          description: "Projenizi gerçeğe en yakın şekilde görselleştiriyoruz",
          features: ["3D modelleme", "Fotorealistik render", "Sanal tur"],
        },
        {
          title: "Proje Yönetimi ve Uygulama",
          description: "Tasarımdan uygulamaya kadar tüm süreçleri yönetiyoruz",
          features: ["Proje takibi", "Kalite kontrolü", "Zamanında teslimat"],
        },
      ],
    },
  }

  return fallbackData[page] || {}
}
