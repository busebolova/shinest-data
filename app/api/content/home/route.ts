import { type NextRequest, NextResponse } from "next/server"

// Mock data - replace with actual database calls
const homeContent = {
  hero: {
    title: "SHINEST",
    image: "/images/hero-image.png",
  },
  bigText: {
    line1: "MEKANLARINIZ",
    line2: "YAŞAMINIZA",
    line3: "IŞIK TUTAR!",
  },
  text: {
    title: "Işık tutar!",
    subtitle: "İç Mimarlık Stüdyosu",
    content: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz.",
  },
}

export async function GET() {
  try {
    return NextResponse.json(homeContent, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("Error fetching home content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Here you would typically save to database
    console.log("Updating home content:", body)

    // For now, just return success
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error("Error updating home content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
