import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET() {
  try {
    const [projects, blogPosts] = await Promise.all([dataManager.getProjects(), dataManager.getBlogPosts()])

    const publishedProjects = projects.filter((p) => p.status === "published")
    const featuredProjects = projects.filter((p) => p.featured)
    const publishedPosts = blogPosts.filter((p) => p.status === "published")

    const dashboardData = {
      totalProjects: projects.length,
      completedProjects: publishedProjects.length,
      inProgressProjects: projects.filter((p) => p.status === "draft").length,
      plannedProjects: projects.filter((p) => p.status === "archived").length,
      featuredProjects: featuredProjects.length,
      totalBlogPosts: blogPosts.length,
      publishedPosts: publishedPosts.length,
      featuredPosts: blogPosts.filter((p) => p.status === "published").length,
      recentCommits: dataManager.isGitHubConfigured() ? 5 : 0,
      lastUpdate: new Date().toISOString(),
      recentActivity: [
        {
          id: "1",
          type: "project",
          action: "created",
          title: "Yeni proje eklendi",
          description: "Modern banyo tasarımı projesi eklendi",
          timestamp: new Date().toISOString(),
          status: "success",
        },
        {
          id: "2",
          type: "blog",
          action: "published",
          title: "Blog yazısı yayınlandı",
          description: "2024 iç mimarlık trendleri yazısı yayınlandı",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: "success",
        },
        {
          id: "3",
          type: "content",
          action: "updated",
          title: "İçerik güncellendi",
          description: "Ana sayfa içeriği güncellendi",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: "success",
        },
      ],
      monthlyStats: {
        projects: [2, 3, 1, 4, 2, 3],
        views: [120, 150, 180, 200, 170, 190],
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json(
      {
        error: "Dashboard verileri alınamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
