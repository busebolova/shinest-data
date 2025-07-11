import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET() {
  try {
    const [projects, blogPosts] = await Promise.all([dataManager.getProjects(), dataManager.getBlogPosts()])

    const stats = {
      totalProjects: projects.length,
      publishedProjects: projects.filter((p) => p.status === "published").length,
      draftProjects: projects.filter((p) => p.status === "draft").length,
      featuredProjects: projects.filter((p) => p.featured).length,
      totalBlogPosts: blogPosts.length,
      publishedBlogPosts: blogPosts.filter((p) => p.status === "published").length,
      lastUpdated: new Date().toISOString(),
    }

    const recentActivity = [
      {
        id: "1",
        type: "project",
        action: "created",
        title: "Yeni proje eklendi",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "2",
        type: "blog",
        action: "published",
        title: "Blog yazısı yayınlandı",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "3",
        type: "content",
        action: "updated",
        title: "Ana sayfa içeriği güncellendi",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      },
    ]

    return NextResponse.json({
      stats,
      recentActivity,
      isGitHubConnected: dataManager.isGitHubConfigured(),
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json(
      {
        stats: {
          totalProjects: 0,
          publishedProjects: 0,
          draftProjects: 0,
          featuredProjects: 0,
          totalBlogPosts: 0,
          publishedBlogPosts: 0,
          lastUpdated: new Date().toISOString(),
        },
        recentActivity: [],
        isGitHubConnected: false,
      },
      { status: 200 },
    )
  }
}
