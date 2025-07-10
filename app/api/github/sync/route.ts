import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"
import { revalidatePath } from "next/cache"

export async function POST() {
  try {
    if (!githubAPI.isConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "GitHub API not configured",
        },
        { status: 400 },
      )
    }

    // Force refresh data from GitHub
    const projects = await githubAPI.getProjects()
    const blogPosts = await githubAPI.getBlogPosts()
    const homeContent = await githubAPI.getPageContent("home")

    // Revalidate relevant pages
    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/blog")
    revalidatePath("/admin")

    return NextResponse.json({
      success: true,
      data: {
        projects: projects.length,
        blogPosts: blogPosts.length,
        homeContent: !!homeContent,
      },
      syncedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Sync failed",
      },
      { status: 500 },
    )
  }
}
