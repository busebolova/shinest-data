import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET() {
  try {
    const posts = await dataManager.getBlogPosts()
    
    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    
    // Return fallback data on error
    const fallbackPosts = [
      {
        id: "1",
        title: { tr: "2024 İç Mimarlık Trendleri", en: "2024 Interior Design Trends" },
        content: {
          tr: "2024 yılında iç mimarlık dünyasında öne çıkan trendler...",
          en: "Trends that stand out in the interior design world in 2024...",
        },
        excerpt: {
          tr: "Bu yıl öne çıkan tasarım trendleri",
          en: "Design trends that stand out this year",
        },
        image: "/modern-interior-2024.png",
        status: "published",
        publishedAt: "2024-01-15T10:00:00Z",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        title: { tr: "Küçük Mekanlar İçin İpuçları", en: "Tips for Small Spaces" },
        content: {
          tr: "Küçük mekanları büyük göstermenin yolları...",
          en: "Ways to make small spaces look bigger...",
        },
        excerpt: {
          tr: "Küçük alanları verimli kullanma",
          en: "Efficient use of small areas",
        },
        image: "/small-space-interior.png",
        status: "published",
        publishedAt: "2024-01-10T10:00:00Z",
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",
      },
    ]

    return NextResponse.json({
      success: true,
      data: fallbackPosts,
      count: fallbackPosts.length,
      fallback: true,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newPost = await dataManager.createBlogPost(body)
    
    return NextResponse.json({
      success: true,
      data: newPost,
      message: "Blog post created successfully",
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create blog post",
      },
      { status: 500 }
    )
  }
}
