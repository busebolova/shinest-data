import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const blogPosts = await githubAPI.getBlogPosts()
    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error("Blog posts fetch failed:", error)
    return NextResponse.json(
      {
        error: "Blog yazıları alınamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const postData = await request.json()
    const newPost = await githubAPI.createBlogPost(postData)
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Blog post creation failed:", error)
    return NextResponse.json(
      {
        error: "Blog yazısı oluşturulamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
