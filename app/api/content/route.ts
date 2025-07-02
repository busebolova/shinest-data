import { type NextRequest, NextResponse } from "next/server"
import { githubApi } from "@/lib/github-api"

export async function GET() {
  try {
    const content = await githubApi.getPageContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching content:", error)

    // Fallback content
    const fallbackContent = {
      homepage: {
        hero: {
          title: { tr: "SHINEST İç Mimarlık", en: "SHINEST Interior Design" },
          subtitle: { tr: "Yaşam alanlarınızı dönüştürüyoruz", en: "Transforming your living spaces" },
          image: "/images/hero-image.png",
        },
        about: {
          title: { tr: "Hakkımızda", en: "About Us" },
          content: { tr: "Modern ve fonksiyonel tasarımlar...", en: "Modern and functional designs..." },
        },
      },
    }

    return NextResponse.json(fallbackContent)
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json()
    const updatedContent = await githubApi.updatePageContent(content)

    // Revalidate homepage
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths: ["/"] }),
    })

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
