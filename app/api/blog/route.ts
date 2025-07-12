import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET() {
  try {
    const { posts } = await dataManager.getBlogPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newBlogPostData = await request.json()
    const newPost = await dataManager.createBlogPost(newBlogPostData)

    // Trigger revalidation for blog page
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify({ path: "/blog" }),
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
