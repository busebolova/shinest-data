import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET() {
  try {
    const projects = await dataManager.getProjects()
    const blogPosts = await dataManager.getBlogPosts()

    const projectsPublished = projects.filter((p: any) => p.status === "published").length
    const blogPostsPublished = blogPosts.filter((b: any) => b.status === "published").length

    const dashboardStats = {
      totalProjects: projects.length,
      projectsPublished,
      totalBlogPosts: blogPosts.length,
      blogPostsPublished,
      // Add more stats as needed
    }

    return NextResponse.json(dashboardStats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      {
        totalProjects: 0,
        projectsPublished: 0,
        totalBlogPosts: 0,
        blogPostsPublished: 0,
        error: "Failed to fetch dashboard stats",
      },
      { status: 500 },
    )
  }
}
