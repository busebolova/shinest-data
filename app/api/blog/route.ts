import { type NextRequest, NextResponse } from "next/server"
import { getGitHubApi } from "@/lib/github-api"

export async function GET() {
  try {
    const github = getGitHubApi()
    const blogs = await github.getBlogs()

    return NextResponse.json({
      success: true,
      blogs: blogs || [],
    })
  } catch (error) {
    console.error("Blog API error:", error)

    // Fallback data
    const fallbackBlogs = [
      {
        id: "1",
        title: { tr: "2024 İç Mimarlık Trendleri", en: "2024 Interior Design Trends" },
        excerpt: {
          tr: "Bu yılın en popüler iç mimarlık trendleri",
          en: "This year's most popular interior design trends",
        },
        content: { tr: "Detaylı blog içeriği...", en: "Detailed blog content..." },
        image: "/modern-interior-2024.png",
        date: "2024-01-15",
        category: "Trendler",
      },
      {
        id: "2",
        title: { tr: "Küçük Mekanları Büyük Gösterme Sanatı", en: "The Art of Making Small Spaces Look Bigger" },
        excerpt: {
          tr: "Küçük mekanları nasıl daha büyük gösterebiliriz?",
          en: "How can we make small spaces look bigger?",
        },
        content: { tr: "Detaylı blog içeriği...", en: "Detailed blog content..." },
        image: "/small-space-interior.png",
        date: "2024-01-10",
        category: "İpuçları",
      },
      {
        id: "3",
        title: { tr: "Sürdürülebilir İç Mimarlık", en: "Sustainable Interior Design" },
        excerpt: { tr: "Çevre dostu tasarım yaklaşımları", en: "Environmentally friendly design approaches" },
        content: { tr: "Detaylı blog içeriği...", en: "Detailed blog content..." },
        image: "/sustainable-interior.png",
        date: "2024-01-05",
        category: "Sürdürülebilirlik",
      },
    ]

    return NextResponse.json({
      success: true,
      blogs: fallbackBlogs,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const blog = await request.json()
    const github = getGitHubApi()

    const newBlog = {
      id: Date.now().toString(),
      ...blog,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    }

    await github.createBlog(newBlog)

    return NextResponse.json({
      success: true,
      blog: newBlog,
    })
  } catch (error) {
    console.error("Create blog error:", error)
    return NextResponse.json({ success: false, error: "Blog yazısı oluşturulamadı" }, { status: 500 })
  }
}
