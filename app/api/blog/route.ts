import { type NextRequest, NextResponse } from "next/server"
import { githubApi } from "@/lib/github-api"
import { localDb } from "@/lib/database"

export async function GET() {
  try {
    let posts = []

    try {
      posts = await githubApi.getBlogPosts()
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      posts = await localDb.getBlogPosts()
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    let newPost

    try {
      newPost = await githubApi.createBlogPost(postData)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      newPost = await localDb.createBlogPost(postData)
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
