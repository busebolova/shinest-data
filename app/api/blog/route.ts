import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    const posts = await dataManager.getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const postData = await request.json()
    const newPost = await dataManager.createBlogPost(postData)

    // Revalidate all relevant pages
    revalidatePath("/")
    revalidatePath("/blog")
    revalidatePath("/admin/blog")

    return NextResponse.json({
      success: true,
      post: newPost,
      message: "Blog yazısı başarıyla oluşturuldu",
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Blog yazısı oluşturulurken hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
