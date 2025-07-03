import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const projects = await githubAPI.getProjects()
    const blogPosts = await githubAPI.getBlogPosts()
    const commits = await githubAPI.getCommits(5)

    // Calculate stats
    const stats = {
      totalProjects: projects.length,
      completedProjects: projects.filter((p) => p.status === "completed").length,
      inProgressProjects: projects.filter((p) => p.status === "in-progress").length,
      plannedProjects: projects.filter((p) => p.status === "planned").length,
      featuredProjects: projects.filter((p) => p.featured).length,
      totalBlogPosts: blogPosts.length,
      publishedPosts: blogPosts.filter((p) => !p.featured).length,
      featuredPosts: blogPosts.filter((p) => p.featured).length,
      recentCommits: commits.length,
      lastUpdate: new Date().toISOString(),
    }

    // Recent activity
    const recentActivity = [
      ...projects.slice(0, 3).map((project) => ({
        id: project.id,
        type: "project",
        title: `Proje: ${project.title}`,
        description: project.description,
        timestamp: project.updatedAt,
        status: project.status,
      })),
      ...blogPosts.slice(0, 2).map((post) => ({
        id: post.id,
        type: "blog",
        title: `Blog: ${post.title}`,
        description: post.excerpt,
        timestamp: post.updatedAt,
        status: "published",
      })),
      ...commits.slice(0, 2).map((commit) => ({
        id: commit.sha,
        type: "commit",
        title: `Commit: ${commit.commit.message}`,
        description: `${commit.commit.author.name} tarafından`,
        timestamp: commit.commit.author.date,
        status: "completed",
      })),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    return NextResponse.json({
      stats,
      recentActivity,
      projects: projects.slice(0, 6),
      blogPosts: blogPosts.slice(0, 4),
    })
  } catch (error) {
    console.error("Dashboard data fetch failed:", error)
    return NextResponse.json(
      {
        error: "Dashboard verisi alınamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
